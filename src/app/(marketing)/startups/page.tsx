import type { Metadata } from "next";
import { Band, GridGap } from "@/components/layout";
import {
  CheckGrid, CtaBand, Faq, FeatureRows, Headline, PageHero, PerksGrid, ProblemSection, ProcessSteps, StatementBanner, VideoSection,
} from "@/components/sections";
import { Reveal } from "@/components/motion";
import { pages } from "@/content/marketing/pages";
import { startups as s } from "@/content/marketing/startups";

export const metadata: Metadata = { title: pages.startups.title, description: pages.startups.description, alternates: { canonical: pages.startups.path } };

/** Startups — Figma 1316:2864. Banner, video and FAQ: rails at 1024 on laptop+ (Drop 14). */
export default function StartupsPage() {
  return (
    <div data-audience="investors">
      <PageHero heading={s.hero.heading} text={s.hero.text} primary={s.hero.primary} secondary={s.hero.secondary} image={s.hero.image} textWidth="max-w-[420px]" />
      <GridGap width="medium" />
      <StatementBanner text={s.statement} width="medium" />
      <GridGap width="medium" />
      <ProblemSection c={s.problem} />
      {/* How It Works brings its own blue grid rows (BrandFrame), so no white rows around it (Figma 2191:118 / 2191:123) */}
      <ProcessSteps heading={s.process.heading} steps={s.process.steps} framed sliderLabel={s.process.sliderLabel} />
      <FeatureRows heading={s.features.heading} note={s.features.note} rows={s.features.rows} />
      {/* Drop 23 (designer): grey grid row after the "Everything you need" stack, before the AI Advisor */}
      <GridGap tone="alt" />
      <CheckGrid heading={s.advisor.heading} items={s.advisor.items} headingTabletFlow headingLeftBelowLaptop />
      <GridGap tone="alt" />
      <PerksGrid c={{ ...s.perks, alignTop: true }} />
      {/* video: white 1024 grid rows above and below; no extra rail row on top of the FAQ (Drop 16) */}
      <GridGap width="medium" />
      <VideoSection c={s.video} />
      <GridGap width="medium" />
      <Band tone="alt" width="medium" innerClassName="flex flex-col gap-10 max-tablet:px-7">
        <Reveal><Headline align="center" lead={s.faq.heading.lead} /></Reveal>
        <Faq items={s.faq.items.filter((f) => f.a)} idPrefix="startups-faq" tone="alt" />
      </Band>
      <CtaBand c={s.cta} />
    </div>
  );
}
