"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button, Checkbox, GoogleIcon, Input, LinkedInIcon } from "@/components/ui";
import { authContent as c } from "@/content/auth";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type Field = "name" | "email" | "password";
type Errors = Partial<Record<Field, string>>;

/**
 * Sign in / sign up card — copy of the RaiseTalks TV card (Figma 3642:3860) in .com tokens.
 * Mock: validates in the browser, then redirects to `authContent.platformUrl`. Typed values stay
 * when a field has an error. A real developer swaps `onSubmit` for the real auth call.
 */
export function AuthCard({ mode }: { mode: "signin" | "signup" }) {
  const isSignUp = mode === "signup";
  const copy = isSignUp ? c.signUp : c.signIn;
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    const next: Errors = {};
    if (isSignUp && !name.trim()) next.name = c.errors.name;
    if (!EMAIL.test(email.trim())) next.email = c.errors.email;
    if (!password) next.password = c.errors.password;
    else if (isSignUp && password.length < 8) next.password = c.errors.passwordShort;
    setErrors(next);
    if (Object.keys(next).length) return;
    setPending(true);
    window.location.assign(c.platformUrl);
  }

  return (
    <div className="w-full max-w-120 rounded-lg border border-border-2 bg-card-on-alt p-6">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-h3 text-headline">{copy.title}</h1>
          <p className="text-body text-subheadline">{copy.subtitle}</p>
        </div>

        <form onSubmit={onSubmit} noValidate className="flex w-full flex-col gap-6">
          {isSignUp && (
            <Input
              label={c.fields.name.label}
              name="name"
              autoComplete="name"
              placeholder={c.fields.name.placeholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
            />
          )}
          <Input
            label={c.fields.email.label}
            name="email"
            type="email"
            autoComplete="email"
            placeholder={c.fields.email.placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <Input
            label={c.fields.password.label}
            name="password"
            type="password"
            autoComplete={isSignUp ? "new-password" : "current-password"}
            placeholder={c.fields.password.placeholder}
            hint={isSignUp ? c.fields.passwordSignUpHint : undefined}
            revealable
            error={errors.password}
          />

          {!isSignUp && (
            <div className="flex items-center justify-between">
              <Checkbox label={c.remember} name="remember" />
              <a
                href={c.platformUrl}
                className="text-body font-semibold text-brand-light-blue transition-colors duration-[250ms] hover:text-headline"
              >
                {c.forgot}
              </a>
            </div>
          )}

          <Button type="submit" variant="primary" size="lg" fullWidth disabled={pending}>
            {copy.submit}
          </Button>

          <p className="flex items-center justify-center gap-3 text-body text-subheadline">
            {copy.switchPrompt}
            <Link
              href={isSignUp ? "/sign-in" : "/sign-in?mode=signup"}
              className="font-semibold text-brand-light-blue transition-colors duration-[250ms] hover:text-headline"
            >
              {copy.switchLink}
            </Link>
          </p>
        </form>

        <div className="mt-6 flex w-full items-center gap-3 text-body text-subheadline" role="separator">
          <span className="h-px flex-1 bg-border-2" />
          {c.or}
          <span className="h-px flex-1 bg-border-2" />
        </div>

        <div className="mt-6 flex w-full flex-col gap-3">
          <Button variant="ghost" size="lg" fullWidth href={c.platformUrl} iconLeft={<GoogleIcon />}>{c.social.google}</Button>
          <Button variant="ghost" size="lg" fullWidth href={c.platformUrl} iconLeft={<LinkedInIcon className="text-[#0a66c2]" />}>{c.social.linkedin}</Button>
        </div>
      </div>
    </div>
  );
}
