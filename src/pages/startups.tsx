import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import FAQSection from '@site/src/components/FAQSection';

import styles from './startups.module.css';

import useBaseUrl from '@docusaurus/useBaseUrl'

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

const TrialIcon = () => (
  <svg width="36" height="39" viewBox="0 0 36 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.9167 35.45C15.9167 35.9274 15.7235 36.3852 15.3797 36.7228C15.0359 37.0604 14.5696 37.25 14.0833 37.25H3.08333C2.5971 37.25 2.13079 37.0604 1.78697 36.7228C1.44315 36.3852 1.25 35.9274 1.25 35.45V21.05C1.25 20.5726 1.44315 20.1148 1.78697 19.7772C2.13079 19.4396 2.5971 19.25 3.08333 19.25M25.0833 26.45C25.0833 26.9274 24.8902 27.3852 24.5464 27.7228C24.2025 28.0604 23.7362 28.25 23.25 28.25H12.25C11.7638 28.25 11.2975 28.0604 10.9536 27.7228C10.6098 27.3852 10.4167 26.9274 10.4167 26.45V12.05C10.4167 11.5726 10.6098 11.1148 10.9536 10.7772C11.2975 10.4396 11.7638 10.25 12.25 10.25M34.25 8.45C34.2498 7.4953 33.8633 6.57977 33.1757 5.9048L29.509 2.3048C28.8215 1.62962 27.889 1.2502 26.9167 1.25H21.4167C20.9304 1.25 20.4641 1.43964 20.1203 1.77721C19.7765 2.11477 19.5833 2.57261 19.5833 3.05V17.45C19.5833 17.9274 19.7765 18.3852 20.1203 18.7228C20.4641 19.0604 20.9304 19.25 21.4167 19.25H32.4167C32.9029 19.25 33.3692 19.0604 33.713 18.7228C34.0568 18.3852 34.25 17.9274 34.25 17.45V8.45Z" stroke="#0077FF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);

const ResourceIcon = () => (
  <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.25 17.25V25.25C9.25 26.3109 9.67143 27.3283 10.4216 28.0784C11.1717 28.8286 12.1891 29.25 13.25 29.25H21.25M5.25 1.25H13.25C15.4591 1.25 17.25 3.04086 17.25 5.25V13.25C17.25 15.4591 15.4591 17.25 13.25 17.25H5.25C3.04086 17.25 1.25 15.4591 1.25 13.25V5.25C1.25 3.04086 3.04086 1.25 5.25 1.25ZM25.25 21.25H33.25C35.4591 21.25 37.25 23.0409 37.25 25.25V33.25C37.25 35.4591 35.4591 37.25 33.25 37.25H25.25C23.0409 37.25 21.25 35.4591 21.25 33.25V25.25C21.25 23.0409 23.0409 21.25 25.25 21.25Z" stroke="#0077FF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);

const OnboardingIcon = () => (
  <svg width="36" height="39" viewBox="0 0 36 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30.9468 1.25431V8.45259M34.2461 4.85345H27.6476M16.1284 2.71916C16.1991 2.30634 16.3999 1.93349 16.6961 1.66518C16.9922 1.39687 17.365 1.25 17.75 1.25C18.135 1.25 18.5078 1.39687 18.8039 1.66518C19.1001 1.93349 19.3009 2.30634 19.3716 2.71916L21.1053 12.7212C21.2284 13.4323 21.5452 14.0863 22.0143 14.5981C22.4834 15.1098 23.0829 15.4553 23.7348 15.5897L32.9033 17.481C33.2817 17.5581 33.6235 17.7772 33.8694 18.1003C34.1154 18.4233 34.25 18.83 34.25 19.25C34.25 19.67 34.1154 20.0767 33.8694 20.3998C33.6235 20.7228 33.2817 20.9419 32.9033 21.019L23.7348 22.9103C23.0829 23.0447 22.4834 23.3902 22.0143 23.9019C21.5452 24.4137 21.2284 25.0677 21.1053 25.7788L19.3716 35.7808C19.3009 36.1937 19.1001 36.5665 18.8039 36.8348C18.5078 37.1031 18.135 37.25 17.75 37.25C17.365 37.25 16.9922 37.1031 16.6961 36.8348C16.3999 36.5665 16.1991 36.1937 16.1284 35.7808L14.3947 25.7788C14.2716 25.0677 13.9548 24.4137 13.4857 23.9019C13.0167 23.3902 12.4171 23.0447 11.7652 22.9103L2.59673 21.019C2.21831 20.9419 1.87654 20.7228 1.63059 20.3998C1.38463 20.0767 1.25 19.67 1.25 19.25C1.25 18.83 1.38463 18.4233 1.63059 18.1003C1.87654 17.7772 2.21831 17.5581 2.59673 17.481L11.7652 15.5897C12.4171 15.4553 13.0167 15.1098 13.4857 14.5981C13.9548 14.0863 14.2716 13.4323 14.3947 12.7212L16.1284 2.71916ZM7.85237 33.6466C7.85237 35.6343 6.37526 37.2457 4.55316 37.2457C2.73106 37.2457 1.25395 35.6343 1.25395 33.6466C1.25395 31.6588 2.73106 30.0474 4.55316 30.0474C6.37526 30.0474 7.85237 31.6588 7.85237 33.6466Z" stroke="#0077FF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);

const EarlyaccessIcon = () => (
  <svg width="33" height="39" viewBox="0 0 33 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.625 19.2478L14.375 22.8472L21.875 15.6484M31.25 21.0475C31.25 30.046 24.6875 34.5452 16.8875 37.1548C16.4791 37.2876 16.0354 37.2813 15.6313 37.1368C7.8125 34.5452 1.25 30.046 1.25 21.0475V8.4496C1.25 7.97229 1.44754 7.51453 1.79918 7.17702C2.15081 6.83952 2.62772 6.64991 3.125 6.64991C6.875 6.64991 11.5625 4.49027 14.825 1.75472C15.2222 1.42898 15.7275 1.25 16.25 1.25C16.7725 1.25 17.2778 1.42898 17.675 1.75472C20.9563 4.50826 25.625 6.64991 29.375 6.64991C29.8723 6.64991 30.3492 6.83952 30.7008 7.17702C31.0525 7.51453 31.25 7.97229 31.25 8.4496V21.0475Z" stroke="#0077FF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
)
// Animated section wrapper
function AnimSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useScrollAnimation();
  return <div ref={ref} className={clsx(styles.animSection, className)}>{children}</div>;
}

// Checkmark icon
const CheckmarkIcon = () => (
  <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 1.69922L8.1875 17.6992L1 10.4265" stroke="#189B71" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Benefits list
function BenefitList({ items }: { items: string[] }) {
  return (
    <ul className={styles.benefitList}>
      {items.map((item, i) => (
        <li key={i} className={styles.benefitItem}>
          <span className={styles.benefitCheck}><CheckmarkIcon /></span>
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
  const pillarsBg = useBaseUrl('/img/11f2836e48717136d3bcf81e1a5c1e68e98d08a0.png');

  return (
    <Layout
      title="For Startups - Build an Investor-Ready Raise | RaiseTalks"
      description="RaiseTalks gives early-stage founders an AI-powered workspace to turn raw documents, data, and narrative into an investor-grade data room - scored, structured, and tracked in real time."
    >
      <Head>
        <meta name="description" content="RaiseTalks gives early-stage founders an AI-powered workspace to turn raw documents, data, and narrative into an investor-grade data room - scored, structured, and tracked in real time." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://raisetalks.com/startups" />
        <meta property="og:title" content="For Startups - Build an Investor-Ready Raise | RaiseTalks" />
        <meta property="og:description" content="Turn your startup documents into an investor-grade data room with AI readiness scoring, structured filing, and real-time tracking." />
        <meta property="og:url" content="https://raisetalks.com/startups" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://raisetalks.com/img/og-raisetalks.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="For Startups - Build an Investor-Ready Raise | RaiseTalks" />
        <meta name="twitter:description" content="Turn your startup documents into an investor-grade data room with AI readiness scoring." />
        <meta name="twitter:image" content="https://raisetalks.com/img/og-raisetalks.jpg" />
        <meta name="twitter:site" content="@raisetalks" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "RaiseTalks for Startups",
          "serviceType": "AI Fundraising Platform",
          "description": "AI-powered workspace for early-stage founders to build investor-grade data rooms and close funding rounds faster.",
          "url": "https://raisetalks.com/startups",
          "provider": { "@type": "Organization", "name": "RaiseTalks", "url": "https://raisetalks.com" }
        })}</script>
      </Head>

      {/* ── HERO ─────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
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

      <div className={`${styles.processSpacer} h-[64px] w-full border-b-[0.5px] border-b-[#DAE0E7] flex items-center justify-center`}>
        <div className={`${styles.gridLineSpacer} h-[64px] border-x-[0.5px] border-x-[#DAE0E7]`}></div>
      </div>

      {/* ── TRUTH BAR ────────────────────────────────── */}
      <div className={styles.truthBar}>
        <div className={styles.truthInner}>
          <span className={styles.truthLabel}>The Core Insight</span>
          <blockquote className={styles.truthQuote}>
            "The fundraising problem is not a pitch problem. It's a preparation problem -
            and nobody has built the infrastructure to solve it at scale, with AI, from the investor's perspective."
          </blockquote>
        </div>
      </div>

      <div className={`${styles.processSpacer} h-[64px] w-full border-y-[0.5px] border-y-[#DAE0E7] flex items-center justify-center`}>
        <div className={`${styles.gridLineSpacer} h-[64px] border-x-[0.5px] border-x-[#DAE0E7]`}></div>
      </div>

      {/* ── PAIN POINTS ──────────────────────────────── */}
      <section>
        <div className={`${styles.sectionInner} flex flex-1`}>
          <AnimSection>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionEyebrow}>The Problem</div>

              <p className={styles.sectionDesc}>
                You have customers, product, conviction. But your raise dies in the paperwork.
              </p>
              <h2 className={styles.sectionTitle}>
                <span style={{whiteSpace: 'nowrap'}}>Great founders lose <br /> raises 
                in due diligence.</span> <br /> <span className={styles.accentText}>not in the pitch</span>
              </h2>
              
            </div>
          </AnimSection>

          <div className={`${styles.painGrid} flex-1`}>
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
                <h3 className={styles.painTitle}>{pain.title}</h3>
                <p className={styles.painDesc}>{pain.desc}</p>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      <div className={`${styles.processSpacer} h-[64px] w-full border-y-[0.5px] border-y-[#DAE0E7] flex items-center justify-center`}>
        <div className={`${styles.gridLineSpacer} h-[64px] border-x-[0.5px] border-x-[#DAE0E7]`}></div>
      </div>

      <div className={`${styles.processSpacer} h-[64px] w-full bg-[#0077FF] border-y-[0.5px] border-y-[#258BFF] flex items-center justify-center`}>
        <div className={`${styles.gridLineSpacer} h-[64px] border-x-[0.5px] border-x-[#258BFF]`}></div>
      </div>

      {/* ── THREE PILLARS ─────────────────────────────── */}
      <section
        className={`${styles.pillarsSection} bg-center bg-cover bg-no-repeat`}
        style={{ backgroundImage: `url(${pillarsBg})` }}
      >

        
        <div className={styles.sectionInner}>

          <p className='text-center font-normal text-[48px] mb-[32px] py-[32px] text-white'>How RaiseTalks Works</p>

          <div className={styles.pillarsGrid}>
            {[
              {
                
                number: '01',
                name: 'We Prepare',
                headline: 'Fix issues in private before they become objections in the room.',
                body: 'Our AI reads your data room the way a skeptical investor would - surfacing gaps, inconsistencies, and missing signals before they cost you the deal.',
              },
              {
               
                number: '02',
                name: 'We Illuminate',
                headline: 'The black box of investor behavior becomes a live feed.',
                body: 'We show you exactly what investors see: which documents they open, how long they linger, which slides lose them, and what questions they\'re forming.',
              },
              {
                
                number: '03',
                name: 'We Accelerate',
                headline: 'Collapse weeks of back-and-forth diligence into days.',
                body: 'Standardized scorecards, IC-ready summaries, and AI-generated Q&A give everyone in the process - founder and investor - their time back.',
              },
            ].map(({ number, name, headline, body }) => (
              <AnimSection key={number} className={styles.pillarCard}>
                <div className={styles.pillarCardHeader}>
                  <h3 className={styles.pillarName}>{name}</h3>
                </div>
                <p className={styles.pillarHeadline}>{headline}</p>
                <p className={styles.pillarBody}>{body}</p>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      <div className={`${styles.processSpacer} h-[64px] w-full bg-[#0077FF] border-y-[0.5px] border-y-[#258BFF] flex items-center justify-center`}>
        <div className={`${styles.gridLineSpacer} h-[64px] border-x-[0.5px] border-x-[#258BFF]`}></div>
      </div>

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
              <h2 className={clsx(styles.sectionTitle, styles.sectionTitleLight)}>
                RaiseTalks AI Advisor is not just a tool. <br />
                <span className={styles.accentTextLight}>It's a standard</span>
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
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, marginTop: '0.25rem' }}>
                    <CheckmarkIcon />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div className={styles.characterTrait}>{trait}</div>
                    <p className={styles.characterDesc}>{desc}</p>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERKS ────────────────────────────────────── */}
      <section id="perks" className={styles.perksSection}>
        <div className={styles.sectionInner}>
          <AnimSection>
            {/* Row 1 - headline + CTA */}
            <div className='flex'>
            <div className={`${styles.perksRow1} flex-1`}>
              <div className={styles.perksHeadGroup}>
                <h2 className={styles.perksTitle}>
                  Get access to <br />
                  <span className={styles.accentText}>Founder Perks</span>
                </h2>
              </div>
              <div className={styles.perksCta}>
                <a className={styles.btnPrimary} href="mailto:startups@raisetalks.ai">
                  Claim Your Perks
                </a>
              </div>
            </div>

            {/* Row 2 - perk cards */}
            <div className={`${styles.perksGrid} flex-1`}>
              {[
                {
                  icon: <TrialIcon />,
                  label: '30-Day Trial',
                  title: 'Extended free trial',
                  desc: 'Full platform access for 30 days - enough time to build and share your data room before your first investor meeting.',
                },
                {
                  icon: <OnboardingIcon />,
                  label: 'Onboarding',
                  title: 'Priority setup call',
                  desc: 'A 1-on-1 session with our team to get your data room structured and your readiness score running in under an hour.',
                },
                {
                  icon: <ResourceIcon />,
                  label: 'Resources',
                  title: 'Founder playbook',
                  desc: 'The exact investor-readiness checklist our team uses - what documents to include, how to structure them, and what gaps kill deals.',
                },
                {
                  icon: <EarlyaccessIcon />,
                  label: 'Early Access',
                  title: 'New features first',
                  desc: 'Skip the waitlist. As a perk member you get early access to every new feature we ship - starting with our IC memo generator.',
                },
              ].map(({ icon, label, title, desc }) => (
                <div key={label} className={styles.perkCard}>
                  <div className={styles.perkIcon}>{icon}</div>
                  <div>
                  <div className={styles.perkLabel}>{label}</div>
                  <h3 className={styles.perkTitle}>{title}</h3>
                  <p className={styles.perkDesc}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
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
              <h2 className={styles.ctaTitle}>
                Walk into that meeting ready.<br />
                Not just prepared - <em>ready.</em>
              </h2>
              <p className={styles.ctaDesc}>
                Join the founders building investor-grade data rooms with RaiseTalks. <br />
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
