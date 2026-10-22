import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * /sign-in (and /sign-in?mode=signup) forward to the platform: accounts, the trial and Stripe checkout
 * all live on app.raisetalks.com. Kept so links to the old local sign-in page still land in the right place.
 * Static host: the query decides the target in the browser; without JS the links below do the job.
 */
export const metadata: Metadata = { title: "Sign in", robots: { index: false, follow: true } };

const script = `location.replace(new URLSearchParams(location.search).get("mode") === "signup" ? ${JSON.stringify(site.links.signUp)} : ${JSON.stringify(site.links.signIn)})`;

export default function SignInRedirect() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <p className="p-8 text-body text-copy">
        Continue to <a href={site.links.signIn} className="text-brand-light-blue underline">sign in</a> or{" "}
        <a href={site.links.signUp} className="text-brand-light-blue underline">create your account</a> on RaiseTalks.
      </p>
    </>
  );
}
