import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://whois-lookup-moltcorporation.vercel.app/sitemap.xml",
  };
}
