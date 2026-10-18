import Image from "next/image";
import Link from "next/link";
import { Band, GridGap } from "@/components/layout";
import { CtaBand, Headline } from "@/components/sections";
import { Reveal } from "@/components/motion";
import { ArtFill } from "@/components/ui/ArtImage";
import type { Post } from "@/lib/blog/posts";
import type { Parsed } from "@/lib/blog/markdown";
import { blog } from "@/content/blog";
import { art, defaultCta } from "@/content/marketing/shared";
import { site } from "@/content/site";
import { ArticleToc } from "./ArticleToc";
import { BlogFaq } from "./BlogFaq";
import { Markdown } from "./Markdown";
import { PostCard } from "./PostCard";

/**
 * Blog article page:
 * - hero on the bordered 1024 column (legal-page construction): breadcrumb tab, H1 at H2 size (titles are long), author
 * - body on the 1480 column: sticky "On this page" (laptop+) beside a ~680px reading column
 * - FAQ in its own grey band (Startups FAQ), "Read next" as post cards, closing CTA band
 */
export function Article({ post, parsed, related }: { post: Post; parsed: Parsed; related: Post[] }) {
  const t = blog.article;
  const tag = post.tags[0];
  const author = post.authors[0];
  const toc = parsed.faq.length ? [...parsed.toc, { id: "faq", text: t.faqHeading.lead }] : parsed.toc;
  const url = `${site.url}/blog/${post.slug}`;
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
    <div data-audience="investors">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="relative isolate overflow-hidden bg-page">
        <ArtFill art={art.heroAlt} sizes="100vw" priority className="hero-intro hero-intro-bg hero-intro-3 -z-10 object-cover" />
        <div className="mx-2 border-x border-rail-1 tablet:mx-12 laptop:mx-auto laptop:max-w-medium">
          <div className="flex justify-center border-b border-rail-1">
            <div className="hero-intro hero-intro-4 flex items-center gap-2 border-x border-rail-1 px-6 py-3 text-footnote tablet:px-10 tablet:py-4">
              <Link href="/blog" className="text-muted transition-colors hover:text-brand-light-blue">{blog.title}</Link>
              {tag && (
                <>
                  <span className="text-rail-2" aria-hidden>/</span>
                  <Link href={`/blog/tags/${tag.id}`} className="font-medium text-brand-light-blue hover:text-accent-hover">{tag.label}</Link>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-6 px-4 py-14 text-center tablet:px-16 tablet:py-20 laptop:py-24">
            <h1 className="hero-intro hero-intro-0 max-w-[800px] text-h2 text-headline">{post.title}</h1>
            <div className="hero-intro hero-intro-1 flex items-center gap-3 text-left">
              {author?.image && <Image src={author.image} alt="" width={44} height={44} className="size-11 rounded-full border border-border-1 object-cover" />}
              <div className="flex flex-col">
                {author && <Link href={`/blog/authors/${author.id}`} className="text-body font-medium text-subheadline hover:text-brand-light-blue">{author.name}</Link>}
                <span className="text-footnote text-muted">
                  {author?.title && <>{author.title} · </>}
                  {t.readingTime(post.readingMinutes)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GridGap />
      <Band innerClassName="laptop:grid laptop:grid-cols-[200px_minmax(0,680px)] laptop:justify-center laptop:gap-16 desktop:grid-cols-[220px_680px_220px] desktop:gap-20">
        <aside className="hidden laptop:block">{toc.length > 1 && <ArticleToc items={toc} label={t.onThisPage} />}</aside>
        <article className="mx-auto max-w-[680px] px-2 tablet:px-0">
          <Markdown tree={parsed.body} />
        </article>
      </Band>

      {parsed.faq.length > 0 && (
        <>
          <GridGap width="medium" />
          <Band id="faq" tone="alt" width="medium" innerClassName="flex flex-col gap-10 max-tablet:px-7" className="scroll-mt-20">
            <Reveal><Headline align="center" lead={t.faqHeading.lead} /></Reveal>
            <BlogFaq items={parsed.faq.map((f) => ({ q: f.question, a: <Markdown tree={f.answer} /> }))} />
          </Band>
        </>
      )}

      {related.length > 0 && (
        <>
          <GridGap />
          <Band innerClassName="flex flex-col gap-8 laptop:gap-12">
            <Reveal className="flex items-end justify-between gap-6 max-tablet:px-inner">
              <Headline lead={t.readNextHeading.lead} />
              <Link href="/blog" className="hidden shrink-0 text-body font-medium text-brand-light-blue hover:text-accent-hover tablet:block">{t.backToBlog} →</Link>
            </Reveal>
            <div className="grid gap-6 tablet:grid-cols-2 laptop:grid-cols-3 laptop:gap-8">
              {related.slice(0, 3).map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08} className="h-full"><PostCard post={p} headingLevel="h3" /></Reveal>
              ))}
            </div>
          </Band>
        </>
      )}
      <CtaBand c={defaultCta} />
    </div>
  );
}
