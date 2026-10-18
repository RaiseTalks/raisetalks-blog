import type { ArtImg, Heading } from "@/content/marketing/shared";
import { ArtSized } from "@/components/ui/ArtImage";
import { Band } from "@/components/layout/Band";
import { Reveal } from "@/components/motion";
import { Headline } from "./Headline";

/** Headline left, paragraph right, wide illustration below (Investors "Frustration Patterns" 1296:319); own tablet / mobile file (Drop 18). */
export function IntroMedia({ c }: { c: { heading: Heading; text: string; image: ArtImg } }) {
  return (
    <Band innerClassName="flex flex-col gap-10 laptop:gap-16">
      <Reveal className="grid gap-4 max-tablet:px-inner laptop:grid-cols-[1fr_minmax(0,560px)] laptop:items-start laptop:gap-16">
        <Headline lead={c.heading.lead} accent={c.heading.accent} />
        <p className="text-body text-copy">{c.text}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <ArtSized art={c.image} sizes="(min-width: 1680px) 1352px, 95vw" className="h-auto w-full" />
      </Reveal>
    </Band>
  );
}
