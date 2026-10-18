import { useReducedMotion, type HTMLMotionProps } from "motion/react";

// "Unfold" for navbar dropdowns (UserMenu, NotificationsMenu, MobileMenu panel):
// the panel reveals top-down through a clip, closes faster than it opens.
// Reduced motion: opacity only, no clip.
const EASE = [0.22, 1, 0.36, 1] as const;
const SHUT = "inset(0 0 100% 0 round var(--radius-md))";
const OPEN = "inset(0 0 0% 0 round var(--radius-md))";

type DropdownMotion = Pick<HTMLMotionProps<"div">, "initial" | "animate" | "exit">;

export const dropdownMotion: DropdownMotion = {
  initial: { opacity: 0, clipPath: SHUT },
  animate: { opacity: 1, clipPath: OPEN, transition: { duration: 0.28, ease: EASE } },
  exit: { opacity: 0, clipPath: SHUT, transition: { duration: 0.18, ease: EASE } },
};

export const dropdownMotionReduced: DropdownMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

/** Spread onto a motion.div inside <AnimatePresence>. */
export function useDropdownMotion(): DropdownMotion {
  return useReducedMotion() ? dropdownMotionReduced : dropdownMotion;
}
