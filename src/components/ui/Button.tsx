import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "alternative" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

type Common = {
  /** Opens in a new tab (external destinations: app, Calendly, TV). */
  external?: boolean;
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
};

type LinkProps = Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type NativeProps = Omit<ComponentProps<"button">, "className" | "children">;

export type ButtonProps =
  | (Common & { href: string; disabled?: boolean; linkProps?: LinkProps; onClick?: () => void })
  | (Common & { href?: undefined } & NativeProps);

/**
 * Figma Button 3881:471 — same component as RaiseTalks TV (no lift on hover).
 * A link navigates (href), a button acts. http(s)/mailto hrefs render a plain <a>; `external` opens a new tab.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", iconLeft, iconRight, fullWidth, className, children } = props;
  const classes = cn("btn", `btn-${variant}`, `btn-${size}`, fullWidth && "w-full", className);
  const content = (
    <>
      {iconLeft && <span className="inline-flex size-4 shrink-0 items-center justify-center" aria-hidden>{iconLeft}</span>}
      {children}
      {iconRight && <span className="inline-flex size-4 shrink-0 items-center justify-center" aria-hidden>{iconRight}</span>}
    </>
  );

  if (props.href !== undefined && (props.external || /^https?:|^mailto:/.test(props.href))) {
    return (
      <a
        href={props.href}
        className={classes}
        onClick={props.onClick}
        {...(props.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  if (props.href !== undefined) {
    return (
      <Link
        href={props.href}
        className={classes}
        onClick={props.onClick}
        aria-disabled={props.disabled || undefined}
        tabIndex={props.disabled ? -1 : undefined}
        {...props.linkProps}
      >
        {content}
      </Link>
    );
  }

  const native: NativeProps & Partial<Common> = { ...props };
  delete native.variant; delete native.size; delete native.iconLeft; delete native.iconRight;
  delete native.fullWidth; delete native.className; delete native.children; delete native.external;
  return (
    <button {...native} type={props.type ?? "button"} className={classes}>
      {content}
    </button>
  );
}
