import type { FeatureGridContent } from "@/content/marketing/home";
import { Band } from "@/components/layout/Band";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup } from "@/components/motion";
import { Headline } from "./Headline";
import { cn } from "@/lib/utils";

/**
 * Headline + CTAs (left-aligned below 1280, centred from laptop; full-width buttons on mobile),
 * then icon cells divided by hairlines (Home 3257:1553 3-up, 2602:4588 2×2). Cells brighten on hover.
 */
export function FeatureGrid({ c, audience }: { c: FeatureGridContent; audience: "investors" | "founders" }) {
  const primaryVariant = audience === "founders" ? "alternative" : "primary";
  const line = c.tone === "alt" ? "border-border-2" : "border-divider-1";
  return (
    <Band tone={c.tone} innerClassName="flex flex-col gap-12 laptop:gap-16">
      <Reveal className="flex flex-col items-start gap-4 text-left max-tablet:px-inner laptop:items-center laptop:text-center">
        <Headline lead={c.heading.lead} accent={c.heading.accent} className="laptop:items-center laptop:text-center" />
        <p className="text-body text-copy">{c.text}</p>
        <div className="mt-2 flex w-full flex-col gap-4 tablet:w-auto tablet:flex-row tablet:flex-wrap tablet:gap-6 laptop:justify-center">
          <Button variant={primaryVariant} size="lg" href={c.primary.href} external={c.primary.external} className="w-full tablet:w-auto">{c.primary.label}</Button>
          {c.secondary && <Button variant="ghost" size="lg" href={c.secondary.href} external={c.secondary.external} className="w-full tablet:w-auto">{c.secondary.label}</Button>}
        </div>
      </Reveal>
      <RevealGroup
        className={cn("grid", c.columns === 3 ? "laptop:grid-cols-3" : "tablet:grid-cols-2")}
        itemClassName={cn(
          "border-b last:border-b-0", line,
          c.columns === 3
            ? "laptop:border-b-0 laptop:[&:not(:last-child)]:border-r"
            : "tablet:odd:border-r tablet:[&:nth-last-child(-n+2)]:border-b-0",
        )}
      >
        {c.items.map((it) => (
          <div key={it.title} className={cn("flex h-full items-start gap-5 px-inner py-8 transition-colors duration-[var(--duration-card-hover)] tablet:gap-6 tablet:p-10 laptop:p-12", c.tone === "alt" ? "hover:bg-card-on-alt" : "hover:bg-card-hover")}>
            <Icon name={it.icon} />
            <div className="flex flex-col gap-1">
              <h3 className="text-h4 text-subheadline">{it.title}</h3>
              <p className="text-body text-copy">{it.text}</p>
            </div>
          </div>
        ))}
      </RevealGroup>
    </Band>
  );
}
