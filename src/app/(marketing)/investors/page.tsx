import type { Metadata } from "next";
import { GridGap } from "@/components/layout";
import {
  BentoCards, BentoHeading, CommitteeSection, CtaBand, DdSection, IntroMedia, PageHero, PreScoreSection, QuoteStats, StatementBanner,
} from "@/components/sections";
import { investors as v } from "@/content/marketing/investors";
import { pages } from "@/content/marketing/pages";

export const metadata: Metadata = { title: pages.investors.title, description: pages.investors.description, alternates: { canonical: pages.investors.path } };

/**
 * Investors — Figma 1244:1355.
 * Banner: rails at 1024, and so are the grid rows above and below it (Figma 2187:82).
 * "What You Get": no stacking (Drop 17). Laptop+: subsections separated by a 1px line inside the rails
 * (`laptop:border-t` on their column); tablet/mobile: grid rows (`laptop:hidden`).
 */
export default function InvestorsPage() {
  return (
    <div data-audience="investors">
      <PageHero heading={v.hero.heading} text={v.hero.text} primary={v.hero.primary} secondary={v.hero.secondary} image={v.hero.image} textWidth="max-w-[440px]" />
      <GridGap width="medium" />
      <StatementBanner text={v.statement} width="medium" mobileLeft />
      <GridGap width="medium" />
      <IntroMedia c={v.frustration} />
      <GridGap tone="alt" />
      <BentoHeading heading={v.bento.heading} />
      <BentoCards tall={v.bento.scoring} cards={v.bento.cards} />
      <GridGap className="laptop:hidden" />
      <PreScoreSection c={v.preScore} />
      <GridGap tone="alt" className="laptop:hidden" />
      <CommitteeSection c={v.committee} />
      <GridGap className="laptop:hidden" />
      <DdSection c={v.dd} />
      {/* grey row closes the "What You Get" supersection (Drop 23, designer) */}
      <GridGap tone="alt" />
      <QuoteStats c={v.quote} />
      <GridGap />
      <CtaBand c={v.cta} />
    </div>
  );
}
