import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

// Icon components
const ChartBarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" x2="18" y1="20" y2="10" />
    <line x1="12" x2="12" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="14" />
  </svg>
);

const TrophyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const ClipboardCheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="m9 14 2 2 4-4" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const TargetIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

// Data
const offerings = [
  {
    icon: ChartBarIcon,
    title: 'Scoring OS',
    description: 'Turn raw startup info into standardized, IC-ready outputs with audit trail, benchmarks, and collaboration.',
    features: [
      'Pre-Score Engine for fast screening',
      'Committee Workspace with variance detection',
      'Due Diligence tracking & IC Pack generation',
    ],
    link: '/investors/scoring-os',
    linkText: 'Explore Scoring OS',
    badge: 'Coming Soon',
  },
  {
    icon: TrophyIcon,
    title: 'Pitch Competitions',
    description: 'Discover high-potential startups through curated pitch competitions and streamline your deal sourcing workflow.',
    features: [
      'Access to vetted startup cohorts',
      'Structured evaluation framework',
      'Direct founder connections',
    ],
    link: '/investors/use-cases',
    linkText: 'View Pitch Competitions',
    badge: null,
  },
];

const highlights = [
  {
    icon: ClipboardCheckIcon,
    title: 'Standardized Evaluation',
    description: 'Consistent scoring across Team, Product, Market, and Deal dimensions',
  },
  {
    icon: UsersIcon,
    title: 'Collaborative Decisions',
    description: 'Multi-reviewer workflows with variance detection and audit trails',
  },
  {
    icon: TargetIcon,
    title: 'Quality Deal Flow',
    description: 'Access pre-screened startups with structured data rooms and profiles',
  },
];

export default function InvestorsPage() {
  return (
    <Layout
      title="For Investors"
      description="Streamline your deal flow with RaiseTalks investor tools - Scoring OS and Pitch Competitions">

      {/* Hero Section */}
      <section className="cleanHeroSection">
        <div className="cleanHeroContainer">
          <span className={styles.badge}>For Investors</span>
          <Heading as="h1" className="cleanHeroTitle">
            Streamline Your{' '}
            <span className="cleanHeroTitleAccent">Deal Flow</span>
          </Heading>
          <p className="cleanHeroDescription">
            From screening to IC-ready outputs, RaiseTalks helps funds evaluate startups faster
            with structured data, collaborative workflows, and curated deal sourcing.
          </p>
          <div className="cleanHeroButtons">
            <Link className="cleanHeroPrimaryButton" to="/startups">
              Browse Startups
            </Link>
            <Link className="cleanHeroSecondaryButton" to="https://app.raisetalks.com/investor-pipeline">
              View Dealflow
            </Link>
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Investor Tools</h2>
            <p className={styles.sectionSubtitle}>
              Two powerful offerings to enhance your investment workflow
            </p>
          </div>
          <div className={styles.offeringsGrid}>
            {offerings.map((offering, idx) => (
              <div key={idx} className={styles.offeringCard}>
                <div className={styles.offeringHeader}>
                  <div className={styles.offeringIconWrap}>
                    <offering.icon className={styles.offeringIcon} />
                  </div>
                  {offering.badge && (
                    <span className={styles.offeringBadge}>{offering.badge}</span>
                  )}
                </div>
                <h3 className={styles.offeringTitle}>{offering.title}</h3>
                <p className={styles.offeringDescription}>{offering.description}</p>
                <ul className={styles.offeringFeatures}>
                  {offering.features.map((feature, fIdx) => (
                    <li key={fIdx} className={styles.offeringFeature}>
                      <span className={styles.featureCheck}>-</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link className={styles.offeringLink} to={offering.link}>
                  {offering.linkText}
                  <ArrowRightIcon className={styles.linkArrow} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Why Investors Choose RaiseTalks</h2>
            <p className={styles.sectionSubtitle}>
              Built for funds that want to screen faster and decide better
            </p>
          </div>
          <div className={styles.highlightsGrid}>
            {highlights.map((highlight, idx) => (
              <div key={idx} className={styles.highlightCard}>
                <div className={styles.highlightIconWrap}>
                  <highlight.icon className={styles.highlightIcon} />
                </div>
                <h3 className={styles.highlightTitle}>{highlight.title}</h3>
                <p className={styles.highlightDescription}>{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>Ready to optimize your investment process?</h2>
          <p className={styles.ctaDescription}>
            Browse startup profiles and connect with founders building innovative solutions.
          </p>
          <div className={styles.ctaButtons}>
            <Link className={styles.ctaPrimary} to="/startups">
              Browse Startups
              <ArrowRightIcon className={styles.ctaArrow} />
            </Link>
            <Link className={styles.ctaSecondary} to="https://calendly.com/iamdariiava/30min">
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
