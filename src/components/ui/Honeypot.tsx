/** Bot trap for forms: invisible to people, filled in by bots. The form functions drop any submit that has it. */
export function Honeypot() {
  return <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] size-px opacity-0" />;
}
