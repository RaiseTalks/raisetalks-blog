import type { IconName } from "@/content/marketing/shared";
import type { MemoContent } from "@/content/marketing/investors";
import { Band } from "@/components/layout/Band";
import { Badge } from "@/components/ui/Badge";
import { DragScroll } from "@/components/ui/DragScroll";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup } from "@/components/motion";
import { CapabilityList } from "./CapabilityList";
import { ChecklistCard } from "./Checklist";
import { MemoWindow } from "./MemoWindow";
import { cn } from "@/lib/utils";

type CardC = { title: string; text: string; checks: string[] };

function Intro({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex flex-col gap-2 max-tablet:px-inner">
      <h2 className="text-h3 text-subheadline">{title}</h2>
      <p className="max-w-[420px] text-body text-copy">{text}</p>
    </div>
  );
}

/**
 * Investors "Pre-Score Engine" (1300:1265): card + dimension list left, scrollable HTML memo right.
 * Laptop+: grey outside the rails, white inside (part of the stacked "What You Get" section).
 * Memo window: the blue frame is the scroll box. At the top its blue padding and the sheet's rounded
 * corners show; scrolling takes them under the top edge; the sheet's rounded bottom + blue padding
 * only appear at the very end. Height: 480 / 600px, laptop = the left column's height.
 */
export function PreScoreSection({ c }: { c: { title: string; text: string; card: CardC; dimensions: { title: string; text?: string }[]; memo: MemoContent } }) {
  return (
    <Band className="laptop:bg-section-alt" innerClassName="grid gap-10 bg-page laptop:grid-cols-[428px_1fr] laptop:gap-16 laptop:border-t">
      <Reveal className="flex flex-col gap-6">
        <Intro title={c.title} text={c.text} />
        <div className="flex flex-col gap-4 rounded-lg border border-border-1 bg-page p-5">
          <ChecklistCard bare checks={c.card.checks} className="order-2" />
          <div className="order-1 flex flex-col gap-1">
            <h3 className="text-h4 text-subheadline">{c.card.title}</h3>
            <p className="text-body text-copy">{c.card.text}</p>
          </div>
          <div className="order-3"><CapabilityList items={c.dimensions} /></div>
        </div>
      </Reveal>
      <Reveal delay={0.1} className="relative h-[480px] tablet:h-[600px] laptop:h-auto laptop:min-h-[480px]">
        <MemoWindow m={c.memo} />
      </Reveal>
    </Band>
  );
}

/**
 * Investors "Scoring & Committee Workspace" (1316:736): icon tiles left, intro + card right.
 * Tablet+: tiles in 2 columns (Thesis, Multi-Reviewer | Discussion, Decision). Laptop+: the second column
 * sits 48px higher than the first; tablet: an even 2 × 2 (Drop 17). Mobile: the 4 tiles are a drag slider.
 */
export function CommitteeSection({ c }: { c: { title: string; text: string; card: CardC; sliderLabel: string; tiles: { icon: IconName; title: string; text: string }[] } }) {
  const tile = (t: { icon: IconName; title: string; text: string }, i: number) => (
    <div
      key={t.title}
      className={cn(
        "w-[260px] shrink-0 snap-start tablet:w-auto",
        i < 2 && "laptop:relative laptop:top-12", // first column 48px lower = second column 48px higher
      )}
    >
    <div className="flex h-full flex-col gap-6 rounded-lg border border-border-2 bg-card-on-alt p-6 transition-colors duration-[var(--duration-card-hover)] hover:bg-card-hover tablet:gap-8 tablet:p-8">
      <Icon name={t.icon} tone="blue" />
      <div className="flex flex-col gap-2">
        <h3 className="text-h4 text-subheadline">{t.title}</h3>
        <p className="text-body text-copy">{t.text}</p>
      </div>
    </div>
    </div>
  );
  return (
    <Band tone="alt" innerClassName="grid grid-cols-1 items-center gap-10 laptop:grid-cols-2 laptop:gap-16 laptop:border-t">
      <Reveal className="order-2 min-w-0 laptop:order-1">
        {/* mobile: -ml-2 = left rail line, -mr-[17px] = to the screen edge; grey hides the right rail beside the slider */}
        {/* Drop 23: first tile on the mobile inner line (8 + 20 = 28px from the rail) */}
        <DragScroll label={c.sliderLabel} className="-ml-2 -mr-[17px] bg-section-alt px-7 scroll-px-7 tablet:mx-0 tablet:cursor-auto tablet:overflow-visible tablet:bg-transparent tablet:px-0">
          <div className="flex w-max gap-4 pr-4 tablet:grid tablet:w-auto tablet:grid-flow-col tablet:grid-cols-2 tablet:grid-rows-2 tablet:pr-0 laptop:pb-12">
            {c.tiles.map(tile)}
          </div>
        </DragScroll>
      </Reveal>
      <Reveal delay={0.1} className="order-1 flex flex-col gap-6 laptop:order-2 laptop:gap-8">
        <Intro title={c.title} text={c.text} />
        <ChecklistCard title={c.card.title} text={c.card.text} checks={c.card.checks} />
      </Reveal>
    </Band>
  );
}

/**
 * Investors "Due Diligence & IC Pack" (1316:1577): intro, Website badges (Figma 4152:2642), card left; DD areas
 * list right (items in Body, Drop 17). Laptop+: grey outside the rails, white inside. Area dots 6px.
 */
export function DdSection({ c }: { c: { title: string; text: string; tags: string[]; card: CardC; areas: { icon: IconName; title: string; items: string[] }[] } }) {
  return (
    <Band className="laptop:bg-section-alt" innerClassName="grid items-start gap-10 bg-page laptop:grid-cols-2 laptop:gap-16 laptop:border-t">
      <Reveal className="flex flex-col gap-6">
        <Intro title={c.title} text={c.text} />
        <ul className="flex flex-wrap gap-3 max-tablet:px-inner">
          {c.tags.map((t) => <li key={t}><Badge variant="website">{t}</Badge></li>)}
        </ul>
        <ChecklistCard title={c.card.title} text={c.card.text} checks={c.card.checks} />
      </Reveal>
      <RevealGroup className="flex flex-col" itemClassName="border-b border-divider-1">
        {c.areas.map((a) => (
          <div key={a.title} className="flex items-start gap-4 px-inner py-6 transition-colors duration-[var(--duration-card-hover)] hover:bg-card-hover tablet:px-4">
            <Icon name={a.icon} tone="blue" />
            <div className="flex flex-col gap-1">
              <h3 className="text-h4 text-subheadline">{a.title}</h3>
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-body text-copy">
                {a.items.map((it, i) => (
                  <span key={it} className="inline-flex items-center gap-2">
                    {i > 0 && <span className="size-1.5 rounded-full bg-brand-light-blue" aria-hidden />}
                    {it}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </RevealGroup>
    </Band>
  );
}
