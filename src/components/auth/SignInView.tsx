"use client";

import { useSearchParams } from "next/navigation";
import { AuthCard } from "./AuthCard";

/**
 * Reads ?mode in the browser so /sign-in stays a static page (no server searchParams).
 * ?mode=signup → sign-up card; anything else → sign-in. `key` remounts the card on switch.
 */
export function SignInView() {
  const mode = useSearchParams().get("mode") === "signup" ? "signup" : "signin";
  return <AuthCard key={mode} mode={mode} />;
}
