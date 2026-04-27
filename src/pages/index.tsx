import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import SolutionSection, { InvestorDiscoveryBlock } from '@site/src/components/SolutionSection';
import ScoringOSSummary from '@site/src/components/ScoringOSSummary';
import styles from './index.module.css';

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function HomepageHero() {
  const section = useInView(0.05);
  return (
    <section
      ref={section.ref as React.RefObject<HTMLElement>}
      className={`${styles.hero} ${section.visible ? styles.visible : ''}`}
      aria-labelledby="hero-heading"
    >
      <div className={styles.heroInner}>
        <div className={styles.heroEyebrow}>For Startups &amp; Investors</div>
        <h1 id="hero-heading" className={styles.heroTitle}>
          AI-first Global{' '}
          <span className={styles.heroAccent}>Fundraising Workspace</span>
        </h1>
        <p className={styles.heroDesc}>
          Run deals, streamline due diligence, and close rounds faster — all in one place.
        </p>
        <div className={styles.heroActions}>
          <Link className={styles.btnPrimary} to="https://app.raisetalks.com/sign-up">
            Try It Free
          </Link>
          <Link className={styles.btnSecondary} to="https://calendly.com/iamdariiava/30min">
            Book a Demo
          </Link>
        </div>
      </div>
    </section>
  );
}

function PitchCompetitionsBlock() {
  const section = useInView(0.1);
  const bullets = [
    { title: '100+ vetted startups per cohort.', desc: 'Screened before they reach you.' },
    { title: 'AI pre-scoring across Team, Product, Market, and Deal.', desc: 'So you arrive informed.' },
    { title: 'Standardized data rooms for every participant.', desc: 'No chasing documents.' },
    { title: 'Direct founder access.', desc: 'From first look to first conversation.' },
  ];

  return (
    <section
      ref={section.ref as React.RefObject<HTMLElement>}
      className={`${styles.pitchSection} ${styles.animSection} ${section.visible ? styles.visible : ''}`}
      aria-labelledby="pitch-heading"
    >
      <div className={styles.pitchInner}>
        <div className={styles.pitchGrid}>
          <div className={styles.pitchLeft}>
            <p className={styles.pitchEyebrow}>Pitch Competitions</p>
            <h2 id="pitch-heading" className={styles.pitchTitle}>
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
      </div>
    </section>
  );
}

function HomepageCTA() {
  const section = useInView(0.1);
  return (
    <section
      ref={section.ref as React.RefObject<HTMLElement>}
      className={`${styles.ctaSection} ${styles.animSection} ${section.visible ? styles.visible : ''}`}
      aria-labelledby="cta-heading"
    >
      <div className={styles.ctaBackground} aria-hidden="true" />
      <div className={styles.ctaContent}>
        <h2 id="cta-heading" className={styles.ctaTitle}>
          Fundraising isn't guesswork. It's an investment process.
        </h2>
        <p className={styles.ctaDescription}>
          RaiseTalks helps you run it like a pro — automated data rooms, real investor insights, and deal-ready files.
        </p>
        <div className={styles.ctaButtons}>
          <Link className={styles.ctaButtonPrimary} to="https://app.raisetalks.com/sign-up">
            Start Free Trial
          </Link>
          <Link className={styles.ctaButtonSecondary} to="/pricing">
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="RaiseTalks - AI-Powered Fundraising Workspace for Founders"
      description="RaiseTalks is the AI-powered fundraising workspace for early-stage founders. Build investor-grade data rooms, get AI readiness scores, and close your round faster.">
      <Head>
        <meta name="description" content="RaiseTalks is the AI-powered fundraising workspace for early-stage founders. Build investor-grade data rooms, get AI readiness scores, and close your round faster." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://raisetalks.com/" />
        <meta property="og:title" content="RaiseTalks - AI-Powered Fundraising Workspace for Founders" />
        <meta property="og:description" content="Build investor-grade data rooms, get AI readiness scores, and close your round faster." />
        <meta property="og:url" content="https://raisetalks.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://raisetalks.com/img/docusaurus-social-card.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RaiseTalks - AI-Powered Fundraising Workspace for Founders" />
        <meta name="twitter:description" content="Build investor-grade data rooms, get AI readiness scores, and close your round faster." />
        <meta name="twitter:image" content="https://raisetalks.com/img/docusaurus-social-card.jpg" />
        <meta name="twitter:site" content="@raisetalks" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "name": "RaiseTalks",
              "url": "https://raisetalks.com",
              "description": "AI-powered fundraising workspace for early-stage founders and investors",
              "sameAs": ["https://twitter.com/raisetalks"]
            },
            {
              "@type": "WebSite",
              "name": "RaiseTalks",
              "url": "https://raisetalks.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://raisetalks.com/blog?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          ]
        })}</script>
      </Head>
      <HomepageHero />
      <SolutionSection />
      <ScoringOSSummary />
      <InvestorDiscoveryBlock />
      <PitchCompetitionsBlock />
      <HomepageCTA />
    </Layout>
  );
}
