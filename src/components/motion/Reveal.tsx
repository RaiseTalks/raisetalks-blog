"use client";

import { Children, type ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/**
 * Slow, subtle fade-up when 20% visible. Plays once.
 * `immediate` (from RaiseTalks TV): no reveal at all, the block is rendered visible from the server HTML. For a block that sits in
 * the first viewport and is taller than 5x the visible part, where the 20% threshold
 * and the hidden server-rendered state would keep it empty until hydration or the first scroll.
 * `onMount` (Drop 21): same fade-up, but it plays as soon as the page loads instead of waiting for
 * 20% to be in view. For a tall block right under the hero (Pricing cards stacked on mobile).
 */
export function Reveal({
  children, delay = 0, className, immediate = false, onMount = false,
}: { children: ReactNode; delay?: number; className?: string; immediate?: boolean; onMount?: boolean }) {
  return (
    <motion.div
      className={className}
      initial={immediate ? false : "hidden"}
      animate={onMount && !immediate ? "show" : undefined}
      whileInView={immediate || onMount ? undefined : "show"}
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: item.hidden, show: { ...item.show, transition: { duration: 0.7, ease: EASE, delay } } }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Children appear one after another (default 150ms apart).
 * Each direct child is wrapped; pass the grid/flex classes via className.
 */
export function RevealGroup({
  children,
  stagger = 0.15,
  className,
  itemClassName,
}: {
  children: ReactNode;
  stagger?: number;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {Children.toArray(children).map((child, i) => (
        <motion.div key={i} variants={item} className={cn("h-full", itemClassName)}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
