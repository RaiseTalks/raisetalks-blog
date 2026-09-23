---
title: "You Cannot Compare Two Startups Today. Here Is Why That Is a Data Problem"
title_meta: "Comparing Startups for Investment: A Data Problem"
description: "Public markets made any two companies comparable through standard disclosure. Private early-stage markets still cannot compare two seed companies."
slug: you-cannot-compare-two-startups
date: 2026-09-23T08:26:00Z
authors: [dariiava]
tags: [dealflow, investor-playbook, market-data, ai]
keywords:
  - comparing startups investment
  - startup comparison framework
  - venture capital standardisation
  - startup data standard
  - how to compare startups
image: /img/blog/you-cannot-compare-two-startups/og-1200x630.png
---

An analyst can compare any two listed companies in minutes. Same filings, same accounting standards, same reporting periods, same definitions. The comparison is not a research project; it is a lookup.

An investor cannot compare two seed-stage companies at all. Not quickly, not slowly. There are no common axes, because each company chose its own.

That gap is decades of market infrastructure, and its absence is the largest hidden cost in early-stage capital allocation.

<!-- truncate -->

## Key takeaways

- Public markets solved comparability through **mandatory structured reporting**, not through better analysts.
- Private early-stage companies self-define every metric, so no two are measured on the same axis.
- The cost falls on **founders** as slow processes and on **investors** as a narrow, proximity-selected portfolio.
- This is not solvable by AI reading unstructured decks better. Garbage in, confidently summarised garbage out.
- A standard emerges when enough companies publish to one, not when a regulator mandates it.

---

## What public markets actually solved

The comparability of listed companies is not a natural property of large companies. It was built, deliberately, over the best part of a century, and it was contested at every step.

Three components:

1. **Mandated disclosure.** Certain facts must be published, on a schedule.
2. **Standardised definitions.** Revenue means a specific thing. So does an operating lease.
3. **A machine-readable format.** The most recent layer: since XBRL tagging arrived around 2009, filings are structured data, not just prose.

The result: any two listed companies sit on the same axes without anyone doing translation work. That is why equity research scales, why index funds are possible, and why a retail investor can meaningfully compare two firms.

None of the three exists in private early-stage markets.

## What a seed company publishes instead

A deck, in a self-chosen format, containing self-defined metrics, with no schedule and no verification.

Concretely, "10,000 users" from two different companies can mean:

- 10,000 signups since launch, ever
- 10,000 monthly active, where active means opened the app
- 10,000 monthly active, where active means completed a core action
- 10,000 seats across 40 enterprise accounts
- 10,000 including a free tier that is 97% of the total

These are five different businesses. They appear identically on a slide. An investor comparing two companies is comparing two sentences that look the same and are not.

Now multiply across every metric: retention, churn, CAC, ARR, gross margin, pipeline. None standardised. Many self-serving by construction, not through dishonesty but because a founder picks the definition that best represents what they believe is true.

## Who pays for it

**Founders pay in time.** Every conversation starts with translation. What do you mean by active. How do you count churn. Is that ARR or run-rate. Twenty minutes per investor, a hundred investors, before any evaluation begins. That translation cost is a meaningful share of why a round takes [three to six months](/blog/how-long-a-seed-round-actually-takes).

**Investors pay in narrowness.** Unable to compare cheaply, they fall back on proxies: who introduced the company, how polished the deck is, whether the founder's background is legible. Those proxies correlate with proximity rather than quality, which produces a portfolio shaped by network rather than by merit. The economics are in [adverse selection](/blog/adverse-selection-warm-intro-dealflow).

**The market pays in misallocation.** Capital routes to the companies that are easiest to evaluate rather than the ones most likely to work. Over thousands of decisions that is a systematic efficiency loss, and it is invisible because there is no counterfactual anyone can observe.

## Why AI does not fix this on its own

The common assumption: language models can read any deck, so the format problem is solved.

It is not, for a reason that has nothing to do with model capability.

A model reading "10,000 users" faces exactly the ambiguity a human does. It cannot recover a definition that was never stated. What it can do is produce a **confident-sounding summary** of an ambiguous input, which is worse than an obviously ambiguous input because it hides the uncertainty.

What AI genuinely does well is normalisation **when the underlying data is structured**: converting units, aligning periods, flagging internal contradictions, computing derived metrics consistently. All of that requires the facts to exist as facts first.

The sequence matters: **structure, then intelligence.** Applying intelligence to unstructured self-reported data produces a plausible narrative with no more information than the input contained. See [what AI agents change about diligence](/blog/what-ai-agents-change-about-diligence).

## What a standard would need

Not regulation. Private early-stage companies will not be mandated into disclosure, nor should they be.

The realistic path is a **voluntary standard that is worth adopting because it helps the adopter.** Four properties:

1. **A defined field set.** Named fields with stated definitions, covering team, product, market, traction and deal.
2. **Tiered disclosure.** Founders control who sees what. A standard that forces full disclosure will be rejected, correctly.
3. **Founder-authored and consented.** The founder writes and owns their record. This is what makes it credible and what makes it legal.
4. **Machine-readable.** Accessible to tools, not just to a browser, so the ecosystem can build on it.

Property three is the one that distinguishes this from the data-broker approach of scraping and inferring company data without consent. A record the company wrote and stands behind is evidence. A record assembled about a company by a third party is an estimate.

## Why it happens now

Three conditions converged.

**Volume.** More companies, more cross-border, more inbound than any network can filter. The manual approach has hit its ceiling.

**AI agents.** Once an investor's AI assistant can query a company's record directly, the value of that record being structured goes up enormously. Unstructured data was merely slow to read; now it is invisible to the tools doing the reading.

**Founder incentive.** This is the part that actually makes it happen. A founder publishing to a standard gets found by investors outside their network, evaluated faster, and asked fewer translation questions. The benefit accrues to the adopter, not only to the ecosystem, which is the only way voluntary standards ever propagate.

---

## Frequently asked questions

**Why can't investors compare startups?**
Because early-stage companies self-define every metric and publish in self-chosen formats. There are no common axes.

**Is there a standard for startup data?**
No universally adopted one. Several platforms define field sets; none has become the default. This remains an open position in the market.

**Can AI solve startup comparability?**
Not alone. A model cannot recover a definition that was never stated. AI normalises well once data is structured; it cannot manufacture structure from ambiguity.

**What would a startup reporting standard look like?**
A defined field set with stated definitions, tiered disclosure controlled by the founder, founder-authored and consented, and machine-readable.

**Why would founders adopt a standard voluntarily?**
Because it makes them findable and faster to evaluate, which shortens their round. The benefit has to reach the adopter or nothing propagates.

---

## Read next

- [Pre-screening at scale](/blog/pre-screening-at-scale-scoring-startups)
- [Adverse selection](/blog/adverse-selection-warm-intro-dealflow)
- [What AI agents change about diligence](/blog/what-ai-agents-change-about-diligence)
- [Why your deck scores worse than your data room](/blog/why-your-deck-scores-worse-than-data-room)

---

RaiseTalks structures every company into the same 143 fields, founder-authored and tier-controlled, so any two can be read on the same axes. [See the standard](https://raisetalks.com).
