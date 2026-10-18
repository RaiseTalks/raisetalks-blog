"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Horizontal card slider (slider rule, Oct 2026): native scroll + snap for touch/trackpad,
 * plus click-and-drag with the mouse. A drag never fires a click on a button inside.
 * Give each slide `snap-start`. With nothing to scroll (e.g. laptop grid) it does nothing.
 */
export function DragScroll({ children, className, label }: { children: ReactNode; className?: string; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let drag: { id: number; startX: number; from: number; moved: boolean } | null = null;
    let swallowClick = false;

    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      if ((e.target as HTMLElement).closest("input, textarea, select")) return;
      if (el.scrollWidth <= el.clientWidth + 1) return;
      drag = { id: e.pointerId, startX: e.clientX, from: el.scrollLeft, moved: false };
    };
    const move = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.startX;
      if (!drag.moved && Math.abs(dx) > 5) {
        drag.moved = true;
        el.setPointerCapture(e.pointerId);
        el.style.scrollSnapType = "none"; // free movement while dragging
        el.style.cursor = "grabbing";
      }
      if (drag.moved) el.scrollLeft = drag.from - dx;
    };
    const up = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      if (drag.moved) {
        swallowClick = true;
        const left = el.scrollLeft;
        el.style.scrollSnapType = "";
        el.style.cursor = "";
        el.scrollLeft = left;
        // settle on the nearest card (items are offset from this relative box)
        const items = Array.from(el.querySelectorAll<HTMLElement>(".snap-start"));
        const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
        const max = el.scrollWidth - el.clientWidth; // the last card can't start-align: its stop is the end
        const target = items.reduce((best, k) => {
          const off = Math.min(k.offsetLeft - pad, max);
          return Math.abs(off - left) < Math.abs(best - left) ? off : best;
        }, 0);
        el.scrollTo({ left: target, behavior: "smooth" });
      }
      drag = null;
    };
    const click = (e: MouseEvent) => {
      if (swallowClick) { e.preventDefault(); e.stopPropagation(); swallowClick = false; }
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("click", click, true);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("click", click, true);
    };
  }, []);

  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      tabIndex={0}
      className={cn("drag-scroll relative cursor-grab snap-x snap-mandatory overflow-x-auto overscroll-x-contain", className)}
    >
      {children}
    </div>
  );
}
