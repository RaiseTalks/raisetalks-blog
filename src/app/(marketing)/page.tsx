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
  return (
    <>
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
