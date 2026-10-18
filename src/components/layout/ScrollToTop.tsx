"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Every page change lands at the top of the new page. Next.js's own scroll-on-navigation
 * scrolls to the first element it judges "visible", which put Home ~470–725px down when
 * arriving from the top of another page (bug, Oct 2026).
 * Exceptions: links to a #section, and browser Back/Forward (the browser restores the position).
 * Runs after Next's handler (passive effect after layout effects; mounted after <main>).
 */
export function ScrollToTop() {
  const path = usePathname();
  const first = useRef(true);
  const fromHistory = useRef(false);

  useEffect(() => {
    const onPop = () => { fromHistory.current = true; };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (fromHistory.current) { fromHistory.current = false; return; }
    if (window.location.hash) return;
    const top = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    top();
    const raf = requestAnimationFrame(top);
    return () => cancelAnimationFrame(raf);
  }, [path]);

  return null;
}
