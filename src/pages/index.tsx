import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import SolutionSection, { DiligenceVideoBlock, NarrativeBlock } from '@site/src/components/SolutionSection';
import LogoCarousel from '@site/src/components/LogoCarousel';
import WorkspaceBanner from '@site/src/components/WorkspaceBanner';
import GridSeam from '@site/src/components/GridSeam';
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
      <div className={`rt-rail ${styles.heroInner}`}>
        <div className={styles.heroEyebrow}>AI Native</div>
        <h1 id="hero-heading" className={styles.heroTitle}>
          <span className={styles.heroTitleLine}>Global Fundraising <br /> & Due Diligence</span>
          <span className={styles.heroAccent}>for early-stage ventures</span>
        </h1>
        <p className={styles.heroDesc}>
          Run deals, streamline due diligence, and close rounds faster — all in one place.
        </p>
        <div className={styles.heroActions}>
          <Link className={styles.btnPrimary} to="https://app.raisetalks.com/sign-up">
            Try it Free
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
  return (
    <section
      ref={section.ref as React.RefObject<HTMLElement>}
      className={`${styles.animSection} ${section.visible ? styles.visible : ''} bg-white`}
    >
      <div className="rt-rail px-8 pt-8 pb-8 sm:px-12 sm:pt-12 sm:pb-12 lg:px-16 lg:pt-16 lg:pb-16 flex flex-col xl:flex-row gap-10 sm:gap-[90px]">
      <div className="w-full xl:w-[480px] xl:flex-shrink-0">
        <h2 className="text-[28px] md:text-[40px] lg:text-[48px] font-normal leading-[1.25] text-black" style={{ fontWeight: 400 }}>
          Attend our <br />
          <span className="italic font-serif bg-[image:var(--raisetalks-brand-gradient)] bg-clip-text text-transparent">Pitch Competitions</span>
          </h2>
        <p className="text-[14.5px] leading-[1.45] text-[#4b4b4b]">
          Every cohort is built for one thing: helping you deploy capital smarter and faster
        </p>


      <div className="grid grid-cols-2 gap-3 mt-8 md:flex md:items-center md:gap-6 md:mt-[93px]">

    <div className="bg-white border border-[#dae0e7] rounded-lg p-3 md:bg-transparent md:border-0 md:rounded-none md:p-0">
  <p className="text-[24px] leading-[32px] text-[#0077FF] m-0">4x</p>
  <p className="text-[14.714px] leading-[1.2] text-[#4b4b4b] m-0">Faster deal screening</p>
</div>


    <div className="hidden md:block w-px h-10 bg-[linear-gradient(to_bottom,transparent,#c4c4c4_50%,transparent)]" />


      <div className="bg-white border border-[#dae0e7] rounded-lg p-3 md:bg-transparent md:border-0 md:rounded-none md:p-0">
        <p className="text-[24px] leading-[32px] text-[#0077FF] m-0">85%</p>
        <p className="text-[14.714px] leading-[1.2] text-[#4b4b4b] m-0">Investor satisfaction</p>
      </div>

      <div className="hidden md:block w-px h-10 bg-[linear-gradient(to_bottom,transparent,#c4c4c4_50%,transparent)]" />


      <div className="col-span-2 md:col-span-1 bg-white border border-[#dae0e7] rounded-lg p-3 md:bg-transparent md:border-0 md:rounded-none md:p-0">
        <p className="text-[24px] leading-[32px] text-[#0077FF] m-0">72hr</p>
        <p className="text-[14.714px] leading-[1.2] text-[#4b4b4b] m-0">Avg response time</p>
      </div>
      </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
      <div className="border-b border-[#e4e4e7] p-6 md:p-12 transition-colors hover:bg-[#FCFCFC]">
        <h4 className="text-[24px] leading-[32px] font-normal text-black m-0 mb-[15px]" style={{ fontWeight: 400 }}>Direct founder access.</h4>
        <p className="text-[14.714px] leading-[1.2] text-[#4b4b4b] m-0">From first look to first conversation.</p>

      </div>
      <div className="border-b md:border-l border-[#e4e4e7] p-6 md:p-12 transition-colors hover:bg-[#FCFCFC]">
        <h4 className="text-[24px] leading-[32px] font-normal text-black m-0 mb-[15px]" style={{ fontWeight: 400 }}>100+ vetted startups per cohort</h4>
        <p className="text-[14.714px] leading-[1.2] text-[#4b4b4b] m-0">Screened before they reach you.</p>
      </div>
        <div className="border-b md:border-b-0 border-[#e4e4e7] p-6 md:p-12 transition-colors hover:bg-[#FCFCFC]">
          <h4 className="text-[24px] leading-[32px] font-normal text-black m-0 mb-[15px]" style={{ fontWeight: 400 }}>Standardized data rooms for every participant.</h4>
          <p className="text-[14.714px] leading-[1.2] text-[#4b4b4b] m-0">No chasing documents.</p>
        </div>
        <div className="md:border-l border-[#e4e4e7] p-6 md:p-12 transition-colors hover:bg-[#FCFCFC]">
          <h4 className="text-[24px] leading-[32px] font-normal text-black m-0 mb-[15px]" style={{ fontWeight: 400 }}>AI pre-scoring across Team, Product, Market, and Deal.</h4>
          <p className="text-[14.714px] leading-[1.2] text-[#4b4b4b] m-0">So you arrive informed.</p>
        </div>
        </div>

      </div>
    </section>
  )
}

function HomepageCTA() {
  const section = useInView(0.1);
  return (
    <section
      ref={section.ref as React.RefObject<HTMLElement>}
      className={`${styles.ctaSection} ${styles.animSection} ${section.visible ? styles.visible : ''}`}
      aria-labelledby="cta-heading"
    >
      <div className={`rt-rail rt-rail-dark h-full ${styles.ctaBorderBox}`}>
          <div className={styles.ctaContent}>
            <h2 id="cta-heading" className={styles.ctaTitle}>
              Fundraising isn't guesswork. <br /> <span className="italic font-serif">It's an investment process.</span>
            </h2>
            <p className={styles.ctaDescription}>
              RaiseTalks helps you run it like a pro — automated data rooms, real investor insights, and deal-ready files.
            </p>
            <div className={styles.ctaButtons}>
              <Link className={styles.ctaBtnPrimary} to="https://app.raisetalks.com/sign-up">
                Try it Free
              </Link>
              <Link className={styles.ctaBtnSecondary} to="https://calendly.com/iamdariiava/30min">
                Book a Demo
              </Link>
            </div>
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
        <meta property="og:image" content="https://raisetalks.com/img/og-raisetalks.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RaiseTalks - AI-Powered Fundraising Workspace for Founders" />
        <meta name="twitter:description" content="Build investor-grade data rooms, get AI readiness scores, and close your round faster." />
        <meta name="twitter:image" content="https://raisetalks.com/img/og-raisetalks.jpg" />
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
      <LogoCarousel />
      <GridSeam />
      {/* Why RaiseTalks Section */}
      <section className={clsx(styles.whySection, styles.animateIn)}>
         <div className={`rt-rail ${styles.sectionContainer}`}>
            <h2 className={styles.workspaceHeading}>
               <span className={styles.workspaceHeadingLine1}>One Workspace.</span>
               <span className={styles.workspaceHeadingLine2}>Zero chaos.</span>
            </h2>

            <div className={styles.workspaceContent}>
               <div className={styles.workspaceCardsRow}>
                  <div className={styles.workspaceCard}>
                     <h3 className={styles.workspaceCardTitle}>From messy docs to investor-grade data</h3>
                     <p className={styles.workspaceCardDesc}>
                        Raw inputs in, investor-grade materials out: data room, narrative, metrics, evidence. Your story and your numbers finally match.
                     </p>
                  </div>

                  <div className={styles.workspaceCard}>
                     <h3 className={styles.workspaceCardTitle}>Standardized diligence, faster deals</h3>
                     <p className={styles.workspaceCardDesc}>
                        Founders, VCs, and accelerators work in one shared structure. No back-and-forth, no version chaos, nothing missing.
                     </p>
                  </div>

                  <div className={styles.workspaceCard}>
                     <h3 className={styles.workspaceCardTitle}>Data rails for VC private markets</h3>
                     <p className={styles.workspaceCardDesc}>
                        A workspace that stays current becomes live intelligence: interest signals, readiness scores, decision support. Trust compounds round to round.
                     </p>
                  </div>
               </div>

               <div className={styles.workspaceFounderCard}>
                  <div className={styles.workspaceFounderPhoto}>
                     <img
                        src="/img/dariia-founder.webp"
                        alt="Dr. Dariia Vasylieva - Founder & CEO, RaiseTalks"
                        loading="lazy"
                     />
                  </div>
                  <div className={styles.workspaceFounderPanel}>
                     <div className={styles.workspaceFounderQuoteGroup}>
                        <p className={styles.workspaceFounderQuote}>
                           "Great companies lose rounds to bad preparation, not bad businesses.{' '}
                           <strong>I spent a career fixing that by hand -  RaiseTalks does it at scale."</strong>
                        </p>

                        <div className={styles.workspaceFounderStats}>
                           <div className={styles.workspaceFounderStat}>
                              <p className={styles.workspaceFounderStatValue}>
                                 €3B<span>+</span>
                              </p>
                              <p className={styles.workspaceFounderStatLabel}>in closed deals</p>
                           </div>
                           <div className={styles.workspaceFounderStat}>
                              <p className={styles.workspaceFounderStatValue}>
                                 10k<span>+</span>
                              </p>
                              <p className={styles.workspaceFounderStatLabel}>startups reviewed</p>
                           </div>
                           <div className={styles.workspaceFounderStat}>
                              <p className={styles.workspaceFounderStatValue}>
                                 17 <span>years</span>
                              </p>
                              <p className={styles.workspaceFounderStatLabel}>on the investment side</p>
                           </div>
                        </div>
                     </div>

                     <div className={styles.workspaceFounderFooter}>
                        <div>
                           <p className={styles.workspaceFounderName}>Dr. Dariia Vasylieva</p>
                           <p className={styles.workspaceFounderRole}>Founder & CEO, RaiseTalks</p>
                        </div>
                        <a className={styles.workspaceFounderLinkedin} href="https://www.linkedin.com/in/dvasylieva/">
                           <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                              <path
                                 fillRule="evenodd"
                                 clipRule="evenodd"
                                 d="M13.6231 13.4889H11.254V9.81541C11.254 8.93943 11.2382 7.81177 10.0219 7.81177C8.78798 7.81177 8.59919 8.76619 8.59919 9.75164V13.4887H6.23012V5.93445H8.50442V6.96681H8.53626C8.76387 6.58149 9.09276 6.2645 9.48792 6.04962C9.88307 5.83473 10.3297 5.72999 10.7802 5.74655C13.1814 5.74655 13.6241 7.31037 13.6241 9.3448L13.6231 13.4889ZM3.55703 4.90184C3.28512 4.90189 3.0193 4.8221 2.79319 4.67256C2.56707 4.52302 2.39084 4.31045 2.28674 4.06174C2.18264 3.81302 2.15536 3.53932 2.20835 3.27525C2.26135 3.01118 2.39225 2.76861 2.58449 2.5782C2.77672 2.38779 3.02166 2.2581 3.28834 2.20553C3.55501 2.15295 3.83144 2.17986 4.08267 2.28285C4.3339 2.38583 4.54864 2.56027 4.69975 2.7841C4.85085 3.00793 4.93154 3.2711 4.93158 3.54034C4.93162 3.7191 4.89608 3.89612 4.82702 4.06128C4.75796 4.22645 4.65673 4.37653 4.52909 4.50296C4.40146 4.62939 4.24991 4.72968 4.08312 4.79812C3.91633 4.86656 3.73757 4.90181 3.55703 4.90184ZM4.74156 13.4889H2.37003V5.93445H4.74156V13.4889Z"
                                 fill="currentColor"
                              />
                           </svg>
                           Let's connect
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <GridSeam />
      <SolutionSection />
      <GridSeam />

      
      <GridSeam />
      <NarrativeBlock />
      <GridSeam />
      <PitchCompetitionsBlock />
      <GridSeam />
      <GridSeam variant="dark" innerClassName={`rt-rail h-full ${styles.ctaSeamRail}`} />
      <HomepageCTA />
      <GridSeam variant="dark" innerClassName={`rt-rail h-full ${styles.ctaSeamRail}`} />
    </Layout>
  );
}
