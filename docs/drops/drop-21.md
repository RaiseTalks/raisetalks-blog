# Drop 21 — Pricing, Pitch Competitions, Feature Requests (new), Affiliate Program (new), Policy pages (Studio)

Unzip at the project ROOT ("Replace all"). Builder has 2 small code tasks (forms), see "For Builder".

## 1. Pricing (/pricing)
- Hero: "Simple, Transparent Pricing" in one Poppins line at H2 size (no Georgia accent); column padding 48px top/bottom at every width. New `headingSize` prop on `sections/PageHero.tsx` (default "h1").
- Billing switch: Monthly first + selected by default; Annual second with an `accent` badge "Save 40%" (Startup Pro saves 41%, Investor Pro 40%).
- Cards: label + name, price, "or $x" line, button, divider, checklist. Buttons line up across cards.
- Cards fade in on load (new `onMount` prop on `motion/Reveal.tsx`) instead of waiting for 20% in view (mobile was half empty).

## 2. Pitch Competitions (/pitch-competitions)
- Hero stats: tablet+ one 480px card (TV 3121:5432 structure, light brand colours: white, border-1, 12px radius, 3 columns 24px apart); mobile white tiles 2 + 1 (1422:14). Old divider removed.
- "Why Join": "Pitch Competitions" never wraps (laptop heading column = max-content), heading top-aligned with the cards, mobile gap 32px. New `headingOneLine` option in `PerksGrid`.
- The Process: Startups How It Works frame (`ProcessSteps framed`, 4 columns on laptop, slider below), no white grid rows around it.
- What You Get: headline left on mobile (`CheckGrid headingMobileLeft`).

## 3. Feature Requests (NEW, /feature-request)
- Live copy (raisetalks.com/feature-request). Compact hero like Pricing; form card fades in on load.
- Fields: Name (optional), Email *, Feature Type + Priority (new `ui/Form` `Select`, defaults Enhancement / Medium), Description * with live 0 / 2000 counter, Use Case (optional). Support email + note below.
- Error + success copy approved by the designer.
- Contract: `src/lib/forms/types.ts` gets `FeatureRequestInput`, `FEATURE_TYPES`, `FEATURE_PRIORITIES`, `FEATURE_DESCRIPTION_MAX` and `FormService.featureRequest`. The component imports `featureRequestAction` from `@/lib/forms/actions` → **Builder adds it (the build fails until then).**
- Footer "Feature Requests" → `/feature-request`. SEO entry in pages.ts (sitemap is automatic).

## 4. Affiliate Program (NEW, /affiliate-program)
- Live copy (raisetalks.com/affiliate-program). Alt hero; 4 audience cards (Home Pitch-teaser item style); tier cards in the Pricing card style (commission instead of price, highlighted earnings box, button, divider, ✓ / muted ✗ list; Pro = dark card + "Recommended"); Pro Toolkit 3 × 3 in the Committee tile style with 9 new lucide icons (book-open, link, list-checks, send, palette, presentation, chart-line, file-pen-line, award); CTA band "Have Questions?".
- All 3 buttons → Calendly demo link (designer decision; live buttons are "#").
- Footer "Become an affiliate…" → `/affiliate-program`. SEO entry in pages.ts.

## 5. Policy pages (/privacy-policy, /terms-of-service, /refund-policy)
- Content = LIVE raisetalks.com (designer decision; replaces the Figma text). Privacy + Terms "July 8, 2026", Refund "August 5, 2025".
- Hero = 1024 column; the "Last updated" tab sits in a top row whose bottom line runs rail to rail.
- Blue banner on 1480 with the first intro paragraph only; the rest of the body on the 1024 column with the standard band padding (64 / 48·32 / 40·8).
- h2 = sections, h3 = sub-sections (text-h3), h4 = titles inside boxes (Refund "Important Timeline", "No Refunds For").
- Tables per Figma 2459:15: 8px radius, hairlines, 16px cells, first row `table-head` (#EDF0F3), then white / `table-stripe` (#FAFAFA), first column semibold. New tokens in tokens.css. New line tags: `th|` (header row), `br|` (address lines), `btn|label ¦ href` (button row).
- Internal links in the legal text now point to local routes (/privacy-policy, /refund-policy, /terms-of-service); app.raisetalks.com links stay.

## Studio files in this drop
src/app/(marketing)/pricing/page.tsx · src/app/(marketing)/pitch-competitions/page.tsx · src/app/(marketing)/feature-request/page.tsx (new) · src/app/(marketing)/affiliate-program/page.tsx (new) · src/components/motion/Reveal.tsx · src/components/sections/{PageHero,PricingPlans,PerksGrid,CheckGrid,ProcessSteps,index}.tsx/.ts · src/components/sections/FeatureRequestForm.tsx (new) · src/components/sections/AffiliateSections.tsx (new) · src/components/ui/Form.tsx · src/components/ui/Icon.tsx · src/components/legal/{LegalPage,LegalBody}.tsx · src/content/legal/{privacy,terms,refund}.ts · src/content/marketing/{pricing,pitch,pages,shared}.ts · src/content/marketing/featureRequest.ts (new) · src/content/marketing/affiliate.ts (new) · src/content/site.ts · src/lib/forms/types.ts · src/styles/tokens.css · docs/drops/drop-21.md

## Studio QA (sandbox, with the Builder code below applied locally)
Build + lint clean, 20 routes ○. next start + Chromium at 375 / 768 / 1280 / 1920: no horizontal overflow, no page errors on /pricing, /pitch-competitions, /feature-request, /affiliate-program, /privacy-policy, /terms-of-service, /refund-policy. Pricing: hero padding 48/48, cards visible on load without scrolling, Monthly checked. Pitch: "Why Join" heading top = card column top at 1280 / 1920; stats card 480px from 768. Feature Request: empty submit shows both errors, typing clears them and brings back the counter ("2 / 2000 characters"), valid submit shows the success text; selects white. Legal: hero 1024 at laptop+, tab row bottom line full column width, body padding 64 / 48·32 / 40·8, h3 30 / 28 / 24px. Not judged: Georgia italic widths ("Pitch Competitions" one line), real phones.

## For Builder
```
Integrate Studio Drop 21 (Pricing, Pitch Competitions, new Feature Request page, new Affiliate Program page, Policy pages). Read docs/drops/drop-21.md first. Do not edit Studio files.

1. Check the drop was unzipped at the project root (no copies under images/src). New folders: src/app/(marketing)/feature-request, src/app/(marketing)/affiliate-program.

2. Builder code (the build fails until this is done, because src/lib/forms/types.ts now requires FormService.featureRequest and FeatureRequestForm imports featureRequestAction):

   a) src/lib/forms/actions.ts — add the import at the top with the other imports and the new action at the end:
      import { FEATURE_PRIORITIES, FEATURE_TYPES, type FeatureRequestInput } from "./types";

      export async function featureRequestAction(
        _prev: FormResult | undefined,
        formData: FormData,
      ): Promise<FormResult> {
        const type = text(formData, "type") as FeatureRequestInput["type"];
        const priority = text(formData, "priority") as FeatureRequestInput["priority"];
        return forms.featureRequest({
          name: text(formData, "name") || undefined,
          email: text(formData, "email"),
          type: FEATURE_TYPES.includes(type) ? type : "enhancement",
          priority: FEATURE_PRIORITIES.includes(priority) ? priority : "medium",
          description: text(formData, "description"),
          useCase: text(formData, "useCase") || undefined,
        });
      }

   b) src/lib/forms/mock.ts — add to mockForms (after contact), importing FeatureRequestInput and FEATURE_DESCRIPTION_MAX from ./types:
      async featureRequest(input: FeatureRequestInput): Promise<FormResult> {
        if (!isEmail(input.email)) return { ok: false, error: "Please enter a valid email." };
        if (!input.description.trim()) return { ok: false, error: "Please describe your feature request." };
        if (input.description.length > FEATURE_DESCRIPTION_MAX) return { ok: false, error: "Please keep the description under 2000 characters." };
        await wait(DELAY_MS);
        console.info("[forms:mock] featureRequest", { ...input, email: input.email.trim() });
        return { ok: true };
      },

   c) src/lib/forms/index.ts — also export FeatureRequestInput in the type re-export line.

3. npm run build and npm run lint, fix Builder-side errors only (Studio file breaking the build → smallest fix, logged).

4. QA on npm start at 375 / 768 / 1280 / 1920 (fresh load, inject html{scroll-behavior:auto!important} before full-page shots):
   - /pricing: hero column padding 48/48; H1 one Poppins text, no italic span; cards visible in the first viewport without scrolling; "Monthly" aria-checked by default, "Annual" has the "Save 40%" badge; buttons above the divider and level across cards (1280/1920).
   - /pitch-competitions: stats = one 480px card from 768, white tiles 2 + 1 at 375; "Why Join Our / Pitch Competitions" accent on one line, heading top = card grid top at 1280/1920; The Process = blue rounded frame like /startups How It Works (4 columns at 1280+, drag slider below); "What You Get" headline left-aligned at 375, centred from 768.
   - /feature-request: compact hero; empty submit → 2 field errors; typing clears them and the counter reads "n / 2000 characters"; valid submit → "Thank you!" + text; terminal shows [forms:mock] featureRequest; selects default Enhancement / Medium.
   - /affiliate-program: 4 audience cards (4 across at 1280+), 2 tier cards (Basic light, Pro dark with "Recommended"), Pro Toolkit 3 × 3 (drag slider at 375), CTA band; all 3 buttons open the Calendly link.
   - Footer: "Feature Requests" → /feature-request and "Become an affiliate and earn money" → /affiliate-program (same tab).
   - /privacy-policy, /terms-of-service, /refund-policy: live raisetalks.com text; hero column 1024 at 1280+; the line under the "Last updated" tab spans the full hero column; blue banner 1480 wide; body column 1024 with padding 64 / 48·32 / 40·8; Privacy section 4 table (header row #EDF0F3, rows white / #FAFAFA); Refund boxes "Important Timeline" + "No Refunds For" and the two buttons at the end.
   - sitemap.xml lists /feature-request and /affiliate-program.
   - No horizontal overflow, no page errors on every route.

5. Commit "Drop 21: Pricing, Pitch, Feature Request, Affiliate, Policy pages", push, check the Vercel deploy.

6. Add a Drop 21 entry to docs/log.md (newest on top) with the measurements, then finish with REPORT FOR STUDIO.
```
