import type { Metadata } from "next";
import { Band, GridGap } from "@/components/layout";
import {
  AudienceSwitch, CtaBand, FeatureGrid, Headline, LogoMarquee, McpSection, PageHero, PitchTeaser, SoftCards,
  SplitMedia, StatementBanner, Testimonial, TvTeaser,
} from "@/components/sections";
import { Reveal } from "@/components/motion";
import { home, type Audience } from "@/content/marketing/home";
import { pages } from "@/content/marketing/pages";
import { partnerLogos } from "@/content/marketing/shared";
import { footer, site } from "@/content/site";

export const metadata: Metadata = { description: pages.home.description, alternates: { canonical: "/" } };

/** One audience: MCP + cards travel under the sticky switch (`group`); Spend Less Time follows (`tail`). */
function audienceView(a: Audience) {
  const v = home.views[a];
  return {
    group: (
      <>
        <McpSection c={v.mcp} icons={home.mcpIcons} audience={a} />
        <GridGap tone={v.features.tone} />
        <FeatureGrid c={v.features} audience={a} />
        <GridGap tone={v.features.tone} />
      </>
    ),
    tail: <SplitMedia c={v.split} audience={a} />,
  };
}

/** Home — Figma 3257:1024 (Investors view) / 2601:8349 (Startups view). */
export default function HomePage() {
  const h = home.hero;

  // Organization + WebSite structured data, one block with one WebSite node (Google reads both from the home
  // page). Every value comes from src/content, the same text the site publishes; nothing is retyped here.
  // - No SearchAction: the catalog search lives on app.raisetalks.com, not on this site.
  // - sameAs: the external profile links of the footer's Community column, in order (only profiles that
  //   raisetalks.com itself publishes). No X/Twitter, because none is listed there. A missing column or one
  //   without an external link fails the build instead of emitting an empty list.
  // - logo: the 512 x 512 PNG, because Google needs at least 112 x 112 px and the header SVG is 200 x 16. It sits
  //   under the legacy /favicon/** path ("old-site files kept at their URLs", CLAUDE.md), where a clean-up could
  //   delete it with a green build; scripts/check-seo.mjs asserts the file exists and is large enough.
  const base = site.url.replace(/\/$/, "");
  const community = footer.columns.find((c) => c.title === "Community");
  const sameAs = (community?.links ?? []).filter((l) => l.external === true).map((l) => l.href);
  if (sameAs.length === 0) {
    throw new Error(
      'Home JSON-LD: src/content/site.ts has no footer column titled "Community" with an external profile link (sameAs). Restore the column or update src/app/(marketing)/page.tsx.',
    );
  }
  const founder = home.workspace.testimonial;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization", "@id": `${base}/#organization`, name: site.name, url: `${base}/`,
        logo: `${base}/favicon/android-chrome-512x512.png`, description: pages.home.description,
        // the node already hangs on the RaiseTalks Organization, so the role drops its trailing ", RaiseTalks"
        founder: { "@type": "Person", name: founder.name, jobTitle: founder.role.replace(/, RaiseTalks$/, "") },
        sameAs,
      },
      { "@type": "WebSite", "@id": `${base}/#website`, name: site.name, url: `${base}/`, publisher: { "@id": `${base}/#organization` } },
    ],
  };

  return (
    <>
      {/* `<` escaped as the Next.js JSON-LD guide advises, so no copy can close the script tag */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <PageHero
        eyebrow={h.eyebrow}
        eyebrowStyle="orbit"
        intro
        columnClassName="py-24"
        stackButtons={false}
        heading={h.heading}
        text={h.text}
        primary={h.primary}
        secondary={h.secondary}
        image={h.image}
        after={<LogoMarquee logos={partnerLogos} />}
      />
      <GridGap />
      <StatementBanner text={home.statement} />
      <GridGap />
      <Band innerClassName="flex flex-col gap-12 laptop:gap-16">
        <Reveal className="max-tablet:px-inner">
          <Headline align="center" layout="inline" lead={home.workspace.heading.lead} accent={home.workspace.heading.accent} />
        </Reveal>
        <div className="flex flex-col gap-6">
          <SoftCards cards={home.workspace.cards} />
          <Testimonial t={home.workspace.testimonial} />
        </div>
      </Band>
      <GridGap />
      <AudienceSwitch
        label={home.switch.label}
        options={home.switch.options}
        initial={home.switch.default}
        views={{ investors: audienceView("investors"), founders: audienceView("founders") }}
      />
      <GridGap />
      <TvTeaser c={home.tv} />
      <GridGap />
      <PitchTeaser c={home.pitch} />
      <CtaBand c={home.cta} />
    </>
  );
}
