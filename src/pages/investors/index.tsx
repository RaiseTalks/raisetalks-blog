import React, { useEffect, useRef, useState } from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import ReadinessGauge from './_components/ReadinessGauge';
import styles from './index.module.css';

// ---------------------------------------------------------------------------
// Scroll-in animation hook (same pattern as startups.tsx)
// ---------------------------------------------------------------------------
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ---------------------------------------------------------------------------
// Stat counter hook
// ---------------------------------------------------------------------------
function useCounter(target: number, active: boolean, duration = 1400) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setCount(target); return; }
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return count;
}

// ---------------------------------------------------------------------------
// SVG Icons
// ---------------------------------------------------------------------------
const IconFileSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
    <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
    <circle cx="11.5" cy="14.5" r="2.5"/>
    <path d="M13.25 16.25 15 18"/>
  </svg>
);
const IconSparkles = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/>
    <path d="M5 3v4M19 17v4M3 5h4M17 19h4"/>
  </svg>
);
const IconCheckCircle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);
const IconInbox = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
  </svg>
);
const IconScore = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconFolder = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>
  </svg>
);
const IconMemo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
    <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
    <path d="M8 13h8M8 17h5"/>
  </svg>
);
const IconDealflow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    <polyline points="16 7 22 7 22 13"/>
  </svg>
);
const IconQuote = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
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
const IconCpu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2"/>
    <rect x="9" y="9" width="6" height="6"/>
    <path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2"/>
  </svg>
);
const IconGlobe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    <path d="M2 12h20"/>
  </svg>
);
const IconTrendingUp = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);
const IconTarget = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconMessageSquare = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const IconScales = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
    <path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
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
const IconBriefcase = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="7" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <line x1="12" x2="12" y1="12" y2="12"/>
    <path d="M2 12h9"/>
    <path d="M13 12h9"/>
  </svg>
);
const IconServer = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="8" x="2" y="2" rx="2"/>
    <rect width="20" height="8" x="2" y="14" rx="2"/>
    <path d="M6 6h.01M6 18h.01"/>
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

// ---------------------------------------------------------------------------
// Process steps
// ---------------------------------------------------------------------------
const processSteps = [
  { num: '01', label: 'Founder applies', icon: IconFileSearch },
  { num: '02', label: 'AI scores readiness', icon: IconSparkles },
  { num: '03', label: 'Gaps are filled', icon: IconCheckCircle },
  { num: '04', label: 'You see vetted dealflow', icon: IconInbox },
];

// ---------------------------------------------------------------------------
// Outcome cards
// ---------------------------------------------------------------------------
const outcomes = [
  {
    icon: IconScore,
    outcome: 'Know the quality of an opportunity before you open the deck.',
    label: 'AI Readiness Score',
  },
  {
    icon: IconFolder,
    outcome: 'Every founder file is exactly where you expect it - every time.',
    label: 'Standardised Data Room',
  },
  {
    icon: IconMemo,
    outcome: 'Draft your investment memo in minutes, not hours.',
    label: 'IC Memo Generator',
  },
  {
    icon: IconDealflow,
    outcome: 'See vetted founders before they hit AngelList or your inbox.',
    label: 'Early Dealflow Access',
  },
];

// ---------------------------------------------------------------------------
// Stat strip item
// ---------------------------------------------------------------------------
function StatItem({ display, label, active }: { display: string; label: string; active: boolean }) {
  const isNumeric = /^\d+$/.test(display);
  const numericTarget = isNumeric ? parseInt(display, 10) : 0;
  const count = useCounter(numericTarget, active && isNumeric);

  return (
    <div className={styles.statItem}>
      <span className={styles.statNum}>
        {isNumeric ? count.toLocaleString() : display}
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
const sliderTabs = [
  { num: '01', label: 'Pre-Score Engine' },
  { num: '02', label: 'Scoring & Committee Workspace' },
  { num: '03', label: 'Due Diligence & IC Pack' },
];

export default function InvestorsPage() {
  const hero = useInView(0.05);
  const problem = useInView(0.1);
  const solution = useInView(0.1);
  const who = useInView(0.2);
  const outcomes_ = useInView(0.08);
  const proof = useInView(0.2);
  const cta = useInView(0.1);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <Layout
      title="For Investors - RaiseTalks"
      description="RaiseTalks delivers vetted dealflow, faster diligence, and IC-ready memos - before the round hits the market. Join the 60-day Investor Edition Pilot."
    >
      <Head>
        <meta name="description" content="RaiseTalks delivers vetted dealflow, faster diligence, and IC-ready memos - before the round hits the market. Join the 60-day Investor Edition Pilot." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://raisetalks.ai/investors" />

        <meta property="og:title" content="For Investors - RaiseTalks" />
        <meta property="og:description" content="RaiseTalks delivers vetted dealflow, faster diligence, and IC-ready memos - before the round hits the market." />
        <meta property="og:url" content="https://raisetalks.ai/investors" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="RaiseTalks" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="For Investors - RaiseTalks" />
        <meta name="twitter:description" content="RaiseTalks delivers vetted dealflow, faster diligence, and IC-ready memos - before the round hits the market." />
        <meta name="twitter:site" content="@raisetalks" />

        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "For Investors - RaiseTalks",
          "description": "RaiseTalks delivers vetted dealflow, faster diligence, and IC-ready memos - before the round hits the market.",
          "url": "https://raisetalks.ai/investors",
          "publisher": {
            "@type": "Organization",
            "name": "RaiseTalks",
            "url": "https://raisetalks.ai"
          }
        })}</script>
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
          <div className={styles.heroEyebrow}>For Investors</div>

          <h1 id="hero-heading" className={styles.heroH1}>
            10,000 decks in.{' '}
            <span className={styles.heroAccent}>
              Few worth a meeting.
            </span>
          </h1>

          <p className={styles.heroDesc}>
            RaiseTalks delivers vetted dealflow, faster diligence, and IC-ready
            memos - before the round hits the market.
          </p>

          <div className={styles.heroActions}>
            {/* TODO(raisetalks): Replace with real Calendly URL */}
            <a
              href="https://calendly.com/raisetalks/demo"
              className={styles.btnPrimary}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Demo
            </a>
            <a
              href="mailto:hq@raisetalks.ai?subject=Early%20Access%20-%20Investor"
              className={styles.btnSecondary}
            >
              Request Early Access
            </a>
          </div>
        </div>

      </section>

      {/* ================================================================
          PROBLEM
      ================================================================ */}
      <section
        ref={problem.ref as React.RefObject<HTMLElement>}
        className={`${styles.sectionLight} ${styles.problemSection} ${styles.animSection} ${problem.visible ? styles.visible : ''}`}
        aria-labelledby="problem-heading"
      >
        <div className={styles.container}>
          <p className={styles.eyebrow}>THE PROBLEM</p>
          <h2 id="problem-heading" className={styles.sectionH2}>
            Investors Face <span className={styles.heroAccent}>The Same Frustration Patterns</span>
          </h2>
          <p className={styles.sectionBody}>
            Founders send unstructured decks with missing financials, turning
            first meetings into discovery calls instead of diligence. IC memos
            take hours to assemble from scattered files, strong founders outside
            the usual hubs never surface, and the companies you passed on six
            months ago quietly close their next round without you.
          </p>

          {/* Before / After */}
          <div className={styles.beforeAfter}>
            <div className={`${styles.baPanel} ${styles.baPanelBefore}`}>
              <p className={styles.baPanelLabel}>Without RaiseTalks</p>
              <ul className={styles.baList}>
                {[
                  'pitch-deck-v7-FINAL.pdf',
                  'financials (ask again).xlsx',
                  'team - see LinkedIn',
                  'cap table TBD',
                  'data room (Dropbox link, expired)',
                  'traction "strong MoM growth"',
                ].map((f) => (
                  <li key={f} className={styles.baFileBad}>
                    <span className={styles.baFileDot} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* "With RaiseTalks" panel — gauge anchors to this */}
            <div className={styles.baPanelAfterWrap}>
              <div className={`${styles.baPanel} ${styles.baPanelAfter}`}>
                <p className={styles.baPanelLabel}>With RaiseTalks</p>
                <ul className={styles.baList}>
                  {[
                    'Pitch Deck',
                    'Financial Model (3-year)',
                    'Team Bios + References',
                    'Cap Table (live)',
                    'Data Room (structured)',
                    'AI Advisor Diligence',
                  ].map((f) => (
                    <li key={f} className={styles.baFileGood}>
                      <svg className={styles.baCheck} viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2 6l3 3 5-5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gauge — floats off the right edge of this panel */}
              <div className={styles.problemGaugeWrap} aria-hidden="true">
                <ReadinessGauge />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SOLUTION
      ================================================================ */}
      <section
        ref={solution.ref as React.RefObject<HTMLElement>}
        className={`${styles.sectionGray} ${styles.animSection} ${solution.visible ? styles.visible : ''}`}
        aria-labelledby="solution-heading"
      >
        <div className={styles.container}>
          <p className={styles.eyebrow}>THE SOLUTION</p>
          <h2 id="solution-heading" className={styles.solutionHeading}>
            What You Get <span className={styles.heroAccent}>with RaiseTalks</span>
          </h2>

          {/* Featured card */}
          <div className={styles.solutionFeatured}>
            <h3 className={styles.solutionCardTitle}>AI Readiness Scoring</h3>
            <p className={styles.solutionCardBody}>
              Every startup on RaiseTalks is scored across 22 dimensions, including team strength,
              product and technology, market attractiveness, traction, financial quality, data room
              readiness, diligence completeness, narrative clarity, risk profile, and investor fit.
            </p>
          </div>

          {/* 4-column grid */}
          <div className={styles.solutionGrid}>
            {[
              {
                title: 'Structured Data Rooms - Single Standard',
                body: 'Compare 10 companies side-by-side in 20 minutes. Every founder on RaiseTalks has organised their data room to VC standards.',
              },
              {
                title: 'IC Prep in 30 Minutes, Not 4 Hours',
                body: 'Select any company & one-click IC summary: snapshot, score breakdown, key risks flagged by AI, comparable benchmarks.',
              },
              {
                title: 'Curated Weekly Shortlist',
                body: 'Set your thesis and receive a curated weekly digest of 5-10 founders who match - pre-screened and ready to talk.',
              },
              {
                title: 'Zero Success Fees',
                body: 'Flat annual subscription. We never take carry. Your deal economics stay clean.',
              },
            ].map((card) => (
              <div key={card.title} className={styles.solutionCard}>
                <h3 className={styles.solutionCardTitle}>{card.title}</h3>
                <p className={styles.solutionCardBody}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          WHO IT'S FOR
      ================================================================ */}
      <section
        ref={who.ref as React.RefObject<HTMLElement>}
        className={`${styles.sectionLight} ${styles.sectionCentered} ${styles.animSection} ${who.visible ? styles.visible : ''}`}
        aria-labelledby="who-heading"
      >
        <div className={styles.container}>
          <p className={styles.whoSmall}>Built for</p>
          <h2 id="who-heading" className={styles.whoLarge}>
            Angels, micro funds, institutional VCs and accelerators who want to
            spend less time on intake and more time on conviction.
          </h2>
        </div>
      </section>

      {/* ================================================================
          SLIDER
      ================================================================ */}
      <section
        ref={outcomes_.ref as React.RefObject<HTMLElement>}
        className={`${styles.sectionGray} ${styles.animSection} ${outcomes_.visible ? styles.visible : ''}`}
        aria-labelledby="slider-heading"
      >
        <div className={styles.container}>
          <h2 id="slider-heading" className={styles.srOnly}>Platform capabilities</h2>

          {/* Tab bar */}
          <div className={styles.sliderTabsWrap}>
            <div className={styles.sliderTabs} role="tablist">
              {sliderTabs.map((tab, i) => (
                <button
                  key={tab.num}
                  role="tab"
                  aria-selected={activeSlide === i}
                  className={`${styles.sliderTab} ${activeSlide === i ? styles.sliderTabActive : ''}`}
                  onClick={() => setActiveSlide(i)}
                >
                  <span className={styles.sliderTabNum}>{tab.num}</span>
                  <span className={styles.sliderTabLabel}>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Slide content */}
          <div className={styles.sliderBody} key={activeSlide}>

            {/* ── Slide 0: Pre-Score Engine ── */}
            {activeSlide === 0 && (
              <div className={styles.slide}>
                <div className={styles.slideHeader}>
                  <span className={styles.slidePill}>Live Queue</span>
                  <h3 className={styles.slideH2}>Pre-Score Engine</h3>
                  <p className={styles.slideHeaderSub}>Quickly screen incoming deal flow with structured, evidence-based scoring</p>
                </div>

                <div className={styles.featureGrid4}>
                  {[
                    { Icon: IconUsers, title: 'Team', desc: 'Experience, expertise & execution capability' },
                    { Icon: IconCpu, title: 'Product-Tech', desc: 'Technology differentiation & moat' },
                    { Icon: IconGlobe, title: 'Market', desc: 'Size, timing & competitive dynamics' },
                    { Icon: IconTrendingUp, title: 'Deal', desc: 'Terms, traction & investment thesis fit' },
                  ].map((item) => (
                    <div key={item.title} className={styles.featureCard}>
                      <div className={styles.featureCardIcon}><item.Icon /></div>
                      <h4 className={styles.featureCardTitle}>{item.title}</h4>
                      <p className={styles.featureCardDesc}>{item.desc}</p>
                      <div className={styles.skeletonBars}>
                        {[1,2,3,4,5].map((i) => (
                          <span key={i} className={styles.skeletonBar} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.outputCard}>
                  <div className={styles.outputCardLeft}>
                    <div className={styles.outputCardIcon}><IconMemo /></div>
                    <div>
                      <p className={styles.outputCardTitle}>Pre-Scoring Card</p>
                      <p className={styles.outputCardSub}>Shareable link + PDF export for each evaluation</p>
                    </div>
                  </div>
                  <div className={styles.outputCardTags}>
                    {['Screen faster', 'Higher-quality inbound', 'Cohort-ready'].map((t) => (
                      <span key={t} className={styles.slideTag}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Slide 1: Scoring & Committee Workspace ── */}
            {activeSlide === 1 && (
              <div className={styles.slide}>
                <div className={styles.slideHeader}>
                  <span className={styles.slidePill}>Next in Action</span>
                  <h3 className={styles.slideH2}>Scoring &amp; Committee Workspace</h3>
                  <p className={styles.slideHeaderSub}>Collaborative scoring with variance detection and structured decision-making</p>
                </div>

                <div className={styles.featureGrid2x2}>
                  {[
                    { Icon: IconTarget, title: 'Thesis Templates', desc: 'Customizable scoring criteria aligned to fund strategy' },
                    { Icon: IconUsers, title: 'Multi-Reviewer', desc: 'Parallel scoring with automatic variance detection' },
                    { Icon: IconMessageSquare, title: 'Discussion Thread', desc: 'Structured debate and alignment on key questions' },
                    { Icon: IconCheckCircle, title: 'Decision Controls', desc: 'Clear pass/fail/hold workflow with audit trail' },
                  ].map((f) => (
                    <div key={f.title} className={styles.featureRow2Card}>
                      <div className={styles.featureRowIcon}><f.Icon /></div>
                      <div>
                        <p className={styles.featureRowTitle}>{f.title}</p>
                        <p className={styles.featureRowDesc}>{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.outputCard}>
                  <div className={styles.outputCardLeft}>
                    <div className={styles.outputCardIcon}><IconMemo /></div>
                    <div>
                      <p className={styles.outputCardTitle}>Short Memo</p>
                      <p className={styles.outputCardSub}>IC-lite format for faster committee reviews</p>
                    </div>
                  </div>
                  <div className={styles.outputCardTags}>
                    {['Better decisions, less bias', 'Faster IC prep', 'Repeatable process'].map((t) => (
                      <span key={t} className={styles.slideTag}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Slide 2: Due Diligence & IC Pack ── */}
            {activeSlide === 2 && (
              <div className={styles.slide}>
                <div className={styles.slideHeader}>
                  <span className={styles.slidePill}>Live Direction</span>
                  <h3 className={styles.slideH2}>Due Diligence &amp; IC Pack</h3>
                  <p className={styles.slideHeaderSub}>Comprehensive DD tracking with full audit trail and IC-ready exports</p>
                </div>

                <div className={styles.featureGrid4}>
                  {[
                    { Icon: IconScales, label: 'Legal', items: ['Cap table', 'IP ownership', 'Contracts'] },
                    { Icon: IconBarChart, label: 'Financial', items: ['Audited statements', 'Projections', 'Unit economics'] },
                    { Icon: IconBriefcase, label: 'Commercial', items: ['Customer refs', 'Pipeline', 'Partnerships'] },
                    { Icon: IconServer, label: 'Tech', items: ['Architecture', 'Security audit', 'Scalability'] },
                  ].map((cat) => (
                    <div key={cat.label} className={styles.ddCatCard}>
                      <div className={styles.ddCatHeader}>
                        <div className={styles.featureCardIcon}><cat.Icon /></div>
                        <span className={styles.ddCatName}>{cat.label}</span>
                      </div>
                      <ul className={styles.ddCheckList}>
                        {cat.items.map((it) => (
                          <li key={it} className={styles.ddCheckItem}>
                            <svg className={styles.ddCheckMark} viewBox="0 0 14 14" fill="none" aria-hidden="true">
                              <path d="M2.5 7l3.5 3.5 5.5-6" stroke="#0174e1" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className={styles.verStatesCard}>
                  <p className={styles.verStatesLabel}>Verification States</p>
                  <div className={styles.verificationItems}>
                    {[
                      { label: 'Missing', color: '#d4d4d8' },
                      { label: 'Provided', color: 'rgba(1,116,225,0.4)' },
                      { label: 'Verified', color: '#0174e1' },
                    ].map((s) => (
                      <span key={s.label} className={styles.verificationItem}>
                        <span className={styles.verificationDot} style={{ background: s.color }} />
                        {s.label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.featureRow3}>
                  {[
                    { Icon: IconMessageSquare, label: 'Q&A Log' },
                    { Icon: IconMemo, label: 'Document Requests' },
                    { Icon: IconShield, label: 'Audit Trail' },
                  ].map((f) => (
                    <div key={f.label} className={styles.featureRow3Item}>
                      <div className={styles.featureRowIcon}><f.Icon /></div>
                      <span className={styles.featureRow3Label}>{f.label}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.outputCard}>
                  <div className={styles.outputCardLeft}>
                    <div className={styles.outputCardIcon}><IconMemo /></div>
                    <div>
                      <p className={styles.outputCardTitle}>Investment Memo + IC Pack</p>
                      <p className={styles.outputCardSub}>Complete package ready for Investment Committee</p>
                    </div>
                  </div>
                  <div className={styles.outputCardTags}>
                    {['De-risk decisions', 'Close faster', 'LP-grade professionalism'].map((t) => (
                      <span key={t} className={styles.slideTag}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ================================================================
          PROOF
      ================================================================ */}
      <section
        ref={proof.ref as React.RefObject<HTMLElement>}
        className={`${styles.sectionLight} ${styles.animSection} ${proof.visible ? styles.visible : ''}`}
        aria-labelledby="proof-heading"
      >
        <div className={styles.container}>
          <h2 id="proof-heading" className={styles.srOnly}>
            Proof
          </h2>

          {/* Stat strip */}
          <div className={styles.statStrip}>
            <StatItem display="400000" label="Founder activity impressions reviewed" active={proof.visible} />
            <div className={styles.statDivider} aria-hidden="true" />
            <StatItem display="49" label="Countries" active={proof.visible} />
            <div className={styles.statDivider} aria-hidden="true" />
            <StatItem display="< 3 min" label="Average IC memo draft time" active={proof.visible} />
          </div>

          {/* Quote */}
          <figure className={styles.quoteBlock}>
            <IconQuote aria-hidden="true" />
            <blockquote className={styles.quoteText}>
              "We reviewed 400K+ impressions of founder activity across 49
              countries. The signal is there - RaiseTalks surfaces it."
            </blockquote>
            <figcaption className={styles.quoteAttr}>
              Dariia Vasylieva, Founder
            </figcaption>
          </figure>

          {/* TODO(raisetalks): Swap honest-absence note for real investor testimonial when available */}
          <p className={styles.honestyNote}>
            Investor testimonials coming soon. We'd rather show you the product
            than fake the proof.
          </p>
        </div>
      </section>

      {/* ================================================================
          CLOSING CTA
      ================================================================ */}
      <section
        ref={cta.ref as React.RefObject<HTMLElement>}
        className={`${styles.ctaSection} ${styles.animSection} ${cta.visible ? styles.visible : ''}`}
        aria-labelledby="cta-heading"
      >
        <div className={styles.ctaGlow} aria-hidden="true" />
        <div className={styles.container}>
          <h2 id="cta-heading" className={styles.ctaH2}>
            Join 60 days Investor Edition Pilot
          </h2>
          <p className={styles.ctaSub}>
            Book a 20-minute demo. We'll show you three vetted deals before you
            close the tab.
          </p>
          <div className={styles.ctaButtons}>
            {/* TODO(raisetalks): Replace with real Calendly URL */}
            <a
              href="https://calendly.com/raisetalks/demo"
              className={styles.ctaBtnPrimary}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Demo
            </a>
            <a
              href="mailto:hq@raisetalks.ai?subject=Early%20Access%20-%20Investor"
              className={styles.ctaBtnGhost}
            >
              Request Early Access
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
