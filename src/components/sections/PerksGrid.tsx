import type { Cta, Heading, IconName } from "@/content/marketing/shared";
import { Band } from "@/components/layout/Band";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup } from "@/components/motion";
import { DragScroll } from "@/components/ui/DragScroll";
import { Headline } from "./Headline";
import { cn } from "@/lib/utils";

/**
 * Startups "Get access to Founder Perks" (1347:5202): headline + CTA left, 2×2 hairline grid right.
 * `sliderLabel` (Startups, Drop 14): on mobile the items are a drag slider to the screen edge, like the
 * About values (260px items, hairline, 48px gap). Without it (Decoder co-host) mobile stays a list.
 * alignTop: headline + CTA start level with the top of the grid (Decoder co-host, Drop 15).
 * headingOneLine (Pitch "Why Join", Drop 21): the accent line never wraps; from laptop the heading column
 * takes the width it needs and the grid takes the rest. Mobile: 32px instead of 40px above the grid.
 * headingRow (Decoder co-host, Drop 23): heading on one line at every width; tablet = heading left, CTA right,
 * top-aligned. Dividers on white use `divider-1` (Drop 23).
 */
export function PerksGrid({ c }: { c: { id?: string; heading: Heading; cta?: Cta; sliderLabel?: string; alignTop?: boolean; headingOneLine?: boolean; headingRow?: boolean; items: { icon: IconName; eyebrow?: string; title: string; text: string }[]; tone?: "page" | "alt" } }) {
  const alt = (c.tone ?? "alt") === "alt";
  const line = alt ? "border-border-2" : "border-divider-1";
  // slider item: icon above the text on mobile (260px wide), beside it from tablet as in the grid below
  const item = (it: { icon: IconName; eyebrow?: string; title: string; text: string }) => (
    <div key={it.title} className={cn("flex h-full flex-col items-start gap-4 transition-colors duration-[var(--duration-card-hover)] tablet:flex-row tablet:p-8 laptop:p-12", alt ? "hover:bg-card-alt-hover" : "hover:bg-card-hover")}>
      <Icon name={it.icon} tone="blue" />
      <div className="flex flex-col gap-1">
        {it.eyebrow && <p className="text-eyebrow text-brand-light-blue">{it.eyebrow}</p>}
        <h3 className="text-h4 text-subheadline">{it.title}</h3>
        <p className="text-body text-copy">{it.text}</p>
      </div>
    </div>
  );
  if (c.sliderLabel) {
    return (
      <Band id={c.id} tone={c.tone ?? "alt"} innerClassName={cn("grid grid-cols-1 gap-10 laptop:grid-cols-[360px_1fr] laptop:gap-8", c.alignTop ? "items-start" : "items-center")}>
        {/* tablet (Figma 1508:3963): heading top left, CTA top right; laptop: heading over CTA */}
        <Reveal className="flex flex-col items-start gap-6 max-tablet:px-inner tablet:flex-row tablet:justify-between laptop:flex-col laptop:justify-start laptop:gap-9">
          <Headline lead={c.heading.lead} accent={c.heading.accent} />
          {c.cta && <Button variant="primary" size="lg" href={c.cta.href} external={c.cta.external}>{c.cta.label}</Button>}
        </Reveal>
        {/* mobile: -ml-2 = left rail line, -mr-[17px] = to the screen edge; band colour hides the right rail beside the slider.
            Drop 23: first card on the mobile inner line (8 + 20 = 28px from the rail) */}
        <DragScroll label={c.sliderLabel} className={cn("-ml-2 -mr-[17px] px-7 scroll-px-7 tablet:mx-0 tablet:cursor-auto tablet:overflow-visible tablet:bg-transparent tablet:px-0", alt ? "bg-section-alt" : "bg-page")}>
          <RevealGroup
            className="flex w-max gap-12 pr-4 tablet:grid tablet:w-auto tablet:grid-cols-2 tablet:gap-0 tablet:pr-0"
            itemClassName={cn("w-[260px] shrink-0 snap-start border-r pr-12 last:border-r-0 last:pr-0 tablet:w-auto tablet:border-r-0 tablet:pr-0 tablet:border-b tablet:odd:border-r tablet:[&:nth-last-child(-n+2)]:border-b-0", line)}
          >
            {c.items.map(item)}
          </RevealGroup>
        </DragScroll>
      </Band>
    );
  }
  return (
    <Band id={c.id} tone={c.tone ?? "alt"} innerClassName={cn("grid gap-10 laptop:grid-cols-[360px_1fr] laptop:gap-8", c.alignTop ? "items-start" : "items-center", c.headingOneLine && "gap-8 tablet:gap-10 laptop:grid-cols-[max-content_1fr] laptop:gap-16", c.headingRow && "laptop:grid-cols-[max-content_1fr] laptop:gap-16")}>
      <Reveal className={cn("flex flex-col items-start gap-6 max-tablet:px-inner laptop:gap-9", c.headingRow && "tablet:flex-row tablet:justify-between laptop:flex-col laptop:justify-start")}>
        <Headline layout={c.headingRow ? "inline" : "stack"} lead={c.heading.lead} accent={c.heading.accent} className={c.headingRow ? "flex-row flex-nowrap items-baseline gap-x-3 whitespace-nowrap tablet:flex-nowrap [&>span]:whitespace-nowrap" : c.headingOneLine ? "whitespace-nowrap" : undefined} />
        {c.cta && <Button variant="primary" size="lg" href={c.cta.href} external={c.cta.external}>{c.cta.label}</Button>}
      </Reveal>
      <RevealGroup className="grid tablet:grid-cols-2" itemClassName={cn("border-b tablet:odd:border-r tablet:[&:nth-last-child(-n+2)]:border-b-0 last:border-b-0", line)}>
        {c.items.map((it) => (
          <div key={it.title} className={cn("flex h-full items-start gap-4 px-inner py-8 transition-colors duration-[var(--duration-card-hover)] tablet:p-8 laptop:p-12", alt ? "hover:bg-card-alt-hover" : "hover:bg-card-hover")}>
            <Icon name={it.icon} tone="blue" />
            <div className="flex flex-col gap-1">
              {it.eyebrow && <p className="text-eyebrow text-brand-light-blue">{it.eyebrow}</p>}
              <h3 className="text-h4 text-subheadline">{it.title}</h3>
              <p className="text-body text-copy">{it.text}</p>
            </div>
          </div>
        ))}
      </RevealGroup>
    </Band>
  );
}
