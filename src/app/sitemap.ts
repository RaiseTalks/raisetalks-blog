import type { MetadataRoute } from "next";
import { pages } from "@/content/marketing/pages";
import { site } from "@/content/site";
import { getPosts, usedAuthors, usedTags } from "@/lib/blog/posts";

// Every public page from pages.ts (sign-in excluded), the blog, its articles, topics and authors.
// Trailing slashes match the exported URLs (next.config trailingSlash).
// lastmod only where the date is real (articles: publish date). Static pages carry none: the site is
// rebuilt every weekday, so `new Date()` stamped all of them "modified today" every day, which teaches
// Google to ignore this sitemap's lastmod altogether.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const url = (path: string) => `${base}${path.endsWith("/") ? path : `${path}/`}`;
  const priority: Record<string, number> = { "/": 1, "/startups": 0.9, "/investors": 0.9, "/pricing": 0.8 };
  const legal = (path: string) => path.includes("policy") || path.includes("terms");
  const posts = getPosts();
  return [
    ...Object.values(pages).map((p) => ({
      url: url(p.path),
      changeFrequency: legal(p.path) ? ("yearly" as const) : ("monthly" as const),
      priority: priority[p.path] ?? (legal(p.path) ? 0.3 : 0.7),
    })),
    { url: url("/blog"), lastModified: posts.at(-1)?.date, changeFrequency: "weekly" as const, priority: 0.8 },
    ...posts.map((p) => ({ url: url(`/blog/${p.slug}`), lastModified: p.date, changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: url("/blog/tags"), changeFrequency: "weekly" as const, priority: 0.4 },
    ...usedTags().map((t) => ({ url: url(`/blog/tags/${t.id}`), changeFrequency: "weekly" as const, priority: 0.5 })),
    ...usedAuthors().map((a) => ({ url: url(`/blog/authors/${a.id}`), changeFrequency: "weekly" as const, priority: 0.4 })),
  ];
}
