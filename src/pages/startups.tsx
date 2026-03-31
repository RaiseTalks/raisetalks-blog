import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import FAQSection from '@site/src/components/FAQSection';

import styles from './startups.module.css';

// Scroll animation hook
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add(styles.visible);
      },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);
  return ref;
}

// Icons
const PrepareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.pillarIcon}>
    <path d="M9 12l2 2 4-4" /><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Z" />
  </svg>
);
const IlluminateIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.pillarIcon}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const AccelerateIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.pillarIcon}>
    <path d="m5 12 7-7 7 7" /><path d="M12 19V5" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

// Animated section wrapper
function AnimSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useScrollAnimation();
  return <div ref={ref} className={clsx(styles.animSection, className)}>{children}</div>;
}

// Benefits list
function BenefitList({ items }: { items: string[] }) {
  return (
    <ul className={styles.benefitList}>
      {items.map((item, i) => (
        <li key={i} className={styles.benefitItem}>
          <span className={styles.benefitCheck}><CheckIcon /></span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// Feature slider
interface SlideData {
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  image: React.ReactNode;
  ctaText: string;
  ctaLink?: string;
}

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
    <path d="m15 18-6-6 6-6"/>
  </svg>
);
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

function FeatureSlider({ slides }: { slides: SlideData[] }) {
  const [active, setActive] = useState(0);
  const total = slides.length;
  const slide = slides[active];

  const prev = () => setActive((i) => (i - 1 + total) % total);
  const next = () => setActive((i) => (i + 1) % total);

  const ref = useScrollAnimation();

  return (
    <div ref={ref} className={clsx(styles.animSection, styles.sliderWrap)}>
      {/* Slide content */}
      <div className={styles.slideContent}>
        <div className={styles.featureText}>
          <h3 className={styles.featureTitle}>{slide.title}</h3>
          <p className={styles.featureSubtitle}>{slide.subtitle}</p>
          <p className={styles.featureDesc}>{slide.description}</p>
          <BenefitList items={slide.benefits} />
          <div className={styles.featureActions}>
            <Link className={styles.btnPrimary} to={slide.ctaLink ?? 'https://app.raisetalks.com/sign-up'}>
              {slide.ctaText}
            </Link>
            <Link className={styles.btnGhost} to="https://calendly.com/iamdariiava/30min">
              Book a Demo
            </Link>
          </div>
        </div>
        <div className={styles.featureVisual}>
          {slide.image}
        </div>
      </div>

      {/* Controls row */}
      <div className={styles.sliderControls}>
        <button className={styles.sliderBtn} onClick={prev} aria-label="Previous">
          <ChevronLeft />
        </button>
        <span className={styles.sliderCount}>
          <span className={styles.sliderCountActive}>{String(active + 1).padStart(2, '0')}</span>
          <span className={styles.sliderCountSep}>/</span>
          <span className={styles.sliderCountTotal}>{String(total).padStart(2, '0')}</span>
        </span>
        <div className={styles.sliderDots}>
          {slides.map((_, i) => (
            <button
              key={i}
              className={clsx(styles.sliderDot, i === active && styles.sliderDotActive)}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button className={styles.sliderBtn} onClick={next} aria-label="Next">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

// Image wrapper
function FeatureImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className={styles.imageWrap}>
      <img src={src} alt={alt} className={styles.featureImg} loading="lazy" />
    </div>
  );
}


export default function Startups() {
  return (
    <Layout
      title="For Startups - Build an Investor-Ready Raise"
      description="RaiseTalks gives early-stage founders an AI-powered workspace to turn raw documents, data, and narrative into an investor-grade data room - scored, structured, and tracked in real time."
    >

      {/* ── HERO ─────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroEyebrow}>For Founders Who Are Serious About Raising</div>
          <Heading as="h1" className={styles.heroTitle}>
            The Raise Is Won<br />
            <span className={styles.heroAccent}>Before the Meeting</span>
          </Heading>
          <p className={styles.heroDesc}>
            Investors don’t pass on the idea. They pass on the mess. RaiseTalks fixes it first.
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

      {/* ── TRUTH BAR ────────────────────────────────── */}
      <div className={styles.truthBar}>
        <div className={styles.truthInner}>
          <span className={styles.truthLabel}>The Core Insight</span>
          <blockquote className={styles.truthQuote}>
            "The fundraising problem is not a pitch problem. It's a preparation problem —
            and nobody has built the infrastructure to solve it at scale, with AI, from the investor's perspective."
          </blockquote>
        </div>
      </div>

      {/* ── PAIN POINTS ──────────────────────────────── */}
      <section className={styles.painSection}>
        <div className={styles.sectionInner}>
          <AnimSection>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionEyebrow}>The Problem</div>
              <h2 className={styles.sectionTitle} style={{fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)'}}>
                <span style={{whiteSpace: 'nowrap'}}>Great founders lose raises</span><br />
                <span className={styles.accentText} style={{whiteSpace: 'nowrap'}}>in due diligence - not in the pitch</span>
              </h2>
              <p className={styles.sectionDesc}>
                You have customers, product, conviction. But your raise dies in the paperwork.
              </p>
            </div>
          </AnimSection>

          <div className={styles.painGrid}>
            {[
              {
                num: '01',
                title: 'The Disorganized Data',
                desc: 'Documents scattered across emails, Dropbox, Google Drive, etc. Investors spend hours just trying to find what they need - and most don\'t bother.',
              },
              {
                num: '02',
                title: 'The Inconsistent Narrative',
                desc: 'The story you tell in the meeting doesn\'t match the numbers in the data room. Investors notice. They pass. They don\'t tell you why.',
              },
              {
                num: '03',
                title: 'The Invisible Gap',
                desc: 'You don\'t know what "investor-ready" actually looks like. Nobody told you. There\'s no benchmark - until now.',
              },
            ].map((pain) => (
              <AnimSection key={pain.num} className={styles.painCard}>
                <div className={styles.painNum}>{pain.num}</div>
                <h3 className={styles.painTitle}>{pain.title}</h3>
                <p className={styles.painDesc}>{pain.desc}</p>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS ─────────────────────────────── */}
      <section className={styles.pillarsSection}>
        <div className={styles.sectionInner}>
          <AnimSection>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionEyebrow}>How RaiseTalks Works</div>
              <h2 className={styles.sectionTitle}>
                Three things we {' '}
                <span className={styles.accentText}>do best</span>
              </h2>
            </div>
          </AnimSection>

          <div className={styles.pillarsGrid}>
            {[
              {
                Icon: PrepareIcon,
                number: '01',
                name: 'Prepare',
                headline: 'Fix issues in private before they become objections in the room.',
                body: 'Our AI reads your data room the way a skeptical investor would - surfacing gaps, inconsistencies, and missing signals before they cost you the deal.',
              },
              {
                Icon: IlluminateIcon,
                number: '02',
                name: 'Illuminate',
                headline: 'The black box of investor behavior becomes a live feed.',
                body: 'We show you exactly what investors see: which documents they open, how long they linger, which slides lose them, and what questions they\'re forming.',
              },
              {
                Icon: AccelerateIcon,
                number: '03',
                name: 'Accelerate',
                headline: 'Collapse weeks of back-and-forth diligence into days.',
                body: 'Standardized scorecards, IC-ready summaries, and AI-generated Q&A give everyone in the process - founder and investor - their time back.',
              },
            ].map(({ Icon, number, name, headline, body }) => (
              <AnimSection key={number} className={styles.pillarCard}>
                <div className={styles.pillarCardHeader}>
                  <div className={styles.pillarIconWrap}>
                    <Icon />
                  </div>
                  <h3 className={styles.pillarName}>{name}</h3>
                </div>
                <p className={styles.pillarHeadline}>{headline}</p>
                <p className={styles.pillarBody}>{body}</p>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE DEEP-DIVES ───────────────────────── */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionInner}>
          <AnimSection>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionEyebrow}>The Platform</div>
              <h2 className={styles.sectionTitle}>
                Everything you need to{' '}
                <span className={styles.accentText}>walk in ready</span>
              </h2>
              <p className={styles.sectionDesc}>
                Used by early-stage founders preparing seed and Series A raises.
              </p>
            </div>
          </AnimSection>

          <FeatureSlider slides={[
            {
              title: 'Investor-Grade Data Room',
              subtitle: 'A secure vault your investors will actually use.',
              description: 'Upload, organize, and share every document in a single structured workspace. No more Dropbox chaos - just a clean, professional data room that signals you mean business.',
              benefits: [
                'Drag-and-drop organization that matches investor expectations',
                'Single secure link - one share, full access control',
                'Enterprise encryption with granular permissions',
                'Document versioning so nothing goes out of date',
              ],
              image: <FeatureImage src="/img/DataRoomInterface.png" alt="Investor-Grade Data Room" />,
              ctaText: 'Create Data Room',
            },
            {
              title: 'AI Readiness Scoring',
              subtitle: 'Score your readiness. Close with confidence.',
              description: 'Our AI audits your data room the way a skeptical investor would - checking completeness, consistency, and narrative alignment. You fix gaps in private before they become deal-killers.',
              benefits: [
                'Comprehensive readiness score benchmarked against successful raises',
                'Gap identification with specific, actionable recommendations',
                'Narrative consistency check across documents',
                'Compliance and completeness review by section',
              ],
              image: <FeatureImage src="/img/icons/ai-self-assesment.png" alt="AI Readiness Scoring" />,
              ctaText: 'Get Your Score',
            },
            {
              title: 'AI Advisor',
              subtitle: 'A 24/7 fundraising co-pilot that knows your deal.',
              description: 'Instant answers to investor questions, next-step prompts, and weak-spot flags - all grounded in your actual documents. The advisor who tells you exactly what the investor is thinking.',
              benefits: [
                'Context-aware answers drawn from your own data room',
                'Personalized next-step recommendations at every stage',
                'Pre-meeting question prep based on investor profile',
                '24/7 availability - available the night before a big meeting',
              ],
              image: <FeatureImage src="/img/icons/ai-advisor.svg" alt="AI Advisor" />,
              ctaText: 'Try AI Advisor',
            },
            {
              title: 'Investor Engagement Tracking',
              subtitle: 'See interest spark - while it\'s happening.',
              description: 'Live alerts reveal who opened what, how long they spent on each section, and which slides hold attention. Stop guessing who\'s serious. Know it.',
              benefits: [
                'Real-time notifications when investors view your materials',
                'Time-on-page data for every document and section',
                'Investor interest ranking to prioritize follow-ups',
                'Slide-level heatmaps showing where attention concentrates',
              ],
              image: <FeatureImage src="/img/icons/real-time-engagement-tracking.png" alt="Engagement Tracking" />,
              ctaText: 'View Analytics',
            },
            {
              title: 'Collaborative Fundraising',
              subtitle: 'Your whole team, moving as one.',
              description: 'Co-edit materials, leave inline comments, and assign ownership - so nothing stalls because one person is the bottleneck. The raise moves at the speed of your best work.',
              benefits: [
                'Real-time collaborative editing across your team',
                'Task assignment with progress tracking',
                'Inline comments and version history',
                'Role-based access control for advisors and co-founders',
              ],
              image: <FeatureImage src="/img/icons/collaborative-fundraising.png" alt="Collaborative Fundraising" />,
              ctaText: 'Start Collaborating',
            },
          ]} />
        </div>
      </section>

      {/* ── CHARACTER STRIP ──────────────────────────── */}
      <section className={styles.characterSection}>
        <div className={styles.sectionInner}>
          <AnimSection>
            <div className={clsx(styles.sectionHeader, styles.sectionHeaderLight)}>
              <div className={styles.sectionEyebrowLight}>How We Show Up</div>
              <h2 className={clsx(styles.sectionTitle, styles.sectionTitleLight)}>
                RaiseTalks AI Advisor is not just a tool - a{' '}
                <span className={styles.accentTextLight}>standard</span>
              </h2>
            </div>
          </AnimSection>

          <div className={styles.characterGrid}>
            {[
              {
                trait: 'Precise',
                desc: 'Not vague, not diplomatic. The gap is on slide 14. The inconsistency is in row 47. We point at things directly.',
              },
              {
                trait: 'Warm',
                desc: 'We know what it costs to build something and try to raise for it. We\'re direct because we respect the founder.',
              },
              {
                trait: 'Confident',
                desc: 'We know what investor-ready looks like. We\'ve seen enough raises to have conviction. We speak with authority.',
              },
              {
                trait: 'Radical Transparency',
                desc: 'We tell you what investors actually think - not a softened version designed to protect feelings. ',
              },
              {
                trait: 'Founder First',
                desc: 'Every feature, every decision is evaluated through one lens: does this make your raise more likely to succeed?',
              },
              {
                trait: 'Relentless',
                desc: 'Every data room we process makes us smarter. Our AI flywheel compounds. The product gets better with every raise.',
              },
            ].map(({ trait, desc }) => (
              <AnimSection key={trait} className={styles.characterCard}>
                <div className={styles.characterTrait}>{trait}</div>
                <p className={styles.characterDesc}>{desc}</p>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERKS ────────────────────────────────────── */}
      <section className={styles.perksSection}>
        <div className={styles.sectionInner}>
          <AnimSection>
            {/* Row 1 - headline + CTA */}
            <div className={styles.perksRow1}>
              <div className={styles.perksHeadGroup}>
                <div className={styles.sectionEyebrow}>Founder Perks</div>
                <h2 className={styles.perksTitle}>
                  Get access to{' '}
                  <span className={styles.accentText}>Perks</span>
                </h2>
              </div>
              <div className={styles.perksCta}>
                <a className={styles.btnPrimary} href="mailto:startups@raisetalks.ai">
                  Claim Your Perks
                </a>
              </div>
            </div>

            {/* Row 2 - perk cards */}
            <div className={styles.perksGrid}>
              {[
                {
                  label: '30-Day Trial',
                  title: 'Extended free trial',
                  desc: 'Full platform access for 30 days - enough time to build and share your data room before your first investor meeting.',
                },
                {
                  label: 'Onboarding',
                  title: 'Priority setup call',
                  desc: 'A 1-on-1 session with our team to get your data room structured and your readiness score running in under an hour.',
                },
                {
                  label: 'Resources',
                  title: 'Founder playbook',
                  desc: 'The exact investor-readiness checklist our team uses - what documents to include, how to structure them, and what gaps kill deals.',
                },
                {
                  label: 'Early Access',
                  title: 'New features first',
                  desc: 'Skip the waitlist. As a perk member you get early access to every new feature we ship - starting with our IC memo generator.',
                },
              ].map(({ label, title, desc }) => (
                <div key={label} className={styles.perkCard}>
                  <div className={styles.perkLabel}>{label}</div>
                  <h3 className={styles.perkTitle}>{title}</h3>
                  <p className={styles.perkDesc}>{desc}</p>
                </div>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <FAQSection />

      {/* ── FINAL CTA ────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <AnimSection>
            <div className={styles.ctaContent}>
              <div className={styles.ctaEyebrow}>The Raise Starts Here</div>
              <h2 className={styles.ctaTitle}>
                Walk into that meeting ready.<br />
                Not just prepared - <em>ready.</em>
              </h2>
              <p className={styles.ctaDesc}>
                Join the founders building investor-grade data rooms with RaiseTalks.
                Start free. Get your readiness score in minutes.
              </p>
              <div className={styles.ctaActions}>
                <Link className={styles.ctaBtnPrimary} to="https://app.raisetalks.com/sign-up">
                  Start Free
                </Link>
                <Link className={styles.ctaBtnSecondary} to="/pricing">
                  View Pricing
                </Link>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>
    </Layout>
  );
}
