"use client";

import { useState } from "react";
import Image from "next/image";
import { Marquee } from "@/components/motion/Marquee";
import { Lightbox, type LightboxPhoto } from "@/components/ui/Lightbox";
import { cn } from "@/lib/utils";

/** Same pace as the backers & partners logo strip (LogoMarquee measures 26-35 px/s across breakpoints), px per second. */
const SPEED = 32;

/**
 * About photo rows (1285:984 · tablet 1433:1065 · mobile 1936:357): two endless strips under
 * "Why we Build." Row 1 moves left, row 2 moves right. Each row = A B C + a copy of B, rendered
 * twice for the loop. Never pauses, draggable; a click (not a drag) opens the photo in a lightbox.
 * Frames alternate blue / yellow per photo, as in Figma. No hover lift.
 */
export function PhotoRows({ photos, label, openLabel, closeLabel }: {
  photos: LightboxPhoto[]; label: string; openLabel: string; closeLabel: string;
}) {
  const [open, setOpen] = useState<{ photo: LightboxPhoto; from: HTMLElement } | null>(null);
  const rows = [photos.slice(0, 3), photos.slice(3, 6)];

  return (
    <section aria-label={label} className="bg-section-alt pb-10 tablet:pb-12 laptop:pb-16">
      <div className="flex flex-col gap-4 tablet:gap-6 desktop:gap-8">
        {rows.map((row, r) => {
          // A B C + copy of B; frame colour belongs to the photo (row 1 blue first, row 2 yellow first)
          const set = [0, 1, 2, 1].map((i, k) => ({ p: row[i], blue: (r + i) % 2 === 0, dup: k === 3 }));
          const strip = (hidden: boolean) => (
            <ul className="flex shrink-0 gap-4 pr-4 tablet:gap-6 tablet:pr-6 desktop:gap-8 desktop:pr-8" aria-hidden={hidden || undefined}>
              {set.map(({ p, blue, dup }, k) => {
                const ghost = hidden || dup;
                return (
                  <li key={`${p.src}-${k}`} className="shrink-0">
                    <button
                      type="button"
                      tabIndex={ghost ? -1 : undefined}
                      aria-hidden={dup && !hidden ? true : undefined}
                      aria-label={ghost ? undefined : `${openLabel}: ${p.alt}`}
                      onClick={(e) => setOpen({ photo: p, from: e.currentTarget })}
                      className={cn(
                        "relative block h-[120px] w-[220px] cursor-zoom-in overflow-hidden rounded-lg border-2 tablet:h-[163px] tablet:w-[224px] laptop:h-[227px] laptop:w-[400px] desktop:h-[318px] desktop:w-[560px]",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light-blue",
                        blue ? "border-brand-light-blue" : "border-brand-yellow",
                      )}
                    >
                      <Image src={p.src} alt={ghost ? "" : p.alt} fill draggable={false} sizes="(min-width: 1680px) 560px, (min-width: 1280px) 400px, 224px" className="object-cover" />
                    </button>
                  </li>
                );
              })}
            </ul>
          );
          return (
            <Marquee key={r} speed={SPEED} reverse={r === 1} fade={false}>
              {strip(false)}
              {strip(true)}
            </Marquee>
          );
        })}
      </div>
      <Lightbox photo={open?.photo ?? null} onClose={() => setOpen(null)} closeLabel={closeLabel} returnFocus={open?.from} />
    </section>
  );
}
