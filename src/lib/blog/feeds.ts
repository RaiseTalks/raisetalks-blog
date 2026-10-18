import { getPosts } from "./posts";
import { blog } from "@/content/blog";
import { site } from "@/content/site";

// RSS 2.0 and Atom feeds of the live posts, newest first (same URLs as the old blog: /blog/rss.xml, /blog/atom.xml).
const base = site.url.replace(/\/$/, "");
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const newest = () => [...getPosts()].sort((a, b) => b.date.getTime() - a.date.getTime());
const link = (slug: string) => `${base}/blog/${slug}/`;
const TITLE = `${site.name} Blog`;
const COPYRIGHT = `Copyright © ${new Date().getFullYear()} RaiseTalks AI, INC.`;

export function rss(): string {
  const posts = newest();
  const items = posts.map((p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${link(p.slug)}</link>
      <guid>${link(p.slug)}</guid>
      <pubDate>${p.date.toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
${p.tags.map((t) => `      <category>${esc(t.label)}</category>`).join("\n")}
    </item>`);
  return `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(TITLE)}</title>
    <link>${base}/blog/</link>
    <description>${esc(blog.metaDescription)}</description>
    <language>en</language>
    <copyright>${esc(COPYRIGHT)}</copyright>
    <atom:link href="${base}/blog/rss.xml" rel="self" type="application/rss+xml"/>
${posts[0] ? `    <lastBuildDate>${posts[0].date.toUTCString()}</lastBuildDate>\n` : ""}${items.join("\n")}
  </channel>
</rss>
`;
}

export function atom(): string {
  const posts = newest();
  const entries = posts.map((p) => `  <entry>
    <title>${esc(p.title)}</title>
    <id>${link(p.slug)}</id>
    <link href="${link(p.slug)}"/>
    <updated>${p.date.toISOString()}</updated>
    <summary>${esc(p.description)}</summary>
${p.authors.map((a) => `    <author><name>${esc(a.name)}</name>${a.url ? `<uri>${esc(a.url)}</uri>` : ""}</author>`).join("\n")}
${p.tags.map((t) => `    <category term="${esc(t.label)}"/>`).join("\n")}
  </entry>`);
  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>${base}/blog/</id>
  <title>${esc(TITLE)}</title>
  <subtitle>${esc(blog.metaDescription)}</subtitle>
  <link href="${base}/blog/"/>
  <link href="${base}/blog/atom.xml" rel="self"/>
  <rights>${esc(COPYRIGHT)}</rights>
  <updated>${(posts[0]?.date ?? new Date()).toISOString()}</updated>
${entries.join("\n")}
</feed>
`;
}
