"use client";

import { useId, useState, type ComponentProps, type ReactNode } from "react";
import { AlertCircle, Check, ChevronDown, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-sm border bg-page text-body text-copy placeholder:text-muted outline-none " +
  "transition-[border-color,box-shadow] duration-[var(--duration-hover)] ease-[var(--ease-soft)] " +
  "hover:border-border-2 focus:border-brand-light-blue focus:ring-3 focus:ring-brand-light-blue/20 " +
  "disabled:cursor-not-allowed disabled:bg-card disabled:opacity-50 read-only:bg-card";

function FieldShell({
  id, label, hint, error, children,
}: { id: string; label?: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && <label htmlFor={id} className="text-body text-subheadline">{label}</label>}
      {children}
      {error ? (
        <p id={`${id}-msg`} className="flex items-center gap-1.5 text-footnote text-bad">
          <AlertCircle className="size-3.5" aria-hidden /> {error}
        </p>
      ) : hint ? (
        <p id={`${id}-msg`} className="text-footnote text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

type InputProps = Omit<ComponentProps<"input">, "size"> & {
  label?: string; hint?: string; error?: string; iconLeft?: ReactNode; iconRight?: ReactNode;
  /** type="password" only: adds the Figma eye button that shows / hides the password. */
  revealable?: boolean;
};

/** Figma Input 3881:680 (md = 40px, matches Button md). */
export function Input({ label, hint, error, iconLeft, iconRight, revealable, id, className, type, ...rest }: InputProps) {
  const auto = useId();
  const fid = id ?? auto;
  const [shown, setShown] = useState(false);
  const canReveal = revealable && type === "password";
  return (
    <FieldShell id={fid} label={label} hint={hint} error={error}>
      <div className="relative">
        {iconLeft && <span className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden>{iconLeft}</span>}
        <input
          id={fid}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? `${fid}-msg` : undefined}
          className={cn(
            fieldBase, "h-10 px-3",
            error ? "border-danger" : "border-border-1",
            iconLeft && "pl-10", (iconRight || error || canReveal) && "pr-10", className,
          )}
          type={canReveal && shown ? "text" : type}
          {...rest}
        />
        {canReveal && (
          <button
            type="button"
            onClick={() => setShown((v) => !v)}
            aria-label={shown ? "Hide password" : "Show password"}
            aria-pressed={shown}
            className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-xs text-muted transition-colors duration-[250ms] hover:text-headline"
          >
            {shown ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
          </button>
        )}
        {!canReveal && (iconRight || error) && (
          <span className={cn("pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2", error ? "text-bad" : "text-muted")} aria-hidden>
            {error ? <AlertCircle className="size-5" /> : iconRight}
          </span>
        )}
      </div>
    </FieldShell>
  );
}

type TextareaProps = ComponentProps<"textarea"> & { label?: string; hint?: string; error?: string };

export function Textarea({ label, hint, error, id, className, rows = 4, ...rest }: TextareaProps) {
  const auto = useId();
  const fid = id ?? auto;
  return (
    <FieldShell id={fid} label={label} hint={hint} error={error}>
      <textarea
        id={fid}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${fid}-msg` : undefined}
        className={cn(fieldBase, "min-h-24 resize-y p-3", error ? "border-danger" : "border-border-1", className)}
        {...rest}
      />
    </FieldShell>
  );
}

type SelectProps = ComponentProps<"select"> & {
  label?: string; hint?: string; error?: string; options: { value: string; label: string }[];
};

/** Native dropdown in the Input style (40px, chevron right). Feature Requests, Drop 21.
 * read-only:bg-page: browsers match a <select> as :read-only, which would give it the grey read-only fill. */
export function Select({ label, hint, error, options, id, className, ...rest }: SelectProps) {
  const auto = useId();
  const fid = id ?? auto;
  return (
    <FieldShell id={fid} label={label} hint={hint} error={error}>
      <div className="relative">
        <select
          id={fid}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? `${fid}-msg` : undefined}
          className={cn(fieldBase, "h-10 cursor-pointer appearance-none pr-10 pl-3 read-only:bg-page", error ? "border-danger" : "border-border-1", className)}
          {...rest}
        >
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
      </div>
    </FieldShell>
  );
}

type ToggleProps = Omit<ComponentProps<"input">, "type"> & { label: ReactNode };

/** Figma Checkbox 3881:729 */
export function Checkbox({ label, className, id, ...rest }: ToggleProps) {
  const auto = useId();
  const fid = id ?? auto;
  return (
    <label htmlFor={fid} className={cn("inline-flex cursor-pointer items-center gap-2 text-body", className)}>
      <span className="relative inline-flex size-4 shrink-0">
        <input
          id={fid}
          type="checkbox"
          className="peer size-4 cursor-pointer appearance-none rounded-xs border border-border-1 bg-page transition-colors duration-[var(--duration-hover)] checked:border-brand-light-blue checked:bg-brand-light-blue disabled:opacity-50"
          {...rest}
        />
        <Check className="pointer-events-none absolute inset-0 m-auto size-3 text-headline opacity-0 transition-opacity duration-200 peer-checked:opacity-100" strokeWidth={3} aria-hidden />
      </span>
      {label}
    </label>
  );
}
