import { supabaseForms } from "./supabase";
import type { FormService } from "./types";

// Newsletter, lead magnets and feature requests go to the Supabase Edge Functions (see supabase.ts).
export const forms: FormService = supabaseForms;

export type { ContactInput, FeatureRequestInput, FormResult, FormService, SubscribeOptions } from "./types";
