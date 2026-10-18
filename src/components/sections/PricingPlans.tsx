"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import type { Billing, Plan } from "@/content/marketing/pricing";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Pricing (Studio design from the live copy): monthly/annual switch (same pill as the Home
 * audience switch, monthly selected by default, Annual carries a savings badge) + 3 plan cards.
 * Startup Pro uses the founders accent, Investor Pro the blue, VC Platinum the dark ink card.
 * Card order (Drop 21): label + name, price, button, divider, feature list.
 * Drop 23: "Save 40%" = dark Website badge (as Investors Due Diligence). Mobile: name → price about half as far
 * (price box 40px instead of 64px), price → button one step closer (24px).
 */
export function PricingPlans({
  plans, billing, soonLabel,
}: {
  plans: Plan[]; soonLabel: string;
  billing: { label: string; options: { id: Billing; label: string; badge?: string }[]; per: Record<Billing, string> };
}) {
  const [period, setPeriod] = useState<Billing>(billing.options[0].id);
  return (
    <div className="flex flex-col items-center gap-10 laptop:gap-12">
      <div role="radiogroup" aria-label={billing.label} className="flex gap-2 rounded-full bg-section-alt p-1">
        {billing.options.map((o) => {
          const on = o.id === period;
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setPeriod(o.id)}
              className={cn("group flex items-center gap-2 rounded-full px-6 py-2 text-body text-headline transition-colors duration-[var(--duration-hover)]", o.badge && "pr-2", on && "bg-page font-semibold")}
            >
              <span className={cn("transition-opacity duration-[var(--duration-hover)]", !on && "opacity-50 group-hover:opacity-80")}>{o.label}</span>
              {o.badge && <Badge variant="website" className="text-footnote">{o.badge}</Badge>}
            </button>
          );
        })}
      </div>

      <ul className="grid w-full gap-4 tablet:grid-cols-2 tablet:gap-6 laptop:grid-cols-3">
        {plans.map((p) => {
          const dark = p.tone === "platinum";
          return (
            <li
              key={p.id}
              data-audience={p.tone === "founders" ? "founders" : "investors"}
              className={cn(
                "flex flex-col gap-8 rounded-lg border p-6 transition-colors duration-[var(--duration-card-hover)] tablet:p-8",
                dark ? "on-dark border-ink-border bg-ink text-ink-copy tablet:col-span-2 laptop:col-span-1" : "border-border-1 bg-card hover:bg-card-alt-hover",
              )}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className={cn("text-eyebrow", dark ? "text-brand-yellow" : "text-[var(--audience-accent)]")}>{p.audience}</p>
                  <h2 className={cn("text-h3", dark ? "text-on-brand" : "text-subheadline")}>{p.name}</h2>
                </div>
                <div className="flex min-h-[40px] items-end gap-1.5 tablet:min-h-[64px]" aria-live="polite">
                  {p.price ? (
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.p key={period} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="flex items-end gap-1.5">
                        <span className="text-h1 leading-none text-headline">{p.price[period]}</span>
                        <span className="pb-1 text-body text-muted">{billing.per[period]}</span>
                      </motion.p>
                    </AnimatePresence>
                  ) : (
                    <span className="text-h2-alt leading-none text-on-brand">{p.priceNote}</span>
                  )}
                </div>
                {/* always rendered (empty on VC Platinum) so the buttons line up across the cards */}
                <p className="-mt-2 text-footnote text-muted" aria-hidden={!p.price}>
                  {p.price ? (period === "annual" ? `or ${p.price.monthly}${billing.per.monthly}` : `or ${p.price.annual}${billing.per.annual}`) : "\u00a0"}
                </p>
              </div>
              <Button
                variant={p.tone === "founders" ? "alternative" : p.tone === "investors" ? "primary" : "ghost"}
                size="lg"
                fullWidth
                href={p.cta.href}
                external={p.cta.external}
                className="max-tablet:-mt-2"
              >
                {p.cta.label}
              </Button>
              <ul className={cn("flex flex-1 flex-col gap-3 border-t pt-6", dark ? "border-ink-border" : "border-border-1")}>
                {p.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-2.5 text-body">
                    <Check className={cn("mt-0.5 size-4 shrink-0", dark ? "text-brand-yellow" : "text-good")} strokeWidth={2} aria-hidden />
                    <span className={cn("flex flex-wrap items-center gap-2", dark ? "text-ink-copy" : "text-copy")}>
                      {f.text}
                      {f.soon && <Badge variant="neutral" dot className={dark ? "border-ink-border bg-ink text-on-brand" : ""}>{soonLabel}</Badge>}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
