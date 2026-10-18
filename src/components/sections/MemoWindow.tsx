"use client";

import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import type { MemoContent } from "@/content/marketing/investors";
import { cn } from "@/lib/utils";
import { MemoDoc } from "./MemoDoc";

const SHEET = 794; // A4 sheet width in px (Figma 876:5759)

/**
 * Investors memo window (Drop 17): the blue frame is the scroll box; the 794px sheet inside never reflows. When the
 * frame is narrower, the whole sheet is zoomed down to fit (CSS zoom, so the scroll height follows), phone included.
 * Light / dark toggle pinned to the frame's top-right corner, outside the scroll, so it stays put while scrolling.
 * At the top the blue padding + rounded corners show; they scroll away; the rounded bottom only appears at the end.
 */
export function MemoWindow({ m }: { m: MemoContent }) {
  const box = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => {
      const pad = parseFloat(getComputedStyle(el.firstElementChild as HTMLElement).paddingLeft) || 0;
      setZoom(Math.min(1, (el.clientWidth - 2 * pad) / SHEET));
    };
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    fit();
    return () => ro.disconnect();
  }, []);

  const opt = (t: "light" | "dark", Icon: typeof Sun, label: string) => (
    <button
      type="button"
      role="radio"
      aria-checked={theme === t}
      aria-label={label}
      title={label}
      onClick={() => setTheme(t)}
      className={cn(
        "flex size-7 items-center justify-center rounded-full transition-colors duration-[var(--duration-hover)]",
        theme === t ? "bg-brand-light-blue text-on-brand" : "text-subheadline hover:text-headline",
      )}
    >
      <Icon className="size-3.5" strokeWidth={2} aria-hidden />
    </button>
  );

  return (
    <div className="absolute inset-0">
      <div role="radiogroup" aria-label={m.theme.group} className="absolute right-5 top-3 z-10 flex gap-0.5 rounded-full bg-page p-0.5 shadow-[var(--shadow-nav)] tablet:right-7 tablet:top-4">
        {opt("light", Sun, m.theme.light)}
        {opt("dark", Moon, m.theme.dark)}
      </div>
      <div ref={box} role="region" aria-label={m.label} tabIndex={0} className="memo-scroll absolute inset-0 overflow-y-auto overflow-x-hidden rounded-lg bg-brand-light-blue">
        {/* inner wrapper carries the padding: padding on a scroll box itself is dropped at the end in some browsers */}
        {/* taller top padding: at the start the theme toggle sits in the blue band, not on the sheet */}
        <div className="p-3 pt-12 tablet:p-6 tablet:pt-14">
          <div style={{ zoom }}>
            <MemoDoc m={m} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
}
