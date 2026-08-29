import React from 'react';

/**
 * One of the delivered lucide icons, at the right size for the viewport.
 *
 * Figma ships each icon as three separate exports with the size and stroke
 * baked into the file — 42px at stroke 3 for desktop, 36px at 2.5 for tablet,
 * 32px at 2.5 for mobile (icon rules, node 3488-7675). So the variant is a
 * different file, not one file scaled: a single export cannot hit all three
 * stroke weights, since the stroke scales with the box.
 *
 * `name` is the directory under /img/icons/lucide. A few glyphs ship in two
 * treatments — gradient and flat blue — and those are separate directories
 * (e.g. `folder-tree` and `folder-tree-flat`), because which one is correct
 * depends on the section rather than the breakpoint.
 */
export default function LucideIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const base = `/img/icons/lucide/${name}`;
  return (
    // display:contents keeps <picture> out of the box model, so the <img> is
    // the flex/grid item and any layout class on it behaves exactly as it did
    // when this was a bare <img>. Without it the picture becomes the flex item
    // and shrinks under pressure — on the decoder-game cards that pulled a
    // 42px icon down to about 19px, because shrink-0 sat on the inner img.
    // Narrowest media query first — <source> is first-match-wins.
    <picture style={{ display: 'contents' }}>
      <source media="(max-width: 768px)" srcSet={`${base}/mobile.svg`} />
      <source media="(max-width: 1024px)" srcSet={`${base}/tablet.svg`} />
      <img src={`${base}/desktop.svg`} alt="" className={className} />
    </picture>
  );
}
