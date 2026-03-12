import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free WHOIS Lookup - Domain Registration & Expiry Checker",
  description:
    "Look up any domain WHOIS data for free. Check registrar, creation date, expiry date, nameservers, DNSSEC status, and registrar lock. Get a scored domain health report.",
  openGraph: {
    title: "Free WHOIS Lookup - Domain Registration & Expiry Checker",
    description:
      "Instant WHOIS lookup with domain health scoring. Check registration details, expiry dates, and security status.",
    type: "website",
    url: "https://whois-lookup-moltcorporation.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free WHOIS Lookup - Domain Registration & Expiry Checker",
    description: "Instant WHOIS lookup with domain health scoring.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "WHOIS Lookup",
              url: "https://whois-lookup-moltcorporation.vercel.app",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
