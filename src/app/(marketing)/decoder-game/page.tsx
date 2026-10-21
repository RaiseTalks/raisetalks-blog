import type { Metadata } from "next";
import Image from "next/image";
import { Band, GridGap } from "@/components/layout";
import { ChipSection, CtaBand, Faq, Headline, PageHero, PerksGrid, PhotoStrip, TestimonialCards } from "@/components/sections";
import { Reveal } from "@/components/motion";
import { decoder as d } from "@/content/marketing/decoder";
import { pages } from "@/content/marketing/pages";

export const metadata: Metadata = { title: pages.decoderGame.title, description: pages.decoderGame.description, alternates: { canonical: pages.decoderGame.path } };

/**
 * Decoder Game — Figma 2601:7778 (desktop). Tablet/mobile follow the other pages' patterns.
 * Drop 14: FAQ rails at 1024 (laptop+); QR (laptop+ only, 320px) half above the CTA band, so the FAQ
 * keeps 160px extra bottom room for its upper half. Drop 18: the QR SVG brings its own white tile and blue frame.
 */
export default function DecoderGamePage() {
  return (
    <div data-audience="investors">
      <PageHero heading={d.hero.heading} text={d.hero.text} primary={d.hero.primary} secondary={d.hero.secondary} image={d.hero.image} imageFit="contain" textWidth="max-w-[520px]" headingWidth="max-w-none" headingFlow />
      <GridGap />
      <ChipSection c={d.chip} />
      <PhotoStrip photos={d.photos} />
      <TestimonialCards c={d.testimonials} />
      <GridGap />
      <PerksGrid c={{ heading: d.coHost.heading, cta: d.coHost.cta, items: d.coHost.items, tone: "page", alignTop: true, headingRow: true }} />
      <GridGap />
      {/* grey FAQ (Drop 23, designer) */}
      <Band tone="alt" width="medium" innerClassName="flex flex-col gap-10 max-tablet:px-7 laptop:pb-56">
        <Reveal><Headline align="center" lead={d.faq.heading} /></Reveal>
        <Faq items={d.faq.items} idPrefix="decoder-faq" tone="alt" />
      </Band>
      <CtaBand
        c={d.cta}
        float={<Image src={d.qr.src} alt={d.qr.alt} width={d.qr.width} height={d.qr.height} sizes="320px" className="h-auto w-80" />}
      />
    </div>
  );
}
