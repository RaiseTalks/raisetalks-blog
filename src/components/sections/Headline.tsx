import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type HeadlineContent = { lead: ReactNode; accent?: ReactNode };

/**
 * Signature two-part headline: Poppins line + Georgia-italic accent line.
 * accent colour follows the audience theme (blue for investors, yellow→red for founders).
 * layout "inline" puts both on one line from tablet up (e.g. "One Workspace. Zero chaos.").
 * mobileFlow: below tablet both parts run on as one text and wrap naturally (\n in lead ignored). Decoder hero.
 * tabletFlow: the same, but only on tablet (768–1279). Startups AI Advisor (Drop 16).
 */
export function Headline({
  lead, accent, as: Tag = "h2", size = "h2", align = "left", layout = "stack", tone = "light", accentStyle = "gradient", accentFont = "serif", mobileFlow = false, tabletFlow = false, id, className,
}: HeadlineContent & {
  as?: "h1" | "h2" | "h3"; size?: "h1" | "h2"; align?: "left" | "center"; layout?: "stack" | "inline";
  tone?: "light" | "dark"; accentStyle?: "gradient" | "plain"; accentFont?: "serif" | "sans"; mobileFlow?: boolean; tabletFlow?: boolean; id?: string; className?: string;
}) {
  const leadSize = size === "h1" ? "text-h1" : "text-h2";
  const altSize = size === "h1" ? "text-h1-alt" : "text-h2-alt";
  return (
    <Tag
      id={id}
      className={cn(
        mobileFlow ? "block tablet:flex tablet:flex-col tablet:gap-1" : tabletFlow ? "flex flex-col gap-1 tablet:block laptop:flex" : "flex flex-col gap-1",
        layout === "inline" && "tablet:flex-row tablet:flex-wrap tablet:items-baseline tablet:gap-x-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        align === "center" && layout === "inline" && "tablet:justify-center",
        className,
      )}
    >
      <span className={cn(leadSize, mobileFlow ? "inline tablet:block tablet:whitespace-pre-line" : tabletFlow ? "block whitespace-pre-line tablet:inline tablet:whitespace-normal laptop:block laptop:whitespace-pre-line" : "block whitespace-pre-line", tone === "dark" ? "text-on-brand" : "text-headline")}>{lead}</span>
      {accent && (mobileFlow || tabletFlow) && " "}
      {accent && (
        <span
          className={cn(
            accentFont === "sans" ? leadSize : altSize,
            mobileFlow ? "inline pb-[0.08em] tablet:block" : tabletFlow ? "block pb-[0.08em] tablet:inline laptop:block" : "block pb-[0.08em]",
            tone === "dark" || accentStyle === "plain" ? (tone === "dark" ? "text-on-brand" : "text-[var(--audience-accent)]") : "text-gradient-audience",
          )}
        >
          {accent}
        </span>
      )}
    </Tag>
  );
}
