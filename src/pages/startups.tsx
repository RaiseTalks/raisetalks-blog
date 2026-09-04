import React, { useRef, useEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import FAQSection from '@site/src/components/FAQSection';
import { DiligenceVideoBlock} from '@site/src/components/SolutionSection';
import LucideIcon from '@site/src/components/LucideIcon';

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

// Animated section wrapper
function AnimSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useScrollAnimation();
  return <div ref={ref} className={clsx(styles.animSection, className)}>{children}</div>;
}

// Checkmark icon — the design-supplied asset rather than a redrawn copy, so
// updates land by replacing the file. The inline version this replaced used a
// 24x20 viewBox at stroke-width 3.4, which rendered a 23px mark with a 3.4px
// stroke: far heavier than Figma's lucide/check (a 16px mark at stroke 2) and
// visibly bolder than the same green tick elsewhere on the site.
const CheckmarkIcon = () => (
  <img src="/img/icons/checkmark-icon.svg" alt="" aria-hidden="true" width={16} height={16} />
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

// Feature rows (stacked, alternating image side + band background — matches Figma)
interface SlideData {
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  image: React.ReactNode;
}

function FeatureRow({ slide, index }: { slide: SlideData; index: number }) {
  const ref = useScrollAnimation();
  const reversed = index % 2 === 1;

  return (
    <div className={styles.featureRowBand}>
      <div className={clsx(styles.sectionInner, styles.featureRowInner, reversed && styles.featureRowInnerAlt)}>
        <div ref={ref} className={clsx(styles.animSection, styles.featureRow, reversed && styles.featureRowReverse)}>
          <div className={styles.featureText}>
            <h3 className={styles.featureTitle}>{slide.title}</h3>
            <p className={styles.featureSubtitle}>{slide.subtitle}</p>
            <p className={styles.featureDesc}>{slide.description}</p>
            <div className={clsx(styles.benefitCard, reversed && styles.benefitCardAlt)}>
              <BenefitList items={slide.benefits} />
            </div>
          </div>
          <div className={styles.featureVisual}>
            {slide.image}
          </div>
        </div>
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
  const pillarsBg = useBaseUrl('/img/backgrounds/blue-section-desktop.webp');

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

      <div className={`${styles.processSpacer} w-full border-b-[0.5px] border-b-[#DAE0E7] flex items-center justify-center`}>
        <div className={`${styles.gridLineSpacer} border-x-[0.5px] border-x-[#DAE0E7]`}></div>
      </div>

      {/* ── TRUTH BAR ────────────────────────────────── */}
      <div className={styles.truthBar}>
        <div className={styles.truthInner}>
          <blockquote className={styles.truthQuote}>
            "The fundraising problem is not a pitch problem. It's a preparation problem -
            and nobody has built the infrastructure to solve it at scale, with AI, from the investor's perspective."
          </blockquote>
        </div>
      </div>

      <div className={`${styles.processSpacer} w-full border-y-[0.5px] border-y-[#DAE0E7] flex items-center justify-center`}>
        <div className={`${styles.gridLineSpacer} border-x-[0.5px] border-x-[#DAE0E7]`}></div>
      </div>

      {/* ── PAIN POINTS ──────────────────────────────── */}
      <section>
        <div className={`${styles.sectionInner} ${styles.painSectionRow} flex flex-1`}>
          <AnimSection>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionEyebrow}>The Problem</div>

             
              <h2 className={styles.sectionTitle}>
                <span style={{whiteSpace: 'nowrap'}}>Great founders lose <br /> raises 
                in due diligence.</span> <br /> <span className={styles.accentText}>Not in the pitch</span>
              </h2>

               <p className={styles.sectionDesc}>
                You have customers, product, conviction. But your raise dies in the paperwork.
              </p>
              
            </div>
          </AnimSection>

          <div className={`${styles.painGrid} flex-1`}>
            {[
              {
                num: '01',
                title: 'Your Data is Disorganized',
                desc: 'Documents scattered across emails, Dropbox, Google Drive, etc. Investors spend hours just trying to find what they need - and most don\'t bother.',
              },
              {
                num: '02',
                title: 'Your Narrative is Inconsistent',
                desc: 'The story you tell in the meeting doesn\'t match the numbers in the data room. Investors notice. They pass. They don\'t tell you why.',
              },
              {
                num: '03',
                title: '"The Invisible Gap"',
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

      <div className={`${styles.processSpacer} w-full border-y-[0.5px] border-y-[#DAE0E7] flex items-center justify-center`}>
        <div className={`${styles.gridLineSpacer} border-x-[0.5px] border-x-[#DAE0E7]`}></div>
      </div>

      <div className={`${styles.processSpacer} w-full bg-[#0077FF] border-y-[0.5px] border-y-[#258BFF] flex items-center justify-center`}>
        <div className={`${styles.gridLineSpacer} border-x-[0.5px] border-x-[#258BFF]`}></div>
      </div>

      {/* ── THREE PILLARS ─────────────────────────────── */}
      <section
        className={`${styles.pillarsSection} bg-center bg-cover bg-no-repeat`}
        style={{ backgroundImage: `url(${pillarsBg})` }}
      >

        
        <div className={styles.sectionInner}>

          <h2 className='rt-h2 text-center text-white mb-[32px] py-[32px]'>How RaiseTalks Works</h2>

          <div className={styles.pillarsGrid}>
            {[
              {
                
                number: '01',
                name: 'Prepare',
                headline: 'Fix issues in private before they become objections in the room.',
                body: 'Our AI reads your data room the way a skeptical investor would - surfacing gaps, inconsistencies, and missing signals before they cost you the deal.',
              },
              {
               
                number: '02',
                name: 'Illuminate',
                headline: 'The black box of investor behavior becomes a live feed.',
                body: 'We show you exactly what investors see: which documents they open, how long they linger, which slides lose them, and what questions they\'re forming.',
              },
              {
                
                number: '03',
                name: 'Accelerate',
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

      <div className={`${styles.processSpacer} w-full bg-[#0077FF] border-y-[0.5px] border-y-[#258BFF] flex items-center justify-center`}>
        <div className={`${styles.gridLineSpacer} border-x-[0.5px] border-x-[#258BFF]`}></div>
      </div>

      <div className={`${styles.processSpacer} w-full bg-[#F7F7F7] border-y-[0.5px] border-y-[#DAE0E7] flex items-center justify-center`}>
        <div className={`${styles.gridLineSpacer} border-x-[0.5px] border-x-[#DAE0E7]`}></div>
      </div>

      {/* ── FEATURE DEEP-DIVES ───────────────────────── */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionInner}>
          <AnimSection>
            <div className={clsx(styles.sectionHeader, styles.featuresSectionHeader)}>
              <div>
                <h2 className={styles.sectionTitle}>
                  Everything you need to <br />
                  <span className={styles.accentText}>walk in ready</span>
                </h2>
              </div>
              <p className={styles.sectionDesc}>
                Used by early-stage founders preparing seed and Series A raises.
              </p>
            </div>
          </AnimSection>
        </div>

        {[
            {
              title: 'Investor-Grade Data Room',
              subtitle: 'A secure vault your investors will actually use.',
              description: 'Upload, organize, and share every document in a single structured workspace. No more Dropbox chaos.',
              benefits: [
                '22 structured sections and 143 fields, purpose-built for investor evaluation',
                'Four access tiers - Public, Basic, Due Diligence, Owner - with field-level control',
                'Invite investors with per-invite access level and expiration: 30 days to never',
                'One public, SEO-ready company profile at your own URL',
              ],
              image: <FeatureImage src="/img/startups/investor-grade-data-room.webp" alt="Investor-Grade Data Room" />,
            },
            {
              title: 'AI Readiness Scoring',
              subtitle: 'Score your readiness. Close with confidence.',
              description: 'Our AI audits your data room the way a skeptical investor would - checking completeness, consistency, and narrative alignment. You fix gaps in private before they become deal-killers.',
              benefits: [
                'Readiness scored 1-5 across Team, Product, Market and Deal - the dimensions investors score',
                'Gap identification with a "Fix this" link straight into the right section',
                'Risk and inconsistency flags across your whole data room',
                'Completeness review across all 22 sections - know exactly what is missing',
              ],
              image: <FeatureImage src="/img/startups/ai-readiness-scoring.webp" alt="AI Readiness Scoring" />,
            },
            {
              title: 'AI Fundraising Advisor',
              subtitle: 'An advisor that has actually read your data room.',
              description: 'Generic fundraising advice is free everywhere. Your advisor answers from your own numbers, your own narrative, your own gaps - and in Agent mode, it fixes them with you.',
              benefits: [
                'General mode for strategy, positioning, and investor-meeting prep',
                'Data Room mode analyzes your real content - not hypotheticals',
                'Agent mode drafts and saves improvements section by section, always asking before it writes',
                'Unlimited questions on Pro',
              ],
              image: <FeatureImage src="/img/startups/ai-fundraising-advisor.webp" alt="AI Fundraising Advisor" />,
            },
            {
              title: 'Pitch Deck AI',
              subtitle: 'Your deck and your data room, always in sync.',
              description: 'Upload your pitch deck and the AI builds your data room from it - then, when your data room is stronger than your deck, generate a new one from the source of truth.',
              benefits: [
                'Deck upload auto-fills your data room - empty fields only, never overwrites your work',
                'Generate an investor-standard 10-12 slide deck straight from your data room',
                'Export to PDF, ready to send',
                'AI field assist on the details investors read closest',
              ],
              image: <FeatureImage src="/img/startups/pitch-deck-ai.webp" alt="Pitch Deck AI" />,
            },
            {
              title: 'IR Updates',
              subtitle: 'Investor updates that write themselves - and never overshare.',
              description: 'The AI drafts your monthly, quarterly, or annual update from what actually changed in your data room, in two versions at once: one for basic-access investors, one for due-diligence investors. Nobody sees numbers they were not granted.',
              benefits: [
                'AI-drafted from your data room, leading with what changed since the last update',
                'Tier-aware by construction - each investor receives exactly their access level',
                'Scheduled sends with a review window before anything goes out',
                'Built-in gap analysis tells you what to fix before investors notice',
              ],
              image: <FeatureImage src="/img/startups/ir-updates.webp" alt="IR Updates" />,
            },
            {
              title: 'Investor Discovery & IR Push',
              subtitle: 'Stop cold-emailing. Get pushed to investors who already match.',
              description: 'Browse the verified investor catalog, then let IR Push do the outreach: when your data room is complete and your readiness score clears the bar, one click puts it in front of matched investors - with access already granted.',
              benefits: [
                'Verified investor catalog: filter by type, stage, and geography',
                'Matching on sector, stage, ticket size, and geography - no spray-and-pray',
                'Matched investors get instant basic-tier access and a pipeline card on both sides',
                'Readiness-gated: only complete, scored data rooms go out',
              ],
              image: <FeatureImage src="/img/startups/ir-push-readiness.webp" alt="Investor Discovery and IR Push" />,
            },
            {
              title: 'IR Pipeline',
              subtitle: 'Every investor conversation, one board.',
              description: 'A drag-and-drop pipeline built for how raises actually progress - from first share to hard commitment.',
              benefits: [
                '10 stages, from Data Room Shared and NDA Signed through Term Sheet to Hard Commitment',
                'Notes and meetings on every investor card',
                'Access requests approve or decline right from your dashboard',
                'Included in every plan - pipeline discipline should not cost extra',
              ],
              image: <FeatureImage src="/img/startups/ir-pipeline.webp" alt="IR Pipeline" />,
            },
            {
              title: 'Data Room MCP',
              subtitle: 'Your data room, available to your AI.',
              description: 'Connect Claude - or any AI assistant that supports the open MCP standard - to your RaiseTalks data room. Ask questions, pull answers, make updates, all from the tool you already work in.',
              benefits: [
                'Works with Claude and any MCP-compatible AI client',
                'Secure, one-time authorization - your login is the permission boundary',
                'Read and update your data room by chatting',
                'The same connection powers the in-app Data Room Agent',
              ],
              image: <FeatureImage src="/img/startups/claude-mcp-raisetalks.webp" alt="Data Room MCP" />,
            },
        ].map((slide, i) => (
          <FeatureRow key={slide.title} slide={slide} index={i} />
        ))}
      </section>

      <div className={`${styles.processSpacer} w-full bg-[#f7f7f7] border-y-[0.5px] border-y-[#DAE0E7] flex items-center justify-center`}>
        <div className={`${styles.gridLineSpacer} border-x-[0.5px] border-x-[#DAE0E7]`}></div>
      </div>

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

      <div className={`${styles.processSpacer} w-full bg-[#F7F7F7] border-y-[0.5px] border-y-[#DAE0E7] flex items-center justify-center`}>
        <div className={`${styles.gridLineSpacer} border-x-[0.5px] border-x-[#DAE0E7]`}></div>
      </div>

      {/* ── PERKS ────────────────────────────────────── */}
      <section id="perks" className={styles.perksSection}>
        <div className={styles.sectionInner}>
          <AnimSection>
            {/* Row 1 - headline + CTA */}
            <div className={`${styles.perksOuterRow} flex`}>
            <div className={styles.perksRow1}>
              <div className={styles.perksHeadGroup}>
                <h2 className={styles.perksTitle}>
                  Get access to <br />
                  <span className={styles.accentText}>Founder Perks</span>
                </h2>
              </div>
              <div className={styles.perksCta}>
                <a className={styles.btnPrimary} href="mailto:startups@raisetalks.ai">
                  Claim your Perks
                </a>
              </div>
            </div>

            {/* Row 2 - perk cards */}
            <div className={styles.perksGrid}>
              {[
                {
                  icon: <LucideIcon name="calendar-check-2" className={styles.perkIconImg} />,
                  label: '30-Day Trial',
                  title: 'Try it for 30 days',
                  desc: 'Build your data room, get your readiness score and share it before your first investor meeting.',
                },
                {
                  icon: <LucideIcon name="headset" className={styles.perkIconImg} />,
                  label: 'Onboarding',
                  title: 'Priority setup call',
                  desc: 'A 1-on-1 session with our team to get your data room structured and your readiness score running in under an hour.',
                },
                {
                  icon: <LucideIcon name="notebook-tabs" className={styles.perkIconImg} />,
                  label: 'Resources',
                  title: 'Founder playbook',
                  desc: 'The exact investor-readiness checklist our team uses - what documents to include, how to structure them, and what gaps kill deals.',
                },
                {
                  icon: <LucideIcon name="user-star" className={styles.perkIconImg} />,
                  label: 'Early Access',
                  title: 'New features first',
                  desc: 'Skip the waitlist. As a perk member you get early access to every new feature we ship - starting with our IC memo generator.',
                },
              ].map(({ icon, label, title, desc }) => (
                <div key={label} className={styles.perkCard}>
                  <div className={styles.perkIcon}>{icon}</div>
                  <div className={styles.perkTextGroup}>
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

      <div className={`${styles.processSpacer} w-full bg-[#F7F7F7] border-y-[0.5px] border-y-[#DAE0E7] flex items-center justify-center`}>
        <div className={`${styles.gridLineSpacer} ${styles.gridLineSpacerNarrow} border-x-[0.5px] border-x-[#DAE0E7]`}></div>
      </div>

      <div className={styles.videoAmbientBg}>
        <div className={styles.narrowRailWrap}>
          <DiligenceVideoBlock />
        </div>
      </div>

      <div className={`${styles.processSpacer} w-full bg-[#F7F7F7] border-y-[0.5px] border-y-[#DAE0E7] flex items-center justify-center`}>
        <div className={`${styles.gridLineSpacer} ${styles.gridLineSpacerNarrow} border-x-[0.5px] border-x-[#DAE0E7]`}></div>
      </div>

      {/* ── FAQ ──────────────────────────────────────── */}
     
      <FAQSection />

      <div className={`${styles.processSpacer} w-full bg-[#0D1B32] border-y-[0.5px] border-y-[#16315A] flex items-center justify-center`}>
        <div className={`${styles.gridLineSpacer} border-x-[0.5px] border-x-[#16315A]`}></div>
      </div>

      {/* ── FINAL CTA ────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaImageBox}>
          <div className={styles.ctaInner}>
            <AnimSection>
              <div className={styles.ctaContent}>
                <h2 className={styles.ctaTitle}>
                  Walk into that meeting ready.<br />
                  <em>Not just prepared - ready.</em>
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
        </div>
      </section>

      <div className={`${styles.processSpacer} w-full bg-[#0D1B32] border-y-[0.5px] border-y-[#16315A] flex items-center justify-center`}>
        <div className={`${styles.gridLineSpacer} border-x-[0.5px] border-x-[#16315A]`}></div>
      </div>
    </Layout>
  );
}
