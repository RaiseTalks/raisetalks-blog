// Structured data (JSON-LD) for the pages that present the product and its plans: home, /pricing, /startups and
// /investors. Every value comes from src/content, the same text the site publishes; nothing is retyped here, so a
// price changed in src/content/marketing/pricing.ts changes here too. scripts/check-seo.mjs holds today's exact
// output.
import { pages } from "@/content/marketing/pages";
import { pricing, type Billing, type Plan } from "@/content/marketing/pricing";
import { site } from "@/content/site";

const base = site.url.replace(/\/$/, "");

/** `@id` of the Organization node; the home page publishes the full node under it. */
const organizationId = `${base}/#organization`;

/** UN/CEFACT codes schema.org reads in a UnitPriceSpecification: one month, one year. */
const unitCode: Record<Billing, string> = { monthly: "MON", annual: "ANN" };

/**
 * "$1,428" → 1428. A price in any other shape (another currency sign, cents, a range) fails the build instead of
 * publishing a wrong number.
 */
function usd(price: string): number {
  const m = /^\$(\d{1,3}(?:,\d{3})*)$/.exec(price);
  if (!m) {
    throw new Error(
      `Plan JSON-LD: cannot read "${price}" as a whole US-dollar price (src/content/marketing/pricing.ts). Update src/lib/structured-data.ts.`,
    );
  }
  return Number(m[1].replace(/,/g, ""));
}

/**
 * The product as a SoftwareApplication with one Offer per priced plan and billing period.
 * - `planIds` keeps only the plans a page is about (/startups, /investors); without it every priced plan is listed.
 * - A plan without a price (VC Platinum, "Contact us") has no Offer, because an Offer needs a number.
 * - Features marked "Coming soon" are left out of an Offer's description: it lists what the plan includes today.
 * - An unknown plan id, or no priced plan left, fails the build instead of emitting an empty list.
 */
export function softwareApplication(planIds?: readonly string[]) {
  const all: readonly Plan[] = pricing.plans;
  const unknown = (planIds ?? []).filter((id) => !all.some((p) => p.id === id));
  if (unknown.length > 0) {
    throw new Error(`Plan JSON-LD: no plan with id ${unknown.join(", ")} in src/content/marketing/pricing.ts.`);
  }
  const offers = all
    .filter((plan) => !planIds || planIds.includes(plan.id))
    .flatMap((plan) => {
      const price = plan.price;
      if (!price) return [];
      return pricing.billing.options.map((option) => {
        const amount = usd(price[option.id]);
        return {
          "@type": "Offer",
          name: `${plan.name} (${option.label})`,
          category: plan.audience,
          description: plan.features.filter((f) => !f.soon).map((f) => f.text).join(", "),
          price: amount,
          priceCurrency: "USD",
          priceSpecification: { "@type": "UnitPriceSpecification", price: amount, priceCurrency: "USD", unitCode: unitCode[option.id] },
          url: `${base}${pages.pricing.path}/`,
        };
      });
    });
  if (offers.length === 0) {
    throw new Error("Plan JSON-LD: no priced plan to list (src/content/marketing/pricing.ts). Update src/lib/structured-data.ts.");
  }
  return {
    "@type": "SoftwareApplication",
    "@id": `${base}/#software`,
    name: site.name,
    url: site.links.app,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: pages.home.description,
    publisher: { "@id": organizationId },
    offers,
  };
}

/**
 * One block for a page other than home: the product with its offers, plus a short Organization node so the
 * `publisher` reference resolves inside the page (the full Organization lives on the home page, same `@id`).
 */
export function productPageSchema(planIds?: readonly string[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [{ "@type": "Organization", "@id": organizationId, name: site.name, url: `${base}/` }, softwareApplication(planIds)],
  };
}

/** For a `<script type="application/ld+json">`: `<` escaped as the Next.js JSON-LD guide advises, so no copy can close the script tag. */
export const jsonLd = (schema: unknown) => JSON.stringify(schema).replace(/</g, "\\u003c");
