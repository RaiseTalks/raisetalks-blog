import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import SolutionSection, { DiligenceVideoBlock, NarrativeBlock, InvestorDiscoveryBlock } from '@site/src/components/SolutionSection';
import LogoCarousel from '@site/src/components/LogoCarousel';
import McpCommunicator from '../components/McpCommunicator';
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
      <div className={styles.heroInner}>
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
  return (
    <section
      ref={section.ref as React.RefObject<HTMLElement>}
      className={`${styles.animSection} ${section.visible ? styles.visible : ''} bg-[#fafafa] py-16`}
    >
      <div className="container px-4 mx-auto flex flex-col lg:flex-row gap-10 lg:gap-[90px]">
      <div className="w-full lg:w-[480px] lg:flex-shrink-0">
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
      <div className="border-b border-[#e4e4e7] p-6 md:p-12">
        <h4 className="text-[24px] leading-[32px] font-normal text-black m-0 mb-[15px]" style={{ fontWeight: 400 }}>Direct founder access.</h4>
        <p className="text-[14.714px] leading-[1.2] text-[#4b4b4b] m-0">From first look to first conversation.</p>

      </div>
      <div className="border-b md:border-l border-[#e4e4e7] p-6 md:p-12">
        <h4 className="text-[24px] leading-[32px] font-normal text-black m-0 mb-[15px]" style={{ fontWeight: 400 }}>100+ vetted startups per cohort</h4>
        <p className="text-[14.714px] leading-[1.2] text-[#4b4b4b] m-0">Screened before they reach you.</p>
      </div>
        <div className="border-b md:border-b-0 border-[#e4e4e7] p-6 md:p-12">
          <h4 className="text-[24px] leading-[32px] font-normal text-black m-0 mb-[15px]" style={{ fontWeight: 400 }}>Standardized data rooms for every participant.</h4>
          <p className="text-[14.714px] leading-[1.2] text-[#4b4b4b] m-0">No chasing documents.</p>
        </div>
        <div className="md:border-l border-[#e4e4e7] p-6 md:p-12">
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
      <div className={`container mx-auto h-full ${styles.ctaBorderBox}`}>
          <div className={styles.ctaBackgroundWindow} aria-hidden="true">
            <img src="/img/cta-navy-bg.svg" className={styles.ctaBackgroundArt} alt="" />
          </div>
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
      <WorkspaceBanner />
      <GridSeam />
      <DiligenceVideoBlock />
      <GridSeam />
      <SolutionSection />
      <GridSeam />
      <NarrativeBlock />
      <GridSeam />
      <PitchCompetitionsBlock />
      <GridSeam />
      <InvestorDiscoveryBlock />
      <GridSeam />
      <McpCommunicator />
      <GridSeam variant="dark" />
      <HomepageCTA />
    </Layout>
  );
}
