import type { Art, CtaBandContent } from "@/content/marketing/shared";
import { art } from "@/content/marketing/shared";
import { ArtFill } from "@/components/ui/ArtImage";
import { Band, GridGap } from "@/components/layout/Band";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion";
import { Headline } from "./Headline";
import { cn } from "@/lib/utils";

/**
 * Dark closing CTA used on every page (Home 3257:1384): ink band, grid rows above/below.
 * Background: the same desktop / tablet / mobile files on every page (Drop 18).
 * Buttons in one row (Drop 15). On a phone too narrow for both, they wrap to 2 rows and each goes full
 * width (flex-auto: a button grows to fill its line; from tablet natural width, centred).
 * `float` (laptop+ only): centred on the band's top edge, half of it above (Decoder QR, 320px);
 * the content gets room for the lower half.
 */
export function CtaBand({ c, image = art.cta, top, float }: { c: CtaBandContent; image?: Art; top?: React.ReactNode; float?: React.ReactNode }) {
  return (
    <div className="on-dark relative">
      {float && <div className="absolute left-1/2 top-0 z-10 hidden -translate-x-1/2 -translate-y-1/2 laptop:block">{float}</div>}
      <GridGap tone="ink" />
      <Band tone="ink" pad={false}>
        <div className={cn("relative isolate overflow-hidden px-4 py-14 tablet:p-16", float && "laptop:pt-36")}>
          <ArtFill art={image} sizes="(min-width: 1680px) 1480px, 100vw" className="-z-10 object-cover" />
          <Reveal className="flex flex-col items-center gap-10 text-center laptop:gap-12">
            {top}
            <div className="flex flex-col items-center gap-3">
              <Headline tone="dark" align="center" lead={c.heading.lead} accent={c.heading.accent} />
              <p className="max-w-[540px] text-body text-ink-copy">{c.text}</p>
            </div>
            <div className="flex w-full flex-wrap justify-center gap-4 tablet:w-auto tablet:gap-[18px]">
              <Button variant="primary" size="lg" href={c.primary.href} external={c.primary.external} className="flex-auto tablet:flex-none">{c.primary.label}</Button>
              {c.secondary && <Button variant="ghost" size="lg" href={c.secondary.href} external={c.secondary.external} className="flex-auto tablet:flex-none">{c.secondary.label}</Button>}
            </div>
          </Reveal>
        </div>
      </Band>
      <GridGap tone="ink" />
    </div>
  );
}
