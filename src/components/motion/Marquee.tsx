"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Endless strip (slider rule, Oct 2026): keeps moving on hover and can be dragged left/right
 * with the mouse or a finger. Pass the row TWICE as children (second copy aria-hidden) for a
 * seamless loop. Speed: `speed` px/s if given, else one row passes in `duration` seconds.
 * `reverse` moves right. A drag (>5px) never fires a click on a button inside, a tap/click does.
 * Reduced motion: no auto-move, drag still works.
 */
export function Marquee({
  children, duration = 45, speed, reverse = false, fade = true, className, trackClassName, label, as: Tag = "div",
}: {
  children: ReactNode; duration?: number; speed?: number; reverse?: boolean; fade?: boolean;
  className?: string; trackClassName?: string; label?: string; as?: "div" | "section";
}) {
  const view = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const v = view.current, el = track.current;
    if (!v || !el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dir = reverse ? 1 : -1;
    let x = 0, last = performance.now(), raf = 0;
    let drag: { id: number; startX: number; from: number; moved: boolean } | null = null;
    let swallowClick = false;

    const tick = (t: number) => {
      const dt = Math.min(t - last, 64);
      last = t;
      const half = el.scrollWidth / 2;
      if (half > 0) {
        const pxPerMs = speed ? speed / 1000 : half / (duration * 1000);
        if (!drag?.moved && !reduce) x += dir * pxPerMs * dt;
        x = (((x % half) + half) % half) - half; // keep in [-half, 0) → seamless
        el.style.transform = `translate3d(${x}px,0,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const down = (e: PointerEvent) => {
      if (e.button !== 0) return;
      swallowClick = false; // a drag that ended without a click must not eat the next real click
      drag = { id: e.pointerId, startX: e.clientX, from: x, moved: false };
    };
    const move = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.startX;
      if (!drag.moved && Math.abs(dx) > 5) {
        drag.moved = true;
        drag.from = x - dx; // no jump: continue from where the strip is now
        v.setPointerCapture(e.pointerId);
      }
      if (drag.moved) x = drag.from + dx;
    };
    const up = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      if (drag.moved) swallowClick = true;
      drag = null;
    };
    const click = (e: MouseEvent) => {
      if (swallowClick) { e.preventDefault(); e.stopPropagation(); swallowClick = false; }
    };
    v.addEventListener("pointerdown", down);
    v.addEventListener("pointermove", move);
    v.addEventListener("pointerup", up);
    v.addEventListener("pointercancel", up);
    v.addEventListener("click", click, true);
    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("pointerdown", down);
      v.removeEventListener("pointermove", move);
      v.removeEventListener("pointerup", up);
      v.removeEventListener("pointercancel", up);
      v.removeEventListener("click", click, true);
    };
  }, [duration, speed, reverse]);

  return (
    <Tag
      ref={view as never}
      role={Tag === "div" ? "region" : undefined}
      aria-label={label}
      // pan-y: a vertical swipe still scrolls the page; a horizontal one drags the strip
      className={cn(fade && "marquee-mask", "cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing [&_img]:pointer-events-none", className)}
    >
      <div ref={track} className={cn("flex w-max will-change-transform", trackClassName)}>{children}</div>
    </Tag>
  );
}
