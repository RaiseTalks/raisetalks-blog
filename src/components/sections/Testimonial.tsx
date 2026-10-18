import type { CSSProperties } from "react";
import Image from "next/image";
import type { Cta } from "@/content/marketing/shared";
import { Button } from "@/components/ui/Button";
import { LinkedInIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/motion";

export type TestimonialContent = {
  quote: string; quoteStrong?: string;
  stats: { value: string; unit?: string; label: string }[];
  name: string; role: string; cta?: Cta;
  portrait: { src: string; width: number; height: number; alt: string };
  background: string;
};

/**
 * Founder quote panel (Home 3257:1122): blue textured card, cut-out portrait bottom-left,
 * white glass panel with quote, stats and signature.
 * Laptop+: 2-column grid (portrait | panel ≤866px). The portrait sits bottom-left and overlaps the
 * panel by 24px. It fills its column width but never gets taller than the card minus its 36px top
 * padding, so it always stays inside the blue card (container query on the column box).
 * Tablet: portrait on top inside the card. Mobile: it breaks 24px out above the card; stats in glass tiles.
 */
export function Testimonial({ t }: { t: TestimonialContent }) {
  return (
    <Reveal>
      <figure className="relative isolate flex flex-col items-center rounded-lg bg-brand-light-blue px-4 pb-4 pt-6 tablet:px-6 tablet:pb-6 laptop:grid laptop:grid-cols-[minmax(0,1fr)_min(866px,64%)] laptop:items-end laptop:p-9 laptop:pl-0">
        {/* background clipped to the card, so the portrait can break out on mobile */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-lg" aria-hidden>
          <Image src={t.background} alt="" fill sizes="(min-width: 1680px) 1352px, 100vw" className="object-cover" />
        </div>
        <div className="relative -mt-12 w-[280px] tablet:mt-0 tablet:w-[300px] laptop:-mb-9 laptop:-mr-6 laptop:w-auto laptop:self-stretch laptop:[container-type:size]">
          <div
            className="relative laptop:absolute laptop:bottom-0 laptop:left-0 laptop:w-[var(--portrait-w)] laptop:overflow-hidden laptop:rounded-bl-lg"
            style={{ "--portrait-w": `min(100%, calc(100cqh * ${t.portrait.width} / ${t.portrait.height}))` } as CSSProperties}
          >
            <Image src={t.portrait.src} alt={t.portrait.alt} width={t.portrait.width} height={t.portrait.height} sizes="(min-width: 1280px) 500px, 300px" className="h-auto w-full" />
          </div>
        </div>
        <div className="relative flex w-full flex-col gap-12 rounded-sm border border-glass-on-brand-border bg-glass-on-brand p-5 text-on-brand backdrop-blur-sm tablet:p-6 laptop:gap-24 laptop:p-9">
          <div className="flex flex-col gap-8 laptop:gap-12">
            <blockquote className="text-h4">
              {t.quote} {t.quoteStrong && <strong className="font-semibold">{t.quoteStrong}</strong>}
            </blockquote>
            <dl className="grid grid-cols-2 gap-2 tablet:flex tablet:gap-12">
              {t.stats.map((s, i) => (
                <div key={s.label} className={`flex flex-col gap-px rounded-sm bg-glass-on-brand p-3 tablet:bg-transparent tablet:p-0 ${i === 2 ? "col-span-2" : ""}`}>
                  <dt className="order-2 text-body text-on-brand-muted">{s.label}</dt>
                  <dd className="order-1 text-h3">
                    {s.value}
                    {s.unit && <span className={`text-h4 text-on-brand-muted ${s.unit.length > 1 ? "ml-1.5" : ""}`}>{s.unit}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <figcaption className="flex flex-col items-start gap-4 tablet:flex-row tablet:items-end tablet:justify-between">
            <span className="flex flex-col gap-1">
              <span className="text-body font-semibold">{t.name}</span>
              <span className="text-footnote text-on-brand-muted">{t.role}</span>
            </span>
            {t.cta && (
              <Button variant="primary" size="sm" href={t.cta.href} external={t.cta.external} iconLeft={<LinkedInIcon />}>
                {t.cta.label}
              </Button>
            )}
          </figcaption>
        </div>
      </figure>
    </Reveal>
  );
}
