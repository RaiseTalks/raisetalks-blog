---
title: "What AI Agents Change About Diligence"
description: "When an investor's AI can query your company directly, the format of your data stops being a convenience and becomes visibility."
slug: what-ai-agents-change-about-diligence
date: 2026-09-23T08:30:00Z
authors: [dariiava]
tags: [ai, due-diligence, dealflow, market-data]
keywords:
  - ai agents due diligence
  - mcp startup data
  - ai investment analysis
  - agentic due diligence
  - future of venture capital technology
image: /img/blog/what-ai-agents-change-about-diligence/og-1200x630.png
---

For thirty years, a startup's fundraising materials had one reader: a person. Everything about how companies present themselves - the deck, the narrative arc, the design - is optimised for human attention.

That assumption is now breaking. Our view is that more and more of the first pass over a company will be performed by an AI assistant working on an investor's behalf. And an agent reads differently from a person in one specific way: **it cannot infer what was never stated.**

<!-- truncate -->

## Key takeaways

- The first reader of your company is increasingly **an agent, not a partner**.
- Agents cannot recover context from implication. A human fills gaps charitably; a model either guesses or reports nothing.
- **Protocol access is becoming table stakes.** RaiseTalks already ships an MCP server for founder data rooms.
- The scarce asset is **consented, founder-authored, diligence-grade data**. Scraped data is an estimate.
- This does not remove judgement. It removes reassembly, which is where most diligence time actually goes.

---

## What changes when the first reader is a model

A human reading your deck fills gaps. They infer that "10,000 users" probably means registered accounts, that the roadmap slide is aspirational, that the flat quarter was the holiday period. That charitable inference is how humans read, and it works reasonably well.

An agent does one of two things instead, and both are worse for you:

1. **Reports the ambiguity**, which surfaces as a gap in the summary the investor reads.
2. **Guesses**, producing a confident and possibly wrong statement about your company that you never see and cannot correct.

The second is the real risk. You will never know that an agent summarised your 10,000 registered signups as 10,000 monthly active, or as 10,000 paying customers, and that the resulting summary looked implausible next to your $18K MRR.

The defence is precision at the source. Not more content: **less ambiguity.** Every metric defined, every claim attributed, every status explicit.

## Three ways agents already read companies

**1. Parsing what you sent.** An investor forwards your deck to an assistant and asks for a summary and a risk list. Most common today, and the lossiest, because a deck is a persuasion artefact and the model inherits every omission.

**2. Searching.** An investor asks their assistant to find companies in a category. The assistant uses web search, and your findability is determined by whether your company exists as crawlable, structured, indexable text. This is why [a public profile is an SEO asset](/blog/public-startup-profile-seo-asset) and why a PDF-only presence makes you invisible.

**3. Querying directly.** An assistant connects to a structured source over a protocol and queries it. This is the newest and it changes the economics completely, because the data arrives as data rather than as prose to be interpreted.

## MCP and what protocol access actually means

The Model Context Protocol is an open standard for connecting AI assistants to data sources and tools. It matters here for a boring but decisive reason: it makes "can an agent read this company" a **yes or no question with a technical answer**, rather than a matter of how well a model happens to parse a PDF.

This is already starting. RaiseTalks runs an authenticated MCP server for founder data rooms, where the founder's own token is the permission boundary: a founder can connect their own AI assistant to read and update their record, and nobody else's assistant gets in through that connection.

The consequence for founders is worth stating plainly: **protocol access is becoming table stakes rather than a differentiator.** A company whose data is only available as an attachment is not merely harder to read. It is absent from a growing share of the first-pass evaluation surface.

## The consent distinction

There are two ways an agent can get data about a private company, and they are not equivalent.

**Inferred.** Scraped from websites, press releases, job postings, filings and parsed decks. Broad coverage, no cooperation required, and structurally an **estimate**. It is often stale, frequently wrong on specifics, and no one stands behind it.

**Consented.** The company authored it, owns it, controls who sees it, and stands behind it. Narrower coverage, requires cooperation, and is **evidence**.

For market-level analysis, inferred data is fine and often better, because coverage matters more than precision. For a diligence decision about one company, it is not usable: no investor underwrites a position on a scraped estimate of revenue.

As agents do more of the first pass, the value of the consented source rises sharply, because it is the only input that supports a decision. And it is the one input that cannot be obtained by crawling harder. It has to be given.

## What does not change

Three things, and they are the important ones.

**Judgement.** Whether this team wins this market is not a data question. No amount of structure produces it, and the accountability for the call cannot be delegated to a model that will not be there when it is wrong.

**References.** The most valuable diligence input remains a conversation with someone who worked with the founder. That information exists nowhere in any record and never will.

**Conviction.** Investing at pre-seed is a bet on people under uncertainty. Better information narrows the uncertainty. It does not remove the bet.

What agents remove is **reassembly** - finding the number, checking it is current, normalising it against other companies. In our illustrative model, that is most of the reading cost and none of the decision value. Removing it is a large efficiency gain and not a change in who decides. The mechanism is described in [why diligence takes longer than it did in 2021](/blog/why-diligence-takes-longer-than-2021).

## What to do about it

**Founders:**

1. **Define every metric explicitly.** Ambiguity is now actively dangerous rather than merely unhelpful.
2. **Make your company exist as structured text**, not only as a PDF. Crawlable, server-rendered, with structured data markup.
3. **Separate claims from evidence.** Mark what is shipped, what is planned, what is measured and what is projected.
4. **Be queryable** where you can. Where a platform offers protocol access to your record under your control, use it.
5. **Assume an agent reads you first.** Then write for a reader that cannot infer.

**Investors:**

1. **Use agents for extraction and normalisation.** That is where the leverage is and it is genuinely large.
2. **Do not delegate the thesis or the decision.** An AI-written thesis reads plausibly and commits to nothing.
3. **Prefer consented sources for diligence** and inferred sources for market mapping. Do not mix them up.
4. **Keep the reasoning inspectable.** A score you cannot interrogate is worse than no score.

## The longer arc

Public markets made companies machine-readable a long time ago, through mandated structured filings. That is why any analyst, or any model, can compare two listed companies instantly.

Private early-stage markets never had that, and got away with it because the reader was always a person who could squint at a deck. Once the first reader is an agent, the missing structure stops being an inconvenience and becomes a **visibility problem**: a company that cannot be queried is, increasingly, a company that is not seen.

The structure will get built, because both sides now have a reason to want it. Founders want to be found and evaluated fast. Investors want to read more companies properly. That is the rare case where a standard actually propagates: when adopting it helps the adopter before it helps the ecosystem.

---

## Frequently asked questions

**Will AI replace due diligence?**
No. It removes reassembly - finding, checking and normalising information - which is most of the time and none of the judgement.

**What is MCP and why does it matter for startups?**
The Model Context Protocol is an open standard for connecting AI assistants to data sources. It matters because it turns "can an investor's AI read my company" into a technical yes or no.

**Should founders optimise materials for AI readers?**
Yes, and it happens to be the same work as optimising for human readers: define every metric, separate claims from evidence, be explicit about status.

**Is scraped startup data reliable for investment decisions?**
For market-level analysis, often. For a decision about one company, no. Inferred data is an estimate; consented data is evidence.

**Does this favour large funds?**
Less than you would expect. Agent leverage is largest for solo investors and micro-funds who have no analyst team. See [angels and micro-funds](/blog/angels-micro-funds-diligence-without-analysts).

---

## Read next

- [You cannot compare two startups today](/blog/you-cannot-compare-two-startups)
- [AI in fundraising: the 2026 market map](/blog/ai-in-fundraising-2026-market-map)
- [Why diligence takes longer than it did in 2021](/blog/why-diligence-takes-longer-than-2021)
- [Your public startup profile is an SEO asset](/blog/public-startup-profile-seo-asset)

---

RaiseTalks runs an authenticated MCP server over founder-consented data rooms, where the founder's own token is the permission boundary. Structured, consented, queryable. [See how it works](https://raisetalks.com).
