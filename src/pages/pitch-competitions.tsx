import React, { useEffect, useRef, useState } from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import GridSeam from '@site/src/components/GridSeam';
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
  <svg width="36" height="39" viewBox="0 0 36 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.9167 35.45C15.9167 35.9274 15.7235 36.3852 15.3797 36.7228C15.0359 37.0604 14.5696 37.25 14.0833 37.25H3.08333C2.5971 37.25 2.13079 37.0604 1.78697 36.7228C1.44315 36.3852 1.25 35.9274 1.25 35.45V21.05C1.25 20.5726 1.44315 20.1148 1.78697 19.7772C2.13079 19.4396 2.5971 19.25 3.08333 19.25M25.0833 26.45C25.0833 26.9274 24.8902 27.3852 24.5464 27.7228C24.2025 28.0604 23.7362 28.25 23.25 28.25H12.25C11.7638 28.25 11.2975 28.0604 10.9536 27.7228C10.6098 27.3852 10.4167 26.9274 10.4167 26.45V12.05C10.4167 11.5726 10.6098 11.1148 10.9536 10.7772C11.2975 10.4396 11.7638 10.25 12.25 10.25M34.25 8.45C34.2498 7.4953 33.8633 6.57977 33.1757 5.9048L29.509 2.3048C28.8215 1.62962 27.889 1.2502 26.9167 1.25H21.4167C20.9304 1.25 20.4641 1.43964 20.1203 1.77721C19.7765 2.11477 19.5833 2.57261 19.5833 3.05V17.45C19.5833 17.9274 19.7765 18.3852 20.1203 18.7228C20.4641 19.0604 20.9304 19.25 21.4167 19.25H32.4167C32.9029 19.25 33.3692 19.0604 33.713 18.7228C34.0568 18.3852 34.25 17.9274 34.25 17.45V8.45Z" stroke="#0077FF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);
const IconTarget = () => (
  <svg width="36" height="39" viewBox="0 0 36 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30.9468 1.25431V8.45259M34.2461 4.85345H27.6476M16.1284 2.71916C16.1991 2.30634 16.3999 1.93349 16.6961 1.66518C16.9922 1.39687 17.365 1.25 17.75 1.25C18.135 1.25 18.5078 1.39687 18.8039 1.66518C19.1001 1.93349 19.3009 2.30634 19.3716 2.71916L21.1053 12.7212C21.2284 13.4323 21.5452 14.0863 22.0143 14.5981C22.4834 15.1098 23.0829 15.4553 23.7348 15.5897L32.9033 17.481C33.2817 17.5581 33.6235 17.7772 33.8694 18.1003C34.1154 18.4233 34.25 18.83 34.25 19.25C34.25 19.67 34.1154 20.0767 33.8694 20.3998C33.6235 20.7228 33.2817 20.9419 32.9033 21.019L23.7348 22.9103C23.0829 23.0447 22.4834 23.3902 22.0143 23.9019C21.5452 24.4137 21.2284 25.0677 21.1053 25.7788L19.3716 35.7808C19.3009 36.1937 19.1001 36.5665 18.8039 36.8348C18.5078 37.1031 18.135 37.25 17.75 37.25C17.365 37.25 16.9922 37.1031 16.6961 36.8348C16.3999 36.5665 16.1991 36.1937 16.1284 35.7808L14.3947 25.7788C14.2716 25.0677 13.9548 24.4137 13.4857 23.9019C13.0167 23.3902 12.4171 23.0447 11.7652 22.9103L2.59673 21.019C2.21831 20.9419 1.87654 20.7228 1.63059 20.3998C1.38463 20.0767 1.25 19.67 1.25 19.25C1.25 18.83 1.38463 18.4233 1.63059 18.1003C1.87654 17.7772 2.21831 17.5581 2.59673 17.481L11.7652 15.5897C12.4171 15.4553 13.0167 15.1098 13.4857 14.5981C13.9548 14.0863 14.2716 13.4323 14.3947 12.7212L16.1284 2.71916ZM7.85237 33.6466C7.85237 35.6343 6.37526 37.2457 4.55316 37.2457C2.73106 37.2457 1.25395 35.6343 1.25395 33.6466C1.25395 31.6588 2.73106 30.0474 4.55316 30.0474C6.37526 30.0474 7.85237 31.6588 7.85237 33.6466Z" stroke="#0077FF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);
const IconUsers = () => (
 <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.25 17.25V25.25C9.25 26.3109 9.67143 27.3283 10.4216 28.0784C11.1717 28.8286 12.1891 29.25 13.25 29.25H21.25M5.25 1.25H13.25C15.4591 1.25 17.25 3.04086 17.25 5.25V13.25C17.25 15.4591 15.4591 17.25 13.25 17.25H5.25C3.04086 17.25 1.25 15.4591 1.25 13.25V5.25C1.25 3.04086 3.04086 1.25 5.25 1.25ZM25.25 21.25H33.25C35.4591 21.25 37.25 23.0409 37.25 25.25V33.25C37.25 35.4591 35.4591 37.25 33.25 37.25H25.25C23.0409 37.25 21.25 35.4591 21.25 33.25V25.25C21.25 23.0409 23.0409 21.25 25.25 21.25Z" stroke="#0077FF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);
const IconTrendingUp = () => (
  <svg width="33" height="39" viewBox="0 0 33 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.625 19.2478L14.375 22.8472L21.875 15.6484M31.25 21.0475C31.25 30.046 24.6875 34.5452 16.8875 37.1548C16.4791 37.2876 16.0354 37.2813 15.6313 37.1368C7.8125 34.5452 1.25 30.046 1.25 21.0475V8.4496C1.25 7.97229 1.44754 7.51453 1.79918 7.17702C2.15081 6.83952 2.62772 6.64991 3.125 6.64991C6.875 6.64991 11.5625 4.49027 14.825 1.75472C15.2222 1.42898 15.7275 1.25 16.25 1.25C16.7725 1.25 17.2778 1.42898 17.675 1.75472C20.9563 4.50826 25.625 6.64991 29.375 6.64991C29.8723 6.64991 30.3492 6.83952 30.7008 7.17702C31.0525 7.51453 31.25 7.97229 31.25 8.4496V21.0475Z" stroke="#0077FF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
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
        <div className={styles.container}>
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
      <GridSeam innerClassName="w-full mx-auto h-full sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px]" />

      {/* ================================================================
          BENEFITS
      ================================================================ */}
      <section
        ref={benefitsSec.ref as React.RefObject<HTMLElement>}
        className={`${styles.sectionGray} ${styles.animSection} ${benefitsSec.visible ? styles.visible : ''}`}
        aria-labelledby="benefits-heading"
      >
        <div className="flex w-full mx-auto gap-[48px] px-16 py-12 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px]">
          <h2 id="benefits-heading" className={`${styles.sectionH2} flex-1`}>
            Why Join Our <br />
            <span className={styles.heroAccent}>Pitch Competitions</span>
          </h2>
          <div className="grid grid-cols-2 flex-2 gap-px bg-[var(--ifm-color-emphasis-200)]">
            {benefitItems.map((item) => (
              <div key={item.title} className="flex gap-5 bg-[#f6f7f9] p-6">
                <div className={styles.iconWrap}><item.Icon /></div>
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
<div className={`${styles.processSpacer} h-[64px] w-full bg-[#0077FF] border-b border-b-[#258BFF]`}></div>
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

      <div className={`${styles.processSpacer} h-[64px] w-full bg-[#0077FF] border-t border-t-[#258BFF]`}></div>

      <div className={styles.pageRegion}>
      {/* ================================================================
          WHAT YOU GET
      ================================================================ */}
      <section
        ref={featuresSec.ref as React.RefObject<HTMLElement>}
        className={`${styles.sectionGray} ${styles.animSection} ${featuresSec.visible ? styles.visible : ''}`}
        aria-labelledby="features-heading"
      >
        <div className={styles.container}>
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

      <div className={`${styles.processSpacer} h-[64px] w-full bg-[#0C1B31] border-b border-b-[#1E437B]`}></div>

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

      <div className={`${styles.processSpacer} h-[64px] w-full bg-[#0C1B31] border-t border-t-[#1E437B]`}></div>
    </Layout>
  );
}
