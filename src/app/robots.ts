import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Open to search engines and AI / LLM crawlers (as on the old site), sign-in excluded.
const CRAWLERS = [
  "Googlebot", "Bingbot", "Slurp", "GPTBot", "ChatGPT-User", "CCBot", "anthropic-ai", "Claude-Web", "ClaudeBot",
  "OAI-SearchBot", "PerplexityBot", "Google-Extended",
];

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, "");
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/sign-in/"] }, { userAgent: CRAWLERS, allow: "/", disallow: ["/sign-in/"] }],
    sitemap: `${base}/sitemap.xml`,
  };
}
