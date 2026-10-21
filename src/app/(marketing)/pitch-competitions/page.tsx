import type { Metadata } from "next";
import { GridGap } from "@/components/layout";
import { CheckGrid, CtaBand, PageHero, PerksGrid, ProcessSteps } from "@/components/sections";
import { pages } from "@/content/marketing/pages";
import { pitch as p } from "@/content/marketing/pitch";

export const metadata: Metadata = { title: pages.pitchCompetitions.title, description: pages.pitchCompetitions.description, alternates: { canonical: pages.pitchCompetitions.path } };

/**
 * Pitch Competitions — copy from Figma 1244:1062, layout rebuilt with current sections.
 * Drop 21: hero stats = RaiseTalks TV stats card (3121:5432) in light brand colours, mobile = white tiles
 * 2 + 1 (1422:14); "Why Join" heading on one line, top-aligned; The Process = Startups How It Works frame.
 */
export default function PitchCompetitionsPage() {
  return (
    <div data-audience="investors">
      <PageHero eyebrow={p.hero.eyebrow} eyebrowStyle="plain" heading={p.hero.heading} primary={p.hero.primary} secondary={p.hero.secondary} image={p.hero.image} imageFit="contain">
        {/* tablet+: one 480px card, 3 columns 24px apart (TV 3121:5432); mobile: white tiles 2 + 1 (1422:14) */}
        <div className="w-full tablet:w-auto">
          <dl className="grid w-full grid-cols-2 gap-3 text-left tablet:flex tablet:w-[480px] tablet:gap-6 tablet:rounded-md tablet:border tablet:border-border-1 tablet:bg-page tablet:p-6">
            {p.hero.stats.map((s, i) => (
              <div key={s.label} className={`flex flex-col gap-px rounded-sm border border-border-1 bg-page p-3 tablet:flex-1 tablet:rounded-none tablet:border-0 tablet:bg-transparent tablet:p-0 ${i === 2 ? "col-span-2" : ""}`}>
                <dt className="order-2 text-body text-copy">{s.label}</dt>
                <dd className="order-1 text-h3 text-brand-light-blue">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </PageHero>
      {/* grid row under the hero: rails at the hero's 1024 width, lines edge to edge (Drop 24) */}
      <GridGap width="medium" />
      <PerksGrid c={{ heading: p.why.heading, items: p.why.items, tone: "page", alignTop: true, headingOneLine: true }} />
      {/* The Process = Startups How It Works: brings its own blue grid rows (BrandFrame), no white rows around it */}
      <ProcessSteps heading={p.process.heading} sub={p.process.sub} steps={p.process.steps} variant="simple" framed sliderLabel={p.process.sliderLabel} />
      <CheckGrid heading={p.get.heading} items={p.get.items} headingMobileLeft />
      <CtaBand c={p.cta} />
    </div>
  );
}
