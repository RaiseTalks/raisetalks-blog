import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/blog/posts";
import type { Parsed } from "@/lib/blog/markdown";
import { blog } from "@/content/blog";
import { site } from "@/content/site";
import { ArticleEnd, LinkedInSquare, XIcon } from "./ArticleEnd";
import { ArticleShell, type ArticleIndexEntry } from "./ArticleShell";
import { Markdown, type MarkdownProps } from "./Markdown";

/**
 * Blog article page in the pre-redesign blog look (kept on request; the blog home and topic pages use the new
 * design). Plain white page: topic eyebrow, large title, reading time and author, then the article on a 768px
 * column with the FAQ and "Read next" cards in place, tags, "Written by" + share, and previous / next article.
 * The frame (article list, "In this article") is ArticleShell.
 */
export function Article({ post, parsed, posts }: { post: Post; parsed: Parsed; posts: Post[] }) {
  const t = blog.article;
  const tag = post.tags[0];
  const author = post.authors[0];
  const url = `${site.url.replace(/\/$/, "")}/blog/${post.slug}/`;
  const at = posts.findIndex((p) => p.slug === post.slug);
  const prev = at > 0 ? posts[at - 1] : undefined;
  const next = at >= 0 && at < posts.length - 1 ? posts[at + 1] : undefined;
  const bySlug = new Map(posts.map((p) => [p.slug, p]));

  const index: ArticleIndexEntry[] = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    topic: p.tags[0]?.label ?? "More",
    text: [p.title, p.metaTitle, p.description, ...p.keywords, ...p.tags.map((x) => x.label)].join(" ").toLowerCase(),
  }));

  /** "Read next" card: the linked post's own title and OG image. */
  function ReadNextItem({ href, title, slug }: MarkdownProps) {
    const target = bySlug.get(String(slug ?? ""));
    return (
      <Link href={String(href)} className="flex flex-col gap-3 rounded-[12px] border border-article-border bg-page px-2.5 pb-4 pt-2.5 transition-colors duration-200 hover:border-brand-light-blue">
        {target?.image && (
          <span className="relative block aspect-[1200/630] overflow-hidden rounded-[8px]">
            <Image src={target.image} alt="" fill sizes="(min-width: 768px) 377px, 100vw" className="object-cover" />
          </span>
        )}
        <span className="px-1.5 text-[15px] font-medium leading-[1.35] text-article-ink">{target?.title ?? String(title ?? "")}</span>
      </Link>
    );
  }

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      image: post.image ? `${site.url}${post.image}` : undefined,
      datePublished: post.date.toISOString(),
      author: post.authors.map((a) => ({ "@type": "Person", name: a.name, url: a.url })),
      publisher: { "@type": "Organization", name: site.name, url: site.url },
      mainEntityOfPage: url,
      keywords: post.keywords.join(", "),
    },
    parsed.faq.length && {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: parsed.faq.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.text } })),
    },
  ].filter(Boolean);

  return (
    <div data-audience="investors" className="bg-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ArticleShell articles={index} current={post.slug} toc={parsed.toc}>
        <article>
          <header className="border-b border-article-rule px-3 pb-8 pt-6 text-center tablet:px-4 tablet:pt-8">
            {tag && (
              <Link href={`/blog/tags/${tag.id}`} className="mb-3.5 inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-brand-light-blue hover:text-accent-hover">
                {tag.label}
              </Link>
            )}
            <h1 className="mx-auto mb-6 max-w-[1024px] text-[32px] leading-[1.1] tracking-[-0.8px] text-headline tablet:text-[48px] laptop:text-[60px] laptop:leading-[1.2] laptop:tracking-[-1.5px] laptop:[[data-articles-open=true]_&]:text-[50px]">
              {post.title}
            </h1>
            <p className="my-4 text-footnote text-article-muted">{t.readingTime(post.readingMinutes)}</p>
            {author && (
              <div className="flex flex-col items-center gap-1">
                {author.image && <Image src={author.image} alt="" width={48} height={48} className="mb-1 size-12 rounded-full object-cover" />}
                <span className="text-[16px] font-light text-article-author">{author.name}</span>
                {author.title && <span className="text-[13px] text-headline">{author.title}</span>}
                <span className="mt-1 flex items-center gap-3">
                  {author.socials.x && (
                    <a href={`https://x.com/${author.socials.x}`} target="_blank" rel="noopener noreferrer" aria-label={`${author.name} on X`} className="text-headline hover:opacity-70"><XIcon size={20} /></a>
                  )}
                  {author.socials.linkedin && (
                    <a href={`https://www.linkedin.com/in/${author.socials.linkedin}`} target="_blank" rel="noopener noreferrer" aria-label={`${author.name} on LinkedIn`} className="text-brand-light-blue hover:opacity-70"><LinkedInSquare size={18} /></a>
                  )}
                </span>
              </div>
            )}
          </header>

          <div className="px-3 pt-6 tablet:px-12">
            <Markdown tree={parsed.body} overrides={{ "blog-read-next-item": ReadNextItem }} />
          </div>

          {post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-2 px-3 tablet:px-4">
              <span className="mr-1 text-[16px] font-semibold text-headline">Tags:</span>
              {post.tags.map((x) => (
                <Link key={x.id} href={`/blog/tags/${x.id}`} className="rounded-full border border-article-chip-border bg-article-cell px-3 py-1 text-[13px] font-medium text-brand-light-blue transition-colors duration-200 hover:border-brand-light-blue">
                  {x.label}
                </Link>
              ))}
            </div>
          )}

          <ArticleEnd author={author} url={url} title={post.title} />

          {(prev || next) && (
            <nav aria-label="Blog post page navigation" className="mt-8 grid gap-4 border-t border-article-cell py-4 tablet:grid-cols-2 tablet:px-4">
              {prev ? (
                <Link href={`/blog/${prev.slug}`} className="group flex flex-col gap-0.5 rounded-sm p-3 hover:bg-article-table-head">
                  <span className="text-[14px] font-medium text-article-pager">Previous article</span>
                  <span className="text-[16px] font-bold leading-[1.25] text-article-pager-title group-hover:text-brand-light-blue">« {prev.title}</span>
                </Link>
              ) : <span />}
              {next && (
                <Link href={`/blog/${next.slug}`} className="group flex flex-col gap-0.5 rounded-sm p-3 text-right hover:bg-article-table-head">
                  <span className="text-[14px] font-medium text-article-pager">Next article</span>
                  <span className="text-[16px] font-bold leading-[1.25] text-article-pager-title group-hover:text-brand-light-blue">{next.title} »</span>
                </Link>
              )}
            </nav>
          )}
        </article>
      </ArticleShell>
    </div>
  );
}
