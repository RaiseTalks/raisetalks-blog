import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { AuthCard } from "@/components/auth/AuthCard";
import { SignInView } from "@/components/auth/SignInView";
import { Reveal } from "@/components/motion";
import { authContent } from "@/content/auth";

export const metadata: Metadata = { title: authContent.metaTitle, robots: { index: false } };

/**
 * Sign in / Sign up — RaiseTalks TV page (3642:3819) in .com colours, inside the grid rails.
 * Static: ?mode=signup is read by the client leaf (SignInView). The server HTML shows the sign-in card.
 */
export default function SignInPage() {
  return (
    <section className="relative isolate overflow-hidden bg-section-alt">
      <Image src="/images/home/3257-1052.webp" alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-60" />
      <div className="mx-2 tablet:mx-auto tablet:max-w-hero">
        <div className="flex justify-center border-x border-rail-1 px-2 py-16 tablet:py-24 laptop:py-32">
          <Reveal className="flex w-full justify-center">
            <Suspense fallback={<AuthCard mode="signin" />}>
              <SignInView />
            </Suspense>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
