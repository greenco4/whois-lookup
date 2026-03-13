import type { Metadata } from "next";

const baseUrl = "https://whois-lookup-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "Pricing — Free WHOIS Lookup & Pro Plans | WHOIS Lookup",
  description: "WHOIS Lookup is free for up to 5 lookups per day. Pro is $5/month for unlimited lookups. No credit card required.",
  alternates: { canonical: `${baseUrl}/pricing` },
  openGraph: {
    title: "Pricing — Free & Pro Plans | WHOIS Lookup",
    description: "Free: 5 lookups/day. Pro ($5/mo): unlimited WHOIS lookups. No credit card required.",
    type: "website",
    siteName: "WHOIS Lookup",
    url: `${baseUrl}/pricing`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Free & Pro Plans | WHOIS Lookup",
    description: "Free: 5 lookups/day. Pro ($5/mo): unlimited WHOIS lookups.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "WHOIS Lookup Pricing",
  description: "Free WHOIS lookups for up to 5 per day. Pro plan at $5/month for unlimited lookups.",
  url: `${baseUrl}/pricing`,
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "WHOIS Lookup",
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    offers: [
      { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD", description: "5 lookups/day, full WHOIS data, RDAP protocol" },
      { "@type": "Offer", name: "Pro", price: "5", priceCurrency: "USD", billingIncrement: "MON", description: "Unlimited lookups, priority support" },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
