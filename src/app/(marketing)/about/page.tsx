import type { Metadata } from "next";
import { GridGap } from "@/components/layout";
import { CtaBand, GoalCard, LogoMarquee, Manifesto, PageHero, PhotoRows, Toward, ValuesGrid } from "@/components/sections";
import { Reveal } from "@/components/motion";
import { about as a } from "@/content/marketing/about";
import { pages } from "@/content/marketing/pages";
import { partnerLogos } from "@/content/marketing/shared";

export const metadata: Metadata = { title: pages.about.title, description: pages.about.description, alternates: { canonical: pages.about.path } };

/** About — Figma 1244:742. */
export default function AboutPage() {
  return (
    <div data-audience="investors">
      <PageHero eyebrow={a.hero.eyebrow} eyebrowStyle="plain" heading={a.hero.heading} primary={a.hero.primary} secondary={a.hero.secondary} image={a.hero.image} headingWidth="max-w-none laptop:-mx-32" />
      <GridGap width="medium" />
      <GoalCard c={a.goal} />
      <GridGap width="medium" />
      <Manifesto c={a.why} />
      <PhotoRows photos={a.photos} label={a.photosUi.label} openLabel={a.photosUi.open} closeLabel={a.photosUi.close} />
      <GridGap />
      <Toward c={a.toward} />
      {/* Backers strip like the Home hero logo strip (Drop 15): edge to edge, no rails, no grid row above */}
      <section className="flex flex-col items-center bg-page pt-10 tablet:pt-12">
        <Reveal><h2 className="text-h4 text-subheadline">{a.backers.title}</h2></Reveal>
        <LogoMarquee logos={partnerLogos} label={a.backers.title} className="w-full" />
      </section>
      <GridGap />
      <ValuesGrid c={a.values} label={a.values.sliderLabel} />
      <CtaBand c={a.cta} />
    </div>
  );
}
