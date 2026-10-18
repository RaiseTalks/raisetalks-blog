import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The site's grid rhythm (Figma: every section = full-width band + 1480 column with
 * 1px lines left/right). Mobile line at 8px, tablet 48px, laptop 32px, ≥1680 centred 1480.
 */
const tones = {
  page: { band: "bg-page", line: "border-rail-1" },
  alt: { band: "bg-section-alt", line: "border-rail-2" },
  ink: { band: "bg-ink text-ink-copy", line: "border-ink-border" },
} as const;
export type BandTone = keyof typeof tones;

const column = "mx-2 tablet:mx-12 laptop:mx-8 desktop:mx-auto desktop:max-w-content border-x";
/** width "medium": rails at 1024 from laptop up, centred like the hero column (Drop 14: banners, video, FAQ). */
const columnMedium = "mx-2 tablet:mx-12 laptop:mx-auto laptop:max-w-medium border-x";
const padding = "px-2 py-10 tablet:px-8 tablet:py-12 laptop:p-16";

export function Band({
  tone = "page", width = "content", pad = true, id, className, innerClassName, children, as: Tag = "section", labelledBy,
}: {
  tone?: BandTone; width?: "content" | "medium"; pad?: boolean; id?: string; className?: string; innerClassName?: string;
  children: ReactNode; as?: "section" | "div"; labelledBy?: string;
}) {
  const t = tones[tone];
  return (
    <Tag id={id} aria-labelledby={labelledBy} className={cn(t.band, className)}>
      <div className={cn(width === "medium" ? columnMedium : column, t.line, pad && padding, innerClassName)}>{children}</div>
    </Tag>
  );
}

/**
 * Empty bordered row between sections: 32 / 48 / 64px. width "medium" = vertical rails at 1024 (Figma 2306:924).
 * The two horizontal lines always run edge to edge (designer, Drop 24).
 */
export function GridGap({ tone = "page", width = "content", className }: { tone?: BandTone; width?: "content" | "medium"; className?: string }) {
  const t = tones[tone];
  return (
    <div aria-hidden className={cn(t.band, "border-y", t.line, className)}>
      <div className={cn(width === "medium" ? columnMedium : column, t.line, "h-8 tablet:h-12 laptop:h-16")} />
    </div>
  );
}
