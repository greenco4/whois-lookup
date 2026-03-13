import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DomainTools Alternative — Free WHOIS Lookup with Health Scoring",
  description:
    "Looking for a DomainTools alternative? WHOIS Lookup is a free domain registration checker with health scoring via modern RDAP protocol. Pro at $5/mo — not $99. No login required.",
  alternates: {
    canonical: "https://whois-lookup-moltcorporation.vercel.app/compare/domaintools",
  },
  openGraph: {
    title: "DomainTools Alternative — WHOIS Lookup",
    description:
      "Free alternative to DomainTools. Check WHOIS data with domain health scoring. Pro at $5/mo.",
    type: "website",
    siteName: "WHOIS Lookup",
  },
  twitter: {
    card: "summary_large_image",
    title: "DomainTools Alternative — WHOIS Lookup",
    description:
      "Free WHOIS lookup with health scoring. DomainTools starts at $99/mo — ours is $5.",
  },
};

const comparisonRows = [
  {
    feature: "Price",
    ours: "Free (Pro $5/mo)",
    theirs: "$99/mo+",
  },
  {
    feature: "Health scoring",
    ours: "Yes — 5 categories, letter grade",
    theirs: "No",
  },
  {
    feature: "Protocol",
    ours: "RDAP (modern, structured)",
    theirs: "Legacy WHOIS + proprietary",
  },
  {
    feature: "Domain age check",
    ours: "Yes",
    theirs: "Enterprise only",
  },
  {
    feature: "Expiry monitoring",
    ours: "Pro",
    theirs: "Enterprise only",
  },
  {
    feature: "Historical WHOIS",
    ours: "No",
    theirs: "Yes — 10+ years",
  },
  {
    feature: "Reverse WHOIS",
    ours: "No",
    theirs: "Yes",
  },
  {
    feature: "Shareable reports",
    ours: "Yes — permanent URL",
    theirs: "No",
  },
  {
    feature: "Signup required",
    ours: "No",
    theirs: "Yes",
  },
];

const faqs = [
  {
    question: "What is DomainTools?",
    answer:
      "DomainTools is an enterprise WHOIS intelligence platform that provides historical WHOIS records, reverse lookups, brand monitoring, and threat intelligence. Their base tier starts at $99/mo, with enterprise plans costing significantly more.",
  },
  {
    question: "Is WHOIS Lookup a good alternative to DomainTools?",
    answer:
      "For current domain registration lookups and health scoring, yes. WHOIS Lookup uses the modern RDAP protocol and includes a health score covering expiry, domain age, DNSSEC, registrar lock, and data completeness. If you need historical WHOIS data, reverse lookups, or threat intelligence, DomainTools is more comprehensive.",
  },
  {
    question: "How much does DomainTools cost?",
    answer:
      "DomainTools starts at $99/mo for their base tier. Features like historical WHOIS, bulk lookups, and threat intelligence require enterprise pricing. WHOIS Lookup is free for basic lookups and $5/mo for Pro — nearly 20x cheaper.",
  },
  {
    question: "What is RDAP and why is it better than WHOIS?",
    answer:
      "RDAP (Registration Data Access Protocol) is the modern replacement for the legacy WHOIS protocol. It returns structured JSON data, supports standardized access controls, and is maintained by IANA. WHOIS Lookup uses RDAP for more reliable and consistent results.",
  },
  {
    question: "What does the health score measure?",
    answer:
      "The health score covers five categories: expiry proximity (is the domain about to expire?), domain age (how established is it?), registrar lock (transfer protection), DNSSEC (DNS security), and data completeness. You get a score out of 100 and a letter grade.",
  },
];

export default function DomainToolsComparison() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0f0a1e] font-sans">
      {/* Dot grid background */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(124,58,237,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-lg font-bold tracking-tight text-violet-400"
        >
          WHOIS Lookup
        </Link>
        <Link
          href="/"
          className="rounded-lg bg-violet-600 px-4 py-2 font-mono text-sm font-medium text-white transition-colors hover:bg-violet-500"
        >
          Look up a domain free
        </Link>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12">
        {/* Hero */}
        <div className="flex flex-col gap-4">
          <h1 className="font-mono text-3xl font-bold text-white sm:text-4xl">
            DomainTools Alternative
          </h1>
          <p className="text-lg text-violet-200/60">
            WHOIS Lookup is a free, modern alternative to DomainTools. Get
            domain registration data, health scoring, and expiry tracking via
            the modern RDAP protocol — all without creating an account.
            Pro tier starts at $5/mo, not $99.
          </p>
        </div>

        {/* Pricing comparison callout */}
        <div className="flex flex-col gap-2 rounded-lg border border-violet-800 bg-violet-950/50 p-6">
          <h2 className="font-mono text-lg font-semibold text-violet-300">
            Why switch from DomainTools?
          </h2>
          <p className="text-sm text-violet-100/50">
            DomainTools charges{" "}
            <span className="font-mono font-bold text-red-400">$99/mo</span>{" "}
            for their base tier, and locks features like bulk lookup and
            expiry monitoring behind enterprise pricing. WHOIS Lookup gives
            you health scoring, RDAP-based lookups, and shareable reports for{" "}
            <span className="font-mono font-bold text-violet-300">free</span>.
            Need unlimited lookups, bulk checking, and expiry alerts? Pro is{" "}
            <span className="font-mono font-bold text-violet-300">$5/mo</span>{" "}
            — that&apos;s{" "}
            <span className="font-mono text-violet-300">nearly 20x cheaper</span>.
          </p>
        </div>

        {/* Feature comparison table */}
        <div className="flex flex-col gap-4">
          <h2 className="font-mono text-lg font-semibold text-violet-300">
            Feature comparison
          </h2>
          <div className="overflow-x-auto rounded-lg border border-violet-900/50 bg-gray-900/80">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-violet-900/50">
                  <th className="px-4 py-3 text-left font-mono text-xs font-medium text-violet-500">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left font-mono text-xs font-medium text-violet-400">
                    WHOIS Lookup
                  </th>
                  <th className="px-4 py-3 text-left font-mono text-xs font-medium text-violet-700">
                    DomainTools
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-violet-950/50 last:border-0"
                  >
                    <td className="px-4 py-3 font-mono text-xs font-medium text-violet-300/70">
                      {row.feature}
                    </td>
                    <td className="px-4 py-3 text-violet-100">
                      {row.ours}
                    </td>
                    <td className="px-4 py-3 text-violet-100/40">
                      {row.theirs}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* When DomainTools is better */}
        <div className="flex flex-col gap-3 rounded-lg border border-violet-900/50 bg-gray-900/50 p-6">
          <h2 className="font-mono text-lg font-semibold text-violet-300">
            When DomainTools is better
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-violet-100/50">
            <li>You need <strong className="text-violet-200">historical WHOIS records</strong> — DomainTools has 10+ years of archived registration data for forensic investigations.</li>
            <li>You need <strong className="text-violet-200">reverse WHOIS lookups</strong> — find all domains registered by a specific person or organization.</li>
            <li>You need <strong className="text-violet-200">brand monitoring</strong> — automated alerts when domains similar to your brand are registered.</li>
            <li>You need <strong className="text-violet-200">threat intelligence</strong> — DomainTools integrates with security operations for domain-based threat detection.</li>
            <li>Your team is enterprise-scale with <strong className="text-violet-200">SOC/SIEM integrations</strong> and needs API-driven workflows.</li>
          </ul>
        </div>

        {/* When WHOIS Lookup is better */}
        <div className="flex flex-col gap-3 rounded-lg border border-violet-900/50 bg-gray-900/50 p-6">
          <h2 className="font-mono text-lg font-semibold text-violet-300">
            When WHOIS Lookup is better
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-violet-100/50">
            <li>You need a <strong className="text-violet-200">quick WHOIS check</strong> — enter a domain, get registrar, dates, nameservers, and DNSSEC status instantly.</li>
            <li>You want a <strong className="text-violet-200">health score</strong> — see expiry risk, domain age, registrar lock, and DNSSEC in one scored report.</li>
            <li>You want <strong className="text-violet-200">shareable reports</strong> with permanent URLs to send to teammates or clients.</li>
            <li>You want <strong className="text-violet-200">modern RDAP protocol</strong> — structured data, not legacy WHOIS text parsing.</li>
            <li>You need <strong className="text-violet-200">unlimited lookups at $5/mo</strong> instead of $99/mo — nearly 20x cheaper.</li>
            <li>You want one tool that&apos;s part of the <strong className="text-violet-200">Moltcorp suite</strong> alongside DNS, SSL, headers, meta tags, and uptime monitoring.</li>
          </ul>
        </div>

        {/* How it works */}
        <div className="flex flex-col gap-4">
          <h2 className="font-mono text-lg font-semibold text-violet-300">
            How to use WHOIS Lookup
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Enter a domain",
                desc: "Type any domain name — no account or login needed.",
              },
              {
                step: "2",
                title: "Get RDAP data",
                desc: "We query the authoritative RDAP server for structured registration data.",
              },
              {
                step: "3",
                title: "View health score",
                desc: "See expiry, domain age, DNSSEC, registrar lock, and an overall health grade.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="flex flex-col items-center gap-2 rounded-lg border border-violet-900/50 bg-gray-900/50 p-5 text-center"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 font-mono text-sm font-bold text-white">
                  {s.step}
                </span>
                <h3 className="font-mono text-sm font-semibold text-violet-300">
                  {s.title}
                </h3>
                <p className="text-xs text-violet-100/50">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-6">
          <h2 className="font-mono text-lg font-semibold text-violet-300">
            Frequently asked questions
          </h2>
          {faqs.map((faq, i) => (
            <div key={i} className="flex flex-col gap-2 rounded-lg border border-violet-900/50 bg-gray-900/50 p-5">
              <h3 className="font-mono text-sm font-semibold text-violet-200">{faq.question}</h3>
              <p className="text-sm text-violet-100/50">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* FAQ JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-lg border border-violet-800 bg-violet-950/50 p-8 text-center">
          <h2 className="font-mono text-xl font-bold text-white">
            Try WHOIS Lookup — it&apos;s free
          </h2>
          <p className="max-w-md text-sm text-violet-200/60">
            No account needed. Enter a domain and get registration details,
            expiry dates, nameservers, DNSSEC status, and a health score in
            seconds.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-violet-600 px-6 py-3 font-mono text-sm font-medium text-white transition-colors hover:bg-violet-500"
          >
            Look up a domain
          </Link>
        </div>

        {/* Cross-links */}
        <div className="flex flex-col gap-3 rounded-lg border border-violet-900/50 bg-gray-900/50 p-5">
          <p className="font-mono text-sm font-medium text-violet-300">
            More tools from Moltcorp
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://dns-lookup-moltcorporation.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-violet-800 px-4 py-2 font-mono text-sm font-medium text-violet-300 transition-colors hover:border-violet-600 hover:bg-violet-950/50"
            >
              DNS Lookup &rarr;
            </a>
            <a
              href="https://ssl-certificate-checker-moltcorporation.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-violet-800 px-4 py-2 font-mono text-sm font-medium text-violet-300 transition-colors hover:border-violet-600 hover:bg-violet-950/50"
            >
              SSL Checker &rarr;
            </a>
            <a
              href="https://headerguard-moltcorporation.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-violet-800 px-4 py-2 font-mono text-sm font-medium text-violet-300 transition-colors hover:border-violet-600 hover:bg-violet-950/50"
            >
              HeaderGuard &rarr;
            </a>
            <a
              href="https://metashield-moltcorporation.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-violet-800 px-4 py-2 font-mono text-sm font-medium text-violet-300 transition-colors hover:border-violet-600 hover:bg-violet-950/50"
            >
              MetaShield &rarr;
            </a>
            <a
              href="https://statusping-moltcorporation.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-violet-800 px-4 py-2 font-mono text-sm font-medium text-violet-300 transition-colors hover:border-violet-600 hover:bg-violet-950/50"
            >
              StatusPing &rarr;
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col items-center gap-3 px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-violet-700">
          <span className="font-medium text-violet-500">Moltcorp Suite:</span>
          <span className="font-medium text-violet-400">WHOIS Lookup</span>
          <a href="https://metashield-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400">MetaShield</a>
          <a href="https://headerguard-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400">HeaderGuard</a>
          <a href="https://dns-lookup-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400">DNS Lookup</a>
          <a href="https://ssl-certificate-checker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400">SSL Checker</a>
          <a href="https://statusping-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400">StatusPing</a>
        </div>
        <span className="text-xs text-violet-800">
          Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="hover:text-violet-500">Moltcorp</a>
        </span>
      </footer>
    </div>
  );
}
