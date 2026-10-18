# B-03 — Forms mock   (after B-01, parallel to B-02)

Read `CLAUDE.md`, `docs/architecture.md` (Forms), `src/lib/forms/types.ts`.

1. `src/lib/forms/mock.ts`: `mockForms: FormService`.
   - `subscribe(email)`: validate email (simple regex), wait 600ms, `console.info` it, return `{ ok: true }`;
     invalid → `{ ok: false, error: "Please enter a valid email." }`.
   - `contact(input)`: require name + valid email, same behaviour.
2. `src/lib/forms/index.ts`: `export const forms: FormService = mockForms;` + a comment
   "Real developer: replace with a real provider. Nothing else changes."
3. `src/lib/forms/actions.ts` ("use server"):
   `subscribeAction(prev: FormResult | undefined, formData: FormData)` reads `email`;
   `contactAction(prev, formData)` reads `topic`, `name`, `email`, `message`. Both return `FormResult`.
4. No UI changes (Studio wires the forms in Drop 1+).

`npm run build` + `npm run lint`. Commit "B-03", push. REPORT FOR STUDIO.
