import Image from "next/image";
import Link from "next/link";
import { footer, site, type NavLink } from "@/content/site";
import { consent } from "@/content/consent";
import { CookieSettingsButton } from "@/components/consent/CookieSettingsButton";
import { NewsletterForm } from "./NewsletterForm";

function FooterLink({ link }: { link: NavLink }) {
  const cls =
    "inline-flex rounded-sm p-2 text-body text-on-brand-muted transition-colors duration-[250ms] hover:bg-on-brand-hover hover:text-on-brand focus-visible:bg-on-brand-hover";
  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>{link.label}</a>
  ) : (
    <Link href={link.href} className={cls}>{link.label}</Link>
  );
}

function Column({ title, links, split }: { title: string; links: NavLink[]; split?: boolean }) {
  const half = Math.ceil(links.length / 2);
  const groups = split ? [links.slice(0, half), links.slice(half)] : [links];
  return (
    <div className="flex flex-col gap-4">
      <p className="text-h4 font-semibold text-on-brand">{title}</p>
      <div className="-ml-2 flex gap-8">
        {groups.map((g, i) => (
          <ul key={i} className="flex flex-col gap-1">
            {g.map((l) => <li key={l.label}><FooterLink link={l} /></li>)}
          </ul>
        ))}
      </div>
    </div>
  );
}

const line = "border-brand-light-blue";
const column = "mx-2 tablet:mx-12 laptop:mx-8 desktop:mx-auto desktop:max-w-content";

/**
 * Main footer (Home 3257:1403) — used on every page, incl. "Become an affiliate".
 * Desktop: 3D mark (wordmark removed, Oct 2026) | Company | Platform | Community + Newsletter.
 * Tablet/mobile (1415:797 / 1415:880): wordmark row on top, no 3D mark.
 */
export function SiteFooter() {
  const [company, platform, community] = footer.columns;
  return (
    <footer className="text-on-brand" style={{ backgroundImage: "var(--gradient-footer)" }}>
      {/* wordmark row — tablet/mobile only */}
      <div className={`border-b ${line} laptop:hidden`}>
        <div className={`${column} border-x ${line} flex justify-center px-2 py-8 tablet:justify-start tablet:px-8`}>
          <Image src="/icons/logo-raisetalks-white.svg" alt={site.name} width={200} height={16} className="h-4 w-auto" />
        </div>
      </div>

      <div className={column}>
        <div className="grid grid-cols-1 gap-8 px-2 py-10 tablet:grid-cols-2 tablet:gap-x-8 tablet:gap-y-12 tablet:px-8 tablet:py-12 laptop:grid-cols-[auto_max-content_max-content_1fr] laptop:gap-0 desktop:grid-cols-[auto_1fr_1fr_2fr] laptop:p-0">
          <div className="hidden flex-col items-center justify-center gap-0 py-8 pl-8 laptop:flex desktop:p-12">
            {/* 2x (Oct 2026): 147 → 294px at laptop, 200 → 400px at desktop; the column sizes to the mark */}
            <Image src="/images/shared/logo-footer.webp" alt={site.name} width={963} height={732} sizes="400px" className="h-auto w-[294px] desktop:w-[400px]" />
          </div>
          <div className="laptop:p-8"><Column title={company.title} links={company.links} /></div>
          <div className="laptop:p-8"><Column title={platform.title} links={platform.links} /></div>
          <div className="contents laptop:flex laptop:flex-col">
            <div className="laptop:p-8"><Column title={community.title} links={community.links} split /></div>
            <div className="flex flex-col gap-3 laptop:flex-1 laptop:justify-center laptop:p-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <p className="text-h4 font-semibold">{footer.newsletter.title}</p>
                  <p className="max-w-[392px] text-body text-on-brand-muted">{footer.newsletter.text}</p>
                </div>
                <NewsletterForm {...footer.newsletter} />
              </div>
              {/* local route since Drop 21 (same tab); new tab only if the link is external again (Drop 22) */}
              <Link
                href={footer.affiliate.href}
                {...(footer.affiliate.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="rounded-sm bg-brand-dark-blue px-2 py-3 text-center text-body text-on-brand-muted transition-colors duration-[250ms] hover:bg-primary-edge-hover hover:text-on-brand"
              >
                {footer.affiliate.label}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={`border-t ${line}`}>
        <div className={`${column} border-x ${line} flex flex-col-reverse gap-6 px-4 py-6 text-body text-on-brand-muted tablet:flex-row tablet:items-center tablet:justify-between tablet:px-4 laptop:h-16 laptop:px-8 laptop:py-0`}>
          <p className="max-w-[180px] tablet:max-w-none">{footer.copyright}</p>
          <ul className="flex flex-wrap gap-x-9 gap-y-3">
            {footer.legal.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="transition-colors duration-[250ms] hover:text-on-brand">{l.label}</Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton label={consent.settings} className="cursor-pointer transition-colors duration-[250ms] hover:text-on-brand" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
