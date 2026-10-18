import { Check, X } from "lucide-react";
import type { Heading, IconName } from "@/content/marketing/shared";
import type { Tier } from "@/content/marketing/affiliate";
import { Band } from "@/components/layout/Band";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { DragScroll } from "@/components/ui/DragScroll";
import { Reveal, RevealGroup } from "@/components/motion";
import { Headline } from "./Headline";
import { cn } from "@/lib/utils";

/**
 * Affiliate Program sections (Drop 21; live-site copy, not in Figma).
 * AudienceCards: the Home Pitch Competitions items (3257:1340) — hairline grid, H4 + body; 4 across on laptop,
 * 2 × 2 on tablet, a list on mobile. Drop 23: section and cells half as tall (vertical padding −50%), dividers divider-1.
 */
export function AudienceCards({ items }: { items: { title: string; text: string }[] }) {
  return (
    <Band innerClassName="py-5 tablet:py-6 laptop:py-8">
      <RevealGroup
        className="grid tablet:grid-cols-2 laptop:grid-cols-4"
        itemClassName="border-b border-divider-1 last:border-b-0 tablet:odd:border-r tablet:[&:nth-last-child(-n+2)]:border-b-0 laptop:border-b-0 laptop:border-r laptop:last:border-r-0"
      >
        {items.map((it) => (
          <div key={it.title} className="flex h-full flex-col gap-2 px-inner py-4 transition-colors duration-[var(--duration-card-hover)] hover:bg-card-hover tablet:px-10 tablet:py-5 laptop:px-8 laptop:py-4 desktop:px-12 desktop:py-6">
            <h3 className="text-h4 text-subheadline">{it.title}</h3>
            <p className="text-body text-copy">{it.text}</p>
          </div>
        ))}
      </RevealGroup>
    </Band>
  );
}

/**
 * Tier cards in the Pricing card style (PricingPlans): eyebrow, name, fit line, commission in place of the price,
 * a highlighted earnings box, button, divider, ticked list (not-included items muted with a cross).
 * Basic = light card, blue button; Pro = dark ink card. Drop 23: its "Recommended" label is a tab breaking out of the
 * card's top edge, as "Most Popular" on RaiseTalks TV pricing (accent gradient, uppercase, 26px, 40px in from the sides).
 */
export function AffiliateTiers({ heading, sub, items, note }: { heading: Heading; sub: string; items: Tier[]; note: string }) {
  return (
    <Band innerClassName="flex flex-col items-center gap-10 laptop:gap-12">
      <Reveal className="flex flex-col items-center gap-2 text-center max-tablet:px-inner">
        <Headline align="center" lead={heading.lead} accent={heading.accent} />
        <p className="text-body text-copy">{sub}</p>
      </Reveal>
      {/* pt / mobile gap: room for the 26px tab above the Pro card */}
      <RevealGroup className="grid w-full max-w-[960px] gap-10 pt-[26px] tablet:grid-cols-2 tablet:gap-6">
        {items.map((t) => {
          const dark = t.tone === "dark";
          return (
            <div key={t.id} className="relative flex h-full flex-col">
            {t.badge && (
              <span className="absolute inset-x-10 -top-[26px] flex h-[26px] items-center justify-center rounded-t-sm text-body font-semibold uppercase text-on-brand" style={{ backgroundImage: "var(--gradient-accent)" }}>
                {t.badge}
              </span>
            )}
            <div
              className={cn(
                "flex flex-1 flex-col gap-8 rounded-lg border p-6 transition-colors duration-[var(--duration-card-hover)] tablet:p-8",
                dark ? "on-dark border-ink-border bg-ink text-ink-copy" : "border-border-1 bg-card hover:bg-card-alt-hover",
              )}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className={cn("text-eyebrow", dark ? "text-brand-yellow" : "text-brand-light-blue")}>{t.eyebrow}</p>
                  <h3 className={cn("text-h3", dark ? "text-on-brand" : "text-subheadline")}>{t.name}</h3>
                  <p className={cn("text-footnote", dark ? "text-ink-muted" : "text-muted")}>{t.fit}</p>
                </div>
                <p className="flex items-end gap-1.5">
                  <span className={cn("text-h1 leading-none", dark ? "text-on-brand" : "text-headline")}>{t.rate}</span>
                  <span className={cn("pb-1 text-body", dark ? "text-ink-copy" : "text-muted")}>{t.rateLabel}</span>
                </p>
                <div className={cn("flex flex-col gap-1 rounded-md border px-4 py-3", dark ? "border-ink-border bg-ink-raised" : "border-transparent bg-blue-pill")}>
                  <p className={cn("text-footnote", dark ? "text-ink-copy" : "text-brand-dark-blue")}>{t.earnings.label}</p>
                  <p className="flex flex-wrap items-baseline gap-x-2">
                    <span className={cn("text-h3", dark ? "text-brand-yellow" : "text-brand-dark-blue")}>{t.earnings.value}</span>
                    {t.earnings.unit && <span className={cn("text-footnote", dark ? "text-ink-copy" : "text-brand-dark-blue")}>{t.earnings.unit}</span>}
                  </p>
                </div>
              </div>
              <Button variant={dark ? "ghost" : "primary"} size="lg" fullWidth href={t.cta.href} external={t.cta.external}>
                {t.cta.label}
              </Button>
              <ul className={cn("flex flex-1 flex-col gap-3 border-t pt-6", dark ? "border-ink-border" : "border-border-1")}>
                {t.features.map((f) => (
                  <li key={f.text} className={cn("flex items-start gap-2.5 text-body", !f.included && "opacity-50")}>
                    {f.included
                      ? <Check className={cn("mt-0.5 size-4 shrink-0", dark ? "text-brand-yellow" : "text-good")} strokeWidth={2} aria-hidden />
                      : <X className="mt-0.5 size-4 shrink-0 text-muted" strokeWidth={2} aria-hidden />}
                    <span className={dark ? "text-ink-copy" : "text-copy"}>
                      {!f.included && <span className="sr-only">Not included: </span>}
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            </div>
          );
        })}
      </RevealGroup>
      <p className="text-center text-footnote text-muted">{note}</p>
    </Band>
  );
}

/**
 * Pro Toolkit: 3 × 3 tiles in the Investors Committee tile style (1316:736) — icon, H4, text on the grey band.
 * Tablet 3 columns; mobile a drag slider to the screen edge, like the Committee tiles.
 */
export function ToolkitGrid({ heading, sub, sliderLabel, items }: { heading: Heading; sub: string; sliderLabel: string; items: { icon: IconName; title: string; text: string }[] }) {
  const tile = (t: { icon: IconName; title: string; text: string }) => (
    <div key={t.title} className="flex h-full w-[260px] shrink-0 snap-start flex-col gap-6 rounded-lg border border-border-2 bg-card-on-alt p-6 transition-colors duration-[var(--duration-card-hover)] hover:bg-card-hover tablet:w-auto tablet:gap-8 tablet:p-6 laptop:p-8">
      <Icon name={t.icon} tone="blue" />
      <div className="flex flex-col gap-2">
        <h3 className="text-h4 text-subheadline">{t.title}</h3>
        <p className="text-body text-copy">{t.text}</p>
      </div>
    </div>
  );
  return (
    <Band tone="alt" innerClassName="flex flex-col gap-10 laptop:gap-12">
      <Reveal className="flex flex-col gap-2 text-left max-tablet:px-inner tablet:items-center tablet:text-center">
        <Headline lead={heading.lead} accent={heading.accent} className="tablet:items-center tablet:text-center" />
        <p className="text-body text-copy">{sub}</p>
      </Reveal>
      <Reveal>
        {/* mobile: -ml-2 = left rail line, -mr-[17px] = to the screen edge (as the Committee tiles).
            Drop 23: first tile on the mobile inner line (8 + 20 = 28px from the rail) */}
        <DragScroll label={sliderLabel} className="-ml-2 -mr-[17px] bg-section-alt px-7 scroll-px-7 tablet:mx-0 tablet:cursor-auto tablet:overflow-visible tablet:bg-transparent tablet:px-0">
          <div className="flex w-max gap-4 pr-4 tablet:grid tablet:w-auto tablet:grid-cols-3 tablet:pr-0 laptop:gap-6">
            {items.map(tile)}
          </div>
        </DragScroll>
      </Reveal>
    </Band>
  );
}
