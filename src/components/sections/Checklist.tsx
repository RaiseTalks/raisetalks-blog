import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** Green-tick list (Figma checklists on Startups / Investors / Pitch). */
export function CheckList({ items, className, tight }: { items: string[]; className?: string; tight?: boolean }) {
  return (
    <ul className={cn("flex flex-col", tight ? "gap-2" : "gap-3", className)}>
      {items.map((it) => (
        <li key={it} className="flex items-start gap-2.5 text-body text-copy">
          <Check className="mt-0.5 size-4 shrink-0 text-good" strokeWidth={2} aria-hidden />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Card with title + text and an inner tinted box of ticks (Investors "Pre-Scoring Card",
 * "Short Memo", "Investment Memo + IC Pack"; Startups feature rows).
 * on = surface it sits on: "page" (white) → grey box; "alt" (grey) → white box.
 */
export function ChecklistCard({
  title, text, checks, on = "page", bare, className,
}: { title?: string; text?: string; checks: string[]; on?: "page" | "alt"; bare?: boolean; className?: string }) {
  const box = on === "page" ? "border-border-1 bg-section-alt" : "border-border-2 bg-card-on-alt";
  const list = <div className={cn("rounded-md border p-4 tablet:p-5", box)}><CheckList items={checks} tight /></div>;
  if (bare) return <div className={className}>{list}</div>;
  return (
    <div className={cn("flex flex-col gap-4 rounded-lg border p-5 tablet:p-6", on === "page" ? "border-border-1 bg-page" : "border-border-2 bg-card-on-alt", className)}>
      {(title || text) && (
        <div className="flex flex-col gap-1">
          {title && <h3 className="text-h4 text-subheadline">{title}</h3>}
          {text && <p className="text-body text-copy">{text}</p>}
        </div>
      )}
      <div className={cn("rounded-md border p-4 tablet:p-5", on === "page" ? "border-border-1 bg-section-alt" : "border-border-1 bg-section-alt")}>
        <CheckList items={checks} tight />
      </div>
    </div>
  );
}
