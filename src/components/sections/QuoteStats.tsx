import Image from "next/image";
import type { Art } from "@/content/marketing/shared";
import { ArtFill } from "@/components/ui/ArtImage";
import { Band } from "@/components/layout/Band";
import { Reveal } from "@/components/motion";

/**
 * Centred portrait, italic quote, signature and 3 stats (Investors 1296:1107).
 * Stats (Drop 17): no dividers on tablet/desktop; mobile = white tiles, 2 + 1 full width, like Home Pitch Competitions.
 * Drop 23: every stat centred (equal columns from tablet, so they read equally spaced); labels may break with \n.
 */
export function QuoteStats({ c }: { c: { text: string; name: string; role: string; portrait: { src: string; width: number; height: number; alt: string }; background: Art; stats: { value: string; label: string }[] } }) {
  return (
    <Band pad={false} innerClassName="relative isolate overflow-hidden">
      <ArtFill art={c.background} sizes="(min-width: 1680px) 1480px, 100vw" className="-z-10 object-cover" />
      <Reveal className="mx-auto flex max-w-[720px] flex-col items-center gap-8 px-4 py-12 text-center tablet:py-16">
        <Image src={c.portrait.src} alt={c.portrait.alt} width={c.portrait.width} height={c.portrait.height} sizes="240px" className="h-auto w-[180px] tablet:w-[240px]" />
        <figure className="flex flex-col items-center gap-6">
          <blockquote className="text-h4 italic text-subheadline">{c.text}</blockquote>
          <figcaption className="flex flex-col gap-0.5">
            <span className="text-body font-semibold text-headline">{c.name}</span>
            <span className="text-footnote text-muted">{c.role}</span>
          </figcaption>
        </figure>
        <dl className="mt-4 grid w-full grid-cols-2 gap-3 tablet:grid-cols-3 tablet:gap-0">
          {c.stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col gap-px items-center rounded-sm border border-border-1 bg-page p-3 text-center tablet:gap-1 tablet:rounded-none tablet:border-0 tablet:bg-transparent tablet:p-0 tablet:px-6 ${i === 2 ? "col-span-2 tablet:col-span-1" : ""}`}>
              <dt className="order-2 whitespace-pre-line text-body text-copy">{s.label}</dt>
              <dd className="order-1 text-h3 text-brand-light-blue">{s.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Band>
  );
}
