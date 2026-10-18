import type { ReactNode } from "react";
import type { Art } from "@/content/marketing/shared";
import { art } from "@/content/marketing/shared";
import { ArtFill } from "@/components/ui/ArtImage";
import { cn } from "@/lib/utils";

/** Column of the grid rows inside the frame: page-rail margins minus the frame inset (8 / 12px). */
export const brandFrameColumn = "mx-0 tablet:mx-9 laptop:mx-5 desktop:mx-auto desktop:max-w-content";

function Row() {
  return (
    <div className="border-y border-rail-on-brand" aria-hidden>
      <div className={cn(brandFrameColumn, "h-8 border-x border-rail-on-brand tablet:h-12 laptop:h-16")} />
    </div>
  );
}

/**
 * Near-full-width blue rounded band (Startups How It Works 1338:4839, Decoder What People Are Saying 2601:7855).
 * Figma: 8px in from the screen edge on mobile (6 in Figma), 12px from tablet; radius 12 / 32 / 48px
 * (mobile / tablet / desktop); a blue grid row with #258BFF lines at the top and the bottom (2191:118, 1500:865,
 * 1967:4446). Background: the shared blue panel pattern, desktop / tablet / mobile (Drop 18). Children = a transparent Band whose column uses `brandFrameColumn` + `!border-rail-on-brand`.
 */
export function BrandFrame({ image = art.panel, children }: { image?: Art; children: ReactNode }) {
  return (
    <section className="bg-page px-2 tablet:px-3">
      <div className="relative isolate overflow-hidden rounded-md bg-brand-light-blue text-on-brand tablet:rounded-2xl laptop:rounded-3xl">
        <ArtFill art={image} sizes="100vw" className="-z-10 object-cover" />
        <Row />
        {children}
        <Row />
      </div>
    </section>
  );
}
