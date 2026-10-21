import type { LegalDoc } from "@/content/legal/types";
import { Band, GridGap } from "@/components/layout/Band";
import { StatementBanner } from "@/components/sections/StatementBanner";
import { LegalBody, type HeadingScale } from "./LegalBody";

/**
 * Legal page (Figma 2450:469 / 2302:2 / 2302:718), Drop 21:
 * - hero = bordered 1024 column; the "Last updated" tab sits in a top row whose bottom line runs rail to rail;
 *   regular H1 (bold in Figma = mistake)
 * - blue banner on the 1480 column with the first intro paragraph only (no markdown: ** is stripped)
 * - hero intro (Drop 24): the Home hero sequence (`.hero-intro-*`): title, subtitle, then the "Last updated" tab.
 * - body on the 1024 column with the standard band padding (64 / 48·32 / 40·8); further intro paragraphs open the body.
 */
export function LegalPage({ doc, updatedLabel = "Last updated", headingScale }: { doc: LegalDoc; updatedLabel?: string; headingScale?: HeadingScale }) {
  const [banner, ...rest] = doc.intro;
  const body = [...rest.map((p) => `p|${p}`), doc.body.trim()].join("\n");
  return (
    <>
      <section className="relative isolate overflow-hidden bg-page">
        <div className="mx-2 border-x border-rail-1 tablet:mx-12 laptop:mx-auto laptop:max-w-medium">
          <div className="flex justify-center border-b border-rail-1">
            <div className="hero-intro hero-intro-4 flex flex-col items-center gap-0.5 border-x border-rail-1 px-8 py-3 text-center tablet:px-12 tablet:py-4">
              <span className="text-footnote text-muted">{updatedLabel}</span>
              <time className="text-h4 text-brand-light-blue">{doc.updated}</time>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 px-4 py-16 text-center tablet:px-16 tablet:py-24">
            <h1 className="hero-intro hero-intro-0 text-h1 text-headline">{doc.title}</h1>
            <p className="hero-intro hero-intro-1 max-w-[420px] text-body text-copy">{doc.subtitle}</p>
          </div>
        </div>
      </section>
      <GridGap />
      <StatementBanner text={banner.replace(/\*\*/g, "")} size="body" />
      <Band width="medium">
        <LegalBody body={body} headingScale={headingScale} />
      </Band>
    </>
  );
}
