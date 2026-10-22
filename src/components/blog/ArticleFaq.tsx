"use client";

import { createContext, useContext, useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * In-article FAQ (pre-redesign blog look): rows with a thin rule, a blue + / − on the left, bold question,
 * the open answer in a soft grey box indented under the question. One open at a time, all closed at first.
 */
const Ctx = createContext<{ open: string | null; toggle: (id: string) => void } | null>(null);

export function ArticleFaq({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <Ctx.Provider value={{ open, toggle: (id) => setOpen((o) => (o === id ? null : id)) }}>
      <div className="mb-10 mt-6 border-t border-article-faq-line">{children}</div>
    </Ctx.Provider>
  );
}

export function ArticleFaqItem({ question, children }: { question: string; children: ReactNode }) {
  const ctx = useContext(Ctx);
  const id = useId();
  const on = ctx?.open === id;
  return (
    <div className="border-b border-article-faq-line">
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={on}
          aria-controls={`${id}-a`}
          onClick={() => ctx?.toggle(id)}
          className={cn(
            "flex w-full items-center gap-3 px-5 py-6 text-left text-[17px] font-semibold leading-[1.35] text-headline transition-colors duration-[var(--duration-hover)] tablet:gap-4 tablet:px-8 tablet:py-9 tablet:text-[20px]",
            on ? "bg-article-table-head" : "hover:bg-article-table-head",
          )}
        >
          <svg className="size-7 shrink-0 text-brand-light-blue tablet:size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            {!on && <line x1="12" y1="5" x2="12" y2="19" />}
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>{question}</span>
        </button>
      </h3>
      {/* Answer stays in the HTML when closed (search engines read it); the grid row animates its height */}
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        inert={!on}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-soft)]",
          on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-8 pl-5 pr-5 tablet:pl-20 tablet:pr-8">
            <div className="rounded-[14px] border border-article-border bg-article-faq-answer px-5 py-5 tablet:px-8 tablet:py-6 [&_p]:mb-3 [&_p]:text-[14.4px] [&_p]:leading-[1.45] [&_p]:text-headline [&_p:last-child]:mb-0 [&_ul]:text-[14.4px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
