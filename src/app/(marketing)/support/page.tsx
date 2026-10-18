import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Band, GridGap } from "@/components/layout";
import { CtaBand, Headline, PageHero } from "@/components/sections";
import { ChapterVideo } from "@/components/sections/ChapterVideo";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { InlineLinks } from "@/components/ui/InlineLinks";
import { BlogFaq } from "@/components/blog/BlogFaq";
import { PostCard } from "@/components/blog/PostCard";
import { getPosts } from "@/lib/blog/posts";
import { pages } from "@/content/marketing/pages";
import { art } from "@/content/marketing/shared";
import { site } from "@/content/site";
import { BILLING_EMAIL, SUPPORT_EMAIL, support as s } from "@/content/marketing/support";

export const metadata: Metadata = {
  title: pages.support.title,
  description: pages.support.description,
  keywords: ["RaiseTalks support", "RaiseTalks help center", "how to use RaiseTalks", "RaiseTalks tutorial", "data room help", "readiness score", "investor pipeline", "RaiseTalks billing", "RaiseTalks FAQ"],
  alternates: { canonical: pages.support.path },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1 },
};

/**
 * Support — not in Figma; built from the design system with the old site's support copy.
 * Hero → help channels → founders guide video with chapters (grey) → popular guides → FAQ (grey) → CTA.
 */
export default function SupportPage() {
  const base = site.url.replace(/\/$/, "");
  const url = `${base}${pages.support.path}/`;
  const watch = `https://www.youtube.com/watch?v=${s.video.youtubeId}`;
  const live = getPosts();
  const guides = s.guides.slugs.flatMap((slug) => live.find((p) => p.slug === slug) ?? []);
  const plain = (t: string) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage", "@id": `${url}#webpage`, url, name: `${pages.support.title} — ${site.name}`, description: pages.support.description,
        inLanguage: "en", isPartOf: { "@type": "WebSite", name: site.name, url: base }, about: { "@id": `${base}/#organization` }, video: { "@id": `${url}#video` },
      },
      {
        "@type": "Organization", "@id": `${base}/#organization`, name: site.name, url: base,
        contactPoint: [
          { "@type": "ContactPoint", contactType: "customer support", email: SUPPORT_EMAIL, url },
          { "@type": "ContactPoint", contactType: "billing support", email: BILLING_EMAIL },
        ],
      },
      {
        "@type": "VideoObject", "@id": `${url}#video`, name: s.video.title, description: s.video.description,
        thumbnailUrl: [`https://i.ytimg.com/vi/${s.video.youtubeId}/maxresdefault.jpg`, `https://i.ytimg.com/vi/${s.video.youtubeId}/hqdefault.jpg`],
        uploadDate: s.video.uploadDate, duration: s.video.duration, embedUrl: `https://www.youtube.com/embed/${s.video.youtubeId}`, url: watch,
        hasPart: s.video.chapters.map((c) => ({ "@type": "Clip", name: c.title, startOffset: c.start, endOffset: c.end, url: `${watch}&t=${c.start}` })),
      },
      {
        "@type": "FAQPage",
        mainEntity: s.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plain(f.a) } })),
      },
    ],
  };

  return (
    <div data-audience="investors">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero heading={s.hero.heading} text={s.hero.text} primary={s.hero.primary} secondary={s.hero.secondary} image={art.heroAlt} textWidth="max-w-[420px]" />

      <GridGap />
      <Band innerClassName="flex flex-col gap-10 laptop:gap-12">
        <Reveal className="max-tablet:px-inner"><Headline align="center" lead={s.channels.heading.lead} accent={s.channels.heading.accent} /></Reveal>
        <div className="grid gap-6 tablet:grid-cols-2 laptop:grid-cols-4">
          {s.channels.items.map((c, i) => {
            const external = c.href.startsWith("http");
            const body = (
              <>
                <Icon name={c.icon} />
                <p className="text-footnote font-semibold uppercase tracking-[0.12em] text-brand-light-blue">{c.label}</p>
                <h3 className="text-h4 text-headline">{c.title}</h3>
                <p className="text-body text-copy">{c.text}</p>
                <span className="mt-auto flex items-center gap-1.5 pt-2 text-body font-medium text-brand-light-blue">
                  {c.action}
                  <ArrowRight className="size-3.5 transition-transform duration-[var(--duration-hover)] group-hover:translate-x-0.5" aria-hidden />
                </span>
              </>
            );
            const cls = "group flex h-full flex-col gap-3 rounded-lg border border-border-1 bg-card p-6 transition-[background-color] duration-[var(--duration-card-hover)] ease-[var(--ease-soft)] hover:bg-card-alt-hover";
            return (
              <Reveal key={c.label} delay={i * 0.08} className="h-full">
                {c.href.startsWith("/")
                  ? <Link href={c.href} className={cls}>{body}</Link>
                  : <a href={c.href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{body}</a>}
              </Reveal>
            );
          })}
        </div>
      </Band>

      <GridGap />
      <Band id="founders-guide" tone="alt" className="scroll-mt-20" innerClassName="grid gap-10 laptop:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] laptop:gap-16">
        <Reveal className="flex flex-col items-start gap-5 max-tablet:px-inner">
          <p className="text-eyebrow text-brand-light-blue">{s.video.eyebrow}</p>
          <Headline lead={s.video.heading.lead} accent={s.video.heading.accent} />
          <p className="max-w-[460px] text-body text-copy">{s.video.text}</p>
          <Button variant="ghost" size="md" href={s.video.more.href} external>{s.video.more.label}</Button>
        </Reveal>
        <Reveal delay={0.1}><ChapterVideo youtubeId={s.video.youtubeId} title={s.video.title} chapters={s.video.chapters} /></Reveal>
      </Band>

      {guides.length > 0 && (
        <>
          <GridGap tone="alt" />
          <Band innerClassName="flex flex-col gap-10 laptop:gap-12">
            <Reveal className="flex items-end justify-between gap-6 max-tablet:px-inner">
              <Headline lead={s.guides.heading.lead} accent={s.guides.heading.accent} />
              <Link href={s.guides.all.href} className="hidden shrink-0 text-body font-medium text-brand-light-blue hover:text-accent-hover tablet:block">{s.guides.all.label} →</Link>
            </Reveal>
            <div className="grid gap-6 tablet:grid-cols-2 laptop:grid-cols-3 laptop:gap-8">
              {guides.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * 0.08} className="h-full"><PostCard post={p} headingLevel="h3" /></Reveal>)}
            </div>
          </Band>
        </>
      )}

      <GridGap width="medium" />
      <Band tone="alt" width="medium" innerClassName="flex flex-col gap-10 max-tablet:px-7">
        <Reveal><Headline align="center" lead={s.faq.heading.lead} /></Reveal>
        <BlogFaq items={s.faq.items.map((f) => ({ q: f.q, a: <p><InlineLinks text={f.a} /></p> }))} />
      </Band>
      <CtaBand c={s.cta} />
    </div>
  );
}
