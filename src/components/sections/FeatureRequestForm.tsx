"use client";

import { useActionState, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { featureRequestAction } from "@/lib/forms/actions";
import { Honeypot } from "@/components/ui/Honeypot";
import { FEATURE_DESCRIPTION_MAX } from "@/lib/forms/types";
import type { featureRequest } from "@/content/marketing/featureRequest";
import { Input, Select, Textarea } from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type Errors = { email?: string; description?: string };

/**
 * Feature Request form (Drop 21; live raisetalks.com/feature-request, styled with the site inputs).
 * Name + email side by side from tablet, type + priority dropdowns side by side, description with a live
 * 2000-character counter, optional use case. Client check first, then `featureRequestAction` (Supabase feature-request function, src/lib/forms).
 */
export function FeatureRequestForm({ c }: { c: (typeof featureRequest)["form"] }) {
  const [result, formAction, isPending] = useActionState(featureRequestAction, undefined);
  const [errors, setErrors] = useState<Errors>({});
  const [count, setCount] = useState(0);
  const serverError = result && !result.ok ? result.error : null;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    const data = new FormData(e.currentTarget);
    const next: Errors = {};
    if (!EMAIL.test(String(data.get("email") ?? "").trim())) next.email = c.errors.email;
    if (!String(data.get("description") ?? "").trim()) next.description = c.errors.description;
    setErrors(next);
    if (next.email || next.description) e.preventDefault(); // invalid: don't submit
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {result?.ok ? (
        <motion.div key="done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} role="status" className="flex flex-col gap-2 py-6 text-center">
          <p className="text-h3 text-headline">{c.success.title}</p>
          <p className="text-body text-copy">{c.success.text}</p>
        </motion.div>
      ) : (
        <motion.form key="form" action={formAction} onSubmit={onSubmit} noValidate exit={{ opacity: 0 }} className="flex flex-col gap-6">
          <Honeypot />
          <div className="grid gap-6 tablet:grid-cols-2">
            <Input label={c.name} name="name" autoComplete="name" />
            <Input label={c.email} name="email" type="email" autoComplete="email" required error={errors.email} onChange={() => errors.email && setErrors((x) => ({ ...x, email: undefined }))} />
          </div>
          <div className="grid gap-6 tablet:grid-cols-2">
            <Select label={c.type.label} name="type" options={c.type.options} defaultValue={c.type.default} />
            <Select label={c.priority.label} name="priority" options={c.priority.options} defaultValue={c.priority.default} />
          </div>
          <Textarea
            label={c.description}
            name="description"
            rows={6}
            required
            maxLength={FEATURE_DESCRIPTION_MAX}
            onChange={(e) => { setCount(e.target.value.length); if (errors.description) setErrors((x) => ({ ...x, description: undefined })); }}
            error={errors.description}
            hint={c.counter.replace("{n}", String(count))}
          />
          <Textarea label={c.useCase} name="useCase" rows={3} />
          {serverError && <p className="text-footnote text-bad" role="alert">{serverError}</p>}
          <Button type="submit" variant="primary" size="lg" fullWidth disabled={isPending}>
            {isPending ? "…" : c.submit}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
