// Feature Request copy — from the live page raisetalks.com/feature-request (not in Figma; layout by Studio,
// Drop 21). Owner: Studio (A)
import type { Heading } from "./shared";
import { art } from "./shared";
import type { FeatureRequestInput } from "@/lib/forms/types";

export const featureRequest = {
  hero: {
    heading: { lead: "Help Us Build Better" } satisfies Heading,
    text: "Your ideas matter. Tell us what features would make your fundraising journey smoother.",
    image: art.heroAlt,
  },
  form: {
    name: "Name (optional)",
    email: "Email *",
    type: {
      label: "Feature Type",
      default: "enhancement" as FeatureRequestInput["type"],
      options: [
        { value: "enhancement", label: "Enhancement" },
        { value: "new-feature", label: "New Feature" },
        { value: "bug-fix", label: "Bug Fix" },
        { value: "integration", label: "Integration" },
        { value: "other", label: "Other" },
      ],
    },
    priority: {
      label: "Priority",
      default: "medium" as FeatureRequestInput["priority"],
      options: [
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
        { value: "critical", label: "Critical" },
      ],
    },
    description: "Description *",
    /** "{n}" = characters typed so far */
    counter: "{n} / 2000 characters",
    useCase: "Use Case (optional)",
    submit: "Submit Feature Request",
    // not on the live page; wording approved by the designer (Drop 21)
    errors: { email: "Please enter a valid email.", description: "Please describe your feature request." },
    success: { title: "Thank you!", text: "Your feature request has been sent. We read every one." },
  },
  bug: { lead: "Have a bug to report? Email us directly at", email: "support@raisetalks.ai" },
  note: "Your feedback helps us build the best fundraising platform for startups.",
};
