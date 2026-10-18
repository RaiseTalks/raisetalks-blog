import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { AnnouncementBar } from "./AnnouncementBar";
import { HeaderShell } from "./HeaderShell";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

/**
 * Announcement bar (scrolls away) + sticky glass navbar (Figma 3257:1025 / 3257:1030).
 * Top of page: full-width bar, 1px bottom line, soft shadow, 58 / 60px high.
 * Scrolled: floating compact bar like RaiseTalks TV (see `.site-header` in components.css).
 */
export function SiteHeader() {
  return (
    <>
      <AnnouncementBar />
      <HeaderShell>
        <div className="site-nav-bar">
          <div className="site-nav-inner">
            <Link href="/" className="shrink-0" aria-label={`${site.name} home`}>
              <Image src={site.logo.src} alt={site.name} width={site.logo.width} height={site.logo.height} priority className="h-3 w-auto tablet:h-4" />
            </Link>
            <NavLinks links={nav.public} />
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" href={nav.actions.signIn.href} className="hidden text-body laptop:inline-flex">{nav.actions.signIn.label}</Button>
              <Button variant="primary" size="sm" href={nav.actions.signUp.href} className="text-body">{nav.actions.signUp.label}</Button>
              <MobileMenu links={nav.public} actions={[nav.actions.signIn]} />
            </div>
          </div>
        </div>
      </HeaderShell>
    </>
  );
}
