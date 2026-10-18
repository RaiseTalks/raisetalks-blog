import type { Metadata } from "next";
import { Band, GridGap } from "@/components/layout";
import { FeatureRequestForm, PageHero } from "@/components/sections";
import { Reveal } from "@/components/motion";
import { pages } from "@/content/marketing/pages";
import { featureRequest as f } from "@/content/marketing/featureRequest";

export const metadata: Metadata = { title: pages.featureRequest.title, description: pages.featureRequest.description, alternates: { canonical: pages.featureRequest.path } };

/**
 * Feature Request — not in Figma; live-site copy (raisetalks.com/feature-request), layout by Studio (Drop 21).
 * Same compact hero as Pricing (48px top/bottom, H2-size Poppins heading, no accent); the form card fades in
 * on load (Reveal onMount) so mobile is not half empty until the first scroll.
 */
export default function FeatureRequestPage() {
  return (
    <div data-audience="investors">
      <PageHero heading={f.hero.heading} headingSize="h2" text={f.hero.text} image={f.hero.image} textWidth="max-w-[480px]" columnClassName="py-12 tablet:py-12 laptop:py-12" />
      <GridGap />
      <Band innerClassName="flex flex-col items-center gap-8">
        <Reveal onMount delay={0.2} className="w-full max-w-[720px]">
          <div className="rounded-lg border border-border-1 bg-card p-6 tablet:p-8 laptop:p-10">
            <FeatureRequestForm c={f.form} />
          </div>
        </Reveal>
        <div className="flex max-w-[720px] flex-col gap-1 text-center text-footnote text-muted">
          <p>
            {f.bug.lead}{" "}
            <a href={`mailto:${f.bug.email}`} className="text-brand-light-blue underline-offset-2 hover:underline">{f.bug.email}</a>
          </p>
          <p>{f.note}</p>
        </div>
      </Band>
    </div>
  );
}
