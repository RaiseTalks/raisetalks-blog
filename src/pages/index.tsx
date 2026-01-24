import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import NavbarScroll from '@site/src/components/NavbarScroll';
import SolutionSection from '@site/src/components/SolutionSection';
import ScoringOSSummary from '@site/src/components/ScoringOSSummary';

import styles from './index.module.css';

// Hero Section Component
function HomepageHero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <Heading as="h1" className={styles.heroTitle}>
          <span className={styles.heroTitleAccent}>AI-first Global Fundraising Workspace</span>
        </Heading>
        <p className={styles.heroDescription}>
          for startups and investors to run deals, streamline due diligence <br /> and close rounds faster
        </p>
        <div className={styles.heroButtons}>
          <Link
            className={styles.heroPrimaryButton}
            to="https://app.raisetalks.com/sign-up">
            Try It Free
          </Link>
          <Link
            className={styles.heroSecondaryButton}
            to="https://calendly.com/iamdariiava/30min">
            Book A Demo
          </Link>
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
          RaiseTalks helps you run it like a pro with automated data rooms, real investor insights, and deal-ready files. Join the Beta and lead your round with confidence.
        </p>
        <div className={styles.ctaButtons}>
          <Link
            className={styles.ctaButtonPrimary}
            to="https://app.raisetalks.com/sign-up">
            Start Free Trial
          </Link>
          <Link
            className={styles.ctaButtonSecondary}
            to="/pricing">
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
      <HomepageCTA />
    </Layout>
  );
}