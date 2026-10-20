import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Open to search engines and AI / LLM crawlers (as on the old site). /sign-in/ is NOT disallowed:
// it carries a noindex meta, and a disallow hides that tag from Google, which then indexes the URL
// from links anyway (Search Console: "Indexed, though blocked by robots.txt").
const CRAWLERS = [
  "Googlebot", "Bingbot", "Slurp", "GPTBot", "ChatGPT-User", "CCBot", "anthropic-ai", "Claude-Web", "ClaudeBot",
  "OAI-SearchBot", "PerplexityBot", "Google-Extended",
];

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, "");
  return {
    rules: [{ userAgent: "*", allow: "/" }, { userAgent: CRAWLERS, allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
  };
}
