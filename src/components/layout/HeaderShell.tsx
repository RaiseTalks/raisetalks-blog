"use client";

import { useSyncExternalStore, type ReactNode } from "react";

const subscribe = (cb: () => void) => {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
};

/**
 * Sticky header wrapper (RaiseTalks TV pattern). After 24px of scroll it sets data-scrolled;
 * `.site-header` rules in components.css morph the full-width bar into the floating, compact bar.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const scrolled = useSyncExternalStore(subscribe, () => window.scrollY > 24, () => false);
  return (
    <header data-scrolled={scrolled || undefined} className="site-header">
      <div className="site-header-frame">{children}</div>
    </header>
  );
}
