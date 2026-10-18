import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Base card surface. `interactive` adds the subtle hover (bg one step lighter,
 * border brighter, 300ms). No shadows, no lift.
 */
export function Card({
  as: Tag = "div",
  href,
  interactive,
  className,
  children,
}: {
  as?: "div" | "article" | "li" | "section";
  href?: string;
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const classes = cn(
    "block rounded-lg border border-border-1 bg-card p-6",
    (interactive || href) &&
      "transition-[background-color,border-color] duration-[var(--duration-card-hover)] ease-[var(--ease-soft)] hover:border-border-1 hover:bg-card-alt-hover",
    className,
  );
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return <Tag className={classes}>{children}</Tag>;
}
