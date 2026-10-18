import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Band, GridGap } from "@/components/layout";
import { CtaBand, PageHero } from "@/components/sections";
import { Reveal } from "@/components/motion";
import { getPosts, usedTags } from "@/lib/blog/posts";
import { blog } from "@/content/blog";
import { art, defaultCta } from "@/content/marketing/shared";

export const metadata: Metadata = { title: blog.topicsPage.title, description: blog.topicsPage.text, alternates: { canonical: "/blog/tags/" } };

/** Every blog topic with its description and article count (old /blog/tags). */
export default function TopicsPage() {
  const posts = getPosts();
  const topics = usedTags()
    .map((t) => ({ ...t, count: posts.filter((p) => p.tags.some((x) => x.id === t.id)).length }))
    .sort((a, b) => b.count - a.count);
  return (
    <div data-audience="investors">
      <PageHero eyebrow={blog.eyebrow} heading={blog.topicsPage.heading} text={blog.topicsPage.text} textWidth="max-w-[480px]" image={art.heroAlt} />
      <GridGap />
      <Band>
        <div className="grid gap-6 tablet:grid-cols-2 laptop:grid-cols-3 laptop:gap-8">
          {topics.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 0.08} className="h-full">
              <Link
                href={`/blog/tags/${t.id}`}
                className="group flex h-full flex-col gap-3 rounded-lg border border-border-1 bg-card p-6 transition-[background-color] duration-[var(--duration-card-hover)] ease-[var(--ease-soft)] hover:bg-card-alt-hover"
              >
                <p className="text-footnote font-semibold uppercase tracking-[0.12em] text-brand-light-blue">{blog.topicsPage.count(t.count)}</p>
                <h2 className="text-h4 text-headline">{t.label}</h2>
                {t.description && <p className="text-body text-copy">{t.description}</p>}
                <ArrowRight className="mt-auto size-4 text-brand-light-blue transition-transform duration-[var(--duration-hover)] group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </Reveal>
          ))}
        </div>
      </Band>
      <CtaBand c={defaultCta} />
    </div>
  );
}
