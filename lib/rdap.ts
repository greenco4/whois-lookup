const IANA_BOOTSTRAP_URL = "https://data.iana.org/rdap/dns.json";

export interface WhoisResult {
  domain: string;
  registrar: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  expiresDate: string | null;
  domainAgeDays: number | null;
  nameservers: string[];
  statusCodes: string[];
  dnssec: boolean;
  registrant: string | null;
  registrantCountry: string | null;
  rdapServer: string;
  score: number;
  grade: string;
  issues: WhoisIssue[];
}

export interface WhoisIssue {
  category: string;
  severity: "good" | "warning" | "critical";
  message: string;
  points: number;
  maxPoints: number;
}

interface RdapBootstrap {
  services: [string[], string[]][];
}

interface RdapEntity {
  roles?: string[];
  vcardArray?: [string, ...unknown[]][];
  entities?: RdapEntity[];
}

interface RdapResponse {
  ldhName?: string;
  handle?: string;
  status?: string[];
  events?: { eventAction: string; eventDate: string }[];
  nameservers?: { ldhName: string }[];
  entities?: RdapEntity[];
  secureDNS?: { delegationSigned?: boolean };
}

let bootstrapCache: RdapBootstrap | null = null;
let bootstrapExpiry = 0;

async function getBootstrap(): Promise<RdapBootstrap> {
  if (bootstrapCache && Date.now() < bootstrapExpiry) {
    return bootstrapCache;
  }
  const res = await fetch(IANA_BOOTSTRAP_URL, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch IANA RDAP bootstrap");
  bootstrapCache = (await res.json()) as RdapBootstrap;
  bootstrapExpiry = Date.now() + 3600_000;
  return bootstrapCache;
}

function findRdapServer(bootstrap: RdapBootstrap, domain: string): string | null {
  const tld = domain.split(".").pop()?.toLowerCase();
  if (!tld) return null;

  for (const [tlds, urls] of bootstrap.services) {
    if (tlds.some((t) => t.toLowerCase() === tld)) {
      return urls[0];
    }
  }
  return null;
}

function extractEntity(entities: RdapEntity[] | undefined, role: string): RdapEntity | null {
  if (!entities) return null;
  for (const entity of entities) {
    if (entity.roles?.includes(role)) return entity;
    if (entity.entities) {
      const nested = extractEntity(entity.entities, role);
      if (nested) return nested;
    }
  }
  return null;
}

function extractVcardField(entity: RdapEntity | null, field: string): string | null {
  if (!entity?.vcardArray) return null;
  const vcard = entity.vcardArray;
  if (vcard.length < 2 || !Array.isArray(vcard[1])) return null;
  for (const entry of vcard[1] as unknown[][]) {
    if (Array.isArray(entry) && entry[0] === field) {
      const value = entry[entry.length - 1];
      if (typeof value === "string") return value;
    }
  }
  return null;
}

function getEventDate(events: RdapResponse["events"], action: string): string | null {
  if (!events) return null;
  const event = events.find((e) => e.eventAction === action);
  return event?.eventDate ?? null;
}

function daysBetween(dateStr: string, now: Date): number {
  const date = new Date(dateStr);
  return Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
}

function scoreWhois(result: Omit<WhoisResult, "score" | "grade" | "issues">): {
  score: number;
  grade: string;
  issues: WhoisIssue[];
} {
  const issues: WhoisIssue[] = [];
  const now = new Date();

  // Expiry proximity (30 pts)
  if (result.expiresDate) {
    const daysUntilExpiry = -daysBetween(result.expiresDate, now);
    let points = 0;
    let severity: WhoisIssue["severity"] = "good";
    let message = "";
    if (daysUntilExpiry <= 0) {
      points = 0;
      severity = "critical";
      message = "Domain has expired";
    } else if (daysUntilExpiry < 30) {
      points = 5;
      severity = "critical";
      message = `Domain expires in ${daysUntilExpiry} days — renew immediately`;
    } else if (daysUntilExpiry < 90) {
      points = 10;
      severity = "warning";
      message = `Domain expires in ${daysUntilExpiry} days`;
    } else if (daysUntilExpiry < 365) {
      points = 20;
      severity = "warning";
      message = `Domain expires in ${daysUntilExpiry} days — consider renewing`;
    } else {
      points = 30;
      severity = "good";
      message = `Domain expires in ${daysUntilExpiry} days`;
    }
    issues.push({ category: "Expiry", severity, message, points, maxPoints: 30 });
  } else {
    issues.push({
      category: "Expiry",
      severity: "warning",
      message: "No expiration date found",
      points: 15,
      maxPoints: 30,
    });
  }

  // Domain age (25 pts)
  if (result.domainAgeDays !== null) {
    let points = 0;
    let severity: WhoisIssue["severity"] = "good";
    let message = "";
    if (result.domainAgeDays >= 1825) {
      points = 25;
      severity = "good";
      message = `Domain is ${Math.floor(result.domainAgeDays / 365)} years old — established`;
    } else if (result.domainAgeDays >= 730) {
      points = 20;
      severity = "good";
      message = `Domain is ${Math.floor(result.domainAgeDays / 365)} years old`;
    } else if (result.domainAgeDays >= 365) {
      points = 15;
      severity = "good";
      message = `Domain is ${Math.floor(result.domainAgeDays / 365)} year(s) old`;
    } else {
      points = 5;
      severity = "warning";
      message = `Domain is ${result.domainAgeDays} days old — relatively new`;
    }
    issues.push({ category: "Domain Age", severity, message, points, maxPoints: 25 });
  } else {
    issues.push({
      category: "Domain Age",
      severity: "warning",
      message: "No creation date found",
      points: 10,
      maxPoints: 25,
    });
  }

  // Registrar lock (20 pts)
  const lockStatuses = [
    "client transfer prohibited",
    "clienttransferprohibited",
    "server transfer prohibited",
    "servertransferprohibited",
  ];
  const hasLock = result.statusCodes.some((s) =>
    lockStatuses.some((l) => s.toLowerCase().includes(l))
  );
  if (hasLock) {
    issues.push({
      category: "Registrar Lock",
      severity: "good",
      message: "Transfer lock enabled — domain is protected",
      points: 20,
      maxPoints: 20,
    });
  } else {
    issues.push({
      category: "Registrar Lock",
      severity: "warning",
      message: "No transfer lock detected — domain could be transferred",
      points: 5,
      maxPoints: 20,
    });
  }

  // DNSSEC (15 pts)
  if (result.dnssec) {
    issues.push({
      category: "DNSSEC",
      severity: "good",
      message: "DNSSEC is enabled",
      points: 15,
      maxPoints: 15,
    });
  } else {
    issues.push({
      category: "DNSSEC",
      severity: "warning",
      message: "DNSSEC is not enabled",
      points: 0,
      maxPoints: 15,
    });
  }

  // Data completeness (10 pts)
  const hasRegistrant = !!result.registrant;
  const hasNameservers = result.nameservers.length > 0;
  let completenessPoints = 0;
  if (hasRegistrant) completenessPoints += 5;
  if (hasNameservers) completenessPoints += 5;
  issues.push({
    category: "Completeness",
    severity: completenessPoints >= 8 ? "good" : completenessPoints >= 5 ? "warning" : "critical",
    message:
      completenessPoints === 10
        ? "Registration data is complete"
        : hasNameservers
          ? "Registrant data is redacted for privacy"
          : "Limited registration data available",
    points: completenessPoints,
    maxPoints: 10,
  });

  const score = issues.reduce((sum, i) => sum + i.points, 0);
  const grade =
    score >= 90
      ? "A+"
      : score >= 80
        ? "A"
        : score >= 70
          ? "B"
          : score >= 60
            ? "C"
            : score >= 50
              ? "D"
              : "F";

  return { score, grade, issues };
}

export async function lookupWhois(domain: string): Promise<WhoisResult> {
  const bootstrap = await getBootstrap();
  const rdapServer = findRdapServer(bootstrap, domain);

  if (!rdapServer) {
    throw new Error(`No RDAP server found for TLD of ${domain}`);
  }

  const url = `${rdapServer.replace(/\/$/, "")}/domain/${domain}`;
  const res = await fetch(url, {
    headers: { Accept: "application/rdap+json" },
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(`Domain ${domain} not found in RDAP`);
    }
    throw new Error(`RDAP query failed: ${res.status}`);
  }

  const data = (await res.json()) as RdapResponse;
  const now = new Date();

  const createdDate = getEventDate(data.events, "registration");
  const updatedDate = getEventDate(data.events, "last changed");
  const expiresDate = getEventDate(data.events, "expiration");

  const domainAgeDays = createdDate ? daysBetween(createdDate, now) : null;

  const nameservers = (data.nameservers ?? [])
    .map((ns) => ns.ldhName?.toLowerCase())
    .filter((ns): ns is string => !!ns);

  const statusCodes = data.status ?? [];
  const dnssec = data.secureDNS?.delegationSigned ?? false;

  const registrarEntity = extractEntity(data.entities, "registrar");
  const registrar = extractVcardField(registrarEntity, "fn");

  const registrantEntity = extractEntity(data.entities, "registrant");
  const registrant = extractVcardField(registrantEntity, "fn");
  const registrantCountry = extractVcardField(registrantEntity, "adr");

  const partial = {
    domain,
    registrar,
    createdDate,
    updatedDate,
    expiresDate,
    domainAgeDays,
    nameservers,
    statusCodes,
    dnssec,
    registrant,
    registrantCountry,
    rdapServer: rdapServer,
  };

  const { score, grade, issues } = scoreWhois(partial);

  return { ...partial, score, grade, issues };
}
