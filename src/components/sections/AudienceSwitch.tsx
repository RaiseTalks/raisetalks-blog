"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Band } from "@/components/layout/Band";
import { cn } from "@/lib/utils";

type Option<T extends string> = { id: T; label: string };
/** One audience = the subsections under the sticky switch (`group`) + the ones after it (`tail`). */
export type AudienceView = { group: ReactNode; tail?: ReactNode };

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

/**
 * "For Startups / For Investors" switch (Home 3257:1610). Swaps the subsections below it and
 * the accent theme (data-audience). Deep link: /?for=startups or /?for=investors.
 * The band is sticky while you read the `group` (MCP + cards) and lets go at the top of the `tail`
 * (Spend Less Time); same on the way up. It has no background: only the pill shows, 24px under the
 * floating navbar, and gets the navbar shadow once stuck. The band ignores the pointer; the pill does not.
 * Both views are server-rendered; only the active one is mounted.
 */
export function AudienceSwitch<T extends string>({
  options, initial, label, views,
}: { options: Option<T>[]; initial: T; label: string; views: Record<T, AudienceView> }) {
  const [active, setActive] = useState<T>(initial);
  const [stuck, setStuck] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const sentinel = useRef<HTMLDivElement>(null);

  // Deep link after hydration (static page): /?for=startups | /?for=investors
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("for");
    const match = options.find((o) => o.id === q || (q === "startups" && o.id === "founders"));
    if (!match) return;
    const raf = requestAnimationFrame(() => setActive(match.id));
    return () => cancelAnimationFrame(raf);
  }, [options]);

  // "stuck" = the band sits at its sticky offset and has left its resting place
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const b = bar.current, s = sentinel.current;
      if (!b || !s) return;
      const top = parseFloat(getComputedStyle(b).top) || 0;
      const r = b.getBoundingClientRect().top;
      setStuck(s.getBoundingClientRect().top < top && Math.abs(r - top) < 1);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const panel = (part: "group" | "tail", id: string, className?: string) => (
    <div id={id} role="tabpanel" aria-labelledby={`tab-${active}`} className={className}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={active} {...fade}>{views[active][part]}</motion.div>
      </AnimatePresence>
    </div>
  );

  return (
    <div data-audience={active}>
      {/* sticky boundary: the switch can only travel while this box is on screen */}
      <div>
        <div ref={sentinel} aria-hidden />
        <div ref={bar} data-stuck={stuck || undefined} className="audience-sticky">
          <Band as="div" className="pointer-events-none bg-transparent" innerClassName="flex justify-center py-6 tablet:justify-start tablet:py-8 laptop:justify-center laptop:py-16">
            <div role="tablist" aria-label={label} className="audience-pill pointer-events-auto flex gap-2 rounded-full bg-section-alt p-1">
              {options.map((o) => {
                const on = o.id === active;
                return (
                  <button
                    key={o.id}
                    role="tab"
                    id={`tab-${o.id}`}
                    aria-selected={on}
                    aria-controls="audience-panel audience-panel-tail"
                    type="button"
                    onClick={() => setActive(o.id)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-5 py-2 text-body text-headline transition-[background-color,opacity] duration-[var(--duration-hover)] ease-[var(--ease-soft)] tablet:px-6",
                      on ? "bg-page font-semibold" : "opacity-50 hover:opacity-80",
                    )}
                  >
                    <span
                      className="size-1.5 rounded-full"
                      style={{ backgroundImage: o.id === "founders" ? "var(--gradient-accent)" : "var(--gradient-brand)" }}
                      aria-hidden
                    />
                    {o.label}
                  </button>
                );
              })}
            </div>
          </Band>
        </div>
        {panel("group", "audience-panel")}
      </div>
      {panel("tail", "audience-panel-tail")}
    </div>
  );
}
