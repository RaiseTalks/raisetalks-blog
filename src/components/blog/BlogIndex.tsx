import Link from "next/link";
import { Band, GridGap } from "@/components/layout";
import { CtaBand, PageHero } from "@/components/sections";
import { Reveal } from "@/components/motion";
import type { Post } from "@/lib/blog/posts";
import { blog } from "@/content/blog";
import { art, defaultCta, type Heading } from "@/content/marketing/shared";
import { cn } from "@/lib/utils";
import { PostCard } from "./PostCard";

/**
 * Blog home and topic pages: page hero with the topic chips, the first post as a wide featured card,
 * then the rest in a 3 / 2 / 1 column grid, closing CTA band.
 */
export function BlogIndex({ posts, heading, text, activeTopic }: { posts: Post[]; heading: Heading; text: string; activeTopic?: string }) {
  const [first, ...rest] = posts;
  return (
    <div data-audience="investors">
      <PageHero eyebrow={blog.eyebrow} heading={heading} text={text} textWidth="max-w-[520px]" image={art.heroAlt} columnClassName="laptop:pb-16">
        <nav aria-label={blog.topicsLabel} className="flex flex-wrap justify-center gap-2">
          {[{ label: blog.allLabel, href: "/blog", id: undefined }, ...blog.topics.map((t) => ({ label: t.label, href: `/blog/tags/${t.id}`, id: t.id })), { label: blog.allTopicsLabel, href: "/blog/tags", id: "__all" }].map((t) => {
            const on = t.id === activeTopic;
            return (
              <Link
                key={t.href}
                href={t.href}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-footnote transition-colors duration-[var(--duration-hover)]",
                  on ? "border-brand-light-blue bg-brand-light-blue text-on-brand" : "border-border-1 bg-page text-headline hover:border-brand-light-blue hover:text-brand-light-blue",
                )}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>
      </PageHero>
      <GridGap />
      <Band innerClassName="flex flex-col gap-6 laptop:gap-8">
        {first && <Reveal><PostCard post={first} featured /></Reveal>}
        {rest.length > 0 && (
          <div className="grid gap-6 tablet:grid-cols-2 laptop:grid-cols-3 laptop:gap-8">
            {rest.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * 0.08} className="h-full"><PostCard post={p} /></Reveal>)}
          </div>
        )}
      </Band>
      <CtaBand c={defaultCta} />
    </div>
  );
}
