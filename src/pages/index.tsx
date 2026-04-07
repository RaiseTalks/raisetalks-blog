import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import NavbarScroll from '@site/src/components/NavbarScroll';
import SolutionSection, { InvestorDiscoveryBlock } from '@site/src/components/SolutionSection';
import ScoringOSSummary from '@site/src/components/ScoringOSSummary';

import styles from './index.module.css';

// Hero Section Component
function HomepageHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroEyebrow}>For Startups &amp; Investors</div>
        <Heading as="h1" className={styles.heroTitle}>
          AI-first Global{' '}
          <span className={styles.heroAccent}>Fundraising Workspace</span>
        </Heading>
        <p className={styles.heroDesc}>
          to run deals, streamline due diligence and close rounds faster
        </p>
        <div className={styles.heroActions}>
          <Link className={styles.btnPrimary} to="https://app.raisetalks.com/sign-up">
            Try It Free
          </Link>
          <Link className={styles.btnSecondary} to="https://calendly.com/iamdariiava/30min">
            Book A Demo
          </Link>
        </div>
      </div>
    </section>
  );
}

// Pitch Competitions Block
function PitchCompetitionsBlock() {
  const bullets = [
    { title: '100+ vetted startups per cohort.', desc: 'Screened before they reach you.' },
    { title: 'AI pre-scoring across Team, Product, Market, and Deal.', desc: 'So you arrive informed.' },
    { title: 'Standardized data rooms for every participant.', desc: 'No chasing documents.' },
    { title: 'Direct founder access.', desc: 'From first look to first conversation.' },
  ];

  return (
    <section className={styles.pitchSection}>
      <div className={styles.pitchInner}>
        <div className={styles.pitchGrid}>
          <div className={styles.pitchLeft}>
            <span className={styles.pitchEyebrow}>Pitch Competitions</span>
            <h2 className={styles.pitchTitle}>
              Every cohort is built for one thing:{' '}
              <span className={styles.pitchTitleAccent}>helping you deploy capital smarter and faster.</span>
            </h2>
            <Link className={styles.pitchCta} to="https://calendly.com/iamdariiava/30min">
              Join the Next Cohort
            </Link>
          </div>
          <div className={styles.pitchRight}>
            {bullets.map(({ title, desc }) => (
              <div key={title} className={styles.pitchItem}>
                <div>
                  <span className={styles.pitchItemTitle}>{title}</span>
                  {' '}<span className={styles.pitchItemDesc}>{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.pitchStats}>
          {[
            { value: '4x', label: 'Faster deal screening' },
            { value: '85%', label: 'Investor satisfaction' },
            { value: '72hr', label: 'Avg response time' },
          ].map(({ value, label }) => (
            <div key={label} className={styles.pitchStat}>
              <div className={styles.pitchStatValue}>{value}</div>
              <div className={styles.pitchStatLabel}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section Component
function HomepageCTA() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaBackground}></div>
      <div className={styles.ctaContent}>
        <Heading as="h2" className={styles.ctaTitle}>
          Fundraising isn't guesswork. It's an investment process.
        </Heading>
        <p className={styles.ctaDescription}>
          RaiseTalks helps you run it like a pro with automated data rooms, real investor insights, and deal-ready files.
        </p>
        <div className={styles.ctaButtons}>
          <Link
            className={styles.ctaButtonPrimary}
            to="https://app.raisetalks.com/sign-up">
            Start Free Trial
          </Link>
          <Link
            className={styles.ctaButtonSecondary}
            to="https://app.raisetalks.com/pricing">
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}



export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="RaiseTalks - Your AI-powered fundraising workspace for early-stage founders">
      <NavbarScroll />
      <HomepageHero />
      <SolutionSection />
      <ScoringOSSummary />
      <InvestorDiscoveryBlock />
      <PitchCompetitionsBlock />
      <HomepageCTA />
    </Layout>
  );
}
