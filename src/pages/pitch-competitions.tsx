import React, { useEffect, useRef, useState } from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './pitch-competitions.module.css';

// ---------------------------------------------------------------------------
// Scroll-in animation hook (same pattern as investors/startups)
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Icons — strokeWidth 1.75, same style as investors page
// ---------------------------------------------------------------------------
const IconTrophy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);
const IconTarget = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconTrendingUp = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);
const IconFileText = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
    <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
    <path d="M8 13h8M8 17h5"/>
  </svg>
);
const IconSparkles = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/>
    <path d="M5 3v4M19 17v4M3 5h4M17 19h4"/>
  </svg>
);
const IconBarChart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" x2="18" y1="20" y2="4"/>
    <line x1="12" x2="12" y1="20" y2="10"/>
    <line x1="6" x2="6" y1="20" y2="16"/>
    <line x1="2" x2="22" y1="20" y2="20"/>
  </svg>
);
const IconMessage = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const IconCheckCircle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const benefitItems = [
  { Icon: IconTrophy, title: 'Vetted Startups', desc: 'Access pre-screened startups competing for investment opportunities' },
  { Icon: IconTarget, title: 'Structured Evaluation', desc: 'Consistent scoring across Team, Product, Market, and Deal dimensions' },
  { Icon: IconUsers, title: 'Founder Access', desc: 'Connect directly with founders building the next big thing' },
  { Icon: IconTrendingUp, title: 'Early Deal Flow', desc: 'Get first look at high-potential startups before they hit the market' },
];

const processSteps = [
  { num: '01', title: 'Apply', desc: 'Startups submit structured profiles and data rooms' },
  { num: '02', title: 'Screen', desc: 'AI-powered pre-scoring filters top candidates' },
  { num: '03', title: 'Pitch', desc: 'Live or async presentations to investor panel' },
  { num: '04', title: 'Connect', desc: 'Direct introductions to matching investors' },
];

const featureItems = [
  { Icon: IconFileText, title: 'Standardized Data Rooms', desc: 'Consistent format across all participants' },
  { Icon: IconSparkles, title: 'Pre-Score Cards', desc: 'AI-generated initial assessments' },
  { Icon: IconUsers, title: 'Founder Profiles', desc: 'Team backgrounds and track records' },
  { Icon: IconTarget, title: 'Market Analysis', desc: 'Competitive landscape and sizing' },
  { Icon: IconBarChart, title: 'Financial Projections', desc: 'Unit economics and runway' },
  { Icon: IconMessage, title: 'Direct Messaging', desc: 'Reach founders instantly' },
];

const statItems = [
  { value: '4x', label: 'Faster deal screening' },
  { value: '60+', label: 'Startups per cohort' },
  { value: '72 hrs', label: 'Average response time' },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function PitchCompetitions() {
  const hero = useInView(0.05);
  const benefitsSec = useInView(0.1);
  const processSec = useInView(0.1);
  const featuresSec = useInView(0.1);
  const metricsSec = useInView(0.1);
  const ctaSec = useInView(0.1);

  return (
    <Layout
      title="Pitch Competitions - Discover Vetted Startups | RaiseTalks"
      description="Discover high-potential startups through curated pitch competitions on RaiseTalks. Pre-scored founders, structured data rooms, and direct investor access.">
      <Head>
        <meta name="description" content="Discover high-potential startups through curated pitch competitions on RaiseTalks. Pre-scored founders, structured data rooms, and direct investor access." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://raisetalks.com/pitch-competitions" />
        <meta property="og:title" content="Pitch Competitions - Discover Vetted Startups | RaiseTalks" />
        <meta property="og:description" content="Curated startup showcases with pre-scored founders, structured data rooms, and direct investor access." />
        <meta property="og:url" content="https://raisetalks.com/pitch-competitions" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://raisetalks.com/img/docusaurus-social-card.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pitch Competitions - Discover Vetted Startups | RaiseTalks" />
        <meta name="twitter:description" content="Curated startup showcases with pre-scored founders and direct investor access." />
        <meta name="twitter:image" content="https://raisetalks.com/img/docusaurus-social-card.jpg" />
        <meta name="twitter:site" content="@raisetalks" />
      </Head>

      {/* ================================================================
          HERO
      ================================================================ */}
      <section
        ref={hero.ref as React.RefObject<HTMLElement>}
        className={`${styles.hero} ${hero.visible ? styles.visible : ''}`}
        aria-labelledby="hero-heading"
      >
        <div className={styles.heroInner}>
          <div className={styles.heroEyebrow}>Pitch Competitions</div>
          <h1 id="hero-heading" className={styles.heroH1}>
            Discover startups{' '}
            <span className={styles.heroAccent}>worth meeting</span>
          </h1>
          <p className={styles.heroDesc}>
            Curated pitch competitions with pre-scored founders, structured data
            rooms, and direct investor access - all in one platform.
          </p>
          <div className={styles.heroActions}>
            <Link href="/startups" className={styles.btnPrimary}>Browse Startups</Link>
            <Link
              href="https://calendly.com/raisetalks/demo"
              className={styles.btnSecondary}
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          BENEFITS
      ================================================================ */}
      <section
        ref={benefitsSec.ref as React.RefObject<HTMLElement>}
        className={`${styles.sectionGray} ${styles.animSection} ${benefitsSec.visible ? styles.visible : ''}`}
        aria-labelledby="benefits-heading"
      >
        <div className={styles.container}>
          <p className={styles.eyebrow}>WHY JOIN</p>
          <h2 id="benefits-heading" className={styles.sectionH2}>
            Why Join Our{' '}
            <span className={styles.heroAccent}>Pitch Competitions</span>
          </h2>
          <div className={styles.benefitsGrid}>
            {benefitItems.map((item) => (
              <div key={item.title} className={styles.card}>
                <div className={styles.iconWrap}><item.Icon /></div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          HOW IT WORKS
      ================================================================ */}
      <section
        ref={processSec.ref as React.RefObject<HTMLElement>}
        className={`${styles.sectionLight} ${styles.animSection} ${processSec.visible ? styles.visible : ''}`}
        aria-labelledby="process-heading"
      >
        <div className={styles.container}>
          <p className={styles.eyebrow}>THE PROCESS</p>
          <h2 id="process-heading" className={styles.sectionH2}>
            From Application{' '}
            <span className={styles.heroAccent}>to Investment Decision</span>
          </h2>
          <div className={styles.stepsGrid}>
            {processSteps.map((step) => (
              <div key={step.num} className={styles.stepCard}>
                <span className={styles.stepNum}>{step.num}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          WHAT YOU GET
      ================================================================ */}
      <section
        ref={featuresSec.ref as React.RefObject<HTMLElement>}
        className={`${styles.sectionGray} ${styles.animSection} ${featuresSec.visible ? styles.visible : ''}`}
        aria-labelledby="features-heading"
      >
        <div className={styles.container}>
          <p className={styles.eyebrow}>FOR INVESTORS</p>
          <h2 id="features-heading" className={styles.sectionH2}>
            What You Get{' '}
            <span className={styles.heroAccent}>in Every Competition</span>
          </h2>
          <div className={styles.featuresGrid}>
            {featureItems.map((item) => (
              <div key={item.title} className={styles.featureCard}>
                <div className={styles.featureIconWrap}><item.Icon /></div>
                <div>
                  <h4 className={styles.featureTitle}>{item.title}</h4>
                  <p className={styles.featureDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          METRICS
      ================================================================ */}
      <section
        ref={metricsSec.ref as React.RefObject<HTMLElement>}
        className={`${styles.sectionLight} ${styles.animSection} ${metricsSec.visible ? styles.visible : ''}`}
        aria-labelledby="metrics-heading"
      >
        <div className={styles.container}>
          <h2 id="metrics-heading" className={styles.srOnly}>Results</h2>
          <div className={styles.statStrip}>
            {statItems.map((s, i) => (
              <React.Fragment key={s.label}>
                {i > 0 && <div className={styles.statDivider} aria-hidden="true" />}
                <div className={styles.statItem}>
                  <span className={styles.statNum}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA
      ================================================================ */}
      <section
        ref={ctaSec.ref as React.RefObject<HTMLElement>}
        className={`${styles.ctaSection} ${styles.animSection} ${ctaSec.visible ? styles.visible : ''}`}
        aria-labelledby="cta-heading"
      >
        <div className={styles.ctaGlow} aria-hidden="true" />
        <div className={styles.container}>
          <h2 id="cta-heading" className={styles.ctaH2}>
            Ready to discover your next investment?
          </h2>
          <p className={styles.ctaSub}>
            Browse startup profiles and connect with founders building
            innovative solutions.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/startups" className={styles.ctaBtnPrimary}>Browse Startups</Link>
            <Link
              href="https://calendly.com/raisetalks/demo"
              className={styles.ctaBtnGhost}
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
