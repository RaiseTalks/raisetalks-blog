import React, { useEffect, useRef, useState } from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import InvestorMcpAccess from '@site/src/components/InvestorMcpAccess';
import InvestmentMemoPreview from './InvestmentMemoPreview';
import LucideIcon from '@site/src/components/LucideIcon';
import styles from './index.module.css';

// ---------------------------------------------------------------------------
// Scroll-in animation hook (same pattern as about-us.tsx / startups.tsx)
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
    let cancelled = false;
    let rafId = 0;
    const start = performance.now();
    const tick = (now: number) => {
      if (cancelled) return;
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [active, target, duration]);
  return count;
}

// ---------------------------------------------------------------------------
// SVG Icons — thin line, currentColor
// ---------------------------------------------------------------------------
const IconQuote = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
  </svg>
);

// ---------------------------------------------------------------------------
// Reusable check list
// ---------------------------------------------------------------------------
const CheckList = ({ items }: { items: string[] }) => (
  <ul className={styles.checkList}>
    {items.map((it) => (
      <li key={it} className={styles.checkItem}>
        <svg className={styles.checkMark} viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2.5 7.5l3 3 6-7" stroke="#16a34a" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const preScoreFeatures = [
  { title: 'Team', desc: 'Experience, expertise & execution capability' },
  { title: 'Product-Tech', desc: 'Technology differentiation & moat' },
  { title: 'Market', desc: 'Size, timing & competitive dynamics' },
  { title: 'Deal', desc: 'Terms, traction & investment thesis fit' },
];

const committeeCards = [
  { icon: 'columns-3-cog', title: 'Thesis Templates', desc: 'Customizable scoring criteria aligned to fund strategy' },
  { icon: 'git-compare', title: 'Multi-Reviewer', desc: 'Parallel scoring with automatic variance detection' },
  { icon: 'messages-square', title: 'Discussion Thread', desc: 'Structured debate and alignment on key questions' },
  { icon: 'toggle-right', title: 'Decision Controls', desc: 'Clear pass/fail/hold workflow with audit trail' },
];

const ddCategories = [
  { icon: 'gavel', label: 'Legal', items: ['Cap table', 'IP ownership', 'Contracts'] },
  { icon: 'dollar-sign', label: 'Commercial', items: ['Customer refs', 'Pipeline', 'Partnerships'] },
  { icon: 'landmark', label: 'Financial', items: ['Audited statements', 'Projections', 'Unit economics'] },
  { icon: 'database-check', label: 'Tech', items: ['Architecture', 'Security audit', 'Scalability'] },
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
      <span className={styles.statNum}>{isNumeric ? count.toLocaleString() : display}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function InvestorsPage() {
  const hero = useInView(0.05);
  const band = useInView(0.2);
  const problem = useInView(0.08);
  const solution = useInView(0.06);
  const prescore = useInView(0.06);
  const committee = useInView(0.06);
  const dd = useInView(0.06);
  const proof = useInView(0.15);
  const cta = useInView(0.1);

  const heroBg = useBaseUrl('/img/backgrounds/hero-alt-desktop.webp');
  const heroBgTablet = useBaseUrl('/img/backgrounds/hero-alt-tablet.webp');
  const heroBgMobile = useBaseUrl('/img/backgrounds/hero-alt-mobile.webp');
  const bandBg = useBaseUrl('/img/backgrounds/blue-section-desktop.webp');
  const frustrationDesktop = useBaseUrl('/img/investors/frustration-bg-desktop.webp');
  const frustrationTablet = useBaseUrl('/img/investors/frustration-bg-tablet.webp');
  const frustrationMobile = useBaseUrl('/img/investors/frustration-bg-mobile.webp');
  const avatar = useBaseUrl('/img/investors/avatar-dariia.webp');
  const swirlBg = useBaseUrl('/img/investors/swirl.png');

  const [openPrescoreItem, setOpenPrescoreItem] = useState(0);

  const DEMO_URL = 'https://calendly.com/raisetalks/demo';
  const ACCESS_URL = 'mailto:hq@raisetalks.ai?subject=Early%20Access%20-%20Investor';

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
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'For Investors - RaiseTalks',
          description: 'RaiseTalks delivers vetted dealflow, faster diligence, and IC-ready memos - before the round hits the market.',
          url: 'https://raisetalks.ai/investors',
          publisher: { '@type': 'Organization', name: 'RaiseTalks', url: 'https://raisetalks.ai' },
        })}</script>
      </Head>

      <div className={styles.regionNarrow}>
      {/* ================= HERO ================= */}
      <section
        ref={hero.ref as React.RefObject<HTMLElement>}
        className={`${styles.hero} ${hero.visible ? styles.visible : ''}`}
        aria-labelledby="hero-heading"
      >
        <picture>
          <source media="(max-width: 768px)" srcSet={heroBgMobile} />
          <source media="(max-width: 1024px)" srcSet={heroBgTablet} />
          <img src={heroBg} alt="" aria-hidden="true" className={styles.heroBg} />
        </picture>
        {/* Bottom rail-bound border dropped — the proof section directly
            below supplies its own full-width divider (.spacerRow). */}
        <div className={`${styles.container} ${styles.narrow} ${styles.containerNoBottomBorder}`}>
          <div className={styles.heroInner}>
            <h1 id="hero-heading" className={styles.heroH1}>
              10,000 decks in.
              <br />
              <span className={styles.accent}>Most aren&apos;t ready</span>
            </h1>
            <p className={styles.heroDesc}>
              RaiseTalks delivers vetted dealflow, faster diligence, and IC-ready
              memos - before the round hits the market.
            </p>
            <div className={styles.heroActions}>
              <a href={DEMO_URL} className={styles.btnPrimary} target="_blank" rel="noopener noreferrer">
                Book a Demo
              </a>
              <a href={ACCESS_URL} className={styles.btnSecondary}>
                Request Early Access
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROOF / TESTIMONIAL ================= */}
      <section
        ref={proof.ref as React.RefObject<HTMLElement>}
        className={`${styles.proofSection} ${styles.animSection} ${proof.visible ? styles.visible : ''}`}
        aria-labelledby="proof-heading"
      >
        <img src={swirlBg} alt="" aria-hidden="true" className={styles.proofBg} />
        <h2 id="proof-heading" className={styles.srOnly}>Proof</h2>

        {/* Empty spacer row above the content (single line, not doubled) */}
        <div className={styles.spacerRow} />

        <div className={styles.proofContent}>
          <figure className={styles.quoteBlock}>
            <div className={styles.avatarWrap}>
              <img src={avatar} alt="Dariia Vasylieva, Founder of RaiseTalks" className={styles.avatar} loading="lazy" />
            </div>
            <IconQuote />
            <blockquote className={styles.quoteText}>
              &quot;We reviewed 1M impressions of founder activity across 63
              countries. The signal is there - RaiseTalks surfaces it.&quot;
            </blockquote>
            <figcaption className={styles.quoteAttr}>
              <span className={styles.quoteName}>Dariia Vasylieva</span>
              <span className={styles.quoteRole}>Founder</span>
            </figcaption>
          </figure>

          <div className={styles.statStrip}>
            <StatItem display="400000" label="Founder activity impressions reviewed" active={proof.visible} />
            <div className={styles.statDivider} aria-hidden="true" />
            <StatItem display="49" label="Countries" active={proof.visible} />
            <div className={styles.statDivider} aria-hidden="true" />
            <StatItem display="< 1 min" label="Average IC memo draft time" active={proof.visible} />
          </div>
        </div>

        {/* Empty spacer row below the content (single line, not doubled) */}
        <div className={styles.spacerRow} />
      </section>


   

      </div>

      <div className={styles.regionWide}>
      {/* ================= FRUSTRATION PATTERNS ================= */}
      <section
        ref={problem.ref as React.RefObject<HTMLElement>}
        className={`${styles.problemSection} ${styles.animSection} ${problem.visible ? styles.visible : ''}`}
        aria-labelledby="problem-heading"
      >
        {/* Top rail-bound border dropped — the proof section directly
            above supplies its own full-width divider (.spacerRow). */}
        <div className={`${styles.container} ${styles.containerNoTopBorder}`}>
          <div className={styles.problemHead}>
            <h2 id="problem-heading" className={styles.sectionH2}>
              Investors Face the same
              <br />
              <span className={styles.accent}>Frustration Patterns</span>
            </h2>
            <p className={styles.problemBody}>
              Founders send unstructured decks with missing financials, turning
              first meetings into discovery calls instead of diligence. IC memos
              take hours to assemble from scattered files, strong founders outside
              the usual hubs never surface, and the companies you passed on six
              months ago quietly close their next round without you.
            </p>
          </div>

          <div className={styles.mockupRow}>
            <picture>
              <source media="(max-width: 640px)" srcSet={frustrationMobile} />
              <source media="(max-width: 1024px)" srcSet={frustrationTablet} />
              <img
                src={frustrationDesktop}
                alt="Founder sharing scattered files over chat next to a RaiseTalks data room with AI readiness score and IC memo ready in minutes"
                className={styles.mockup}
                loading="lazy"
              />
            </picture>
          </div>
        </div>
      </section>

      {/* ================= WHAT YOU GET ================= */}
      <section
        ref={solution.ref as React.RefObject<HTMLElement>}
        className={`${styles.sectionGray} ${styles.animSection} ${solution.visible ? styles.visible : ''}`}
        aria-labelledby="solution-heading"
      >
        <div className={`${styles.container} ${styles.containerNoBottomBorder}`}>
          <h2 id="solution-heading" className={styles.sectionH2Center}>
            What You Get with <span className={styles.brand}>RaiseTalks</span>
          </h2>

          <div className={styles.getGrid}>
            {/* Column 1 — tall card. Figma inserts a large fixed gap between
                the header and the checklist so this card's total height
                matches the combined height of the two stacked cards in
                columns 2 and 3. */}
            <div className={styles.getCol}>
              <article className={styles.card}>
                <LucideIcon name="list-todo-flat" className={styles.cardIcon} />
                <h3 className={styles.cardTitle}>AI Readiness Scoring</h3>
                <p className={styles.cardBody}>
                  Every startup on RaiseTalks is scored across 22 dimensions,
                  including:
                </p>
                <CheckList
                  items={[
                    'Team Strength', 'Product', 'Technology', 'Market Attractiveness',
                    'Financial Quality', 'Data Room Readiness', 'Diligence completeness',
                    'Narrative clarity', 'Risk profile', 'Investor fit',
                  ]}
                />
                <p className={styles.cardNote}>and many others</p>
              </article>
            </div>

            {/* Column 2 */}
            <div className={styles.getCol}>
              <article className={styles.card}>
                <LucideIcon name="folder-tree-flat" className={styles.cardIcon} />
                <h3 className={styles.cardTitle}>Structured Data Rooms</h3>
                <p className={styles.cardBody}>Single Standard.</p>
                <p className={styles.cardBody}>Compare 10 companies side-by-side in 20 minutes.</p>
                <p className={styles.cardBody}>Every founder on RaiseTalks has organised their data room to VC standards.</p>
              </article>
              <article className={styles.card}>
                <LucideIcon name="list-filter-plus" className={styles.cardIcon} />
                <h3 className={styles.cardTitle}>Curated Weekly Shortlist</h3>
                <p className={styles.cardBody}>Set your thesis and receive a curated weekly digest of 5-10 founders who match.</p>
                <p className={styles.cardBody}>Pre-screened and ready to talk.</p>
              </article>
            </div>

            {/* Column 3 */}
            <div className={styles.getCol}>
              <article className={styles.card}>
                <LucideIcon name="timer" className={styles.cardIcon} />
                <h3 className={styles.cardTitle}>IC Prep in 30 Minutes</h3>
                <p className={styles.cardBody}>It is no longer a 4-hour task.</p>
                <p className={styles.cardBody}>Select any company &amp; one-click IC summary:</p>
                <CheckList items={['Snapshot', 'Score Breakdown', 'Key Risks flagged by AI', 'Comparable benchmarks']} />
              </article>
              <article className={styles.card}>
                <LucideIcon name="tag-x" className={styles.cardIcon} />
                <h3 className={styles.cardTitle}>Zero Success Fees</h3>
                <p className={styles.cardBody}>Flat annual subscription.</p>
                <p className={styles.cardBody}>Your deal economics stay clean.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRE-SCORE ENGINE ================= */}
      <section
        ref={prescore.ref as React.RefObject<HTMLElement>}
        className={`${styles.featureSection} ${styles.animSection} ${prescore.visible ? styles.visible : ''}`}
        aria-labelledby="prescore-heading"
      >
        <div className={`${styles.container} ${styles.containerInsetTopBorder} ${styles.containerWhiteFrame}`}>
          <div className={`${styles.split} ${styles.splitPrescore}`}>
            <div className={styles.splitText}>
              <h2 id="prescore-heading" className={styles.sectionH2}>Pre-Score Engine</h2>
              <p className={styles.sectionSub}>
                Quickly screen incoming deal flow with structured, evidence-based scoring
              </p>

              <div className={styles.miniCard}>
                <p className={styles.miniCardTitle}>Pre-Scoring Card</p>
                <p className={styles.miniCardSub}>Shareable link + PDF export for each evaluation</p>
                <div className={styles.miniCardInner}>
                  <CheckList items={['Screen faster', 'Higher-quality inbound', 'Cohort-ready']} />
                </div>

                <div className={styles.accordion}>
                  {preScoreFeatures.map((f, i) => {
                    const open = openPrescoreItem === i;
                    return (
                      <div key={f.title} className={styles.accordionItem}>
                        <button
                          type="button"
                          className={styles.accordionHeader}
                          aria-expanded={open}
                          onClick={() => setOpenPrescoreItem(open ? -1 : i)}
                        >
                          <span>{f.title}</span>
                          <svg
                            className={`${styles.accordionIcon} ${open ? styles.accordionIconOpen : ''}`}
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path d="M3.33 8h9.34M8 3.33v9.34" stroke="#1a1a1a" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        {open && <p className={styles.accordionDesc}>{f.desc}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className={styles.splitMedia}>
              <InvestmentMemoPreview />
            </div>
          </div>
        </div>
      </section>

      {/* ================= SCORING & COMMITTEE ================= */}
      <section
        ref={committee.ref as React.RefObject<HTMLElement>}
        className={`${styles.sectionGray} ${styles.animSection} ${committee.visible ? styles.visible : ''}`}
        aria-labelledby="committee-heading"
      >
        <div className={`${styles.container} ${styles.containerNoBottomBorder}`}>
          <div className={styles.split}>
            <div className={styles.committeeGrid}>
              {committeeCards.map((c, i) => (
                <article key={c.title} className={`${styles.card} ${i % 2 === 1 ? styles.cardOffset : ''}`}>
                  <LucideIcon name={c.icon} className={styles.cardIcon} />
                  <h3 className={styles.cardTitleSm}>{c.title}</h3>
                  <p className={styles.cardBody}>{c.desc}</p>
                </article>
              ))}
            </div>

            <div className={styles.splitText}>
              <p id="committee-heading" className={styles.sectionH2}>Scoring &amp; Committee Workspace</p>
              <p className={styles.sectionSub}>
                Collaborative scoring with variance detection and structured decision-making
              </p>
              <div className={styles.miniCard}>
                <p className={styles.miniCardTitle}>Short Memo</p>
                <p className={styles.miniCardSub}>IC-lite format for faster committee reviews</p>
                <div className={styles.miniCardInner}>
                  <CheckList items={['Better decisions, less bias', 'Faster IC prep', 'Repeatable process']} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DUE DILIGENCE & IC PACK ================= */}
      <section
        ref={dd.ref as React.RefObject<HTMLElement>}
        className={`${styles.featureSection} ${styles.animSection} ${dd.visible ? styles.visible : ''}`}
        aria-labelledby="dd-heading"
      >
        {/* No bottom rail-bound border here — the audience band section's
            own top border supplies the divider immediately below. */}
        <div className={`${styles.container} ${styles.containerNoBottomBorder} ${styles.containerWhiteFrame}`}>
          <div className={styles.split}>
            <div className={styles.splitText}>
              <h2 id="dd-heading" className={styles.sectionH2}>Due Diligence &amp; IC Pack</h2>
              <p className={styles.sectionSub}>
                Comprehensive DD tracking with full audit trail and IC-ready exports
              </p>
              <div className={styles.pillRow}>
                {['Q&A Log', 'Document Requests', 'Audit Trail'].map((p) => (
                  <span key={p} className={styles.pill}>{p}</span>
                ))}
              </div>
              <div className={styles.miniCard}>
                <p className={styles.miniCardTitle}>Investment Memo + IC Pack</p>
                <p className={styles.miniCardSub}>Complete package ready for Investment Committee</p>
                <div className={styles.miniCardInner}>
                  <CheckList items={['De-risk decisions', 'Close faster', 'LP-grade professionalism']} />
                </div>
              </div>
            </div>

            <div className={styles.ddList}>
              {ddCategories.map((cat) => (
                <div key={cat.label} className={styles.ddRow}>
                  <LucideIcon name={cat.icon} className={styles.ddIcon} />
                  <div className={styles.ddRowText}>
                    <p className={styles.ddRowTitle}>{cat.label}</p>
                    <p className={styles.ddRowItems}>
                      {cat.items.map((it, i) => (
                        <React.Fragment key={it}>
                          {i > 0 && <span className={styles.ddDot} aria-hidden="true">•</span>}
                          {it}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* ================= AUDIENCE BAND =================
          Deliberately outside .regionWide: this row uses its own scoped
          840px rail (.bandSection::before/::after) instead of the wide
          region's ~1480px one — leaving it inside .regionWide drew BOTH
          rails through this row at once. */}
      <section
        ref={band.ref as React.RefObject<HTMLElement>}
        className={`${styles.bandSection} ${styles.animSection} ${band.visible ? styles.visible : ''}`}
      >
        <div className={`${styles.container} ${styles.narrow}`}>
          <div className={styles.band}>
            <img src={bandBg} alt="" aria-hidden="true" className={styles.bandBg} />
            <p className={styles.bandText}>
              RaiseTalks is built for angels, micro funds, institutional VCs and
              accelerators who want to spend less time on intake and more time on
              conviction.
            </p>
          </div>
        </div>
      </section>

      <div className={styles.regionWide}>
      {/* ================= CLOSING CTA ================= */}
      <section
        ref={cta.ref as React.RefObject<HTMLElement>}
        className={`${styles.ctaSection} ${styles.animSection} ${cta.visible ? styles.visible : ''}`}
        aria-labelledby="cta-heading"
      >
        <div className={styles.ctaImageRail} aria-hidden="true" />

        {/* Empty spacer strip above the content — dark bg continues, own closing line */}
        <div className={styles.ctaSpacer} />

        <div className={styles.container}>
          <h2 id="cta-heading" className={styles.ctaH2}>
            Join 60 days
            <br />
            <span className={styles.accent}>Investor Edition Pilot</span>
          </h2>
          <p className={styles.ctaSub}>
            Book a 20-minute demo. We&apos;ll show you three vetted deals before you
            close the tab.
          </p>
          <div className={styles.heroActions}>
            <a href={DEMO_URL} className={styles.ctaBtnPrimary} target="_blank" rel="noopener noreferrer">
              Book a Demo
            </a>
            <a href={ACCESS_URL} className={styles.ctaBtnSecondary}>
              Request Early Access
            </a>
          </div>
        </div>

        {/* Empty spacer strip below the content */}
        <div className={styles.ctaSpacer} />
      </section>
      </div>
    </Layout>
  );
}
