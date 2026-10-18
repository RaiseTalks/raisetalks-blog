"use client";

import { useActionState, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Download } from "lucide-react";
import { subscribeAction } from "@/lib/forms/actions";
import { Honeypot } from "@/components/ui/Honeypot";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FILE_LABELS: Record<string, string> = { xlsx: "Excel", csv: "CSV", pdf: "PDF" };

/**
 * Gated download on the blue article panel: email → newsletter function with the magnet id → its files.
 * Field + button as the footer newsletter; download buttons replace the form on success.
 */
export function LeadMagnetForm({ magnet, button, success }: { magnet: string; button: string; success: string }) {
  const [result, formAction, isPending] = useActionState(subscribeAction, undefined);
  const [clientError, setClientError] = useState<string | null>(null);
  const error = clientError ?? (result && !result.ok ? result.error : null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (EMAIL.test(email)) return setClientError(null);
    e.preventDefault();
    setClientError("Please enter a valid email.");
  }

  const files = result?.ok ? Object.entries(result.files ?? {}) : [];
  return (
    <AnimatePresence mode="wait" initial={false}>
      {result?.ok ? (
        <motion.div key="done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} role="status" className="flex flex-col items-center gap-4">
          <p className="text-body text-on-brand">{success}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {files.map(([type, url]) => (
              <a key={type} href={url} download className="btn btn-alternative btn-md">
                <Download className="size-4" aria-hidden />
                Download {FILE_LABELS[type] ?? type.toUpperCase()}
              </a>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.form key="form" action={formAction} onSubmit={onSubmit} noValidate exit={{ opacity: 0 }} className="flex w-full max-w-[460px] flex-col gap-1.5">
          <Honeypot />
          <input type="hidden" name="magnet" value={magnet} />
          <div className="flex items-center justify-between gap-2 rounded-sm bg-page py-2 pr-2 pl-3 focus-within:ring-2 focus-within:ring-brand-yellow/60">
            <label htmlFor={`magnet-${magnet}`} className="sr-only">Email</label>
            <input
              id={`magnet-${magnet}`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your Email"
              aria-invalid={!!error || undefined}
              aria-describedby={error ? `magnet-${magnet}-error` : undefined}
              className="min-w-0 flex-1 bg-transparent text-body text-copy outline-none placeholder:text-muted"
            />
            <button type="submit" disabled={isPending} className="btn btn-alternative rounded-xs px-4 py-2 text-body font-normal disabled:opacity-60">
              {isPending ? "…" : button}
            </button>
          </div>
          {error && <p id={`magnet-${magnet}-error`} className="text-left text-footnote text-on-brand">{error}</p>}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
