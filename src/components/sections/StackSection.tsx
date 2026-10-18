"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";

/**
 * Pinned heading + stacking cards (Drop 14: Investors "What You Get", Startups "Everything you need").
 * Laptop+ only (CSS in styles/components.css, `.stack*`); below 1280 the children simply follow each other.
 * - The heading band sticks just under the floating navbar; when stuck, a grey strip fills the gap above it.
 * - Each child sticks under the heading and the next one slides over it. A child taller than the space
 *   left scrolls until its bottom reaches the screen bottom, then holds there
 *   (top = min(heading bottom, 100vh - own height); heights measured here).
 * Pass each subsection as one child; put tablet/mobile-only spacers inside that child (`laptop:hidden`).
 * pinLast (Startups, Drop 16): the last child stops right under the heading (never slides under it) and
 *   then leaves together with the heading (CSS: the section box ends at the last child's top; the cards'
 *   own box still holds the last card, so the cards before it stay pinned while it slides over them).
 * outerLines = false (Startups, Drop 16): no full-width line between subsections; draw it inside the rails instead.
 */
export function StackSection({ head, children, id, className, pinLast = false, outerLines = true }: { head: ReactNode; children: ReactNode; id?: string; className?: string; pinLast?: boolean; outerLines?: boolean }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const headEl = root.querySelector<HTMLElement>(":scope > .stack-head");
    const cards = Array.from(root.querySelectorAll<HTMLElement>(":scope > .stack-cards > .stack-card"));
    if (!headEl) return;

    const measure = () => {
      root.style.setProperty("--stack-head-h", `${headEl.offsetHeight}px`);
      for (const c of cards) c.style.setProperty("--h", `${c.offsetHeight}px`);
      if (cards.length) root.style.setProperty("--last-h", `${cards[cards.length - 1].offsetHeight}px`);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(headEl);
    for (const c of cards) ro.observe(c);

    let raf = 0;
    const check = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const top = headEl.getBoundingClientRect().top;
        const stuck = getComputedStyle(headEl).position === "sticky" && top <= 0.5;
        headEl.toggleAttribute("data-stuck", stuck);
      });
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <section ref={ref} id={id} className={["stack", className].filter(Boolean).join(" ")} data-pin-last={pinLast || undefined} data-no-outer-lines={!outerLines || undefined}>
      <div className="stack-head">{head}</div>
      {/* own box for the cards: with pinLast it overhangs the section by the last card's height, so the
          heading (sticky in the section) leaves when the last card reaches it, while the cards keep stacking */}
      <div className="stack-cards">
        {Children.toArray(children).map((child, i) => (
          <div key={i} className="stack-card">{child}</div>
        ))}
      </div>
    </section>
  );
}
