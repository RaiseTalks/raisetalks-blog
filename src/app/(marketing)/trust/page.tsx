import type { Metadata } from "next";
import { Band, GridGap } from "@/components/layout/Band";
import { LegalPage } from "@/components/legal/LegalPage";
import { Headline } from "@/components/sections";
import { Reveal } from "@/components/motion";
import { BlogFaq } from "@/components/blog/BlogFaq";
import { InlineLinks } from "@/components/ui/InlineLinks";
import { trust, trustFaq } from "@/content/legal/trust";
import { pages } from "@/content/marketing/pages";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: pages.trust.title,
  description: pages.trust.description,
  keywords: ["RaiseTalks trust center", "RaiseTalks security", "RaiseTalks GDPR", "EU AI Act", "AI transparency", "data room security", "investor data privacy"],
  alternates: { canonical: pages.trust.path },
};

/**
 * Trust Center: the legal page layout (as /privacy-policy), then the site FAQ accordion (as /support).
 * Copy lives in src/content/legal/trust.ts.
 */
export default function TrustPage() {
  const base = site.url.replace(/\/$/, "");
  const url = `${base}${pages.trust.path}/`;
  const plain = (t: string) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage", "@id": `${url}#webpage`, url, name: `${pages.trust.title} — ${site.name}`, description: pages.trust.description,
        inLanguage: "en", isPartOf: { "@type": "WebSite", name: site.name, url: base }, about: { "@id": `${base}/#organization` },
      },
      {
        "@type": "FAQPage",
        mainEntity: trustFaq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plain(f.a) } })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LegalPage doc={trust} />
      <GridGap width="medium" />
      <Band tone="alt" width="medium" innerClassName="flex flex-col gap-10 max-tablet:px-7">
        <Reveal><Headline align="center" lead="Frequently Asked Questions" /></Reveal>
        <BlogFaq items={trustFaq.map((f) => ({ q: f.q, a: <p><InlineLinks text={f.a} /></p> }))} />
      </Band>
    </>
  );
}
