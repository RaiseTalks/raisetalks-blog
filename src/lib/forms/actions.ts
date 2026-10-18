// Form handlers for useActionState. Plain async functions that run in the browser: the site is a static
// export, so there are no server actions; delivery is in supabase.ts.

import { forms } from "./index";
import { FEATURE_PRIORITIES, FEATURE_TYPES, type ContactInput, type FeatureRequestInput, type FormResult } from "./types";

const TOPICS: ContactInput["topic"][] = ["general", "demo", "co-host", "pitch-competition"];

const text = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};

export async function subscribeAction(
  _prev: FormResult | undefined,
  formData: FormData,
): Promise<FormResult> {
  return forms.subscribe(text(formData, "email"), { magnet: text(formData, "magnet") || undefined, website: text(formData, "website") });
}

export async function contactAction(
  _prev: FormResult | undefined,
  formData: FormData,
): Promise<FormResult> {
  const topic = text(formData, "topic") as ContactInput["topic"];
  return forms.contact({
    topic: TOPICS.includes(topic) ? topic : "general",
    name: text(formData, "name"),
    email: text(formData, "email"),
    message: text(formData, "message") || undefined,
  });
}

export async function featureRequestAction(
  _prev: FormResult | undefined,
  formData: FormData,
): Promise<FormResult> {
  const type = text(formData, "type") as FeatureRequestInput["type"];
  const priority = text(formData, "priority") as FeatureRequestInput["priority"];
  return forms.featureRequest({
    name: text(formData, "name") || undefined,
    email: text(formData, "email"),
    type: FEATURE_TYPES.includes(type) ? type : "enhancement",
    priority: FEATURE_PRIORITIES.includes(priority) ? priority : "medium",
    description: text(formData, "description"),
    useCase: text(formData, "useCase") || undefined,
    website: text(formData, "website"),
  });
}
