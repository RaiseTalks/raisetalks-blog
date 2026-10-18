import { FEATURE_DESCRIPTION_MAX, type ContactInput, type FeatureRequestInput, type FormResult, type FormService } from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DELAY_MS = 600;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const isEmail = (value: string) => EMAIL_RE.test(value.trim());

export const mockForms: FormService = {
  async subscribe(email: string): Promise<FormResult> {
    if (!isEmail(email)) return { ok: false, error: "Please enter a valid email." };
    await wait(DELAY_MS);
    console.info("[forms:mock] subscribe", { email: email.trim() });
    return { ok: true };
  },

  async contact(input: ContactInput): Promise<FormResult> {
    if (!input.name?.trim()) return { ok: false, error: "Please enter your name." };
    if (!isEmail(input.email ?? "")) return { ok: false, error: "Please enter a valid email." };
    await wait(DELAY_MS);
    console.info("[forms:mock] contact", { ...input, email: input.email.trim() });
    return { ok: true };
  },

  async featureRequest(input: FeatureRequestInput): Promise<FormResult> {
    if (!isEmail(input.email)) return { ok: false, error: "Please enter a valid email." };
    if (!input.description.trim()) return { ok: false, error: "Please describe your feature request." };
    if (input.description.length > FEATURE_DESCRIPTION_MAX) return { ok: false, error: "Please keep the description under 2000 characters." };
    await wait(DELAY_MS);
    console.info("[forms:mock] featureRequest", { ...input, email: input.email.trim() });
    return { ok: true };
  },
};
