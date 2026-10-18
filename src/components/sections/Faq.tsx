"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/** Plain-text answer → paragraphs, "- " bullets, "1. " steps (no HTML in content). */
function Answer({ text, alt }: { text: string; alt: boolean }) {
  const blocks = text.split(/\n\s*\n/);
  return (
    <div className={cn("mb-5 flex flex-col gap-3 rounded-lg p-4 text-body text-copy tablet:p-6", alt ? "bg-card-on-alt" : "bg-card")}>
      {blocks.map((b, i) => {
        const lines = b.split("\n");
        if (lines.every((l) => l.startsWith("- "))) {
          return <ul key={i} className="flex list-disc flex-col gap-1.5 pl-5 marker:text-brand-light-blue">{lines.map((l) => <li key={l}>{l.slice(2)}</li>)}</ul>;
        }
        if (lines.every((l) => /^\d+\. /.test(l))) {
          return <ol key={i} className="flex list-decimal flex-col gap-1.5 pl-5 marker:text-brand-light-blue">{lines.map((l) => <li key={l}>{l.replace(/^\d+\. /, "")}</li>)}</ol>;
        }
        return <p key={i}>{b}</p>;
      })}
    </div>
  );
}

/**
 * FAQ, one open at a time, first open (Startups 1347:4959, Decoder 2601:8141).
 * Drop 15/16: no background on the questions, a thin divider between items; only the open ANSWER sits in a
 * soft rounded card. Question = H4, + / × icon in brand blue. tone = the band it sits on (divider + card colour).
 */
export function Faq({ items, idPrefix = "faq", tone = "page" }: { items: { q: string; a: string }[]; idPrefix?: string; tone?: "page" | "alt" }) {
  const [open, setOpen] = useState(0);
  const alt = tone === "alt";
  return (
    <ul className="flex flex-col">
      {items.map((it, i) => {
        const on = open === i;
        return (
          <li
            key={it.q}
            className={cn(
              "border-t first:border-t-0",
              alt ? "border-border-2" : "border-border-1",
            )}
          >
            <h3>
              <button
                type="button"
                id={`${idPrefix}-q-${i}`}
                aria-expanded={on}
                aria-controls={`${idPrefix}-a-${i}`}
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
                  id={`${idPrefix}-a-${i}`}
                  role="region"
                  aria-labelledby={`${idPrefix}-q-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <Answer text={it.a} alt={alt} />
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
