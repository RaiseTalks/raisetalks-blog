import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge our custom type utilities (src/styles/tokens.css) so
// `cn("text-h2 text-headline")` keeps BOTH the size and the color.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["eyebrow", "h1", "h1-alt", "h2", "h2-alt", "h3", "h3-alt", "h4", "h4-alt", "body", "footnote"] }],
    },
  },
});

/** Merge class names; later Tailwind classes win. Owner: Studio (A) */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
