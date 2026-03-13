import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { db } from "@/db";
import { domainLookups } from "@/db/schema";
import { lookupWhois } from "@/lib/rdap";
import { checkProAccess } from "@/lib/stripe";
import { sql } from "drizzle-orm";

const FREE_LIMIT = 10;
const WINDOW_MS = 24 * 60 * 60 * 1000;

export async function POST(request: NextRequest) {
  let body: { domain?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  let { domain } = body;
  if (!domain || typeof domain !== "string") {
    return NextResponse.json({ error: "Domain is required" }, { status: 400 });
  }

  // Clean domain
  domain = domain.trim().toLowerCase();
  domain = domain.replace(/^https?:\/\//, "");
  domain = domain.replace(/\/.*$/, "");
  domain = domain.replace(/:\d+$/, "");

  if (!domain || domain.length > 253) {
    return NextResponse.json({ error: "Invalid domain" }, { status: 400 });
  }

  if (
    !/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*\.[a-z]{2,}$/.test(
      domain
    )
  ) {
    return NextResponse.json({ error: "Invalid domain format" }, { status: 400 });
  }

  // Check Pro status via Moltcorp payments API
  const proEmail = request.cookies.get("whois_pro_email")?.value;
  let isPro = false;
  if (proEmail) {
    isPro = await checkProAccess(proEmail);
  }

  // Rate limiting
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  const ipHash = createHash("sha256").update(ip).digest("hex");

  let used = 0;
  if (!isPro) {
    const windowStart = new Date(Date.now() - WINDOW_MS);
    const [countResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(domainLookups)
      .where(
        sql`${domainLookups.ipHash} = ${ipHash} AND ${domainLookups.createdAt} >= ${windowStart}`
      );

    used = countResult?.count ?? 0;

    if (used >= FREE_LIMIT) {
      return NextResponse.json(
        {
          error:
            "Rate limit exceeded. Free tier allows 10 lookups per 24 hours. Upgrade to Pro for unlimited.",
          remaining: 0,
          limit: FREE_LIMIT,
        },
        { status: 429 }
      );
    }
  }

  // Perform WHOIS lookup
  let result;
  try {
    result = await lookupWhois(domain);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "WHOIS lookup failed";
    return NextResponse.json({ error: message }, { status: 422 });
  }

  // Store result
  const [lookup] = await db
    .insert(domainLookups)
    .values({
      domain,
      registrar: result.registrar,
      createdDate: result.createdDate,
      expiresDate: result.expiresDate,
      domainAgeDays: result.domainAgeDays,
      score: result.score,
      grade: result.grade,
      rdapData: result,
      issues: result.issues,
      ipHash,
    })
    .returning({ id: domainLookups.id });

  const remaining = isPro ? -1 : FREE_LIMIT - used - 1;

  return NextResponse.json({
    id: lookup.id,
    domain,
    score: result.score,
    grade: result.grade,
    remaining,
    limit: isPro ? -1 : FREE_LIMIT,
    isPro,
  });
}
