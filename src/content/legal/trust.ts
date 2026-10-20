// Trust Center: security, privacy and AI governance for raisetalks.com and app.raisetalks.com.
// Same line format as privacy.ts (h2| h3| p| li| br| th| tr| …), rendered by LegalPage.
//
// Every statement was checked against the app (RaiseTalks-app origin/main), the live domains, the Supabase project
// settings, the mail DNS records and Microsoft tenant metadata, or confirmed by the team (AWS and Azure regions,
// 2026-10-20). The remaining commitments (response times, safe harbour, incident response, documents on request)
// were approved by the founder on 2026-10-20.
import type { LegalDoc } from "./types";

// No security@ mailbox yet: security reviews and vulnerability reports go to privacy@ (also in public/.well-known/security.txt)
const SECURITY_EMAIL = "privacy@raisetalks.ai";

export const trust: LegalDoc = {
  updated: "October 20, 2026",
  title: "Trust Center",
  subtitle: "How we protect founder and investor data.",
  intro: [
    "This Trust Center explains how **RAISETALKS AI, Inc.**, a Delaware Corporation, protects data on raisetalks.com and on the RaiseTalks platform at app.raisetalks.com: the security controls in place today, how our AI features work and stay under your control, and how we assess RaiseTalks under the **GDPR** and the **EU AI Act**.",
  ],
  body: String.raw`
h2|1. What This Trust Center Covers
p|This page outlines:
li|Our compliance position under GDPR, the EU AI Act and PCI DSS
li|The security controls that protect your account and data room
li|How our AI features work and what stays under your control
li|How we classify RaiseTalks under the EU AI Act
li|Security documents and how to report a vulnerability
p|Every control listed here is live in the platform today. Plans are not listed until they ship.
h2|2. Compliance
th|Framework ¦ Status ¦ Details
tr|GDPR ¦ Self-assessed ¦ Database and file storage in the EU, and self-service access, export and deletion. Email privacy@raisetalks.ai with data protection requests.
tr|EU AI Act ¦ Self-assessed ¦ No prohibited practices and no Annex III high-risk use. AI chat and AI output are labelled in the product, as Article 50 requires (see Section 5).
tr|PCI DSS ¦ Via Stripe ¦ Card payments run on Stripe-hosted Checkout and billing pages, so card numbers never reach RaiseTalks servers. Stripe is a PCI DSS Level 1 service provider.
tr|Infrastructure certifications ¦ Inherited ¦ AWS and Microsoft Azure hold SOC 2 and ISO/IEC 27001. Supabase holds a SOC 2 Type 2 report. These certify our providers, not RaiseTalks itself.
tr|Vulnerability disclosure ¦ Published ¦ A public disclosure policy (see Section 7) and a security.txt file.
h2|3. Security Controls
h3|a. Data Protection
li|**Database and files in the EU** – The database and file storage run on Supabase in AWS eu-central-1, in Frankfurt, Germany.
li|**Encryption in transit** – All traffic is served over HTTPS (TLS), and plain HTTP requests are redirected to HTTPS.
li|**Encryption at rest** – Stored data is encrypted at rest with AES-256 by our database and storage provider.
li|**Private document storage** – Data room documents, financials and cap tables sit in private storage buckets and are served through signed links that expire after one hour.
li|**Encrypted integration credentials** – Stripe keys and Google Analytics tokens that founders connect are encrypted by the application with AES-256-GCM before they are stored.
h3|b. Access Control
li|**Isolation in the database** – Row-level security policies, enforced by the database itself, decide which records each account can read or change.
li|**Tiered data room access** – Public, basic, due diligence and owner tiers decide which fields each viewer can see.
li|**Founder approval** – Investors request deeper access and the founder approves it, can set an expiry on due diligence access, and can revoke it at any time.
li|**Verified pitch deck links** – Shared deck links ask each viewer for a one-time email code. Founders see who viewed, when and how often, and can disable or rotate a link.
li|**Role-based permissions** – Founder, investor and moderator roles each have their own permissions. Administrator rights cannot be granted from inside the product.
h3|c. Application Security
li|**Security headers** – A Content Security Policy, frame-ancestors 'none' and X-Frame-Options DENY against clickjacking, MIME-sniffing protection and a strict referrer policy.
li|**Verified sign-in** – Email sign-up requires confirming the address. Google and LinkedIn sign-in are also supported.
li|**Rate limits** – Limits on data room access requests, one-time codes and daily AI usage.
li|**Payments kept separate** – Checkout and billing run on Stripe-hosted pages, outside our application.
h3|d. Privacy
li|**Self-service export** – Download your account data as a JSON file from your profile.
li|**Self-service deletion** – Deleting your account erases your personal data. It also deletes your customer record at Stripe and your contact record at Resend.
li|**Minimal deletion records** – Proof that a deletion happened keeps only a one-way hash of the email address.
li|**Public-source investor data** – Investors listed in our catalogue from public sources can email privacy@raisetalks.ai to have their details corrected or removed.
h2|4. Responsible AI
p|RaiseTalks uses large language models to draft, summarise and score fundraising material. Our AI features follow four rules:
li|**No training on your content** – RaiseTalks does not train or fine-tune AI models on your data. We access models through Microsoft Azure, whose terms do not allow customer prompts or outputs to be used to train foundation models.
li|**AI is labelled** – Chat runs as the "AI Advisor", rewrites appear as an "AI Suggestion", and scores in the product are marked as AI-generated.
li|**You stay in control** – AI drafts, field proposals and rewrites are suggestions you accept, edit or reject. An investor update is never sent without your confirmation.
li|**Matching is rule-based** – Which investors a startup is matched with is calculated by fixed, weighted rules, not by a language model.
p|Each AI feature, what it does, and what stays under your control:
th|Feature ¦ What the AI does ¦ Your control
tr|AI Advisor (founders and investors) ¦ Answers fundraising questions in chat, using context from your workspace. ¦ Labelled as AI in the chat. Advice only, with daily usage limits.
tr|Pre-Score (investors) ¦ Scores a startup from 1 to 5 on team, product, market and deal, with a short recommendation. ¦ Marked as AI-generated. Decision support only: the investment decision stays with the investor.
tr|IR Push (founders) ¦ A system score of at least 3.0 out of 5 is one of the conditions for a startup to be pushed to matched investors. ¦ Opt-in and off by default. Matching itself uses fixed rules.
tr|IR Update drafts (founders) ¦ Drafts an investor update from your data. ¦ Opt-in. You review the draft and confirm before anything is sent.
tr|Profile and data room fill (founders) ¦ Reads your pitch deck to pre-fill empty profile fields and propose data room answers. ¦ Pre-filled fields stay editable. Data room proposals are applied by you, one field at a time.
tr|Data Room Agent (founders) ¦ Helps organise your data room through chat. ¦ Designed to ask for your confirmation before it changes anything.
tr|Text rewrite (founders) ¦ Rewrites a passage when you ask it to. ¦ Shown as an "AI Suggestion" that you accept or reject.
tr|Investor catalogue (RaiseTalks team) ¦ Summarises investment firms' public websites into catalogue profiles. ¦ Run by our team. Investors can ask to have their details corrected or removed.
h2|5. EU AI Act
h3|a. Our Role
p|RaiseTalks is the provider of the AI features in its platform. They are built on general-purpose AI models from third parties. We do not develop general-purpose AI models or place them on the market. Founders and investors who use these features professionally act as deployers.
h3|b. Risk Classification
li|**No prohibited practices (Article 5)** – No feature manipulates users, exploits vulnerabilities, scores people socially or uses biometrics.
li|**Not high-risk (Article 6 and Annex III)** – Our features assess companies and fundraising material. They are not used to score individuals' creditworthiness, make recruitment or employment decisions, assess education, or decide access to essential services.
li|**Transparency duties apply (Article 50)** – They cover our chat assistant and AI-generated content. AI interactions and AI output are labelled in the product.
li|We review this assessment whenever we add or change an AI feature, and again before Annex III obligations apply on 2 December 2027.
h2|6. Security Documents
p|Public documents open directly. For documents marked "On request", or anything else your security review needs, email ${SECURITY_EMAIL}.
p|We reply to document requests within two business days.
th|Document ¦ Access
tr|[Privacy Policy](/privacy-policy) ¦ Public
tr|[Terms of Service](/terms-of-service) ¦ Public
tr|[Refund Policy](/refund-policy) ¦ Public
tr|[security.txt](https://raisetalks.com/.well-known/security.txt) ¦ Public: machine-readable security contact (RFC 9116)
tr|Data Processing Agreement (DPA) ¦ On request: email ${SECURITY_EMAIL}
tr|Security questionnaire responses ¦ On request: email ${SECURITY_EMAIL}
tr|Architecture and data flow overview ¦ On request: email ${SECURITY_EMAIL}
h2|7. Vulnerability Disclosure
p|We welcome reports from security researchers. Email ${SECURITY_EMAIL} with a description, steps to reproduce and the impact you see. Please do not include customer data you may have accessed. We do not run a paid bug bounty at this time.
h3|a. In Scope
li|raisetalks.com
li|app.raisetalks.com
li|mcp.raisetalks.com
h3|b. Out of Scope
li|Denial of service, load or volume testing
li|Social engineering or phishing of our team or users
li|Physical attacks, or findings that need a compromised device
li|Automated scanner output without a demonstrated impact
h3|c. Our Commitment
li|We acknowledge reports within three business days and keep you updated until the issue is resolved.
li|We will not take legal action over research done in good faith under this policy: access no more data than you need to show the issue, do not degrade the service, and do not disclose the issue publicly before we have fixed it.
h3|d. Incident Response
p|If a personal data breach affects your data, we notify you without undue delay, and the competent supervisory authority within 72 hours where GDPR requires it.
h2|8. Updates to This Page
p|We update this Trust Center when our controls, service providers or AI features change. The revised date is always shown at the top of the page.
h2|9. Contact Us
p|For security reviews, vulnerability reports or questions about this page:
br|**RAISETALKS AI, Inc.**
br|1111B S Governors Ave STE 34329
br|Dover, DE 19904
br|United States
br|Security and privacy: ${SECURITY_EMAIL}
br|Support: support@raisetalks.ai
`,
};

// Shown below the page in the site FAQ accordion, and as FAQPage structured data. Answers: plain text with [label](href)
export const trustFaq: { q: string; a: string }[] = [
  {
    q: "Does RaiseTalks use my data to train AI models?",
    a: "No. RaiseTalks does not train or fine-tune AI models on your content. Our AI features use models accessed through Microsoft Azure, whose terms do not allow customer prompts or outputs to be used to train foundation models.",
  },
  {
    q: "Where is my data stored?",
    a: "Our database and file storage run on Supabase in AWS eu-central-1, in Frankfurt, Germany. The application servers run on AWS in US East and are delivered through AWS CloudFront. AI models run in Microsoft Azure West Europe. Some service providers, such as Stripe and Google, process data in the United States under Standard Contractual Clauses or the EU-US Data Privacy Framework.",
  },
  {
    q: "Who can see my data room?",
    a: "You decide. Each viewer sees only the fields their access tier allows: public, basic, due diligence or owner. Investors request deeper access and you approve it. You can set an expiry on due diligence access and revoke access at any time. Documents are kept in private storage and opened through signed links that expire after one hour. The guide to [data room access tiers](/blog/data-room-access-tiers-what-to-share) explains what to share at each stage.",
  },
  {
    q: "Is RaiseTalks a high-risk AI system under the EU AI Act?",
    a: "Our assessment is that it is not. Our features assess companies and fundraising material. They are not used to score individuals' creditworthiness, make employment decisions or decide access to essential services, which are the Annex III categories that matter here. The Article 50 transparency duties, in force since 2 August 2026, do apply to our chat assistant and AI-generated content, and we label both in the product.",
  },
  {
    q: "Does RaiseTalks hold SOC 2 or ISO/IEC 27001?",
    a: `Not yet. Our infrastructure providers do: AWS and Microsoft Azure hold SOC 2 and ISO/IEC 27001, and Supabase holds a SOC 2 Type 2 report. If your review needs more detail, email [${SECURITY_EMAIL}](mailto:${SECURITY_EMAIL}) and we will walk you through our controls.`,
  },
  {
    q: "How do I export or delete my data?",
    a: `Go to Profile in the app and choose Download my data for a full export, or Delete Account to erase your account permanently. Deletion also removes your customer record at Stripe and your contact record at Resend. For any other privacy request, email [privacy@raisetalks.ai](mailto:privacy@raisetalks.ai).`,
  },
  {
    q: "How do I get a DPA or a completed security questionnaire?",
    a: `Email [${SECURITY_EMAIL}](mailto:${SECURITY_EMAIL}) with your company name and what the review is for. We send our DPA and complete vendor security questionnaires on request.`,
  },
  {
    q: "How do I report a vulnerability?",
    a: `Email [${SECURITY_EMAIL}](mailto:${SECURITY_EMAIL}) with steps to reproduce and the impact you see. Section 7 on this page sets out scope and rules.`,
  },
];
