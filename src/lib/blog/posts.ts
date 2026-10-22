import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Blog posts = Markdown files in /blog (same files and front matter as the old Docusaurus blog).
 * Scheduling: a post's `date` is its publish day. Production builds only include posts whose date has
 * arrived; `next dev` shows every post. SHOW_SCHEDULED_POSTS=true includes upcoming posts in a build,
 * BLOG_BUILD_DATE=YYYY-MM-DD builds the blog as it will look on that day.
 */
const BLOG_DIR = path.join(process.cwd(), "blog");
const SHOW_ALL = process.env.NODE_ENV === "development" || process.env.SHOW_SCHEDULED_POSTS === "true";
const BUILD_DATE = process.env.BLOG_BUILD_DATE ? new Date(process.env.BLOG_BUILD_DATE) : new Date();
const WORDS_PER_MINUTE = 200;

export type Author = { id: string; name: string; title?: string; url?: string; image?: string; socials: { x?: string; linkedin?: string } };
export type Tag = { id: string; label: string; description?: string };

export type Post = {
  slug: string;
  title: string;
  /** Shorter title for the browser tab / search result, when the H1 is long. */
  metaTitle: string;
  description: string;
  date: Date;
  tags: Tag[];
  keywords: string[];
  image?: string;
  authors: Author[];
  readingMinutes: number;
  /** Markdown body, front matter removed. */
  body: string;
};

function readYaml<T>(file: string): T {
  return matter(`---\n${fs.readFileSync(path.join(BLOG_DIR, file), "utf8")}\n---`).data as T;
}

let tagsCache: Map<string, Tag> | null = null;
export function allTags(): Map<string, Tag> {
  if (!tagsCache) {
    const raw = readYaml<Record<string, { label: string; description?: string }>>("tags.yml");
    tagsCache = new Map(Object.entries(raw).map(([id, t]) => [id, { id, label: t.label, description: t.description }]));
  }
  return tagsCache;
}

function authors(): Map<string, Author> {
  const raw = readYaml<Record<string, { name: string; title?: string; url?: string; image_url?: string; socials?: { x?: string; linkedin?: string } }>>("authors.yml");
  return new Map(Object.entries(raw).map(([id, a]) => [id, { id, name: a.name, title: a.title, url: a.url, image: a.image_url, socials: a.socials ?? {} }]));
}

function load(): Post[] {
  const tags = allTags();
  const people = authors();
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f) && !f.startsWith("_"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf8"));
      const words = content.split(/\s+/).filter(Boolean).length;
      return {
        slug: data.slug as string,
        title: data.title as string,
        metaTitle: (data.title_meta as string) ?? (data.title as string),
        description: data.description as string,
        date: new Date(data.date),
        tags: ((data.tags as string[]) ?? []).map((id) => tags.get(id) ?? { id, label: id }),
        keywords: (data.keywords as string[]) ?? [],
        image: data.image as string | undefined,
        authors: ((data.authors as string[]) ?? []).flatMap((id) => people.get(id) ?? []),
        readingMinutes: Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)),
        body: content,
      };
    })
    // Oldest first, as on the old blog (posts sharing a launch day are a minute apart to keep their order).
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}

let cache: Post[] | null = null;
function every(): Post[] {
  return (cache ??= load());
}

const isLive = (p: Post) => SHOW_ALL || p.date.getTime() <= BUILD_DATE.getTime();

/** Posts visible in this build. */
export function getPosts(): Post[] {
  return every().filter(isLive);
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

/** Slugs of posts that exist but are not live yet: links to them are hidden until their day. */
export function unpublishedSlugs(): Set<string> {
  return new Set(every().filter((p) => !isLive(p)).map((p) => p.slug));
}

/** Tags used by at least one live post. */
export function usedTags(): Tag[] {
  const ids = new Set(getPosts().flatMap((p) => p.tags.map((t) => t.id)));
  return [...allTags().values()].filter((t) => ids.has(t.id));
}

/** Authors of at least one live post. */
export function usedAuthors(): Author[] {
  const seen = new Map<string, Author>();
  for (const p of getPosts()) for (const a of p.authors) seen.set(a.id, a);
  return [...seen.values()];
}

/**
 * Page numbers (2…n) the old Docusaurus blog served for a list of `count` posts at 10 per page, so their
 * URLs can forward to the single-page lists. `atLeast`: the last page number that existed at launch.
 */
export function oldPageNumbers(count: number, atLeast = 4): number[] {
  const last = Math.max(Math.ceil(count / 10), atLeast);
  return Array.from({ length: Math.max(0, last - 1) }, (_, i) => i + 2);
}
