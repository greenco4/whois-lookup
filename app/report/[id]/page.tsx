import { db } from "@/db";
import { domainLookups } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { WhoisIssue } from "@/lib/rdap";
import ShareButtons from "@/app/components/ShareButtons";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const [lookup] = await db
    .select()
    .from(domainLookups)
    .where(eq(domainLookups.id, id))
    .limit(1);

  if (!lookup) return { title: "Not Found" };

  return {
    title: `WHOIS Report: ${lookup.domain} — Grade ${lookup.grade}`,
    description: `WHOIS lookup for ${lookup.domain}. Registrar: ${lookup.registrar ?? "Unknown"}. Score: ${lookup.score}/100. Grade: ${lookup.grade}.`,
  };
}

function SeverityIcon({ severity }: { severity: string }) {
  if (severity === "good") {
    return (
      <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    );
  }
  if (severity === "warning") {
    return (
      <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default async function ReportPage({ params }: Props) {
  const { id } = await params;
  const [lookup] = await db
    .select()
    .from(domainLookups)
    .where(eq(domainLookups.id, id))
    .limit(1);

  if (!lookup) notFound();

  const issues = lookup.issues as unknown as WhoisIssue[];
  const rdap = lookup.rdapData as unknown as {
    nameservers: string[];
    statusCodes: string[];
    dnssec: boolean;
    rdapServer: string;
    registrantCountry: string | null;
  };

  const reportUrl = `https://whois-lookup-moltcorporation.vercel.app/report/${id}`;

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">WHOIS Report</h1>
          <p className="text-xl text-[var(--text-muted)] font-mono">{lookup.domain}</p>
        </div>

        {/* Score */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="grade-badge">{lookup.grade}</div>
          <p className="text-lg">
            Score: <span className="font-bold">{lookup.score}</span>/100
          </p>
          <ShareButtons
            url={reportUrl}
            text={`WHOIS report for ${lookup.domain}: Grade ${lookup.grade} (${lookup.score}/100)`}
          />
        </div>

        {/* Registration Details */}
        <section className="whois-glow rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Registration Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide">Registrar</p>
              <p className="font-medium">{lookup.registrar ?? "Unknown"}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide">Created</p>
              <p className="font-medium">{formatDate(lookup.createdDate)}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide">Expires</p>
              <p className="font-medium">{formatDate(lookup.expiresDate)}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide">Domain Age</p>
              <p className="font-medium">
                {lookup.domainAgeDays !== null
                  ? `${Math.floor(lookup.domainAgeDays / 365)} years, ${lookup.domainAgeDays % 365} days`
                  : "Unknown"}
              </p>
            </div>
          </div>
        </section>

        {/* Nameservers */}
        {rdap.nameservers.length > 0 && (
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Nameservers</h2>
            <div className="space-y-2">
              {rdap.nameservers.map((ns: string) => (
                <div
                  key={ns}
                  className="font-mono text-sm bg-violet-50 dark:bg-violet-900/20 rounded-lg px-3 py-2 border border-violet-100 dark:border-violet-800/30"
                >
                  {ns}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Status Codes */}
        {rdap.statusCodes.length > 0 && (
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Status Codes</h2>
            <div className="flex flex-wrap gap-2">
              {rdap.statusCodes.map((status: string) => (
                <span
                  key={status}
                  className="text-xs font-mono px-2 py-1 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-700/30"
                >
                  {status}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Security */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Security</h2>
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full ${
                rdap.dnssec
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
              }`}
            >
              {rdap.dnssec ? "DNSSEC Enabled" : "DNSSEC Not Enabled"}
            </span>
          </div>
        </section>

        {/* Health Score Breakdown */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Health Score Breakdown</h2>
          <div className="space-y-4">
            {issues.map((issue) => (
              <div key={issue.category} className="flex items-start gap-3">
                <SeverityIcon severity={issue.severity} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{issue.category}</span>
                    <span className="text-xs text-[var(--text-muted)]">
                      {issue.points}/{issue.maxPoints}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-muted)]">{issue.message}</p>
                  <div className="mt-2 score-bar-bg">
                    <div
                      className="score-bar-fill"
                      style={{ width: `${(issue.points / issue.maxPoints) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RDAP Source */}
        <div className="text-center text-xs text-[var(--text-muted)] mb-8">
          Data sourced from <span className="font-mono">{rdap.rdapServer}</span>
        </div>

        {/* Cross-links */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
          <h2 className="text-sm font-semibold mb-3 text-[var(--text-muted)]">
            Also check this domain with
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <a
              href={`https://dns-lookup-moltcorporation.vercel.app?domain=${lookup.domain}`}
              className="block rounded-xl border border-[var(--border)] p-3 text-sm hover:border-violet-400 transition-colors"
            >
              <span className="font-semibold text-teal-600 dark:text-teal-400">DNS Lookup</span>
              <span className="block text-xs text-[var(--text-muted)]">Check DNS records</span>
            </a>
            <a
              href={`https://ssl-checker-moltcorporation.vercel.app?domain=${lookup.domain}`}
              className="block rounded-xl border border-[var(--border)] p-3 text-sm hover:border-violet-400 transition-colors"
            >
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">SSL Checker</span>
              <span className="block text-xs text-[var(--text-muted)]">Check SSL certificate</span>
            </a>
            <a
              href={`https://headerguard-moltcorporation.vercel.app?url=${lookup.domain}`}
              className="block rounded-xl border border-[var(--border)] p-3 text-sm hover:border-violet-400 transition-colors"
            >
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">HeaderGuard</span>
              <span className="block text-xs text-[var(--text-muted)]">Check security headers</span>
            </a>
            <a
              href={`https://metashield-moltcorporation.vercel.app?url=${lookup.domain}`}
              className="block rounded-xl border border-[var(--border)] p-3 text-sm hover:border-violet-400 transition-colors"
            >
              <span className="font-semibold text-orange-600 dark:text-orange-400">MetaShield</span>
              <span className="block text-xs text-[var(--text-muted)]">Check meta tags</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
