// Privacy Policy — text from the LIVE page raisetalks.com/privacy-policy (designer decision, Drop 21; replaces the
// Figma 2450:469 text). Owner: Studio (A)
// Body format (one block per line): h2| h3| p| b| li| br| btn|label ¦ href| th|cell ¦ cell| tr|cell ¦ cell| box| … /box|
// Consecutive li → list, br → stacked lines (addresses), btn → button row, th + tr → table (th = header row).
// Inline: **bold**, [label](href), emails become mailto links.
import type { LegalDoc } from "./types";
// Section 9 (Cookie Policy) describes the types of cookies with the same text as Cookie settings
// (src/content/consent.ts), so the dialog and the policy never disagree. High level only: no cookie-by-cookie list.
import { cookieTypes } from "../consent";

export const privacy: LegalDoc = {
  updated: "October 30, 2026",
  title: "Privacy Policy",
  subtitle: "Your privacy is important to us. Learn how we protect your data.",
  intro: [
    "This Privacy Policy explains how **RAISETALKS AI, Inc.**, a Delaware Corporation, collects, uses, stores, and protects your personal data when you interact with our platform and services at **RaiseTalks** (\u201CRaiseTalks\u201D, \u201Cwe\u201D, \u201Cus\u201D, or \u201Cour\u201D). We are committed to safeguarding your privacy and complying with applicable data protection laws, including the **General Data Protection Regulation (GDPR)** and relevant **U.S. privacy regulations**.",
  ],
  body: String.raw`
h2|1. What This Privacy Policy Covers
p|This policy outlines:
li|What personal data we collect
li|How we use, store, and protect your data
li|The legal bases for processing under GDPR
li|Your rights and how to exercise them
li|Our data retention and international transfer policies
p|This policy does not apply to third-party platforms or services linked through RaiseTalks.
h2|2. Data We Collect
p|We collect the following categories of personal data:
h3|a. Contact & Account Information
li|Full name
li|Email address
li|Company/startup name
li|Title or position
li|Login credentials (encrypted)
h3|b. Business & Usage Information
li|Uploaded files and documents
li|Fundraising or investor-related inputs
li|Affiliate/referral activity
li|Feedback and support inquiries
h3|c. Technical Data
li|IP address, browser type, and operating system
li|Cookies and usage analytics (page views, time on site, actions)
li|Device and session metadata
h3|d. Communication History
li|Emails, messages, and feedback submitted to our team
p|We do not intentionally collect sensitive personal data unless explicitly provided for specific services with your consent.
h2|3. How We Collect Data
li|**Directly from you** – when you sign up, use features, or contact us
li|**Automatically** – via cookies and analytics tools
li|**From third parties** – such as referral sources or integrations you connect
li|**From public sources** – publicly available professional information about investors and firms, used to build our investor catalog (see Section 10)
h2|4. Why We Process Your Data
th|Purpose ¦ Legal Basis
tr|Provide and improve our services ¦ Contractual necessity / Legitimate interest
tr|Communicate with you (e.g., updates, onboarding) ¦ Contractual necessity
tr|Send marketing or partner content ¦ Consent
tr|Ensure platform security and prevent misuse ¦ Legitimate interest
tr|Fulfill legal and regulatory obligations ¦ Legal obligation
h2|5. GDPR Compliance & Your Rights (EU/EEA Residents)
p|If you are located in the European Economic Area, you have rights under the GDPR, including:
li|**Right to Access** – Request access to your data
li|**Right to Rectification** – Correct any inaccurate data
li|**Right to Erasure** – Ask us to delete your data (“right to be forgotten”)
li|**Right to Restriction** – Limit how we process your data
li|**Right to Data Portability** – Obtain your data in a readable format
li|**Right to Object** – Object to processing under legitimate interests
li|**Right to Withdraw Consent** – Revoke your consent at any time
li|**Right to Lodge a Complaint** – Complain to your local data protection supervisory authority
p|You can exercise the most common rights yourself, directly in the platform: go to **Profile** to **Download my data** (a machine-readable export of your information) or to **Delete Account** (permanent erasure). For any other request, or to contact us, email privacy@raisetalks.ai. We may need to verify your identity, and we respond within one month.
h2|6. Data Security & Service Providers
p|We implement robust technical and organizational measures to protect your data, including:
li|Encrypted transmission and storage
li|Role-based access control
li|Regular audits and system monitoring
p|We rely on the following trusted third-party processors, each under a data processing agreement and appropriate transfer safeguards:
li|**Stripe** – payment processing and billing
li|**Supabase** – database, authentication, and file storage
li|**Resend** – transactional and notification email delivery
li|**Microsoft Azure** – application hosting and AI services
h2|7. Data Retention
p|We retain your data only as long as necessary for the purposes described in this policy, or as required by law. When you delete your account, your personal data is erased without undue delay. Some records are retained after deletion, on the following bases:
li|**Billing and invoice records** – retained by our payment provider (Stripe) for the period required by tax and accounting law.
li|**Email bounce and complaint records** – retained indefinitely to comply with anti-spam obligations and protect sender reputation.
li|**An anonymous deletion receipt** – retained indefinitely to document that the deletion occurred; it contains no personal data (only a one-way hash of the email).
li|**Investor catalog information** – retained while our investor-intelligence service operates (see Section 10).
p|When no longer needed, data is securely deleted or anonymized.
h2|8. International Data Transfers
p|If your data is transferred outside the United States or the European Economic Area (EEA), we ensure appropriate safeguards, such as:
li|Standard Contractual Clauses (SCCs)
li|Transfer to jurisdictions recognized by the European Commission as providing adequate protection
h2|9. Cookie Policy
p|Cookies are small text files that a website stores in your browser. Similar browser storage works the same way, and we treat it as cookies here. This section explains which types of cookies raisetalks.com uses, why, and how you control them.
h3|a. Strictly Necessary Cookies (Always Active)
p|${cookieTypes.necessary.text}
h3|b. Analytics Cookies (Only With Your Consent)
p|${cookieTypes.analytics.text} These cookies are set only after you accept them and last up to two years, unless you withdraw your consent or clear them sooner.
h3|c. Marketing and Advertising Cookies (Not Used)
p|${cookieTypes.marketing.text}
h3|d. Your Choices
p|You make your choice on your first visit and can change or withdraw it at any time from **Cookie settings** at the bottom of every page. Withdrawing consent stops analytics and deletes its cookies from your browser. We ask again after six months, or sooner if the types of cookies we use change.
p|We honor the **Global Privacy Control** signal: if your browser sends it, analytics stays off unless you switch it on yourself. You can also block or delete cookies at any time in your browser settings.
h3|e. Embedded Videos
p|YouTube videos load from YouTube's privacy-enhanced domain (youtube-nocookie.com) only when you press play. From then on, YouTube's own privacy policy applies.
h2|10. Public-Source Investor Information
p|RaiseTalks maintains a catalog of investors and investment firms to help startups find relevant funding sources. Some entries are built from **publicly available professional information** (for example: firm name, investment focus, public website, and publicly listed professional contact details). We process this information under our **legitimate interest** (GDPR Art. 6(1)(f)) in operating an investor-discovery service, and it exists independently of whether the investor holds a RaiseTalks account.
p|If you are an individual and wish to object to, correct, or remove your details from the catalog, email privacy@raisetalks.ai and we will address your request.
h2|11. Children’s Data
p|RaiseTalks is a business platform intended for users aged 16 and over. We do not knowingly collect personal data from children under 16. If you believe a child has provided us with personal data, contact privacy@raisetalks.ai and we will delete it.
h2|12. Updates to This Policy
p|We may update this Privacy Policy as our services evolve or as required by law. The updated version will always be posted on our website with the revised date.
h2|13. Contact Us
p|If you have any questions or requests regarding this Privacy Policy or your personal data:
br|**RAISETALKS AI, Inc.**
br|1111B S Governors Ave STE 34329
br|Dover, DE 19904
br|United States
br|Email: privacy@raisetalks.ai
`,
};
