"use client";

import { useActionState, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { subscribeAction } from "@/lib/forms/actions";
import { Honeypot } from "@/components/ui/Honeypot";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Footer newsletter (Figma 3257:1471). White field + small accent "Subscribe".
 * Client-side email check first, then `subscribeAction` (Supabase newsletter function, src/lib/forms).
 */
export function NewsletterForm({ placeholder, button, success }: { placeholder: string; button: string; success: string }) {
  const [result, formAction, isPending] = useActionState(subscribeAction, undefined);
  const [clientError, setClientError] = useState<string | null>(null);
  const error = clientError ?? (result && !result.ok ? result.error : null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (EMAIL.test(email)) return setClientError(null);
    e.preventDefault(); // invalid: don't submit
    setClientError("Please enter a valid email.");
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {result?.ok ? (
        <motion.p key="done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-sm bg-page px-3 py-3.5 text-body text-copy" role="status">
          {success}
        </motion.p>
      ) : (
        <motion.form key="form" action={formAction} onSubmit={onSubmit} noValidate exit={{ opacity: 0 }} className="flex flex-col gap-1.5">
          <Honeypot />
          <div className="flex items-center justify-between gap-2 rounded-sm bg-page py-2 pr-2 pl-3 focus-within:ring-2 focus-within:ring-brand-yellow/60">
            <label htmlFor="newsletter-email" className="sr-only">Email</label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={placeholder}
              aria-invalid={!!error || undefined}
              aria-describedby={error ? "newsletter-error" : undefined}
              className="min-w-0 flex-1 bg-transparent text-body text-copy outline-none placeholder:text-muted"
            />
            <button type="submit" disabled={isPending} className="btn btn-alternative rounded-xs px-4 py-2 text-body font-normal disabled:opacity-60">
              {isPending ? "…" : button}
            </button>
          </div>
          {error && <p id="newsletter-error" className="text-footnote text-on-brand">{error}</p>}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
