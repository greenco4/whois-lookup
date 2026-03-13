import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Whois.com Alternative — Free WHOIS Lookup with Health Scoring",
  description:
    "Looking for a whois.com alternative? WHOIS Lookup is a free domain registration checker with health scoring via modern RDAP protocol. No upsells, no domain marketplace ads. Pro at $5/mo.",
  alternates: {
    canonical: "https://whois-lookup-moltcorporation.vercel.app/compare/whois-com",
  },
  openGraph: {
    title: "Whois.com Alternative — WHOIS Lookup",
    description:
      "Free alternative to whois.com. Clean WHOIS data with domain health scoring. No upsells or domain marketplace ads.",
    type: "website",
    siteName: "WHOIS Lookup",
  },
  twitter: {
    card: "summary_large_image",
    title: "Whois.com Alternative — WHOIS Lookup",
    description:
      "Free WHOIS lookup with health scoring. Cleaner than whois.com — no ads, no upsells.",
  },
};

const comparisonRows = [
  {
    feature: "Price",
    ours: "Free (Pro $5/mo)",
    theirs: "Free (with ads)",
  },
  {
    feature: "Health scoring",
    ours: "Yes — 5 categories, letter grade",
    theirs: "No",
  },
  {
    feature: "Protocol",
    ours: "RDAP (modern, structured)",
    theirs: "Legacy WHOIS text",
  },
  {
    feature: "Domain marketplace ads",
    ours: "None",
    theirs: "Yes — prominent upsells",
  },
  {
    feature: "Domain registration",
    ours: "No — lookup only",
    theirs: "Yes — integrated registrar",
  },
  {
    feature: "Shareable reports",
    ours: "Yes — permanent URL",
    theirs: "No",
  },
  {
    feature: "Signup required",
    ours: "No",
    theirs: "No (but pushes account creation)",
  },
  {
    feature: "Expiry monitoring",
    ours: "Pro",
    theirs: "No",
  },
  {
    feature: "DNSSEC status",
    ours: "Yes — included in health score",
    theirs: "Raw data only",
  },
];

const faqs = [
  {
    question: "What is whois.com?",
    answer:
      "Whois.com is a popular domain WHOIS lookup service operated by DomainTools. It provides free WHOIS lookups but prominently features domain registration, marketplace listings, and upsells to premium DomainTools products. It has been a well-known destination for WHOIS data since the early days of the web.",
  },
  {
    question: "Is WHOIS Lookup a good alternative to whois.com?",
    answer:
      "For clean, focused WHOIS lookups without ads or upsells, yes. WHOIS Lookup uses the modern RDAP protocol and adds a health score covering expiry risk, domain age, DNSSEC, registrar lock, and data completeness. If you need domain registration or marketplace features, whois.com is more appropriate since it integrates those services directly.",
  },
  {
    question: "Why use RDAP instead of legacy WHOIS?",
    answer:
      "RDAP (Registration Data Access Protocol) is the IANA-maintained successor to the legacy WHOIS protocol. It returns structured JSON instead of free-form text, supports standardized access controls, and provides more reliable results across registrars. WHOIS Lookup uses RDAP for consistent, machine-readable data.",
  },
  {
    question: "Does whois.com offer health scoring?",
    answer:
      "No. Whois.com shows raw WHOIS registration data but does not score or analyze the health of a domain. WHOIS Lookup provides a health score across five categories — expiry proximity, domain age, registrar lock, DNSSEC, and data completeness — with a letter grade and score out of 100.",
  },
  {
    question: "Is WHOIS Lookup really free?",
    answer:
      "Yes. Basic lookups with health scoring are completely free and require no account. The Pro tier at $5/mo adds unlimited lookups, bulk checking, and expiry alerts for users who need higher volume.",
  },
];

export default function WhoisComComparison() {
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
            Whois.com Alternative
          </h1>
          <p className="text-lg text-violet-200/60">
            WHOIS Lookup is a clean, modern alternative to whois.com. Get
            domain registration data with health scoring via the RDAP
            protocol — no domain marketplace ads, no upsells, no clutter.
            Just the data you came for.
          </p>
        </div>

        {/* Comparison callout */}
        <div className="flex flex-col gap-2 rounded-lg border border-violet-800 bg-violet-950/50 p-6">
          <h2 className="font-mono text-lg font-semibold text-violet-300">
            Why try WHOIS Lookup instead?
          </h2>
          <p className="text-sm text-violet-100/50">
            Whois.com works, but every lookup comes with domain marketplace
            listings, registration upsells, and ads for premium DomainTools
            products. WHOIS Lookup strips all of that away and adds something
            whois.com doesn&apos;t have:{" "}
            <span className="font-mono font-bold text-violet-300">
              domain health scoring
            </span>
            . See expiry risk, domain age, DNSSEC, and registrar lock status
            in one scored report. Free for basic lookups, or{" "}
            <span className="font-mono font-bold text-violet-300">$5/mo</span>{" "}
            for Pro with unlimited lookups and bulk checking.
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
                    whois.com
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

        {/* When whois.com is better */}
        <div className="flex flex-col gap-3 rounded-lg border border-violet-900/50 bg-gray-900/50 p-6">
          <h2 className="font-mono text-lg font-semibold text-violet-300">
            When whois.com is better
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-violet-100/50">
            <li>You want an <strong className="text-violet-200">established brand</strong> — whois.com has been around for decades and is one of the most recognized WHOIS lookup sites on the web.</li>
            <li>You need <strong className="text-violet-200">domain registration</strong> — whois.com doubles as a registrar, so you can look up a domain and register it in the same flow.</li>
            <li>You want access to a <strong className="text-violet-200">domain marketplace</strong> — whois.com lists domains for sale and integrates aftermarket domain purchasing.</li>
            <li>You need <strong className="text-violet-200">premium DomainTools features</strong> — whois.com is a gateway to DomainTools&apos; enterprise products like historical WHOIS and reverse lookups.</li>
          </ul>
        </div>

        {/* When WHOIS Lookup is better */}
        <div className="flex flex-col gap-3 rounded-lg border border-violet-900/50 bg-gray-900/50 p-6">
          <h2 className="font-mono text-lg font-semibold text-violet-300">
            When WHOIS Lookup is better
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-violet-100/50">
            <li>You want a <strong className="text-violet-200">cleaner interface</strong> — no marketplace listings, registration prompts, or ads cluttering the results page.</li>
            <li>You want <strong className="text-violet-200">no upsells</strong> — WHOIS Lookup shows your data without pushing premium products or domain purchases.</li>
            <li>You want a <strong className="text-violet-200">health score</strong> — see expiry risk, domain age, registrar lock, DNSSEC, and data completeness in one scored report with a letter grade.</li>
            <li>You want <strong className="text-violet-200">shareable reports</strong> — every lookup gets a permanent URL you can send to teammates or clients.</li>
            <li>You want <strong className="text-violet-200">modern RDAP protocol</strong> — structured data from IANA&apos;s official successor to legacy WHOIS.</li>
            <li>You want one tool that&apos;s part of the <strong className="text-violet-200">Moltcorp suite</strong> alongside DNS, SSL, headers, meta tags, and uptime monitoring.</li>
            <li>You need <strong className="text-violet-200">Pro for $5/mo</strong> — unlimited lookups, bulk checking, and expiry alerts at a straightforward price.</li>
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
