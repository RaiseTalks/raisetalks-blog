import React from 'react';
import styles from './GridSeam.module.css';

// Decorative section-boundary strip matching the Figma homepage grid overlay
// (Figma: Website node 1157:571 and its repeats down the page).
// The dark variant matches node 1157:817, used where the strip sits on a dark section (e.g. before the CTA).
export default function GridSeam({
  variant = 'light',
  innerClassName = 'container mx-auto px-4 h-full',
}: {
  variant?: 'light' | 'dark';
  innerClassName?: string;
}) {
  return (
    <div className={`${styles.seam} ${variant === 'dark' ? styles.seamDark : ''}`} aria-hidden="true">
      <div className={innerClassName} />
    </div>
  );
}
