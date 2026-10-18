import type { Metadata } from "next";
import { GridGap } from "@/components/layout";
import { AffiliateTiers, AudienceCards, CtaBand, PageHero, ToolkitGrid } from "@/components/sections";
import { pages } from "@/content/marketing/pages";
import { affiliate as a } from "@/content/marketing/affiliate";

export const metadata: Metadata = { title: pages.affiliate.title, description: pages.affiliate.description, alternates: { canonical: pages.affiliate.path } };

/**
 * Affiliate Program — not in Figma; live-site copy (raisetalks.com/affiliate-program), layout by Studio (Drop 21).
 * Hero (alt hero) → 4 audience cards → tier cards (Pricing style) → Pro Toolkit 3 × 3 → CTA band.
 */
export default function AffiliateProgramPage() {
  return (
    <div data-audience="investors">
      <PageHero eyebrow={a.hero.eyebrow} eyebrowStyle="plain" heading={a.hero.heading} text={a.hero.text} image={a.hero.image} textWidth="max-w-[520px]" />
      <GridGap />
      <AudienceCards items={a.audiences} />
      <GridGap />
      <AffiliateTiers heading={a.tiers.heading} sub={a.tiers.sub} items={a.tiers.items} note={a.tiers.note} />
      <GridGap tone="alt" />
      <ToolkitGrid heading={a.toolkit.heading} sub={a.toolkit.sub} sliderLabel={a.toolkit.sliderLabel} items={a.toolkit.items} />
      <CtaBand c={a.cta} />
    </div>
  );
}
