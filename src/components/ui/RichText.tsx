import { Fragment } from "react";

/**
 * Tiny inline markup for content files, so copy stays in src/content/**:
 *   **text**  → semibold      __text__ → brand light blue      ^^text^^ → superscript
 * Example: "Your pitch deck is **one of 200** in an investor's inbox"
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__|\^\^[^^]+\^\^)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**")) return <strong key={i} className="font-semibold">{p.slice(2, -2)}</strong>;
        if (p.startsWith("__")) return <span key={i} className="text-brand-light-blue">{p.slice(2, -2)}</span>;
        if (p.startsWith("^^")) return <sup key={i} className="text-[0.6em]">{p.slice(2, -2)}</sup>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}
