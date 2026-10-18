// Contract for the site's forms (newsletter + lead magnets, contact / co-host interest, feature requests).
// Delivered by supabase.ts (Supabase Edge Functions); mock.ts validates only (contact form, tests).

/** `files`: download links returned by a lead-magnet signup (type → URL, e.g. xlsx / csv). */
export type FormResult = { ok: true; files?: Record<string, string> } | { ok: false; error: string };

/** `magnet`: lead-magnet id known to the newsletter function. `website`: honeypot field (empty for people). */
export type SubscribeOptions = { magnet?: string; website?: string };

export type ContactInput = {
  topic: "general" | "demo" | "co-host" | "pitch-competition";
  name: string;
  email: string;
  message?: string;
};

export const FEATURE_TYPES = ["enhancement", "new-feature", "bug-fix", "integration", "other"] as const;
export const FEATURE_PRIORITIES = ["low", "medium", "high", "critical"] as const;
export const FEATURE_DESCRIPTION_MAX = 2000;

/** /feature-request (Drop 21). Name and use case optional; description 1–2000 characters. */
export type FeatureRequestInput = {
  name?: string;
  email: string;
  type: (typeof FEATURE_TYPES)[number];
  priority: (typeof FEATURE_PRIORITIES)[number];
  description: string;
  useCase?: string;
  /** Honeypot field (empty for people). */
  website?: string;
};

export interface FormService {
  subscribe(email: string, opts?: SubscribeOptions): Promise<FormResult>;
  contact(input: ContactInput): Promise<FormResult>;
  featureRequest(input: FeatureRequestInput): Promise<FormResult>;
}
