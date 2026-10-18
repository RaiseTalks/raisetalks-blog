"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/** Single-open list of capability cards (Home MCP 3257:1498). First item open; + turns into ×. */
/** Items without text render as a static row (no toggle) — no invented copy. */
export function CapabilityList({ items }: { items: { title: string; text?: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <ul className="flex flex-col gap-3">
      {items.map((it, i) => {
        const on = open === i;
        if (!it.text) {
          return (
            <li key={it.title} className="rounded-lg border border-section-alt bg-card-hover p-4 text-body font-semibold text-subheadline">
              {it.title}
            </li>
          );
        }
        return (
          <li key={it.title} className="rounded-lg border border-section-alt bg-card-hover">
            <button
              type="button"
              aria-expanded={on}
              onClick={() => setOpen(on ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 p-4 text-left text-body font-semibold text-subheadline"
            >
              {it.title}
              <Plus className={cn("size-4 shrink-0 transition-transform duration-[350ms] ease-[var(--ease-soft)]", on && "rotate-45")} aria-hidden />
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-4 text-body text-copy">{it.text}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
