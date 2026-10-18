import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { McpContent } from "@/content/marketing/home";
import { Band } from "@/components/layout/Band";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup } from "@/components/motion";
import { CapabilityList } from "./CapabilityList";
import { DragScroll } from "@/components/ui/DragScroll";
import { CopyField } from "./CopyField";
import { Headline } from "./Headline";

/**
 * "Right inside Claude" (Home 3257:1486 / 2781:4595): intro + capability list, then a grey
 * 3-step panel with the RaiseTalks×Claude icons overlapping its top edge.
 * No top padding: it starts right under the sticky audience switch.
 * Below 1280 the 3 steps are a draggable slider inside the grey panel (75% / 65% wide, next one peeks).
 * Mobile: icons centred, stretched across the panel with 64px each side.
 */
export function McpSection({ c, icons, audience }: { c: McpContent; icons: { src: string; width: number; height: number; alt: string }; audience: "investors" | "founders" }) {
  const primaryVariant = audience === "founders" ? "alternative" : "primary";
  return (
    <Band innerClassName="flex flex-col gap-16 pt-0 tablet:pt-0 laptop:pt-0">
      <div className="grid gap-8 laptop:grid-cols-2 laptop:gap-16">
        <Reveal className="flex flex-col gap-4 max-tablet:px-inner">
          <Headline lead={c.heading.lead} accent={c.heading.accent} />
          <p className="max-w-[513px] text-body text-copy">{c.text}</p>
        </Reveal>
        <Reveal delay={0.1}><CapabilityList items={c.capabilities} /></Reveal>
      </div>

      <div className="relative mt-12 rounded-lg border border-border-2 bg-section-alt px-5 pb-8 pt-24 tablet:mt-10 tablet:px-8 tablet:pt-32 laptop:px-12 laptop:pb-12">
        <Image src={icons.src} alt={icons.alt} width={icons.width} height={icons.height} className="absolute left-16 right-16 top-0 h-auto w-[calc(100%-8rem)] -translate-y-1/2 tablet:right-auto tablet:-top-[60px] tablet:left-9 tablet:w-[266px] tablet:translate-y-0" />
        <DragScroll label="Steps" className="-mx-5 px-5 scroll-px-5 tablet:-mx-8 tablet:px-8 tablet:scroll-px-8 laptop:mx-0 laptop:cursor-auto laptop:overflow-visible laptop:px-0">
        <RevealGroup className="flex after:hidden after:w-8 after:shrink-0 tablet:after:block laptop:grid laptop:grid-cols-3 laptop:after:hidden" itemClassName="w-[75%] shrink-0 snap-start pr-6 last:pr-0 [&:not(:first-child)]:border-l [&:not(:first-child)]:border-border-1 [&:not(:first-child)]:pl-6 tablet:w-[65%] laptop:w-auto laptop:pr-12 laptop:[&:not(:first-child)]:pl-12">
          {c.steps.map((s, i) => (
            <div key={s.title} className="flex h-full flex-col justify-between gap-6">
              <div className="flex flex-col gap-6">
                <span
                  className="flex size-[42px] items-center justify-center rounded-full border-b-3 text-h4 font-semibold text-on-brand"
                  style={{ backgroundImage: "var(--audience-gradient)", borderColor: audience === "founders" ? "var(--color-alt-edge)" : "var(--color-primary-edge)" }}
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-h4 text-subheadline"><span className="sr-only">Step {i + 1}: </span>{s.title}</h3>
                  <p className="text-body text-copy">{s.text}</p>
                </div>
              </div>
              {s.action?.kind === "button" && (
                <Button variant={primaryVariant} size="lg" href={s.action.cta.href} external={s.action.cta.external} className="w-full tablet:max-w-[376px]">{s.action.cta.label}</Button>
              )}
              {s.action?.kind === "ghost" && (
                <Button variant="ghost" size="lg" fullWidth href={s.action.cta.href} external={s.action.cta.external} iconRight={<ExternalLink className="size-4" />}>{s.action.cta.label}</Button>
              )}
              {s.action?.kind === "copy" && <CopyField value={s.action.value} copiedLabel={s.action.copiedLabel} />}
            </div>
          ))}
        </RevealGroup>
        </DragScroll>
      </div>
    </Band>
  );
}
