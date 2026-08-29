import React, { useEffect, useRef, useState } from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import GridSeam from '@site/src/components/GridSeam';
import styles from './pitch-competitions.module.css';
import LucideIcon from '@site/src/components/LucideIcon';

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

const checkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1285_1993)">
<path d="M24 4L8.1875 20L1 12.7273" stroke="#189B71" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_1285_1993">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
)

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const benefitItems = [
  { icon: 'badge-check', title: 'Vetted Startups', desc: 'Access pre-screened startups competing for investment opportunities' },
  { icon: 'form', title: 'Structured Evaluation', desc: 'Consistent scoring across Team, Product, Market, and Deal dimensions' },
  { icon: 'handshake', title: 'Founder Access', desc: 'Connect directly with founders building the next big thing' },
  { icon: 'clipboard-clock', title: 'Early Deal Flow', desc: 'Get first look at high-potential startups before they hit the market' },
];

const processSteps = [
  { num: '01', title: 'Apply', desc: 'Startups submit structured profiles and data rooms' },
  { num: '02', title: 'Screen', desc: 'AI-powered pre-scoring filters top candidates' },
  { num: '03', title: 'Pitch', desc: 'Live or async presentations to investor panel' },
  { num: '04', title: 'Connect', desc: 'Direct introductions to matching investors' },
];

const featureItems = [
  { Icon: checkIcon, title: 'Standardized Data Rooms', desc: 'Consistent format across all participants' },
  { Icon: checkIcon, title: 'Pre-Score Cards', desc: 'AI-generated initial assessments' },
  { Icon: checkIcon, title: 'Founder Profiles', desc: 'Team backgrounds and track records' },
  { Icon: checkIcon, title: 'Market Analysis', desc: 'Competitive landscape and sizing' },
  { Icon: checkIcon, title: 'Financial Projections', desc: 'Unit economics and runway' },
  { Icon: checkIcon, title: 'Direct Messaging', desc: 'Reach founders instantly' },
];

const statItems = [
  { value: '4x', label: 'Faster deal screening' },
  { value: '85%', label: 'Investor satisfaction' },
  { value: '72hr', label: 'Avg response time' },
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
        <meta property="og:image" content="https://raisetalks.com/img/og-raisetalks.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pitch Competitions - Discover Vetted Startups | RaiseTalks" />
        <meta name="twitter:description" content="Curated startup showcases with pre-scored founders and direct investor access." />
        <meta name="twitter:image" content="https://raisetalks.com/img/og-raisetalks.jpg" />
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
            Discover startups <br />
            <span className={styles.heroAccent}>worth meeting</span>
          </h1>
          {/* <p className={styles.heroDesc}>
            Curated pitch competitions with pre-scored founders, structured data
            rooms, and direct investor access - all in one platform.
          </p> */}
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
          METRICS
      ================================================================ */}
      <section
        ref={metricsSec.ref as React.RefObject<HTMLElement>}
        className={`${styles.sectionLight} ${styles.statsSection} ${styles.animSection} ${metricsSec.visible ? styles.visible : ''}`}
        aria-labelledby="metrics-heading"
      >
        <div className={styles.containerNarrow}>
          <h2 id="metrics-heading" className={styles.srOnly}>Results</h2>
          <div className={styles.statStrip}>
            {statItems.map((s) => (
              <div key={s.label} className={styles.statItem}>
                <span className={styles.statNum}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.pageRegion}>
      <GridSeam />

      {/* ================================================================
          BENEFITS
      ================================================================ */}
      <section
        ref={benefitsSec.ref as React.RefObject<HTMLElement>}
        className={`${styles.sectionGray} ${styles.animSection} ${benefitsSec.visible ? styles.visible : ''}`}
        aria-labelledby="benefits-heading"
      >
        <div className="flex w-full mx-auto gap-[48px] px-16 py-12 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1480px]">
          <h2 id="benefits-heading" className={`${styles.sectionH2} flex-1`}>
            Why Join Our <br />
            <span className={styles.heroAccent}>Pitch Competitions</span>
          </h2>
          <div className="grid grid-cols-2 flex-2 gap-px bg-[var(--ifm-color-emphasis-200)]">
            {benefitItems.map((item) => (
              <div key={item.title} className="flex gap-5 bg-[#f6f7f9] p-6">
                <div className={styles.iconWrap}><LucideIcon name={item.icon} className={styles.iconWrapImg} /></div>
                <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
<div className={`${styles.processSpacer} w-full bg-[#0077FF] border-b border-b-[#258BFF]`}></div>
      {/* ================================================================
          HOW IT WORKS
      ================================================================ */}
      <section
        ref={processSec.ref as React.RefObject<HTMLElement>}
        className={`${styles.processSection} ${styles.animSection} ${processSec.visible ? styles.visible : ''}`}
        aria-labelledby="process-heading"
      >
        <div className={styles.container}>
          <div className='py-[32px]'>
          <p id="process-heading" className={styles.processEyebrow}>The Process</p>
          <p className={styles.processSubtitle}>
            From Application to Investment Decision
          </p>
          </div>

          <div className={styles.processBand}>
            {processSteps.map((step, i) => (
              <div key={step.num} className={styles.processCol}>
                <div className={styles.processNumRow}>
                  <span className={styles.processNum}>{step.num}</span>
                  {i < processSteps.length - 1 && <div className={styles.processLine} aria-hidden="true" />}
                </div>
                <div className={styles.processCard}>
                  <h3 className={styles.processCardTitle}>{step.title}</h3>
                  <p className={styles.processCardDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={`${styles.processSpacer} w-full bg-[#0077FF] border-t border-t-[#258BFF]`}></div>

      <div className={styles.pageRegion}>
      {/* ================================================================
          WHAT YOU GET
      ================================================================ */}
      <section
        ref={featuresSec.ref as React.RefObject<HTMLElement>}
        className={`${styles.sectionGray} ${styles.animSection} ${featuresSec.visible ? styles.visible : ''}`}
        aria-labelledby="features-heading"
      >
        <div className={styles.containerNarrow}>
          <h2 id="features-heading" className={styles.sectionH2}>
            What You Get in Every Competition
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
      </div>

      <div className={`${styles.processSpacer} w-full bg-[#0C1B31] border-b border-b-[#1E437B]`}></div>

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
            Ready to discover <br /> <span className="italic font-['Georgia,serif']">your next investment?</span>
          </h2>
          <p className={styles.ctaSub}>
            Browse startup profiles and connect with founders building
            innovative solutions.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/startups" className={styles.ctaBtnPrimary}>Browse Startups</Link>
            <Link
              href="https://calendly.com/raisetalks/demo"
              className={styles.ctaBtnSecondary}
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>

      <div className={`${styles.processSpacer} w-full bg-[#0C1B31] border-t border-t-[#1E437B]`}></div>
    </Layout>
  );
}
