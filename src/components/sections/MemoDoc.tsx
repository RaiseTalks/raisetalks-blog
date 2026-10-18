import Image from "next/image";
import {
  BadgeDollarSign, Box, ChartArea, ChartPie, CircleAlert, CircleCheckBig, Earth, FileText, HandCoins, Landmark, Milestone,
  Rocket, Sparkles, Star, Tag, Target, TriangleAlert, type LucideIcon,
} from "lucide-react";
import type { MemoContent, MemoIcon, MemoTone } from "@/content/marketing/investors";
import { cn } from "@/lib/utils";

/*
 * Investors Pre-Score memo — a fixed 794px A4 sheet after Figma "A4-PreScoring- full length" (876:5759).
 * Platform look, not the website's: colours come from the --m-* tokens on `.memo` (components.css), light / dark
 * via data-theme (dark = Figma 4154:3946). Type = Figma "PDF/…" styles, used as one-offs:
 * H1 22 Bold · H2 18 SemiBold · H3 12 SemiBold · H4 11 Medium · H5 9 Regular +20% · H6 7 Bold +20% · p1 10 · p1 xs 8.
 * Never reflows: MemoWindow scales the whole sheet down on narrow screens.
 */

const icons: Record<MemoIcon, LucideIcon> = {
  "circle-check-big": CircleCheckBig, "circle-alert": CircleAlert, "badge-dollar-sign": BadgeDollarSign, tag: Tag,
  "chart-area": ChartArea, target: Target, rocket: Rocket, box: Box, sparkles: Sparkles, "triangle-alert": TriangleAlert,
  milestone: Milestone, earth: Earth, "hand-coins": HandCoins, "file-text": FileText, "chart-pie": ChartPie, landmark: Landmark, star: Star,
};
const toneIcon: Record<MemoTone, string> = { good: "text-[var(--m-good)]", bad: "text-[var(--m-bad)]" };
const toneBox: Record<MemoTone, string> = {
  good: "border-[var(--m-good-border)] bg-[var(--m-good-bg)]",
  bad: "border-[var(--m-bad-border)] bg-[var(--m-bad-bg)]",
};
/** Use-of-funds slices + legend (Figma blue categories 1 / 3 / 4 / 6). */
const slice = ["var(--m-cat-1)", "var(--m-cat-3)", "var(--m-cat-4)", "var(--m-cat-6)"];
/** List bar colours per sub-list (Product/Service, Traction, Roadmap). */
const bar = ["bg-[var(--m-cat-2)]", "bg-[var(--m-cat-4)]", "bg-[var(--m-cat-6)]"];

/** Score pill colour by grade (Figma: 5 = very good, 4 = good, 3 = moderate, below = bad). */
function Score({ text }: { text: string }) {
  const n = Number(text.match(/(\d)\s*\/\s*5/)?.[1] ?? 0);
  const g = n >= 5 ? "very-good" : n === 4 ? "good" : n === 3 ? "moderate" : "bad";
  return (
    <span
      className="rounded-full border px-2 py-1 text-[11px] font-medium leading-[1.45] whitespace-nowrap"
      style={{ color: `var(--m-${g})`, background: `var(--m-${g}-bg)`, borderColor: `var(--m-${g}-border)` }}
    >
      {text}
    </span>
  );
}

function I({ name, className }: { name: MemoIcon; className?: string }) {
  const C = icons[name];
  return <C className={cn("size-4 shrink-0 text-brand-light-blue", className)} strokeWidth={1.75} aria-hidden />;
}

function Section({ title, score, children }: { title: string; score?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 overflow-hidden rounded-[12px] border-[0.5px] border-[var(--m-section-border)] bg-[var(--m-section)] p-4">
      <div className="flex items-start justify-between">
        <h4 className="text-[18px] font-semibold leading-[1.2] text-[var(--m-text)]">{title}</h4>
        {score && <Score text={score} />}
      </div>
      {children}
    </section>
  );
}

const p1 = "text-[10px] leading-[1.45] text-[var(--m-text)]";
const h3 = "text-[12px] font-semibold leading-[1.45] text-[var(--m-text)]";
const nested = "rounded-[8px] border-[0.5px] border-[var(--m-nested-border)] bg-[var(--m-nested)] p-3";

function BarList({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div className="flex flex-col gap-2">
      <h5 className={h3}>{title}</h5>
      <ul className="flex flex-col gap-2">
        {items.map((it) => (
          <li key={it} className={cn("flex items-start gap-2", p1)}>
            <span className={cn("mt-[3px] h-[10px] w-[3px] shrink-0 rounded-[0.2px]", color)} aria-hidden />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ToneList({ title, items, icon, tone }: { title: string; items: string[]; icon: MemoIcon; tone: MemoTone }) {
  return (
    <div className={cn("flex flex-col gap-2 rounded-[8px] border p-2", toneBox[tone])}>
      <h5 className={h3}>{title}</h5>
      <ul className="flex flex-col gap-1.5">
        {items.map((it) => (
          <li key={it} className={cn("flex items-start gap-2", p1)}>
            <I name={icon} className={cn("mt-[2px] size-3", toneIcon[tone])} />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MemoDoc({ m, theme }: { m: MemoContent; theme: "light" | "dark" }) {
  const ends = m.transaction.funds.map((_, i) => m.transaction.funds.slice(0, i + 1).reduce((t, f) => t + f.share, 0));
  const stops = m.transaction.funds.map((f, i) => `${slice[i % slice.length]} ${ends[i] - f.share}% ${ends[i]}%`);
  const company = m.meta.find((x) => x.label === "Company")?.value ?? "";
  return (
    <article data-theme={theme} className="memo flex w-[794px] flex-col gap-5 overflow-hidden rounded-md bg-[var(--m-bg)]">
      <div className="flex flex-col gap-5 px-10 pt-10">
        {/* logo row: RaiseTalks left, the scored company right (name as text; Figma shows a client logo) */}
        <div className="flex items-center justify-between px-4">
          <Image src={theme === "dark" ? "/icons/logo-raisetalks-white.svg" : "/icons/logo-raisetalks.svg"} alt="RaiseTalks" width={150} height={14} className="h-3 w-auto" />
          <span className="text-[14px] font-bold tracking-tight text-[var(--m-text)]">{company}</span>
        </div>

        <header className="flex flex-col gap-8 px-2 pb-4">
          <h3 className="text-center text-[22px] font-bold leading-[1.2] text-[var(--m-text)]">{m.title}</h3>
          <dl className="flex justify-between text-[9px] uppercase leading-[1.45] tracking-[0.2em] text-[var(--m-text)]">
            {m.meta.map((x) => (
              <div key={x.label}>
                <dt>{x.label}:</dt>
                <dd>{x.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <Section title={m.overview.title}><p className={p1}>{m.overview.text}</p></Section>

        <Section title={m.transaction.title}>
          <div className="flex items-center justify-between">
            <dl className="flex w-[333px] flex-col gap-4">
              {m.transaction.terms.map((t) => (
                <div key={t.label} className={cn("flex gap-1", p1)}>
                  <dt className="font-semibold">{t.label}</dt>
                  <dd>{t.value}</dd>
                </div>
              ))}
            </dl>
            <div className="flex w-[333px] flex-col gap-4">
              <h5 className={h3}>{m.transaction.fundsTitle}</h5>
              <div className="flex items-center gap-4">
                <div className="size-[93px] shrink-0 rounded-full" style={{ background: `conic-gradient(${stops.join(", ")})` }} role="img" aria-label={m.transaction.funds.map((f) => `${f.share}% ${f.label}`).join(", ")} />
                <ul className="flex flex-col gap-2">
                  {m.transaction.funds.map((f, i) => (
                    <li key={f.label} className={cn("flex items-center gap-2.5", p1)}>
                      <span className="size-3 shrink-0 rounded-2xs" style={{ background: slice[i % slice.length] }} aria-hidden />
                      <span className="font-semibold">{f.share}%</span>
                      {f.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Section>

        <Section title={m.team.title} score={m.team.score}>
          {/* 2 × 2 (website example; the Figma frame shows 3 × 2) */}
          <div className="grid grid-cols-2 gap-4">
            {m.team.members.map((p) => (
              <div key={p.name} className={cn("flex flex-col gap-4", nested)}>
                <div className="flex flex-col gap-0.5">
                  <p className={cn("text-[7px] font-bold uppercase leading-[1.45] tracking-[0.2em]", p.role === "Core team" ? "text-[var(--m-muted)]" : "text-brand-light-blue")}>{p.role}</p>
                  <p className="text-[11px] font-medium leading-[1.45] text-[var(--m-text)]">{p.name}</p>
                  <p className="text-[8px] leading-[1.25] text-[var(--m-muted)]">{p.title}</p>
                </div>
                <p className={p1}>{p.text}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {m.team.notes.map((n) => (
              <div key={n.title} className={cn("flex flex-col gap-1 rounded-[8px] border p-3", n.tone === "good" ? toneBox.good : "border-[var(--m-very-bad-border)] bg-[var(--m-bad-bg)]")}>
                <div className="flex items-center gap-2">
                  <I name={n.icon} className={cn("size-3.5", toneIcon[n.tone])} />
                  <h5 className={h3}>{n.title}</h5>
                </div>
                <p className={p1}>{n.text}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title={m.product.title} score={m.product.score}>
          <p className={p1}>{m.product.text}</p>
          <div className="flex gap-5">
            {m.product.facts.map((f) => (
              <div key={f.label} className={cn("flex flex-1 gap-1.5", nested)}>
                <I name={f.icon} />
                <div className="flex flex-col gap-0.5">
                  <p className={h3}>{f.label}</p>
                  <p className={p1}>{f.value}</p>
                </div>
              </div>
            ))}
          </div>
          {m.product.lists.map((l, i) => <BarList key={l.title} title={l.title} items={l.items} color={bar[i % bar.length]} />)}
        </Section>

        <Section title={m.market.title} score={m.market.score}>
          <div className="flex gap-4 px-2">
            {m.market.sizes.map((s) => (
              <div key={s.label} className="flex flex-1 gap-3">
                <span className="w-1 shrink-0 self-stretch rounded-[0.2px] bg-brand-light-blue" aria-hidden />
                <div className="flex flex-col gap-1">
                  <p className="text-[18px] font-semibold leading-[1.2] text-[var(--m-text)]">{s.label}</p>
                  <p className={p1}>{s.value} {s.note}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            {m.market.facts.map((f) => (
              <div key={f.label} className={cn("flex w-[216px] flex-col gap-1.5", nested)}>
                <I name={f.icon} />
                <div className="flex flex-col gap-0.5">
                  <p className={h3}>{f.label}</p>
                  <p className={p1}>{f.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <h5 className={h3}>{m.market.whyNow.title}</h5>
            <p className={p1}>{m.market.whyNow.text}</p>
          </div>
          <div className="flex w-[480px] flex-col gap-2 py-2">
            <h5 className={h3}>{m.market.competitors.title}</h5>
            <ul className="flex flex-col gap-2">
              {m.market.competitors.items.map((it) => (
                <li key={it} className={cn("flex gap-2", p1)}>
                  <span className="w-[3px] shrink-0 self-stretch rounded-[0.2px] bg-brand-light-blue" aria-hidden />
                  {it}
                </li>
              ))}
            </ul>
          </div>
          {m.market.lists.map((l) => <ToneList key={l.title} {...l} />)}
        </Section>

        <Section title={m.deal.title} score={m.deal.score}>
          <dl className="flex gap-6 px-2">
            {m.deal.facts.map((f) => (
              <div key={f.label} className="flex flex-1 flex-col gap-1">
                <I name={f.icon} />
                <dt className="text-[11px] font-medium leading-[1.45] text-[var(--m-text)]">{f.label}</dt>
                <dd className={p1}>{f.value}</dd>
              </div>
            ))}
          </dl>
          {m.deal.lists.map((l) => <ToneList key={l.title} {...l} />)}
        </Section>
      </div>

      <footer className="flex flex-col gap-2.5 bg-[var(--m-bg2)] px-10 py-5">
        <div className="flex flex-col gap-4 rounded-[12px] border-2 border-brand-light-blue bg-brand-dark-blue p-8 text-on-brand">
          <h4 className="text-[18px] font-semibold leading-[1.2] text-on-brand">{m.deal.recommendation.title}</h4>
          <p className="text-[10px] leading-[1.45]">{m.deal.recommendation.text}</p>
        </div>
        <div className="flex flex-col gap-1 p-4">
          <div className="flex items-center gap-1.5">
            <I name="triangle-alert" className="text-[var(--m-muted)]" />
            <h5 className="text-[11px] font-medium italic leading-[1.45] text-[var(--m-muted)]">{m.deal.disclaimer.title}</h5>
          </div>
          <p className="text-[10px] italic leading-[1.45] text-[var(--m-muted)]">{m.deal.disclaimer.text}</p>
        </div>
      </footer>
    </article>
  );
}
