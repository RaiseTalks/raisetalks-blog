// Refund Policy — text from the LIVE page raisetalks.com/refund-policy (designer decision, Drop 21; replaces the
// Figma 2302:718 text). Owner: Studio (A). Format: see privacy.ts.
import type { LegalDoc } from "./types";

export const refund: LegalDoc = {
  updated: "August 5, 2025",
  title: "Refund Policy",
  subtitle: "Transparent refund terms for our subscription services.",
  intro: [
    "At **RaiseTalks**, we strive to deliver exceptional value and service to help founders and investors accelerate fundraising. All payments are processed securely through **Stripe**. Please review our refund terms carefully before purchasing a subscription or service.",
  ],
  body: String.raw`
h2|1. Free Tier
p|Our Free Plan offers limited features for evaluation at no cost. No payment is required, and no refunds apply.
h2|2. Paid Subscriptions
h3|Monthly and Annual Plans
li|Paid subscriptions are billed either monthly or annually based on your selected plan.
li|Annual plans receive a **40% discount** compared to monthly billing.
li|Payments are non-refundable except as expressly stated in this policy or required by law.
h3|Cancellation and Renewal
li|You may cancel your subscription at any time via your dashboard or by contacting support.
li|Cancellation takes effect at the end of the current billing period.
li|We do not provide refunds or credits for partial months or unused service periods.
h2|3. Refund Eligibility
p|Refunds may be granted only in the following cases:
li|**Duplicate Charges:** If you are accidentally charged multiple times for the same subscription period.
li|**Payment Errors:** If Stripe or RaiseTalks processes a payment in error.
li|**Service Outages:** In rare cases of prolonged service unavailability that materially impacts your use.
p|Requests for refunds must be submitted within **7 calendar days** of the charge date by emailing billing@raisetalks.ai with your account details and reason for refund.
box|
h3|Important Timeline
p|All refund requests must be submitted within **7 calendar days** of the charge date. Requests submitted after this period will not be eligible for refunds.
/box|
h2|4. Refund Process
li|All refund requests will be reviewed promptly.
li|If approved, refunds will be issued to the original payment method via Stripe.
li|Refund processing times vary by payment provider but typically take 5–10 business days.
h2|5. Non-Refundable Situations
p|Refunds are **not** provided for:
li|Change of mind or dissatisfaction with features or service
li|Failure to use the Platform or any portion thereof during the subscription period
li|Cancellation partway through a billing cycle
box|
h3|No Refunds For
li|Change of mind about subscription
li|Not using the platform during billing period
li|Partial month cancellations
li|Dissatisfaction with features
/box|
h2|6. Payment Disputes
p|If you believe a charge is incorrect or unauthorized, please contact us first at billing@raisetalks.ai so we can assist you. Unauthorized charge disputes filed directly with your payment provider without contacting us may delay resolution.
h2|7. Contact Us
p|For any billing questions or refund requests, please contact:
br|**RaiseTalks Billing Support**
br|Email: billing@raisetalks.ai
p|**Tip:** Before requesting a refund, try our [Free Tier](https://app.raisetalks.com/pricing) to explore our features and see if they meet your needs.
btn|View Pricing Plans ¦ https://app.raisetalks.com/pricing
btn|Terms of Service ¦ /terms-of-service
`,
};
