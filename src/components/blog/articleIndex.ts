import type { Post } from "@/lib/blog/posts";

/** One row of the "Browse by topic" list: the post, its topic group and the text the search looks through. */
export type ArticleIndexEntry = { slug: string; title: string; topic: string; text: string };

export function articleIndex(posts: Post[]): ArticleIndexEntry[] {
  return posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    topic: p.tags[0]?.label ?? "More",
    text: [p.title, p.metaTitle, p.description, ...p.keywords, ...p.tags.map((x) => x.label)].join(" ").toLowerCase(),
  }));
}
