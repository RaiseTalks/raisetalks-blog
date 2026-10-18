import { mockForms } from "./mock";
import type { FeatureRequestInput, FormResult, FormService, SubscribeOptions } from "./types";

/**
 * Real form delivery: the Supabase Edge Functions in /supabase/functions (same as the old site).
 * - newsletter-subscribe: newsletter + gated lead magnets (Resend); a magnet signup returns its download links
 * - feature-request: posts to the team Telegram chat
 * The site is static, so these run in the browser. The anon key is public by design (it only allows calling
 * the functions). CORS allows https://raisetalks.com only, so submissions fail from localhost.
 * Bot protection the functions check: `website` honeypot (filled = silently dropped) and `_formLoadedAt`
 * (a submit sooner than 1.5s after load is rejected).
 */
const SUPABASE_URL = "https://wzmlpdetrelxzunebnox.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6bWxwZGV0cmVseHp1bmVibm94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NjMxNDksImV4cCI6MjA2MDAzOTE0OX0.-9StrWLSgULqZr_tW8vnqVqts8tVtwJKzEDx2gaBzGc";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** When this module loaded = when the page with the form loaded. */
const loadedAt = Date.now();

async function call(fn: string, body: Record<string, unknown>): Promise<{ ok: true; data: Record<string, unknown> } | { ok: false; error: string }> {
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/${fn}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
      body: JSON.stringify({ ...body, _formLoadedAt: loadedAt }),
    });
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (!res.ok) return { ok: false, error: typeof data.error === "string" && res.status === 429 ? data.error : "Something went wrong. Please try again." };
    return { ok: true, data };
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

export const supabaseForms: FormService = {
  async subscribe(email: string, opts: SubscribeOptions = {}): Promise<FormResult> {
    if (!EMAIL_RE.test(email.trim())) return { ok: false, error: "Please enter a valid email." };
    const r = await call("newsletter-subscribe", { email: email.trim(), magnet: opts.magnet, website: opts.website ?? "" });
    if (!r.ok) return r;
    return { ok: true, files: (r.data.files as Record<string, string> | undefined) ?? undefined };
  },

  // No contact endpoint yet (the form is not wired on any page): validates only.
  contact: mockForms.contact,

  async featureRequest(input: FeatureRequestInput & { website?: string }): Promise<FormResult> {
    if (!EMAIL_RE.test(input.email.trim())) return { ok: false, error: "Please enter a valid email." };
    if (!input.description.trim()) return { ok: false, error: "Please describe your feature request." };
    const r = await call("feature-request", {
      name: input.name ?? "",
      email: input.email.trim(),
      featureType: input.type,
      priority: input.priority,
      description: input.description,
      useCase: input.useCase ?? "",
      website: input.website ?? "",
    });
    return r.ok ? { ok: true } : r;
  },
};
