import React, { useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import styles from './pricing.module.css';

// Custom hook for scroll animations
function useScrollAnimation() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return ref;
}

// Checkmark icon (same glyph as startups.tsx), inherits color via currentColor
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

// Brand palette for the three audience cards (from the Figma pricing design)
const BRAND_DARK_BLUE = '#003687';
const BRAND_LIGHT_BLUE = '#0077ff';
const BRAND_YELLOW = 'var(--e-global-color-secondary-accent, #ffab0e)';

interface FeaturedPlan {
  name: string;
  monthlyPrice: string;
  annualChip: string;
  features: string[];
  ctaLabel: string;
  ctaTo: string;
}

interface Audience {
  id: string;
  label: string;
  dotStyle: React.CSSProperties;
  plan: FeaturedPlan;
}

// Founders and Investors share the light card layout; Venture Funds renders the dark variant below
const LIGHT_AUDIENCES: Audience[] = [
  {
    id: 'founders',
    label: 'For Founders',
    dotStyle: { background: 'var(--raisetalks-accent-gradient)' },
    plan: {
      name: 'Startup Pro',
      monthlyPrice: '$99',
      annualChip: '$699 /yr',
      features: [
        'Unlimited AI Advisor',
        'DD-ready data room',
        'IR Pipeline',
        'IR Push',
        'Direct investor invites',
        'Data Room MCP',
      ],
      ctaLabel: 'Start now',
      ctaTo: 'https://app.raisetalks.com/sign-up',
    },
  },
  {
    id: 'investors',
    label: 'For Investors',
    dotStyle: { background: BRAND_LIGHT_BLUE },
    plan: {
      name: 'Investor Pro',
      monthlyPrice: '$199',
      annualChip: '$1,428 /yr',
      features: [
        'DD-tier access (143 fields)',
        'Scoring OS',
        'Connections & IR Updates',
        '1-click Investment Memo PDFs',
        'Investor MCP',
        'Q&A Constructor with public share links',
      ],
      ctaLabel: 'Start now',
      ctaTo: 'https://app.raisetalks.com/sign-up',
    },
  },
];

// Accent border color per light audience card
const AUDIENCE_ACCENT: Record<string, string> = {
  founders: BRAND_YELLOW,
  investors: BRAND_DARK_BLUE,
};

const VC_PLAN_FEATURES = [
  'All in Investor Pro, plus:',
  '3Q 2026 Pilot Program',
  'Early access to the new features',
  'Priority Customer Support',
  'Online Pitch Competitions [coming soon]',
  'Watch List',
  'IC Committee [coming soon]',
];
const CALENDLY_URL = 'https://calendly.com/iamdariiava/30min';

// Check-bullet list inside a featured plan card
function PlanFeatureList({ features, dark = false }: { features: string[]; dark?: boolean }) {
  return (
    <ul className="mb-6 flex-grow space-y-1">
      {features.map((feature) => (
        <li key={feature} className="flex items-center gap-2 py-1">
          <span className={dark ? 'text-white' : 'text-green-600'}>
            <CheckIcon />
          </span>
          <span className={`text-base ${dark ? 'text-white' : 'text-gray-700'}`}>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Pricing() {
  const plansRef = useScrollAnimation();

  return (
    <Layout
      title="Pricing - RaiseTalks AI Fundraising Workspace"
      description="AI-powered fundraising workspace pricing. Plans for founders, investors and venture funds. Monthly or annual billing, cancel anytime.">
      <Head>
        <meta name="description" content="AI-powered fundraising workspace pricing. Plans for founders, investors and venture funds. Monthly or annual billing, cancel anytime." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://raisetalks.com/pricing" />
        <meta property="og:title" content="Pricing - RaiseTalks AI Fundraising Workspace" />
        <meta property="og:description" content="Plans for founders, investors and venture funds. Monthly or annual billing, cancel anytime." />
        <meta property="og:url" content="https://raisetalks.com/pricing" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://raisetalks.com/img/og-raisetalks.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pricing - RaiseTalks AI Fundraising Workspace" />
        <meta name="twitter:description" content="Plans for founders, investors and venture funds. Monthly or annual billing, cancel anytime." />
        <meta name="twitter:image" content="https://raisetalks.com/img/og-raisetalks.jpg" />
        <meta name="twitter:site" content="@raisetalks" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Pricing - RaiseTalks",
          "url": "https://raisetalks.com/pricing",
          "description": "AI-powered fundraising workspace pricing. Monthly or annual billing, cancel anytime.",
          "publisher": { "@type": "Organization", "name": "RaiseTalks", "url": "https://raisetalks.com" }
        })}</script>
      </Head>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>

      {/* Enhanced Hero Section */}
      <section className={`relative py-20 overflow-hidden ${styles.hero}`}>
        {/* Background Pattern - matching homepage */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              rgba(1, 116, 225, 0.03) 35px,
              rgba(1, 116, 225, 0.03) 70px
            )`
          }}></div>
        </div>

        {/* Animated gradient orb - matching homepage */}
        <div className="absolute top-0 -translate-x-1/2 rounded-full left-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-blue-600/20 blur-3xl animate-pulse"></div>

        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            {/* Pre-title badge */}
            <div className="inline-flex items-center px-4 py-2 mb-6 border border-blue-100 rounded-full bg-blue-50">
              <span className="text-sm font-semibold text-[var(--raisetalks-blue-primary-flat)]">Pricing</span>
            </div>

            {/* Main Title with gradient text */}
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              <span className="text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text">
                Simple, Transparent Pricing
              </span>
            </h1>

            {/* Subtitle with enhanced typography */}
            <p className="max-w-4xl mx-auto mb-8 text-xl font-medium leading-relaxed text-gray-600 md:text-2xl">
              Whether you're <span className="text-[var(--raisetalks-blue-primary-flat)] font-semibold">raising capital</span> or
              <span className="text-[var(--raisetalks-blue-primary-flat)] font-semibold"> sourcing deals</span>, RaiseTalks offers plans designed to help you move faster—with clarity, confidence, and AI support.
            </p>
          </div>
        </div>
      </section>

      {/* Plans Section — three audience cards (Founders / Investors / Venture Funds) */}
      <section ref={plansRef} className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid items-stretch max-w-7xl gap-6 mx-auto lg:grid-cols-3">
            {/* Founders + Investors: light cards with an accent border */}
            {LIGHT_AUDIENCES.map((audience) => (
              <div
                key={audience.id}
                className="flex flex-col gap-6 rounded-xl border p-6 md:p-8"
                style={{ borderColor: AUDIENCE_ACCENT[audience.id], background: 'rgba(245, 245, 245, 0.35)' }}
              >
                {/* Audience label with colored dot */}
                <div className="flex items-center gap-2.5">
                  <span className="inline-block w-3 h-3 rounded-full" style={audience.dotStyle}></span>
                  <span className="text-2xl italic text-gray-900 capitalize" style={{ fontFamily: 'Georgia, serif' }}>
                    {audience.label}
                  </span>
                </div>


                {/* Featured plan card */}
                <div
                  className="flex flex-col flex-grow rounded-xl border-2 px-5 pt-7 pb-4"
                  style={{
                    borderColor: AUDIENCE_ACCENT[audience.id],
                    background: 'rgba(250, 250, 250, 0.35)',
                    boxShadow: 'inset 4px 4px 8px #ffffff, inset -4px -4px 8px #ebebeb',
                  }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <h3 className="text-2xl font-semibold text-gray-900">{audience.plan.name}</h3>
                    <span className="px-4 py-2 text-lg font-semibold text-gray-700 rounded-lg bg-[#f5f5f5] whitespace-nowrap">
                      {audience.plan.annualChip}
                    </span>
                  </div>
                  <p className="mb-4">
                    <span className="text-5xl font-medium md:text-6xl" style={{ color: BRAND_LIGHT_BLUE }}>
                      {audience.plan.monthlyPrice}
                    </span>
                    <span className="text-xl text-gray-700">/mo</span>
                  </p>
                  <PlanFeatureList features={audience.plan.features} />
                  <Link
                    className="block px-6 py-3 mt-auto font-semibold text-center text-white transition-all duration-300 rounded-lg hover:scale-105 hover:text-white hover:no-underline shadow-md"
                    style={{ background: 'var(--raisetalks-brand-gradient)' }}
                    to={audience.plan.ctaTo}
                    aria-label={`${audience.plan.ctaLabel} — ${audience.plan.name}`}
                  >
                    {audience.plan.ctaLabel}
                  </Link>
                </div>
              </div>
            ))}

            {/* Venture Funds: dark card variant */}
            <div className="flex flex-col gap-6 rounded-xl border border-white/20 p-6 md:p-8" style={{ background: BRAND_DARK_BLUE }}>
              <div className="flex items-center gap-2.5">
                <span className="inline-block w-3 h-3 rounded-full" style={{ background: BRAND_LIGHT_BLUE }}></span>
                <span className="text-2xl italic text-white capitalize" style={{ fontFamily: 'Georgia, serif' }}>
                  For Venture Funds
                </span>
              </div>


              {/* VC Platinum: gradient card, contact-sales instead of a listed price */}
              <div
                className="flex flex-col flex-grow rounded-xl px-5 pt-7 pb-4"
                style={{
                  backgroundImage: `linear-gradient(74deg, ${BRAND_DARK_BLUE} 3.4%, ${BRAND_LIGHT_BLUE} 100%)`,
                  borderBottom: `4px solid ${BRAND_LIGHT_BLUE}`,
                }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <h3 className="text-2xl font-semibold text-white">VC Platinum</h3>
                  <Link
                    className="px-4 py-2 text-lg font-semibold text-white transition-all duration-300 rounded-lg hover:scale-105 hover:text-white hover:no-underline whitespace-nowrap"
                    style={{ background: BRAND_DARK_BLUE }}
                    to={CALENDLY_URL}
                    aria-label="Contact us about VC Platinum"
                  >
                    Contact us
                  </Link>
                </div>
                <p className="mb-4">
                  <Link className="text-4xl font-medium text-white md:text-5xl hover:text-white hover:no-underline" to={CALENDLY_URL}>
                    Let's talk
                  </Link>
                </p>
                <PlanFeatureList features={VC_PLAN_FEATURES} dark />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h3 className={styles.ctaTitle}>
            Ready to transform your fundraising?
          </h3>
          <p className={styles.ctaDesc}>
            Join thousands of founders and investors using AI to move faster with confidence.
          </p>

          <div className={styles.ctaButtons}>
            <Link className={styles.ctaBtnPrimary} to="https://app.raisetalks.com/sign-up">
              Start now
            </Link>
            <Link className={styles.ctaBtnSecondary} to={CALENDLY_URL}>
              Schedule Demo
            </Link>
          </div>

          <div className={styles.ctaTrust}>
            <span>Monthly or annual billing</span>
            <span className={styles.ctaTrustDivider}>-</span>
            <span>Cancel anytime</span>
            <span className={styles.ctaTrustDivider}>-</span>
            <span>Secure payment by Stripe</span>
          </div>
        </div>
      </section>
    </Layout>
  );
}
