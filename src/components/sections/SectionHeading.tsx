import { cn } from "@/lib/utils";

/**
 * Two-part headline used across the site: sans H2 + serif italic H2 Alt.
 * inline = on one line ("Your film works everywhere"), else stacked.
 */
export function SectionHeading({
  title, titleAlt, eyebrow, align = "center", inline = false, className,
}: { title: string; titleAlt?: string; eyebrow?: string; align?: "left" | "center"; inline?: boolean; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-1", align === "center" ? "items-center text-center" : "items-start text-left", className)}>
      {eyebrow && <p className="text-eyebrow text-headline">{eyebrow}</p>}
      <h2 className={cn("text-h2 text-headline", inline && "flex flex-wrap items-baseline gap-x-2", align === "center" && inline && "justify-center")}>
        <span>{title}</span>
        {titleAlt && <span className={cn("text-h2-alt", !inline && "block")}>{titleAlt}</span>}
      </h2>
    </div>
  );
}
