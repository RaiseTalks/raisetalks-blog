import type { Heading } from "@/content/marketing/shared";
import { Band } from "@/components/layout/Band";
import { Badge } from "@/components/ui/Badge";
import { Reveal, RevealGroup } from "@/components/motion";
import { Headline } from "./Headline";

export type PitchTeaserContent = {
  badge: string; heading: Heading; text: string;
  stats: { value: string; label: string }[];
  items: { title: string; text: string }[];
};

/**
 * "Attend our Pitch Competitions" (Home 3257:1340): intro + stats left, 2×2 hairline grid right.
 * Tablet: stats left-aligned, 64px apart. Laptop: the 3 stats in one row, 32px apart. Mobile (1405:677):
 * stats as white tiles (2 + 1 full width). Item titles are H4 everywhere (Medium on mobile), 8px above the text.
 * Drop 23: mobile intro text, stat tiles and item cells share the inner line (20px); item cells half as tall on
 * mobile (py-4); stats 80px apart on tablet, 40px on laptop; stats → items gap 32px below laptop.
 */
export function PitchTeaser({ c }: { c: PitchTeaserContent }) {
  return (
    <Band innerClassName="grid items-center gap-8 laptop:grid-cols-[480px_1fr] laptop:gap-32">
      <Reveal className="flex flex-col gap-10 laptop:gap-16 laptop:py-16">
        <div className="flex flex-col gap-4 max-tablet:px-inner">
          <Badge variant="neutral" dot>{c.badge}</Badge>
          <Headline lead={c.heading.lead} accent={c.heading.accent} />
          <p className="text-body text-copy">{c.text}</p>
        </div>
        <dl className="grid grid-cols-2 gap-3 tablet:flex tablet:gap-20 laptop:gap-10">
          {c.stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col gap-px rounded-sm border border-border-1 bg-page px-inner py-3 tablet:rounded-none tablet:border-0 tablet:bg-transparent tablet:p-0 ${i === 2 ? "col-span-2" : ""}`}>
              <dt className="order-2 whitespace-pre-line text-body text-copy">{s.label}</dt>
              <dd className="order-1 text-h3 text-brand-light-blue">{s.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
      <RevealGroup className="grid tablet:grid-cols-2" itemClassName="border-b border-divider-1 tablet:odd:border-r tablet:[&:nth-last-child(-n+2)]:border-b-0 last:border-b-0">
        {c.items.map((it) => (
          <div key={it.title} className="flex h-full flex-col gap-2 px-inner py-4 transition-colors duration-[var(--duration-card-hover)] hover:bg-card-hover tablet:p-10 laptop:p-12">
            <h3 className="text-h4 text-subheadline">{it.title}</h3>
            <p className="text-body text-copy">{it.text}</p>
          </div>
        ))}
      </RevealGroup>
    </Band>
  );
}
