import type { Heading, IconName } from "@/content/marketing/shared";
import { Band } from "@/components/layout/Band";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion";
import { CheckList } from "./Checklist";
import { Headline } from "./Headline";
import { cn } from "@/lib/utils";

type Tall = { icon: IconName; title: string; text: string; checks: string[]; more?: string };
type Card = { icon: IconName; title: string; lines: string[]; checks?: string[] };

function Shell({ icon, title, children }: { icon: IconName; title: string; children: React.ReactNode }) {
  return (
    <article className="flex h-full flex-col gap-6 rounded-lg border border-border-2 bg-card-on-alt p-6 transition-colors duration-[var(--duration-card-hover)] hover:bg-card-hover tablet:gap-8 tablet:p-8">
      <Icon name={icon} tone="blue" />
      <div className="flex flex-1 flex-col gap-3">
        <h3 className="text-h4 text-subheadline">{title}</h3>
        {children}
      </div>
    </article>
  );
}

/**
 * Investors "What You Get with RaiseTalks" heading (1296:339). "RaiseTalks" in the brand gradient.
 * No bottom padding: the cards band below gives the gap (no stacking since Drop 17).
 */
export function BentoHeading({ heading }: { heading: Heading }) {
  return (
    <Band tone="alt" innerClassName="pb-0 tablet:pb-0 laptop:pb-0">
      <Reveal className="max-tablet:px-inner"><Headline align="center" layout="inline" lead={heading.lead} accent={heading.accent} accentFont="sans" /></Reveal>
    </Band>
  );
}

/**
 * Investors "What You Get" cards (1296:339 · tablet 1433:1584): grey band, white cards.
 * Every line is a ticked item, except an intro line that leads into a tick list (IC Prep).
 * Laptop: tall scoring | Data Rooms + Shortlist | IC Prep + Fees.
 * Tablet: AI Readiness + IC Prep | Data Rooms + Shortlist + Fees; the last card of the shorter column stretches.
 * Mobile: one column, scoring → Data Rooms → Shortlist → IC Prep → Fees.
 * (Cards that move column per breakpoint are rendered twice, one copy display:none.)
 */
export function BentoCards({ tall, cards }: { tall: Tall; cards: Card[] }) {
  const [a, b, c, d] = cards;
  const small = (k: Card) => (
    <Shell icon={k.icon} title={k.title}>
      {k.checks ? (
        <>
          {k.lines.map((l) => <p key={l} className="text-body text-copy">{l}</p>)}
          <CheckList items={k.checks} tight className="mt-2" />
        </>
      ) : (
        <CheckList items={k.lines} tight />
      )}
    </Shell>
  );
  const cell = "grid"; // single cell: the card fills its slot
  const tabletOnly = "hidden tablet:grid tablet:flex-1 laptop:hidden";
  return (
    <Band tone="alt">
      <Reveal className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        <div className="flex flex-col gap-4">
          <div className={cn(cell, "laptop:flex-1")}>
            <Shell icon={tall.icon} title={tall.title}>
              <p className="text-body text-copy">{tall.text}</p>
              <CheckList items={tall.checks} tight className="mt-2" />
              {tall.more && <p className="mt-auto pt-6 text-body text-copy">{tall.more}</p>}
            </Shell>
          </div>
          <div className={tabletOnly}>{small(c)}</div>
        </div>
        <div className="flex flex-col gap-4 laptop:grid">
          <div className={cell}>{small(a)}</div>
          <div className={cell}>{small(b)}</div>
          <div className={tabletOnly}>{small(d)}</div>
        </div>
        <div className="grid gap-4 tablet:hidden laptop:grid">
          <div className={cell}>{small(c)}</div>
          <div className={cell}>{small(d)}</div>
        </div>
      </Reveal>
    </Band>
  );
}
