import Image from "next/image";
import type { Heading } from "@/content/marketing/shared";
import { Band } from "@/components/layout/Band";
import { Reveal, RevealGroup } from "@/components/motion";
import { Marquee } from "@/components/motion/Marquee";
import { CheckList } from "./Checklist";
import { BrandFrame, brandFrameColumn } from "./BrandFrame";
import { cn } from "@/lib/utils";
import { Headline } from "./Headline";

type Img = { src: string; width: number; height: number };

/** Decoder "One Chip - One Bet" (2601:7829): rules + fact cards, then the question wheel. */
export function ChipSection({ c }: {
  c: { heading: Heading; checks: string[]; facts: { label: string; value: string }[]; roles: { label: string; items: string[] }; wheel: { desktop: Img; mobile: Img; alt: string } };
}) {
  return (
    <Band innerClassName="flex flex-col gap-12 laptop:gap-16">
      <div className="grid gap-8 laptop:grid-cols-2 laptop:gap-16">
        <Reveal className="flex flex-col gap-5 max-tablet:px-inner">
          {/* one line at every width (Drop 15) */}
          <Headline layout="inline" lead={c.heading.lead} accent={c.heading.accent} className="flex-row flex-nowrap items-baseline gap-x-3 whitespace-nowrap" />
          <CheckList items={c.checks} tight />
        </Reveal>
        <RevealGroup className="grid grid-cols-2 gap-4" itemClassName="last:col-span-2">
          {c.facts.map((f) => (
            <div key={f.label} className="flex h-full flex-col gap-1 rounded-md border border-border-1 bg-card p-5">
              <p className="text-body text-subheadline">{f.label}</p>
              <p className="text-h4-alt text-brand-dark-blue">{f.value}</p>
            </div>
          ))}
          <div className="flex h-full flex-col gap-3 rounded-md border border-border-1 bg-card p-5">
            <p className="text-body text-subheadline">{c.roles.label}</p>
            {/* role words in the fact-value font ("60 minutes", "$1,000"), Drop 15; H4 Alt since Drop 23 */}
            <ul className="flex flex-wrap items-center gap-3 text-h4-alt text-brand-dark-blue">
              {c.roles.items.map((r, i) => (
                <li key={r} className="flex items-center gap-3">
                  {i > 0 && <span className="size-1.5 rounded-full bg-brand-light-blue" aria-hidden />}
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </RevealGroup>
      </div>
      <Reveal delay={0.1}>
        <Image src={c.wheel.desktop.src} alt={c.wheel.alt} width={c.wheel.desktop.width} height={c.wheel.desktop.height} sizes="(min-width: 1680px) 1352px, 95vw" className="hidden h-auto w-full tablet:block" />
        <Image src={c.wheel.mobile.src} alt={c.wheel.alt} width={c.wheel.mobile.width} height={c.wheel.mobile.height} sizes="100vw" className="mx-auto h-auto w-full max-w-[420px] tablet:hidden" />
      </Reveal>
    </Band>
  );
}

/** Endless strip of portrait event photos (Decoder 2601:9424). Never pauses; drag left/right. No edge fade (Drop 15). */
export function PhotoStrip({ photos }: { photos: { src: string; alt: string }[] }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 gap-3 pr-3 tablet:gap-4 tablet:pr-4" aria-hidden={hidden || undefined}>
      {photos.map((p, i) => (
        <li key={`${p.src}-${i}`} className="relative aspect-[387/580] w-[180px] shrink-0 overflow-hidden rounded-md tablet:w-[260px] laptop:w-[320px]">
          <Image src={p.src} alt={hidden ? "" : p.alt} fill sizes="320px" className="object-cover" />
        </li>
      ))}
    </ul>
  );
  return (
    <Marquee as="section" label="Photos from past games" duration={70} fade={false} className="bg-page py-8 tablet:py-12">
      {row(false)}{row(true)}
    </Marquee>
  );
}

/**
 * "What People are Saying" (2601:7855): BrandFrame like Startups How It Works (rounded blue rectangle with
 * blue grid rows top and bottom; rails line up with the page rails, Figma colour #258BFF).
 * Cards = the How It Works card style + 4px dark-blue bottom edge (Figma), Drop 15.
 * Mobile (Drop 23): the cards sit as far from the frame edge as they are from each other (16px).
 */
export function TestimonialCards({ c }: { c: { heading: string; items: { quote: string; name: string; role: string }[] } }) {
  return (
    <BrandFrame>
      <Band tone="page" className="bg-transparent" innerClassName={cn("!border-rail-on-brand flex flex-col gap-10 max-tablet:px-4 laptop:gap-12", brandFrameColumn)}>
        <Reveal><h2 className="text-center text-h2 text-on-brand">{c.heading}</h2></Reveal>
        <RevealGroup className="grid gap-4 laptop:grid-cols-3 laptop:gap-6">
          {c.items.map((t) => (
            <figure key={t.name} className="flex h-full flex-col justify-between gap-10 rounded-md border-b-4 border-brand-dark-blue bg-brand-dark-blue/30 p-6 text-on-brand tablet:p-8">
              <blockquote className="text-h4-alt">{t.quote}</blockquote>
              <figcaption className="flex flex-col gap-0.5">
                <span className="text-body font-semibold">{t.name}</span>
                <span className="text-footnote text-on-brand-muted">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </RevealGroup>
      </Band>
    </BrandFrame>
  );
}
