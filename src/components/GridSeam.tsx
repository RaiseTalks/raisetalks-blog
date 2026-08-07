import React from 'react';
import styles from './GridSeam.module.css';

// Decorative section-boundary strip matching the Figma homepage grid overlay
// (Figma: Website node 1157:571 and its repeats down the page).
// The dark variant matches node 1157:817, used where the strip sits on a dark section (e.g. before the CTA).
// The inner div uses the shared `rt-rail` class (src/css/rail.css) so its
// vertical lines land exactly where every other section's rail does.
export default function GridSeam({
  variant = 'light',
  innerClassName = 'rt-rail h-full',
}: {
  variant?: 'light' | 'dark';
  innerClassName?: string;
}) {
  return (
    <div className={`${styles.seam} ${variant === 'dark' ? styles.seamDark : ''}`} aria-hidden="true">
      <div className={variant === 'dark' ? `${innerClassName} rt-rail-dark` : innerClassName} />
    </div>
  );
}
