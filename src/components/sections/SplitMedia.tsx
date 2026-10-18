import Image from "next/image";
import type { SplitMediaContent } from "@/content/marketing/home";
import { Band } from "@/components/layout/Band";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion";
import { Headline } from "./Headline";

/**
 * Isometric product shot + headline and one CTA (Home 3257:1591).
 * Laptop: image | text. Tablet + mobile: text centred on top, image centred underneath.
 */
export function SplitMedia({ c, audience }: { c: SplitMediaContent; audience: "investors" | "founders" }) {
  return (
    <Band innerClassName="grid items-center gap-10 tablet:gap-12 laptop:grid-cols-2 laptop:gap-32">
      <Reveal className="order-2 laptop:order-1">
        <Image src={c.image.src} alt={c.image.alt} width={c.image.width} height={c.image.height} sizes="(min-width: 1280px) 612px, 90vw" className="mx-auto h-auto w-full max-w-[612px]" />
      </Reveal>
      <Reveal delay={0.1} className="order-1 flex flex-col items-center gap-4 text-center max-tablet:px-inner laptop:order-2 laptop:items-start laptop:text-left">
        <Headline lead={c.heading.lead} accent={c.heading.accent} className="items-center text-center laptop:items-start laptop:text-left" />
        <p className="text-body text-copy">{c.text}</p>
        <Button variant={audience === "founders" ? "alternative" : "primary"} size="lg" href={c.cta.href} external={c.cta.external}>{c.cta.label}</Button>
      </Reveal>
    </Band>
  );
}
