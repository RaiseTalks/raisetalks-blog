import Image from "next/image";
import type { Heading } from "@/content/marketing/shared";
import { art } from "@/content/marketing/shared";
import { ArtFill } from "@/components/ui/ArtImage";
import { Band } from "@/components/layout/Band";
import { Reveal, RevealGroup } from "@/components/motion";
import { DragScroll } from "@/components/ui/DragScroll";
import { Headline } from "./Headline";
import { cn } from "@/lib/utils";

/** About "Our 10-year goal" (1285:964): eyebrow + blue statement card with a big line and a note. Background = narrow band pattern (Drop 18). */
export function GoalCard({ c }: { c: { eyebrow: string; text: string; note: string } }) {
  return (
    // Drop 17: rails = the blue card's width (1024 on laptop+), like the grid rows above and below it
    <Band width="medium" pad={false} innerClassName="flex flex-col items-center gap-4 pt-10 tablet:pt-12 laptop:pt-16">
      <p className="text-eyebrow text-brand-light-blue">{c.eyebrow}</p>
      <Reveal className="w-full">
        <div className="relative isolate overflow-hidden rounded-lg bg-brand-light-blue px-5 py-6 text-on-brand tablet:px-8 tablet:py-7">
          <ArtFill art={art.band} sizes="(min-width: 1280px) 1024px, 100vw" className="-z-10 object-cover" />
          <p className="text-h3">{c.text}</p>
          <p className="mt-3 text-body text-on-brand-muted">{c.note}</p>
        </div>
      </Reveal>
    </Band>
  );
}

/**
 * About "Why we Build." (1285:1007 · mobile 1936:66): grey band, manifesto; emphasis lines in Georgia italic.
 * Whole headline H2-alt (gradient), "Why" underlined. Centred from tablet, left-aligned on mobile.
 */
export function Manifesto({ c }: { c: { accent: string; lead: string; blocks: { text: string; emphasis?: boolean }[] } }) {
  return (
    <Band tone="alt" innerClassName="flex flex-col items-start gap-8 text-left max-tablet:px-7 tablet:items-center tablet:text-center laptop:gap-10">
      <Reveal>
        <h2 className="text-h2-alt text-gradient-audience pb-[0.08em]">
          <span className="underline decoration-brand-dark-blue decoration-1 underline-offset-8">{c.accent}</span> {c.lead}
        </h2>
      </Reveal>
      <RevealGroup stagger={0.08} className="flex max-w-[640px] flex-col gap-5">
        {c.blocks.map((b) =>
          b.emphasis
            ? <p key={b.text} className="text-h4-alt text-subheadline">{b.text}</p>
            : <p key={b.text} className="text-body text-copy">{b.text}</p>,
        )}
      </RevealGroup>
    </Band>
  );
}


/** About "What we're Building Toward" (1285:1074): intro left, glowing vertical timeline right. */
export function Toward({ c }: {
  c: { heading: Heading; text: string; nots: { icon: string; text: string }[]; statement: string; detail: string; milestones: { when: string; title: string; text: string }[] };
}) {
  return (
    <Band innerClassName="grid items-center gap-12 laptop:grid-cols-2 laptop:gap-16">
      <Reveal className="flex flex-col gap-8 max-tablet:px-inner laptop:gap-12">
        <div className="flex flex-col gap-4">
          <Headline lead={c.heading.lead} accent={c.heading.accent} />
          <p className="max-w-[560px] text-body text-copy">{c.text}</p>
        </div>
        <ul className="flex flex-wrap gap-8 tablet:gap-12">
          {/* hand-drawn icon tiles (designer SVGs, Drop 18): the tile, border and icon are all in the file */}
          {c.nots.map((n) => (
            <li key={n.text} className="flex items-center gap-3">
              <Image src={n.icon} alt="" width={48} height={48} className="size-10 laptop:size-12" />
              <span className="whitespace-pre-line text-h4-alt text-muted">{n.text}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3">
          <p className="max-w-[560px] text-h4 text-subheadline">{c.statement}</p>
          <p className="max-w-[560px] text-body text-copy">{c.detail}</p>
        </div>
      </Reveal>
      <ol className="relative flex flex-col gap-10 pl-10 tablet:pl-16">
        <span className="absolute inset-y-0 left-3 w-px bg-gradient-to-b from-transparent via-brand-light-blue to-transparent tablet:left-4" aria-hidden />
        {c.milestones.map((m, i) => (
          <li key={m.title} className="relative">
            <span className="absolute -left-[34px] top-6 flex size-4 items-center justify-center tablet:-left-[54px]" aria-hidden>
              <span className="absolute size-8 rounded-full bg-brand-light-blue/25 blur-md" />
              <span className="relative size-3 rounded-full bg-brand-light-blue" />
            </span>
            <Reveal delay={i * 0.15}>
              <article className="flex flex-col gap-2 rounded-md border border-border-1 bg-card p-5 transition-colors duration-[var(--duration-card-hover)] hover:bg-card-alt-hover tablet:p-6">
                <p className="text-eyebrow text-brand-light-blue">{m.when}</p>
                <h3 className="text-h4 text-subheadline">{m.title}</h3>
                <p className="text-body text-copy">{m.text}</p>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Band>
  );
}

/**
 * About "We Believe in our Values" (2279:257 · mobile 1936:496): intro split, 3×2 hairline grid with quote chips.
 * Mobile: the 6 cards become a drag slider that breaks the rails. It starts at the content padding,
 * the next card peeks and runs off the right screen edge; scrolled cards are cut at the left rail.
 * Card 260px (212 text + 48), hairline, 48px gap (Figma 1936:604).
 */
export function ValuesGrid({ c, label }: { c: { heading: Heading; text: string; items: { title: string; text: string; quote: string }[] }; label: string }) {
  return (
    <Band innerClassName="flex flex-col gap-10 laptop:gap-16">
      <Reveal className="grid gap-4 max-tablet:px-inner laptop:grid-cols-[1fr_minmax(0,420px)] laptop:items-start">
        <Headline lead={c.heading.lead} accent={c.heading.accent} />
        <p className="text-body text-copy">{c.text}</p>
      </Reveal>
      {/* mobile: -ml-2 = left rail line, -mr-[17px] = past pad + right rail + margin to the screen edge; bg-page hides the right rail beside the cards.
          Drop 23: first card on the mobile inner line (8px band pad + 20px inner = 28px from the rail). */}
      <DragScroll label={label} className="-ml-2 -mr-[17px] bg-page px-7 scroll-px-7 tablet:mx-0 tablet:bg-transparent tablet:cursor-auto tablet:overflow-visible tablet:px-0">
        <RevealGroup
          className="flex w-max gap-12 pr-4 tablet:grid tablet:w-auto tablet:grid-cols-2 tablet:gap-0 tablet:pr-0 laptop:grid-cols-3"
          itemClassName={cn(
            "w-[260px] shrink-0 snap-start border-r border-divider-1 pr-12 last:border-r-0 last:pr-0",
            "tablet:w-auto tablet:border-r-0 tablet:pr-0 tablet:border-b tablet:[&:nth-last-child(-n+2)]:border-b-0 laptop:[&:nth-last-child(-n+3)]:border-b-0 tablet:odd:border-r laptop:odd:border-r-0 laptop:[&:not(:nth-child(3n))]:border-r",
          )}
        >
          {c.items.map((v) => (
            <article key={v.title} className="flex h-full flex-col gap-4 tablet:p-8 tablet:transition-colors tablet:duration-[var(--duration-card-hover)] tablet:hover:bg-card-hover laptop:p-12">
              <h3 className="text-h4 text-subheadline">{v.title}</h3>
              <p className="text-body text-copy">{v.text}</p>
              <p className="mt-auto w-fit rounded-sm bg-card px-3 py-2.5 text-footnote italic text-copy">{v.quote}</p>
            </article>
          ))}
        </RevealGroup>
      </DragScroll>
    </Band>
  );
}
