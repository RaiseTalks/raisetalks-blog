---
title: "Data Room Access Tiers: What to Share at First Contact vs Due Diligence"
title_meta: "Data Room Access Levels: What to Share and When"
description: "Sharing everything is reckless and sharing nothing is slow. The four-tier access model, and why enforcement has to sit below the interface."
slug: data-room-access-tiers-what-to-share
date: 2026-09-23T08:11:00Z
authors: [dariiava]
tags: [data-room, due-diligence, investor-relations, startup-checklist]
keywords:
  - data room access levels
  - data room permissions
  - what to share with investors
  - data room security
  - investor access control
image: /img/blog/data-room-access-tiers-what-to-share/og-1200x630.png
---

Most founders run their data room with one access level: the link. Anyone who has it sees everything, or you send nothing until an investor has proven themselves, which takes three emails and a week.

Both are bad, and they are the same mistake - treating access as binary when it is naturally a gradient. Four tiers solve it, and the structure is simple enough to set up once and never think about again.

<!-- truncate -->

## Key takeaways

- Four tiers: **public, basic, due diligence, owner.** Each maps to a stage in your pipeline.
- The public tier is a **growth asset**, not a risk. It is what lets you be found and shared.
- Cap table, detailed financials and named customer contracts belong at due-diligence tier. Nothing else needs to be that restricted.
- Access must **expire**. A permanent grant to an investor who passed eight months ago is a live exposure.
- Enforcement has to sit below the interface. If a tier is enforced in the UI only, it is a suggestion.

---

## Why binary access costs you real money

**Share everything, always.** Your cap table, burn, runway and customer contracts are in the hands of anyone a recipient forwards the link to - including, eventually, a competitor. Most founders discover this only when it has already happened.

**Share nothing until they prove themselves.** Every first conversation starts with a negotiation about access. You add friction at precisely the moment an investor's interest is at its most fragile and their alternatives are most abundant. Multiply by a hundred investors and the cost is measured in weeks.

The gradient exists whether or not you model it. An investor at first contact needs different information from one writing a term sheet. Modelling it explicitly is the only version where you are not choosing between reckless and slow.

## The four tiers

### Public

**Who:** anyone with the link. Cold inbound, catalogue browsers, anyone an investor forwards it to.

**What:** company description, team, product, the problem, market and competitive positioning, high-level traction, what you are raising at a headline level.

**Not:** cap table, detailed financials, named customers, burn, runway, deal terms.

Founders reflexively treat this tier as the risky one. It is the opposite: it is the **asset**. It is what makes your company discoverable, shareable and forwardable without a conversation. An investor who wants to show you to a partner can do so at 11pm without emailing you.

RaiseTalks sets this at 41 of 143 fields, and the public profile lives at a crawlable URL with Open Graph and structured data, which makes it work as an SEO surface too. That mechanic is covered in [your public startup profile is an SEO asset](/blog/public-startup-profile-seo-asset).

### Basic

**Who:** an investor who has taken a first call, or one you are actively pursuing.

**What:** everything public, plus detailed metrics and definitions, go-to-market motion and unit economics, detailed competitive analysis, product roadmap, deal terms and use of funds, summary financials.

**Not:** full cap table, line-item financials, named customer contracts, employee-level detail.

This is the working tier and where most of your investor relationships will live. It is enough for an investor to form a real view and decide whether to spend diligence time. RaiseTalks sets this at 125 of 143 fields.

### Due diligence

**Who:** an investor in active diligence, at stage 5 or beyond in [your pipeline](/blog/run-your-raise-as-a-pipeline-10-stages).

**What:** everything. Full financials, complete cap table including every SAFE and note, named customers and contracts, legal documents, IP assignments, employment agreements.

Grant it deliberately, to a named person, with an expiry.

### Owner

You and your team. Everything, plus drafts, internal notes and work in progress. Worth naming as a tier because it stops "we have not finished this section" from leaking into an investor-facing view.

## Mapping tiers to pipeline stages

| Pipeline stage | Tier |
|---|---|
| Before first contact | Public |
| Data room shared, first call | Public, or basic if the call went well |
| Second call | Basic |
| Due diligence | Due diligence |
| Term sheet onward | Due diligence |
| Rejected | Revoke, or drop to public for updates |

That last row is the one nobody does. An investor who passed six months ago should not still hold due-diligence access to your cap table. Not because they are malicious, but because their laptop, their inbox and their analyst turnover are now part of your attack surface.

## Expiry is not optional

Every grant should carry a date. Common windows: 30 days for an active conversation, 90 days for a live diligence process, 6 months for a committed investor, indefinite only for existing shareholders.

Two reasons this matters more than it sounds.

**Hygiene.** Founders do not revoke access manually. Nobody does. Expiry is the only mechanism that actually works, because it requires no action from the person who has no incentive to take it.

**Signal.** An expiring grant communicates that access is a considered decision rather than a default. That reads as seriousness, not as paranoia.

## Enforcement has to sit below the interface

This is the technical point that separates a real tier system from a cosmetic one.

If your tiers are implemented by hiding sections in the interface, they are not access control. The data is still being sent to the browser; it is merely not displayed. Anyone with developer tools, or any bug in the rendering path, sees everything.

Real enforcement happens at the data layer: the server never returns a field the requester is not entitled to. RaiseTalks enforces its four tiers server-side and at the database with row-level security, which means a front-end bug cannot leak a cap table because the cap table was never sent.

When you evaluate any tool for this, ask one question: **is the restricted data sent to the browser and hidden, or never sent at all?** It is the only question that matters.

## The practical setup

1. Fill your record completely, at owner tier.
2. Assign every section to its lowest safe tier. Default to public unless there is a specific reason not to.
3. Publish the public tier and put the link everywhere: your site, your email signature, your LinkedIn.
4. Grant basic on a first call, by default, without being asked.
5. Grant due diligence deliberately, per person, with an expiry.
6. Review grants monthly. Revoke anything from a closed conversation.

Step 4 is the one that changes outcomes. An investor who leaves a first call already holding the detail they need to form a view is an investor who forms one that week rather than in three weeks.

---

## Frequently asked questions

**What should I share with investors at first contact?**
Company, team, product, problem, market, competitive position and high-level traction. Not cap table, detailed financials or deal terms.

**When should I share my cap table?**
At due diligence, to a named investor, with an expiry. Not in a link you send to a hundred people.

**Do I need an NDA to share a data room?**
Usually not, and asking early-stage investors to sign one frequently costs the meeting. Tiered access is the better mechanism: it solves the same problem without a legal negotiation.

**How do I stop investors forwarding my data room?**
You cannot fully, which is exactly why the public tier should contain nothing you would mind being forwarded and the sensitive tiers should be granted per person with an expiry.

**Is hiding sections in the UI enough?**
No. If the data reaches the browser it is exposed. Enforcement must happen server-side.

---

## Read next

- [The startup data room, field by field](/blog/startup-data-room-field-by-field-2026)
- [Run your raise as a pipeline](/blog/run-your-raise-as-a-pipeline-10-stages)
- [Your public startup profile is an SEO asset](/blog/public-startup-profile-seo-asset)
- [Data room red flags](/blog/data-room-red-flags-gaps-stall-diligence)

---

RaiseTalks enforces four access tiers at the database layer, with per-invite expiry and an audit trail of every grant. Basic and due-diligence sharing are on Pro. [Start your 30-day trial](https://app.raisetalks.com/sign-up).
