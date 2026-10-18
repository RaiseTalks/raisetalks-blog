"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The site FAQ accordion (sections/Faq) for blog posts, whose answers are rendered Markdown (links, bold,
 * lists) instead of plain text. Same look: one open at a time, first open, H4 questions, + / × in brand blue,
 * the open answer in a soft rounded card.
 */
export function BlogFaq({ items, tone = "alt" }: { items: { q: string; a: ReactNode }[]; tone?: "page" | "alt" }) {
  const [open, setOpen] = useState(0);
  const alt = tone === "alt";
  return (
    <ul className="flex flex-col">
      {items.map((it, i) => {
        const on = open === i;
        return (
          <li key={it.q} className={cn("border-t first:border-t-0", alt ? "border-border-2" : "border-border-1")}>
            <h3>
              <button
                type="button"
                id={`blog-faq-q-${i}`}
                aria-expanded={on}
                aria-controls={`blog-faq-a-${i}`}
                onClick={() => setOpen(on ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-h4 font-medium text-subheadline tablet:font-normal"
              >
                {it.q}
                <Plus className={cn("size-5 shrink-0 text-brand-light-blue transition-transform duration-[350ms] ease-[var(--ease-soft)]", on && "rotate-45")} aria-hidden />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  id={`blog-faq-a-${i}`}
                  role="region"
                  aria-labelledby={`blog-faq-q-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className={cn("mb-5 rounded-lg p-4 tablet:p-6 [&_p]:text-body [&_p]:leading-[1.6]", alt ? "bg-card-on-alt" : "bg-card")}>{it.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
