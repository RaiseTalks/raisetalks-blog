import type { Metadata } from "next";
import Link from "next/link";
import { BlogListFrame, BlogListHeader } from "@/components/blog/BlogIndex";
import { getPosts, usedTags } from "@/lib/blog/posts";
import { blog } from "@/content/blog";

export const metadata: Metadata = { title: blog.topicsPage.title, description: blog.topicsPage.text, alternates: { canonical: "/blog/tags/" } };

/** Every blog topic with its description and article count (old /blog/tags), in the pre-redesign blog look. */
export default function TopicsPage() {
  const posts = getPosts();
  const topics = usedTags()
    .map((t) => ({ ...t, count: posts.filter((p) => p.tags.some((x) => x.id === t.id)).length }))
    .sort((a, b) => b.count - a.count);
  return (
    <BlogListFrame>
      <BlogListHeader heading={blog.topicsPage.heading} text={blog.topicsPage.text} chips={[{ label: blog.allLabel, href: "/blog", strong: true }]} />
      <ul className="grid gap-4 tablet:grid-cols-2">
        {topics.map((t) => (
          <li key={t.id}>
            <Link href={`/blog/tags/${t.id}`} className="flex h-full flex-col gap-1.5 rounded-[12px] border border-article-border bg-page px-5 py-4 transition-colors duration-200 hover:border-brand-light-blue">
              <span className="flex items-baseline justify-between gap-3">
                <span className="text-[18px] font-medium leading-[1.3] text-article-ink">{t.label}</span>
                <span className="whitespace-nowrap text-footnote text-article-muted">{blog.topicsPage.count(t.count)}</span>
              </span>
              {t.description && <span className="text-[15px] leading-[1.55] text-article-excerpt">{t.description}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </BlogListFrame>
  );
}
