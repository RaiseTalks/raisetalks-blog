import { Check } from "lucide-react";
import type { Heading } from "@/content/marketing/shared";
import { Band } from "@/components/layout/Band";
import { Reveal, RevealGroup } from "@/components/motion";
import { Headline } from "./Headline";
import { cn } from "@/lib/utils";

/**
 * Centred headline + 2-column ticked items with hairline rows (Startups AI Advisor 1347:4908).
 * headingTabletFlow: on tablet the two heading parts run on as one text (Drop 16).
 * headingMobileLeft: headline left-aligned below tablet, centred from tablet (Pitch, Drop 21).
 * headingLeftBelowLaptop: left-aligned on mobile and tablet, centred from laptop (Startups AI Advisor, Drop 23).
 */
export function CheckGrid({ heading, items, tone = "page", headingTabletFlow = false, headingMobileLeft = false, headingLeftBelowLaptop = false }: { heading: Heading; items: { title: string; text: string }[]; tone?: "page" | "alt"; headingTabletFlow?: boolean; headingMobileLeft?: boolean; headingLeftBelowLaptop?: boolean }) {
  return (
    <Band tone={tone} innerClassName="flex flex-col gap-10 laptop:gap-12">
      <Reveal className="max-tablet:px-inner"><Headline align="center" lead={heading.lead} accent={heading.accent} tabletFlow={headingTabletFlow} className={headingLeftBelowLaptop ? "items-start text-left laptop:items-center laptop:text-center" : headingMobileLeft ? "items-start text-left tablet:items-center tablet:text-center" : undefined} /></Reveal>
      <RevealGroup className="mx-auto grid w-full max-w-[1200px] tablet:grid-cols-2 tablet:gap-x-16" itemClassName={cn("border-b tablet:[&:nth-last-child(-n+2)]:border-b-0 last:border-b-0", tone === "alt" ? "border-border-2" : "border-divider-1")}>
        {items.map((it) => (
          <div key={it.title} className="flex h-full gap-3 px-inner py-6 transition-colors duration-[var(--duration-card-hover)] hover:bg-card-hover tablet:px-4">
            <Check className="mt-1 size-5 shrink-0 text-good" strokeWidth={2} aria-hidden />
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
