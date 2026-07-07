import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Head from '@docusaurus/Head';
import Heading from "@theme/Heading";
import useBaseUrl from "@docusaurus/useBaseUrl";
import LogoCarousel from "@site/src/components/LogoCarousel";
import PhotoCarousel from "@site/src/components/PhotoCarousel";

import styles from "./about-us.module.css";

// Icon components

const NoDataRoomIcon = ({ className }: { className?: string }) => (
   <svg className={className} width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_i_1430_739)">
         <rect width="64" height="64" rx="12" fill="#FAFAFA" />
         <rect x="0.5" y="0.5" width="63" height="63" rx="11.5" stroke="#DAE0E7" />
         <path d="M30.1184 21.7688C31.0955 20.0018 32.6386 18.6147 34.4994 17.8308C36.3602 17.0469 38.4307 16.9116 40.3777 17.4468C41.0345 17.6268 41.1875 18.4396 40.7061 18.9225L36.0466 23.5789C35.7718 23.8592 35.6179 24.2361 35.6179 24.6287C35.6179 25.0212 35.7718 25.3981 36.0466 25.6784L38.4461 28.0779C38.7264 28.3527 39.1033 28.5066 39.4959 28.5066C39.8884 28.5066 40.2653 28.3527 40.5456 28.0779L45.2036 23.4214C45.6835 22.9386 46.4979 23.0915 46.6778 23.7484C47.2134 25.6956 47.0783 27.7663 46.2944 29.6274C45.5104 31.4886 44.1231 33.0319 42.3558 34.009M34.247 34.3765L22.4295 46.1938C21.8329 46.7902 21.0238 47.1251 20.1802 47.125C19.3366 47.1249 18.5277 46.7896 17.9313 46.193C17.3348 45.5964 16.9999 44.7873 17 43.9437C17.0001 43.1002 17.3354 42.2912 17.932 41.6948L29.7495 29.8775M17.0007 17.1304L46.9943 47.1235" stroke="#999999" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
         <filter id="filter0_i_1430_739" x="0" y="0" width="64" height="68" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1430_739" />
         </filter>
      </defs>
   </svg>
);

const NoPitchCoachIcon = ({ className }: { className?: string }) => (
   <svg className={className} width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_i_1430_744)">
         <rect width="64" height="64" rx="12" fill="#FAFAFA" />
         <rect x="0.5" y="0.5" width="63" height="63" rx="11.5" stroke="#DAE0E7" />
         <path d="M27.9667 26.1884L16.8579 40.9034C16.5965 41.2496 16.4715 41.675 16.5055 42.1027C16.5395 42.5305 16.7302 42.9323 17.0432 43.2355L18.5574 44.7052C18.8749 45.0128 19.2968 45.1981 19.7447 45.2269C20.1926 45.2556 20.636 45.1258 20.9927 44.8616L35.5468 34.0921M38.16 50.5751C36.3067 49.3641 34.2161 48.4658 31.6734 48.4658C27.8592 48.4658 24.3935 52.6988 20.5534 52.0592C16.7133 51.4196 15.4104 46.0061 17.7734 43.974M46.5 25.1085C46.5 30.07 42.3512 34.0921 37.2334 34.0921C32.1155 34.0921 27.9667 30.07 27.9667 25.1085C27.9667 20.1471 32.1155 16.125 37.2334 16.125C42.3512 16.125 46.5 20.1471 46.5 25.1085Z" stroke="#999999" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
         <line x1="42.7702" y1="42.93" x2="18.7702" y2="19.93" stroke="#FAFAFA" strokeWidth="5" />
         <line x1="18.0906" y1="22.0912" x2="40.4662" y2="43.5344" stroke="#999999" strokeWidth="2.25" strokeLinecap="round" />
      </g>
      <defs>
         <filter id="filter0_i_1430_744" x="0" y="0" width="64" height="68" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1430_744" />
         </filter>
      </defs>
   </svg>
);

export default function AboutUs() {
   const goalCardBg = useBaseUrl('/img/11f2836e48717136d3bcf81e1a5c1e68e98d08a0.png');
   const visionTimelineImg = useBaseUrl('/img/about-us/vision-timeline.png');
   return (
      <Layout
         title="About Us | RaiseTalks"
         description="RaiseTalks is an AI-native fundraising workspace translating founder potential into investor-grade intelligence. Learn our mission, values, and vision."
      >
         <Head>
           <meta name="description" content="RaiseTalks is an AI-native fundraising workspace translating founder potential into investor-grade intelligence. Learn our mission, values, and vision." />
           <meta name="robots" content="index, follow" />
           <link rel="canonical" href="https://raisetalks.com/about-us" />
           <meta property="og:title" content="About Us | RaiseTalks" />
           <meta property="og:description" content="RaiseTalks is an AI-native fundraising workspace translating founder potential into investor-grade intelligence." />
           <meta property="og:url" content="https://raisetalks.com/about-us" />
           <meta property="og:type" content="website" />
           <meta property="og:image" content="https://raisetalks.com/img/og-raisetalks.jpg" />
           <meta name="twitter:card" content="summary_large_image" />
           <meta name="twitter:title" content="About Us | RaiseTalks" />
           <meta name="twitter:description" content="RaiseTalks is an AI-native fundraising workspace translating founder potential into investor-grade intelligence." />
           <meta name="twitter:image" content="https://raisetalks.com/img/og-raisetalks.jpg" />
           <meta name="twitter:site" content="@raisetalks" />
           <script type="application/ld+json">{JSON.stringify({
             "@context": "https://schema.org",
             "@type": "AboutPage",
             "name": "About RaiseTalks",
             "url": "https://raisetalks.com/about-us",
             "description": "RaiseTalks is an AI-native fundraising workspace translating founder potential into investor-grade intelligence.",
             "publisher": { "@type": "Organization", "name": "RaiseTalks", "url": "https://raisetalks.com" }
           })}</script>
         </Head>
         {/* Hero Section */}
         <section className={styles.hero}>
            <div className={styles.heroInner}>
               <div className={styles.heroEyebrow}>We Are</div>
               <Heading as="h1" className={styles.heroTitle}>
                  Translating founder potential into <br />
                  <span className={styles.heroAccent}>investor-grade intelligence</span>
               </Heading>
               <div className={styles.heroActions}>
                  <Link className={styles.btnPrimary} to="https://calendly.com/iamdariiava/30min">
                     Browse startups
                  </Link>
                  <Link className={styles.btnSecondary} to="https://calendly.com/iamdariiava/30min">
                     Schedule Demo
                  </Link>
               </div>
            </div>
         </section>

         {/* Rail Divider — no vertical rail: hero's rail (1152) and the
             goal card's rail (720) differ in width, so this strip carries
             only the horizontal line, matching the wide-to-narrow pattern
             used on the investors page. */}
         <div className={styles.railDividerLight}></div>

         {/* Goal Section */}
         <section className={clsx(styles.goalSection, styles.animateIn)}>
            <div className={styles.goalContainer}>
               <div className={styles.goalEyebrow}>Our 10-Year Goal</div>
               <div className={styles.goalCardWrap}>
                  <blockquote className={styles.goalCard}>
                     <img src={goalCardBg} alt="" aria-hidden="true" className={styles.goalCardBg} />
                     <p className={styles.goalCardQuote}>
                        Power 1M entrepreneurs to close rounds faster, deploying over{' '}
                        <span className={styles.goalCardHighlight}>$100 Bn</span>{' '}
                        in capital by 2036.
                     </p>
                     <p className={styles.goalCardSub}>We believe it's possible - and worth it because it changes the world.</p>
                  </blockquote>
               </div>
            </div>
         </section>

         {/* Rail Divider — no vertical rail: goal card (720) and Why We
             Build (1152) differ in width, same reasoning as above. */}
         <div className={styles.railDividerLight}></div>

         {/* Why We Exist Section */}
         <section className={clsx(styles.missionSection, styles.animateIn)}>
            
            <div className={styles.sectionContainer}>
               <div className={styles.whyExistInner}>
                  <div className={styles.whyBuildRow1}>
                     <div className={styles.whyBuildHeadingCol}>
                        <h2 className={styles.whyExistTitleLight}><em>Why</em> we Build.</h2>
                     </div>
                     <div className={styles.whyBuildPurposeCol}>
                        <div className={styles.whyBuildEyebrow}>Our Purpose</div>
                        <p className={styles.whyExistBodyLight}>To democratize access to capital by making every serious founder investor-ready - regardless of their network, their background, or how many times they've done this before.</p>
                     </div>
                  </div>

                  <div className={styles.whyBuildRow2}>
                     <div className={styles.whyBuildTextCol}>
                        <p className={styles.whyExistBodyLight}>
                           Capital has always flowed most easily to those who already know the language: <br />the repeat founders, the Stanford alumni, the people who went to school with the partners.
                        </p>

                        <p className={styles.whyBuildPullQuote}>RaiseTalks is the great equalizer.</p>

                        <p className={styles.whyExistBodyLight}>We encode the knowledge that used to live only in warm introductions, and we give it to every founder who's serious enough to show up.</p>

                        <p className={styles.whyExistBodyLight}>This is not a small aspiration.</p>

                        <p className={styles.whyExistBodyLight}>It is a structural reshaping of how capital moves in the world.</p>

                        <p className={clsx(styles.whyExistBodyLight, "font-semibold")}>When great ideas stop dying in due diligence, the entire innovation ecosystem becomes more productive.</p>
                     </div>
                     <div className={styles.whyBuildGraphicCol}>
                        <img src="/img/about-us/shiny-logo.png" className={styles.whyBuildGraphic} alt="RaiseTalks brand mark" loading="lazy" />
                     </div>
                  </div>
               </div>
            </div>
            <PhotoCarousel />
         </section>

         {/* Rail Divider */}
         <div className={styles.railDividerLight}>
            <div className={styles.railDividerInner}></div>
         </div>

         {/* Vision Section */}
         <section className={clsx(styles.visionSection, styles.animateIn)}>
            <div className={styles.sectionContainer}>
               <div className={styles.visionInner}>
                  <div className={styles.visionLeftCol}>
                     <div className={styles.visionHeadingBlock}>
                        <h2 className={styles.visionHeading}>
                           <span className={styles.visionHeadingLine1}>What we're</span>
                           <span className={styles.visionHeadingLine2}>Building Toward</span>
                        </h2>
                        <p className={styles.visionSubtitleText}>
                           RaiseTalks is the operating system of early-stage capital - the infrastructure layer through which deals are organized, evaluated, and funded globally.
                        </p>
                     </div>

                     <div className={styles.visionCompareRow}>
                        <div className={styles.visionCompareItem}>
                           <NoDataRoomIcon className={styles.visionCompareIcon} />
                           <p className={styles.visionCompareText}>Not just a data room tool.</p>
                        </div>
                        <div className={styles.visionCompareItem}>
                           <NoPitchCoachIcon className={styles.visionCompareIcon} />
                           <p className={styles.visionCompareText}>Not just a pitch coach.</p>
                        </div>
                     </div>

                     <div className={styles.visionParagraphBox}>
                        <p className={styles.visionParagraphLead}>We are the connective tissue between the world's best founders and the capital they need to change it.</p>
                        <p className={styles.visionParagraphSub}>A platform that has processed enough raises, tracked enough outcomes, and built enough intelligence to know - with genuine predictive accuracy - what a successful company looks like at the seed stage.</p>
                     </div>
                  </div>

                  <div className={styles.visionGraphicCol}>
                     <div className={styles.visionRotateWrap}>
                        <img
                           src={visionTimelineImg}
                           alt="Timeline: In 5 years, the RaiseTalks Readiness Score becomes the industry benchmark - the first thing investors ask about and founders prepare for. In 10 years, RaiseTalks becomes the infrastructure connecting founders and investors across markets, stages, and geographies - the Bloomberg Terminal of early-stage startup capital."
                           className={styles.visionHorizons}
                           loading="lazy"
                        />
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Rail Divider */}
         <div className={styles.railDividerLight}>
            <div className={styles.railDividerInner}></div>
         </div>

         {/* Partners Section */}
         <section className={clsx(styles.partnersSection, styles.animateIn)}>
            <div className={styles.sectionContainer}>
               <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitlePlain}>Our Backers & Partners</h2>
               </div>
            </div>
            <div className={styles.partnersCarouselWrap}>
               <LogoCarousel />
            </div>
         </section>

         {/* Rail Divider */}
         <div className={styles.railDividerLight}>
            <div className={styles.railDividerInner}></div>
         </div>

         {/* Why RaiseTalks Section */}
         <section className={clsx(styles.whySection, styles.animateIn)}>
            <div className={styles.sectionContainer}>
               <h2 className={styles.workspaceHeading}>
                  <span className={styles.workspaceHeadingLine1}>One Workspace.</span>
                  <span className={styles.workspaceHeadingLine2}>Zero chaos.</span>
               </h2>

               <div className={styles.workspaceRow}>
                  <div className={styles.workspaceCardsCol}>
                     <div className={styles.workspaceCard}>
                        <h3 className={styles.workspaceCardTitle}>From messy docs to investor-grade data</h3>
                        <p className={styles.workspaceCardDesc}>
                           We transform raw startup inputs into structured, consistent, investor-ready materials - data room, narrative, metrics, and diligence-ready evidence - so your story and numbers match.
                        </p>
                     </div>

                     <div className={styles.workspaceCard}>
                        <h3 className={styles.workspaceCardTitle}>Standardized diligence that moves deals faster</h3>
                        <p className={styles.workspaceCardDesc}>
                           RaiseTalks aligns founders, VCs, and accelerators on one shared structure and workflow - reducing back-and-forth, version chaos, and missing information.
                        </p>
                     </div>

                     <div className={styles.workspaceCard}>
                        <h3 className={styles.workspaceCardTitle}>Data rails for VC private markets</h3>
                        <p className={styles.workspaceCardDesc}>
                           As your workspace stays current, RaiseTalks becomes a real-time intelligence layer: interest signals, readiness scoring, and decision support - so trust compounds from round to round.
                        </p>
                     </div>
                  </div>

                  <div className={styles.workspaceFounderCard}>
                     <p className={styles.workspaceFounderQuote}>
                        "RaiseTalks is an AI-native VC investment-intelligence platform for early-stage portfolios: founders get investor-grade data rooms, readiness scores, and structured IR pipelines, while funds get faster diligence, clearer IC prep, and earlier visibility into the right deals. I've spent 17 years on the investment side, closed €3B+ in deals, and reviewed 10,000+ startups, and I'm turning that investment-readiness playbook into an AI-native platform that becomes the natural end-to-end workspace for VC investments."
                     </p>
                     <div className={styles.workspaceFounderFooter}>
                        <div className={styles.workspaceFounderAvatar}>
                           <img
                              src="/img/icons/dariia.jpg"
                              alt="Dr. Dariia Vasylieva - President, CEO"
                              loading="lazy"
                           />
                        </div>
                        <div>
                           <p className={styles.workspaceFounderName}>Dr. Dariia Vasylieva</p>
                           <p className={styles.workspaceFounderRole}>President, CEO at RaiseTalks</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Rail Divider */}
         <div className={styles.railDividerLight}>
            <div className={styles.railDividerInner}></div>
         </div>

         {/* Values Section */}
         <section className={clsx(styles.valuesSection, styles.animateIn)}>
            <div className={styles.sectionContainer}>
               <div className={styles.valuesHeaderRow}>
                  <h2 className={styles.valuesHeading}>
                     <span className={styles.valuesHeadingLine1}>We Believe</span>
                     <span className={styles.valuesHeadingLine2}>in our Values</span>
                  </h2>
                  <p className={styles.valuesSubtitleText}>
                     Our values are the decisions we make when no one is watching - and especially when the right choice is the expensive one.
                  </p>
               </div>

               <div className={styles.valuesGrid}>
                  {[
                     {
                        num: '01',
                        name: 'Founder First.',
                        quote: '"Take care of the people first." - Ben Horowitz',
                        desc: 'Every feature, decision, tradeoff is evaluated through one lens: does this make a founder\'s raise more likely to succeed?',
                     },
                     {
                        num: '02',
                        name: 'Intelligence Compounds.',
                        quote: '"1% better every day = 37x in a year." - Kaizen',
                        desc: 'Every raise we process makes us smarter. Every mistake we make becomes a system improvement. We never waste a setback.',
                     },
                     {
                        num: '03',
                        name: 'Flow Over Force.',
                        quote: '"Wu wei - action through alignment." - Lao Tzu',
                        desc: 'The best product experiences feel effortless. We build for flow - the state where the right next step is obvious, the friction is invisible.',
                     },
                     {
                        num: '04',
                        name: 'Earn the Trust, Every Time.',
                        quote: '"Earn trust before you need it." - CEO Excellence (McKinsey)',
                        desc: 'Founders share their most sensitive information with us - financials, cap tables, internal documents. We treat this as sacred.',
                     },
                     {
                        num: '05',
                        name: 'Equity in Access.',
                        quote: '"Geography and biology shape outcomes more than individual genius." - Jared Diamond',
                        desc: 'The founder in London, Dubai, or Accra deserves the same intelligence as the one in San Francisco.',
                     },
                     {
                        num: '06',
                        name: 'Build to Last.',
                        quote: '"Preserve the core. Stimulate progress." - Jim Collins',
                        desc: 'We make decisions with a 10-year lens. We don\'t optimize for the metric of the quarter at the expense of the trust of the decade.',
                     },
                  ].map(({ num, name, quote, desc }) => (
                     <div key={num} className={styles.valueCard}>
                        <h3 className={styles.valueCardName}>{name}</h3>
                        <p className={styles.valueCardDesc}>{desc}</p>
                        <div className={styles.valueQuoteBox}>
                           <p className={styles.valueCardQuote}>{quote}</p>
                        </div>
                     </div>
                  ))}

               </div>
            </div>
         </section>

         {/* Rail Divider */}
         <div className={styles.railDividerLight}>
            <div className={styles.railDividerInner}></div>
         </div>
         <div className={styles.railDividerDark}>
            <div className={styles.railDividerInner}></div>
         </div>

         {/* CTA Section */}
         <section className={clsx(styles.ctaSection, styles.animateIn)}>
            <div className={styles.ctaContent}>
               <div className={styles.ctaTextGroup}>
                  <Heading as="h2" className={styles.ctaTitle}>
                     <span className={styles.ctaTitleLine1}>Investors</span>
                     <span className={styles.ctaTitleLine2}>Build With Us</span>
                  </Heading>
                  <p className={styles.ctaDescription}>
                     Bring a trusted, standardized diligence layer to your portfolio or program - accelerating deal execution with investor-grade structure and real-time intelligence.
                  </p>
               </div>

               <div className={styles.ctaButtons}>
                  <Link className={styles.ctaBtnPrimary} to="https://calendly.com/iamdariiava/30min">
                     Book a Demo
                  </Link>
                  <Link className={styles.ctaBtnSecondary} to="https://app.raisetalks.com/sign-up">
                     Try it FREE
                  </Link>
               </div>
            </div>
         </section>

         {/* Rail Divider */}
         <div className={styles.railDividerDark}>
            <div className={styles.railDividerInner}></div>
         </div>
      </Layout>
   );
}
