import { RevealGroup } from "@/components/motion";

/**
 * Soft gradient cards with Georgia-italic titles (Home "One Workspace" 3257:1094).
 * 3 across on laptop, 2 + 1 (full width) on tablet, stacked on mobile.
 */
export function SoftCards({ cards }: { cards: { title: string; text: string }[] }) {
  return (
    <RevealGroup className="grid gap-4 tablet:grid-cols-2 tablet:gap-6 laptop:grid-cols-3" itemClassName="tablet:last:odd:col-span-2 laptop:last:odd:col-span-1">
      {cards.map((c) => (
        <article
          key={c.title}
          className="flex h-full flex-col gap-1.5 rounded-lg border border-border-1 p-6 transition-[background-color,border-color] duration-[var(--duration-hover)] ease-[var(--ease-soft)] hover:border-border-2 tablet:p-8"
          style={{ backgroundImage: "var(--gradient-card-soft)" }}
        >
          <h3 className="text-h4-alt text-subheadline">{c.title}</h3>
          <p className="text-body text-copy">{c.text}</p>
        </article>
      ))}
    </RevealGroup>
  );
}
