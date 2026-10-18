import { Fragment } from "react";
import type { Heading } from "@/content/marketing/shared";
import { Band } from "@/components/layout/Band";
import { Reveal, RevealGroup } from "@/components/motion";
import { Headline } from "./Headline";

/**
 * Startups "The Problem" (1316:4739): eyebrow + headline left; 2 + 1 grey cards right. Laptop: 50 / 50.
 * `heading.lead` parts break per breakpoint: laptop+ "Great founders lose" / "raises in due diligence.",
 * tablet "Great founders lose raises" / "in due diligence."; mobile runs on. Drop 23: "all" = break at every width.
 */
type LeadPart = { text: string; breakAfter?: "tablet" | "laptop" | "all" };
const breakClass = { tablet: "hidden tablet:inline laptop:hidden", laptop: "hidden laptop:inline", all: "" } as const;
export function ProblemSection({ c }: { c: { eyebrow: string; heading: { lead: LeadPart[]; accent: Heading["accent"] }; text: string[]; cards: { title: string; text: string }[] } }) {
  const lead = c.heading.lead.map((p, i) => (
    <Fragment key={p.text}>{p.text}{i < c.heading.lead.length - 1 && <>{p.breakAfter && <br className={breakClass[p.breakAfter]} />}{" "}</>}</Fragment>
  ));
  return (
    <Band innerClassName="grid gap-10 laptop:grid-cols-2 laptop:gap-16">
      <Reveal className="flex flex-col gap-4 max-tablet:px-inner">
        <p className="text-eyebrow text-brand-light-blue">{c.eyebrow}</p>
        <Headline lead={lead} accent={c.heading.accent} />
        <p className="text-body text-copy">{c.text.map((l) => <span key={l} className="block">{l}</span>)}</p>
      </Reveal>
      <RevealGroup className="grid gap-4 tablet:grid-cols-2 tablet:gap-6" itemClassName="last:odd:tablet:col-span-2">
        {c.cards.map((k) => (
          <article key={k.title} className="flex h-full flex-col gap-4 rounded-lg border border-border-1 bg-card p-6 transition-colors duration-[var(--duration-card-hover)] hover:bg-card-alt-hover">
            <h3 className="text-h4 text-subheadline">{k.title}</h3>
            <p className="text-body text-copy">{k.text}</p>
          </article>
        ))}
      </RevealGroup>
    </Band>
  );
}
