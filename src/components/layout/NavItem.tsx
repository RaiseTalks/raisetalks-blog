import Link from "next/link";
import type { NavLink } from "@/content/site";
import { cn } from "@/lib/utils";

/** One menu entry (mobile menu). External links open in a new tab. */
export function NavItem({
  item, className, onClick, role,
}: { item: NavLink; className?: string; onClick?: () => void; role?: string }) {
  const classes = cn(
    "flex items-center gap-2 rounded-sm text-subheadline transition-colors duration-[250ms] hover:bg-card-hover hover:text-headline",
    className,
  );
  if (item.external) {
    return (
      <a href={item.href} role={role} onClick={onClick} className={classes} target="_blank" rel="noopener noreferrer">
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} role={role} onClick={onClick} className={classes}>
      {item.label}
    </Link>
  );
}
