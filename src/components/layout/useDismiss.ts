import { useEffect, type RefObject } from "react";

export type DismissReason = "outside" | "escape" | "other";

const OPEN_EVENT = "rt:dropdown-open";

/**
 * Close a dropdown on a click/tap outside `ref` or on Escape, while it is open.
 * `pointerdown` covers mouse, touch and pen. Put the toggle button inside `ref` so tapping it
 * toggles instead of close-then-reopen. Opening another menu is a press outside this one, so it closes;
 * a menu opened from the keyboard announces itself (OPEN_EVENT), so only one navbar menu is ever open.
 */
export function useDismiss(ref: RefObject<HTMLElement | null>, open: boolean, close: (reason: DismissReason) => void) {
  useEffect(() => {
    if (!open) return;
    const self = ref.current;
    const onDoc = (e: PointerEvent) => { if (!self?.contains(e.target as Node)) close("outside"); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close("escape"); };
    const onOther = (e: Event) => { if ((e as CustomEvent).detail !== self) close("other"); };
    document.addEventListener("pointerdown", onDoc);
    document.addEventListener("keydown", onKey);
    document.addEventListener(OPEN_EVENT, onOther);
    document.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: self }));
    return () => {
      document.removeEventListener("pointerdown", onDoc);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener(OPEN_EVENT, onOther);
    };
  }, [ref, open, close]);
}
