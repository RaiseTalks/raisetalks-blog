import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useThemeConfig} from '@docusaurus/theme-common';
import NewsletterForm from '@site/src/components/NewsletterForm';

type FooterLinkItem = {label: string; to?: string; href?: string};
type FooterLinkGroup = {title?: string; items: FooterLinkItem[]};

const SOCIAL_COLUMNS = [
  ['LinkedIn', 'YouTube'],
  ['Instagram', 'Facebook'],
];

export default function Footer(): ReactNode {
  const {footer} = useThemeConfig();

  if (!footer) {
    return null;
  }

  const linkGroups = (footer.links ?? []) as FooterLinkGroup[];

  const companyGroup = linkGroups.find((group) => group.title === 'Company');
  const platformGroup = linkGroups.find((group) => group.title === 'Platform');
  const communityGroup = linkGroups.find((group) => group.title === 'Community');
  const legalGroup = linkGroups.find((group) => group.title === 'Legal');

  const communityItemsByLabel = new Map(
    (communityGroup?.items ?? []).map((item) => [item.label, item]),
  );

  return (
    <footer className="rt-footer">
      <div className="rt-footer__top">
        <div className="container mx-auto rt-footer__grid">
          <div className="rt-footer__logo-col">
            <img
              src={useBaseUrl('/img/about-us/shiny-logo.png')}
              alt=""
              aria-hidden="true"
              className="rt-footer__logo-icon"
            />
            <img
              src={useBaseUrl('/img/logo-white.svg')}
              alt="RaiseTalks"
              className="rt-footer__logo-mark"
            />
          </div>

          <FooterColumn title={companyGroup?.title} items={companyGroup?.items} />
          <FooterColumn title={platformGroup?.title} items={platformGroup?.items} />

          <div className="rt-footer__community-col">
            {communityGroup && (
              <div className="rt-footer__community">
                <p className="rt-footer__col-title">{communityGroup.title}</p>
                <div className="rt-footer__community-grid">
                  {SOCIAL_COLUMNS.map((labels, idx) => (
                    <ul className="rt-footer__links" key={idx}>
                      {labels.map((label) => {
                        const item = communityItemsByLabel.get(label);
                        if (!item) return null;
                        return (
                          <li key={label}>
                            <Link className="rt-footer__link" to={item.to ?? item.href}>
                              {label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ))}
                </div>
              </div>
            )}

            <div className="rt-footer__newsletter">
              <p className="rt-footer__col-title">Newsletter</p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>

      <div className="rt-footer__bottom">
        <div className="container mx-auto rt-footer__bottom-inner">
          <p className="rt-footer__copyright">{footer.copyright}</p>
          {legalGroup && (
            <div className="rt-footer__legal">
              {legalGroup.items.map((item) => (
                <Link key={item.label} className="rt-footer__legal-link" to={item.to ?? item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title?: string;
  items?: FooterLinkItem[];
}): ReactNode {
  if (!title || !items) return null;
  return (
    <div className="rt-footer__col">
      <p className="rt-footer__col-title">{title}</p>
      <ul className="rt-footer__links">
        {items.map((item) => (
          <li key={item.label}>
            <Link className="rt-footer__link" to={item.to ?? item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
