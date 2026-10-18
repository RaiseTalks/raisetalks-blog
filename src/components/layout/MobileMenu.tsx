"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import type { NavLink } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { useDropdownMotion } from "@/components/motion/dropdown";
import { NavItem } from "./NavItem";
import { useDismiss, type DismissReason } from "./useDismiss";

/**
 * Navbar below 1280px (RaiseTalks TV pattern): menu button + rounded panel that unfolds under the bar.
 * Closes on a tap outside, on Escape (focus returns to the button) and on choosing a link.
 */
export function MobileMenu({
  links, actions,
}: { links: NavLink[]; actions: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const close = useCallback((reason?: DismissReason) => {
    setOpen(false);
    if (reason === "escape") buttonRef.current?.focus();
  }, []);
  // ref wraps the toggle and the panel: a tap on the toggle toggles, a tap anywhere else closes
  useDismiss(ref, open, close);
  const motionProps = useDropdownMotion();

  return (
    <div ref={ref} className="laptop:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        // 44×44 hit area; -m-1 keeps the 36px layout box so the bar height is unchanged
        className="-m-1 flex size-11 items-center justify-center rounded-sm text-headline transition-colors duration-[250ms] hover:text-brand-light-blue"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            {...motionProps}
            className="site-nav-panel max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-md border border-border-1 bg-page shadow-[var(--shadow-nav)]"
          >
            <div className="flex flex-col gap-1 p-3">
              {/* de-duplicated by href so a link in both lists shows once */}
              {links
                .filter((l, i, all) => all.findIndex((x) => x.href === l.href) === i)
                .map((l) => (
                  <NavItem key={l.href} item={l} onClick={() => close()} className="px-3 py-3 text-body" />
                ))}
              {actions.length > 0 && (
                <div className="mt-2 flex flex-col gap-2 px-1 pb-1">
                  {actions.map((a, i) => (
                    <Button key={a.href} href={a.href} onClick={() => close()} variant={i === 0 ? "ghost" : "primary"} size="md" fullWidth>
                      {a.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
