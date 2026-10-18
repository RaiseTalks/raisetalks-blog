import type { Art } from "@/content/marketing/shared";
import { Band } from "@/components/layout/Band";
import { DragScroll } from "@/components/ui/DragScroll";
import { ArtFill } from "@/components/ui/ArtImage";
import { Reveal, RevealGroup } from "@/components/motion";
import { cn } from "@/lib/utils";
import { BrandFrame, brandFrameColumn } from "./BrandFrame";

export type ProcessStep = { title: string; lead?: string; strong?: string; leadEnd?: string; text: string };

/**
 * Numbered steps on the blue band (Startups "How RaiseTalks Works" 1338:4839; Pitch "The Process").
 * Big numbers joined by a thin line, each over a translucent dark-blue card.
 * variant "detailed" = italic title + lead + text (Startups); "simple" = title + text (Pitch).
 * framed (Startups, Drop 14/16): BrandFrame — near-full-width rounded rectangle with blue grid rows top and
 * bottom (8px in from the screen edge on mobile, 12px from tablet) whose rails still line up with
 * the page rails (Figma rail colour #258BFF); yellow lines between the numbers (Figma 1500:869); cards get the
 * Figma 4px dark-blue bottom edge (Drop 15); below laptop the steps are a drag slider.
 * Pitch "The Process" uses the same frame with 4 simple steps (4 columns on laptop, Drop 21).
 */
export function ProcessSteps({
  heading, sub, steps, image, align = "center", variant = "detailed", framed = false, sliderLabel,
}: {
  heading: string; sub?: string; steps: ProcessStep[]; image?: Art; align?: "center" | "left"; variant?: "detailed" | "simple";
  framed?: boolean; sliderLabel?: string;
}) {
  const step = (s: ProcessStep, i: number) => (
    <div key={s.title} className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="text-h1 leading-none">{String(i + 1).padStart(2, "0")}</span>
        {i < steps.length - 1 && <span className={cn("h-px flex-1", framed ? "bg-brand-yellow" : "hidden bg-on-brand/60 laptop:block")} aria-hidden />}
      </div>
      <article className={cn("flex flex-1 flex-col gap-6 rounded-md bg-brand-dark-blue/30 p-5 tablet:p-6", framed ? "border-b-4 border-brand-dark-blue" : "border-b border-brand-dark-blue/50")}>
        {variant === "detailed" ? (
          <>
            <h3 className="text-h3-alt text-on-brand">{s.title}</h3>
            <div className="flex flex-col gap-4">
              {s.lead && <p className="text-h4">{s.lead}{s.strong && <strong className="font-semibold">{s.strong}</strong>}{s.leadEnd}</p>}
              <p className="text-body text-on-brand-muted">{s.text}</p>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-1">
            <h3 className="text-h4 text-on-brand">{s.title}</h3>
            <p className="text-body text-on-brand-muted">{s.text}</p>
          </div>
        )}
      </article>
    </div>
  );

  const intro = (
    <Reveal className={cn("flex flex-col gap-1", align === "center" ? "items-center text-center" : "items-start")}>
      <h2 className="text-h2 text-on-brand">{heading}</h2>
      {sub && <p className="text-body text-on-brand-muted">{sub}</p>}
    </Reveal>
  );

  if (!framed) {
    return (
      <section className="relative isolate overflow-hidden bg-brand-light-blue text-on-brand">
        {image && <ArtFill art={image} sizes="100vw" className="-z-10 object-cover" />}
        <Band tone="page" className="bg-transparent" innerClassName="!border-glass-on-brand flex flex-col gap-10 laptop:gap-14">
          {intro}
          <RevealGroup className={cn("grid gap-8 tablet:gap-6", steps.length === 4 ? "tablet:grid-cols-2 laptop:grid-cols-4" : "laptop:grid-cols-3")}>
            {steps.map(step)}
          </RevealGroup>
        </Band>
      </section>
    );
  }

  return (
    <BrandFrame image={image}>
        {/* column margins minus the rectangle inset (8 / 12px) keep the rails on the page rails */}
        <Band tone="page" className="bg-transparent" innerClassName={cn("!border-rail-on-brand flex flex-col gap-10 laptop:gap-14", brandFrameColumn)}>
          {intro}
          {/* below laptop: slider from rail to rail (-mx = band padding), next card peeks. Drop 23: the first card starts
              at band padding + card padding (mobile 8 + 20 = 28px, tablet 32 + 24 = 56px), not at the band padding */}
          <DragScroll label={sliderLabel} className="-mx-2 px-7 scroll-px-7 tablet:-mx-8 tablet:px-14 tablet:scroll-px-14 laptop:mx-0 laptop:cursor-auto laptop:overflow-visible laptop:px-0">
            <RevealGroup
              className={cn("flex gap-4 after:block after:w-0.5 after:shrink-0 tablet:gap-6 tablet:after:w-2 laptop:grid laptop:after:hidden", steps.length === 4 ? "laptop:grid-cols-4" : "laptop:grid-cols-3")}
              itemClassName="w-[85%] shrink-0 snap-start tablet:w-[55%] laptop:w-auto"
            >
              {steps.map(step)}
            </RevealGroup>
          </DragScroll>
        </Band>
    </BrandFrame>
  );
}
