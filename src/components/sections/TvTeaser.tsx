import Image from "next/image";
import { Play } from "lucide-react";
import type { Cta, Heading, IconName } from "@/content/marketing/shared";
import { Band } from "@/components/layout/Band";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { Reveal, RevealGroup } from "@/components/motion";
import { Headline } from "./Headline";

export type TvTeaserContent = {
  logo: { src: string; width: number; height: number; alt: string };
  heading: Heading; lines: string[];
  items: { icon: IconName; title: string; text: string }[];
  cta: Cta; video: { src: string; poster: string };
};

/**
 * Dark cinematic RaiseTalks TV panel (Home 3257:1289 / tablet 1405:421 / mobile 1405:472).
 * One grid, placed per breakpoint:
 * - laptop: left column = logo, headline, lines, button (64px under the lines, natural width); right = cards.
 * - tablet: logo; headline | lines in one row (lines right-aligned to the right padding); cards 2×2; full-width button.
 * - mobile: logo, headline, lines stacked; cards 2×2; full-width button at the bottom.
 * Background (Drop 19): looping video, centred and cropped to the panel at every width, under the ink vignette
 * `--overlay-tv` (centre 75% ink, solid ink at the edges).
 */
export function TvTeaser({ c }: { c: TvTeaserContent }) {
  return (
    <Band pad={false}>
      <Reveal>
        <div className="on-dark relative isolate grid overflow-hidden rounded-lg bg-ink p-6 tablet:grid-cols-2 tablet:gap-x-8 tablet:p-10 laptop:grid-rows-[auto_auto_auto_1fr] laptop:gap-x-16 laptop:p-16">
          <div className="absolute inset-0 -z-10" aria-hidden>
            <LoopVideo src={c.video.src} poster={c.video.poster} className="absolute inset-0 size-full object-cover object-center" />
            <div className="absolute inset-0" style={{ backgroundImage: "var(--overlay-tv)" }} />
          </div>
          <Image src={c.logo.src} alt={c.logo.alt} width={c.logo.width} height={c.logo.height} className="h-3.5 w-auto self-start tablet:col-span-2 laptop:col-span-1" />
          <Headline tone="dark" lead={c.heading.lead} accent={c.heading.accent} className="mt-10 laptop:mt-16" />
          <p className="mt-4 text-body text-ink-copy tablet:mt-10 tablet:self-end tablet:text-right laptop:col-start-1 laptop:mt-4 laptop:self-auto laptop:text-left">
            {c.lines.map((l) => <span key={l} className="block">{l}</span>)}
          </p>
          <RevealGroup className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 tablet:col-span-2 tablet:gap-x-8 tablet:gap-y-16 laptop:col-span-1 laptop:col-start-2 laptop:row-span-4 laptop:row-start-1 laptop:mt-0">
            {c.items.map((it) => (
              <div key={it.title} className="flex flex-col gap-3">
                <Icon name={it.icon} tone="blue" />
                <div className="flex flex-col gap-1">
                  <h3 className="text-h4 text-on-brand-muted">{it.title}</h3>
                  <p className="text-body text-ink-copy">{it.text}</p>
                </div>
              </div>
            ))}
          </RevealGroup>
          <Button variant="primary" size="lg" href={c.cta.href} external={c.cta.external} iconLeft={<Play className="size-4" />} className="mt-12 w-full tablet:col-span-2 laptop:col-span-1 laptop:col-start-1 laptop:mt-16 laptop:w-auto laptop:self-start laptop:justify-self-start">{c.cta.label}</Button>
        </div>
      </Reveal>
    </Band>
  );
}
