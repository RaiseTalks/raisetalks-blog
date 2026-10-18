import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * RaiseTalks light badges — designed by Studio from the RaiseTalks TV set (no RaiseTalks
 * badges in Figma yet). Pills everywhere, like the Figma eyebrow ("AI NATIVE") and
 * "Coming soon" chips.
 * - eyebrow:     outlined blue pill with eyebrow type (hero labels)
 * - eyebrow-orbit: eyebrow pill whose border is a faint track with a blue patch travelling round it
 *                at an even speed (Figma 3997:519). Home hero "AI NATIVE" only.
 * - neutral:     white pill, border-1, footnote text (+ optional live dot)
 * - accent:      soft blue fill, blue text (plan labels, tags)
 * - website:     RaiseTalks Website Badge (Figma 4152:2642): dark navy pill, white Body text (Investors DD tags)
 * - highlighted: white pill with animated yellow→red gradient stroke (featured / new)
 * - good | moderate | bad: status (Figma "Grading System")
 */
export type BadgeVariant = "eyebrow" | "eyebrow-orbit" | "neutral" | "accent" | "website" | "highlighted" | "good" | "moderate" | "bad";

const styles: Record<BadgeVariant, string> = {
  eyebrow: "border border-brand-light-blue px-4 py-2 text-eyebrow text-brand-light-blue tablet:px-6 tablet:py-3",
  "eyebrow-orbit": "relative border border-transparent px-4 py-2 text-eyebrow text-brand-light-blue tablet:px-6 tablet:py-3",
  neutral: "border border-border-1 bg-page px-4 py-1.5 text-footnote text-headline",
  accent: "bg-blue-pill px-3 py-1.5 text-footnote font-semibold text-brand-dark-blue",
  website: "border border-ink-badge-border bg-ink-border px-3 py-1.5 text-body text-on-brand",
  highlighted: "badge-highlighted bg-page px-4 py-1.5 text-footnote text-headline",
  good: "border border-good-border bg-good-bg px-3 py-1 text-footnote text-good",
  moderate: "border border-moderate-border bg-moderate-bg px-3 py-1 text-footnote text-moderate",
  bad: "border border-bad-border bg-bad-bg px-3 py-1 text-footnote text-bad",
};

export function Badge({
  variant = "neutral", dot, icon, className, children,
}: { variant?: BadgeVariant; dot?: boolean; icon?: ReactNode; className?: string; children: ReactNode }) {
  return (
    <span className={cn("inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full", styles[variant], className)}>
      {dot && (
        <span className="relative flex size-2" aria-hidden>
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-light-blue opacity-40 motion-reduce:animate-none" />
          <span className="relative size-2 rounded-full bg-brand-light-blue" />
        </span>
      )}
      {variant === "eyebrow-orbit" && <span className="border-orbit" aria-hidden />}
      {icon && <span className="inline-flex size-3.5 items-center justify-center" aria-hidden>{icon}</span>}
      {children}
    </span>
  );
}

/** Kept for API compatibility with the TV kit. */
export function StatusBadge({ status, className }: { status: "active" | "inactive"; className?: string }) {
  return (
    <Badge variant={status === "active" ? "good" : "bad"} className={className}>
      {status === "active" ? "Active" : "Not active"}
    </Badge>
  );
}
