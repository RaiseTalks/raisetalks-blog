import Image from "next/image";
import type { Heading } from "@/content/marketing/shared";
import type { FeatureRow } from "@/content/marketing/startups";
import { Band } from "@/components/layout/Band";
import { Reveal } from "@/components/motion";
import { ChecklistCard } from "./Checklist";
import { Headline } from "./Headline";
import { StackSection } from "./StackSection";
import { cn } from "@/lib/utils";

/**
 * Startups "Everything you need to walk in ready" (3420:16657): heading + note, then 8 product rows
 * alternating white / grey with the image switching sides. Tablet/mobile: image first.
 * Laptop+ (Drop 14): StackSection. The heading band is pinned under the navbar (padding halved, 32px)
 * and the rows stack; the whole section is grey outside the rails, rows alternate white / grey inside.
 * Drop 16: the last row (Data Room MCP) pins under the heading and leaves with it; the line between rows
 * runs only between the rails (top border of each row's column), not across the outer margins.
 */
export function FeatureRows({ heading, note, rows }: { heading: Heading; note: string; rows: FeatureRow[] }) {
  return (
    <StackSection
      pinLast
      outerLines={false}
      head={
        <Band tone="alt" innerClassName="flex flex-col gap-4 tablet:flex-row tablet:items-end tablet:justify-between laptop:py-8">
          <Reveal className="max-tablet:px-inner"><Headline lead={heading.lead} accent={heading.accent} /></Reveal>
          <p className="max-w-[240px] text-body text-copy max-tablet:box-content max-tablet:px-inner tablet:text-right">{note}</p>
        </Band>
      }
    >
      {rows.map((r, i) => {
        const white = i % 2 === 0;
        const imageRight = i % 2 === 0;
        return (
          <Band
            key={r.title}
            tone={white ? "page" : "alt"}
            className={cn(white && "laptop:bg-section-alt")}
            innerClassName={cn("grid items-center gap-8 laptop:grid-cols-[1fr_620px] laptop:gap-16 desktop:grid-cols-[668px_620px]", white && "bg-page", i > 0 && "laptop:border-t")}
          >
            <Reveal className={cn("flex flex-col gap-4", !imageRight && "laptop:order-2")}>
              <div className="flex flex-col gap-1 max-tablet:px-inner">
                <h3 className="text-h3 text-subheadline">{r.title}</h3>
                <p className="text-h4-alt text-subheadline">{r.subtitle}</p>
              </div>
              <p className="text-body text-copy max-tablet:px-inner">{r.text}</p>
              <ChecklistCard bare checks={r.checks} on={white ? "page" : "alt"} />
            </Reveal>
            <Reveal delay={0.1} className={cn("order-first laptop:order-none", !imageRight && "laptop:order-1")}>
              <Image src={r.image.src} alt={r.image.alt} width={r.image.width} height={r.image.height} sizes="(min-width: 1280px) 620px, 90vw" className="h-auto w-full rounded-md" />
            </Reveal>
          </Band>
        );
      })}
    </StackSection>
  );
}
