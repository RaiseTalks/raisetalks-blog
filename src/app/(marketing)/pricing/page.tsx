import type { Metadata } from "next";
import { Band } from "@/components/layout";
import { CtaBand, PageHero, PricingPlans } from "@/components/sections";
import { Reveal } from "@/components/motion";
import { pages } from "@/content/marketing/pages";
import { pricing as p } from "@/content/marketing/pricing";

export const metadata: Metadata = { title: pages.pricing.title, description: pages.pricing.description, alternates: { canonical: pages.pricing.path } };

/**
 * Pricing — not in Figma; built from the design system with live-site copy.
 * Drop 21: compact hero (48px top/bottom, H2-size Poppins heading, no italic accent) so more of the
 * cards show on load; the cards fade in on load (Reveal onMount), not when 20% is in view.
 */
export default function PricingPage() {
  return (
    <div data-audience="investors">
      <PageHero heading={p.hero.heading} headingSize="h2" text={p.hero.text} image={p.hero.image} textWidth="max-w-[480px]" columnClassName="py-12 tablet:py-12 laptop:py-12" />
      {/* no grid row between hero and cards (Drop 23, designer) */}
      <Band innerClassName="flex flex-col items-center gap-8">
        <Reveal onMount delay={0.2} className="w-full"><PricingPlans plans={p.plans} billing={p.billing} soonLabel={p.soonLabel} /></Reveal>
        <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-footnote text-muted">
          {p.trust.map((t, i) => (
            <li key={t} className="flex items-center gap-3">
              {i > 0 && <span className="size-1 rounded-full bg-brand-light-blue" aria-hidden />}
              {t}
            </li>
          ))}
        </ul>
      </Band>
      <CtaBand c={p.cta} />
    </div>
  );
}
