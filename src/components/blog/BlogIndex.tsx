import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { getPosts, type Post } from "@/lib/blog/posts";
import { blog } from "@/content/blog";
import type { Heading } from "@/content/marketing/shared";
import { cn } from "@/lib/utils";
import { articleIndex } from "./articleIndex";
import { ArticleList } from "./ArticleList";

/**
 * Blog home, topic and author pages in the pre-redesign blog look (kept on request, like the article pages).
 * Plain white page: the original centred blog hero (topic chips on topic and author pages), then the posts as horizontal cards (OG image, title,
 * reading time, description, three tags); on the blog home the first post is a wide lead card. Laptop and up, the
 * "Browse by topic" article list sits in a right column behind a thin line. Below laptop: the posts only.
 */
export function BlogListFrame({ children }: { children: ReactNode }) {
  return (
    <div data-audience="investors" className="bg-page">
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-16 pt-12 laptop:px-[72px] laptop:pb-24 laptop:pt-24">
        <div className="laptop:grid laptop:grid-cols-[minmax(0,1fr)_minmax(0,14fr)_minmax(0,1fr)_minmax(0,6fr)]">
          <div className="hidden laptop:block" aria-hidden />
          <div className="min-w-0">{children}</div>
          <div className="hidden laptop:block" aria-hidden />
          <aside className="hidden border-l border-article-rule pl-8 laptop:block">
            <ArticleList articles={articleIndex(getPosts())} />
          </aside>
        </div>
      </div>
    </div>
  );
}

type Chip = { label: string; href: string; on?: boolean; strong?: boolean };

/** List page header, as the original blog hero: centred brand-gradient title and description, then any chips. */
export function BlogListHeader({ heading, text, chips = [] }: { heading: Heading; text?: string; chips?: Chip[] }) {
  return (
    <header className="mb-6 border-b border-article-rule pb-8 text-center tablet:pb-10">
      <h1 className="mx-auto mb-5 max-w-[64rem] text-[40px] font-bold leading-[1.1] tracking-[-0.025em] tablet:text-[52px] laptop:text-[60px]">
        <span className="text-gradient-brand">{heading.accent ? `${heading.lead} ${heading.accent}` : heading.lead}</span>
      </h1>
      {text && <p className="mx-auto max-w-[48rem] text-[18px] leading-[1.6] text-article-muted tablet:text-[20px]">{text}</p>}
      {chips.length > 0 && (
        <nav aria-label={blog.topicsLabel} className="mt-6 flex flex-wrap justify-center gap-2">
          {chips.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              aria-current={c.on ? "page" : undefined}
              className={cn(
                "rounded-full border px-3.5 py-[0.3125rem] text-body leading-[1.5] transition-colors duration-200 hover:border-brand-light-blue hover:bg-article-chip-hover hover:text-brand-light-blue",
                c.strong || c.on ? "border-article-chip-active bg-article-takeaways text-brand-light-blue" : "border-article-search-border bg-page text-article-list",
              )}
            >
              {c.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition-transform duration-200 group-hover/more:translate-x-[3px]">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/** List card: the post's 1200×630 cover, uncropped, on the left (on top on phones); `lead` = the blog home's first post, cover on top and larger. */
function ListCard({ post, lead = false }: { post: Post; lead?: boolean }) {
  const href = `/blog/${post.slug}`;
  return (
    <article
      className={cn(
        "group grid items-start gap-4 border-b border-article-rule py-5 last:border-b-0 tablet:gap-6 tablet:py-7",
        lead ? "pt-0 tablet:gap-5 tablet:pt-0" : "tablet:grid-cols-[220px_minmax(0,1fr)] first:pt-0",
      )}
    >
      {post.image && (
        <Link href={href} tabIndex={-1} aria-hidden className="relative block aspect-[1200/630] overflow-hidden rounded-[12px] bg-article-cell">
          <Image src={post.image} alt="" fill sizes={lead ? "(min-width: 1280px) 760px, 100vw" : "(min-width: 768px) 220px, 100vw"} className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.04]" />
        </Link>
      )}
      <div className="min-w-0">
        <h2 className={cn("text-headline", lead ? "text-h3" : "text-[20px] font-medium leading-[1.3] tablet:text-[19px] laptop:text-[20px]")}>
          <Link href={href} className="transition-colors duration-200 hover:text-brand-light-blue">{post.title}</Link>
        </h2>
        <p className="mt-1.5 text-footnote text-article-muted">{blog.article.readingTime(post.readingMinutes)}</p>
        <p className={cn("mt-2.5 leading-[1.55] text-article-excerpt", lead ? "text-[16px] tablet:text-[17px] laptop:text-[18px]" : "text-[16px]")}>{post.description}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          {post.tags.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((t) => (
                <li key={t.id}>
                  <Link href={`/blog/tags/${t.id}`} className="inline-block rounded-full border border-article-search-border bg-article-table-head px-2.5 py-0.5 text-footnote leading-[1.6] text-article-excerpt transition-colors duration-200 hover:border-brand-light-blue hover:text-brand-light-blue">
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link href={href} aria-label={blog.list.readMoreLabel(post.title)} className="group/more inline-flex items-center gap-1.5 whitespace-nowrap text-body font-medium text-brand-light-blue">
            {blog.list.readMore}
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function BlogIndex({ posts, heading, text, chips, lead = false }: { posts: Post[]; heading: Heading; text?: string; chips?: Chip[]; lead?: boolean }) {
  return (
    <BlogListFrame>
      <BlogListHeader heading={heading} text={text} chips={chips} />
      <div>
        {posts.map((p, i) => <ListCard key={p.slug} post={p} lead={lead && i === 0} />)}
      </div>
    </BlogListFrame>
  );
}

/** Topic chips for the blog home and topic pages: the six entry topics, then "All topics". */
export function topicChips(activeTopic?: string): Chip[] {
  return [
    ...blog.topics.map((t) => ({ label: t.label, href: `/blog/tags/${t.id}`, on: t.id === activeTopic })),
    { label: blog.allTopicsLabel, href: "/blog/tags", strong: true },
  ];
}
