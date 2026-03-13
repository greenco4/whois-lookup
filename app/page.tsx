"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function DomainIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="w-12 h-12"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      <circle cx="24" cy="24" r="20" stroke="url(#grad)" strokeWidth="2.5" />
      <ellipse cx="24" cy="24" rx="10" ry="20" stroke="url(#grad)" strokeWidth="2" />
      <line x1="4" y1="24" x2="44" y2="24" stroke="url(#grad)" strokeWidth="1.5" />
      <line x1="8" y1="14" x2="40" y2="14" stroke="url(#grad)" strokeWidth="1" opacity="0.6" />
      <line x1="8" y1="34" x2="40" y2="34" stroke="url(#grad)" strokeWidth="1" opacity="0.6" />
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#7c3aed" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Home() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRateLimited, setIsRateLimited] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!domain.trim()) return;

    setLoading(true);
    setError("");
    setIsRateLimited(false);

    try {
      const res = await fetch("/api/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: domain.trim() }),
      });

      const data = await res.json();

      if (res.status === 429) {
        setIsRateLimited(true);
        return;
      }

      if (!res.ok) {
        setError(data.error || "Lookup failed");
        return;
      }

      router.push(`/report/${data.id}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
        <a href="/" className="text-sm font-semibold hover:text-violet-500 transition-colors">WHOIS Lookup</a>
        <nav className="flex items-center gap-4">
          <a href="/pricing" className="text-sm text-[var(--text-muted)] hover:text-violet-500 transition-colors">Pricing</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <DomainIcon />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Free WHOIS Lookup
          </h1>
          <p className="text-lg text-[var(--text-muted)] mb-8 max-w-lg mx-auto">
            Check domain registration details, expiry dates, nameservers, and
            security status. Get a scored health report instantly.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-3">
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent placeholder:text-[var(--text-muted)]"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !domain.trim()}
                className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Looking up…
                  </span>
                ) : (
                  "Look Up"
                )}
              </button>
            </div>
            {error && (
              <p className="mt-3 text-sm text-red-500 dark:text-red-400">{error}</p>
            )}
          </form>

          {isRateLimited && (
            <div className="mt-6 max-w-md mx-auto rounded-2xl border border-violet-300 dark:border-violet-700 bg-violet-50 dark:bg-violet-950/40 p-6 shadow-lg text-center">
              <p className="font-semibold text-lg mb-1">
                You&apos;ve used all your free lookups for today.
              </p>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                Upgrade to Pro for unlimited lookups.
              </p>
              <Link
                href="/pricing"
                className="inline-block rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-violet-700"
              >
                View Pricing
              </Link>
            </div>
          )}

          <p className="mt-4 text-xs text-[var(--text-muted)]">
            10 free lookups per day. No signup required.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-16 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mx-auto mb-4 text-violet-600 dark:text-violet-400 font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Enter a Domain</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Type any domain name — we handle the rest. No protocol or path needed.
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mx-auto mb-4 text-violet-600 dark:text-violet-400 font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Query RDAP</h3>
              <p className="text-sm text-[var(--text-muted)]">
                We query the authoritative RDAP server for your domain&apos;s TLD to fetch
                registration data.
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mx-auto mb-4 text-violet-600 dark:text-violet-400 font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Get Your Report</h3>
              <p className="text-sm text-[var(--text-muted)]">
                See registrar, dates, nameservers, DNSSEC status, and a health score — all
                in a shareable report.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-16 border-t border-[var(--border)]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">FAQ</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-1">What is WHOIS?</h3>
              <p className="text-sm text-[var(--text-muted)]">
                WHOIS is a protocol for querying domain registration information.
                It tells you who registered a domain, when it was created, when it
                expires, and which nameservers it uses.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">What is RDAP?</h3>
              <p className="text-sm text-[var(--text-muted)]">
                RDAP (Registration Data Access Protocol) is the modern replacement
                for WHOIS. It returns structured JSON data and supports
                standardized access controls.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Why is registrant data redacted?</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Since GDPR and ICANN&apos;s Temporary Specification, most registrars
                redact personal registrant data. This is normal and expected for
                privacy compliance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">What does the health score measure?</h3>
              <p className="text-sm text-[var(--text-muted)]">
                We score five categories: expiry proximity (is the domain about to
                expire?), domain age (how established is it?), registrar lock
                (transfer protection), DNSSEC (DNS security), and data
                completeness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto text-center text-sm text-[var(--text-muted)]">
          <p className="mb-3">Part of the Moltcorp Suite</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://metashield-moltcorporation.vercel.app"
              className="hover:text-violet-500 transition-colors"
            >
              MetaShield
            </a>
            <a
              href="https://headerguard-moltcorporation.vercel.app"
              className="hover:text-violet-500 transition-colors"
            >
              HeaderGuard
            </a>
            <a
              href="https://dns-lookup-moltcorporation.vercel.app"
              className="hover:text-violet-500 transition-colors"
            >
              DNS Lookup
            </a>
            <a
              href="https://ssl-certificate-checker-moltcorporation.vercel.app"
              className="hover:text-violet-500 transition-colors"
            >
              SSL Checker
            </a>
            <a
              href="https://statusping-moltcorporation.vercel.app"
              className="hover:text-violet-500 transition-colors"
            >
              StatusPing
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
