import type { Cta, Heading } from "@/content/marketing/shared";
import { Band } from "@/components/layout/Band";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion";
import { Headline } from "./Headline";
import { VideoEmbed } from "./VideoEmbed";

/** Startups "Your Next Investor Meeting" (2715:19300): centred intro + YouTube player. White, rails at 1024 on laptop+ (Drop 14). */
export function VideoSection({ c }: { c: { heading: Heading; text: string; cta: Cta; title: string; youtubeId: string; fallbackHref: string; poster: string } }) {
  return (
    <Band width="medium" innerClassName="flex flex-col items-center gap-10">
      <Reveal className="flex flex-col items-center gap-4 text-center max-tablet:px-inner">
        <Headline align="center" lead={c.heading.lead} accent={c.heading.accent} />
        <p className="max-w-[640px] text-body text-copy">{c.text}</p>
        <Button variant="ghost" size="lg" href={c.cta.href} external={c.cta.external} className="mt-2">{c.cta.label}</Button>
      </Reveal>
      <Reveal delay={0.1} className="w-full"><VideoEmbed youtubeId={c.youtubeId} title={c.title} poster={c.poster} fallbackHref={c.fallbackHref} /></Reveal>
    </Band>
  );
}
