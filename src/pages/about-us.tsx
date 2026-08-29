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

export default function AboutUs() {
   const goalCardBg = useBaseUrl('/img/backgrounds/blue-section-desktop.webp');
   const visionTimelineImg = useBaseUrl('/img/about-us/vision-timeline.svg');
   const visionTimelineMobileImg = useBaseUrl('/img/about-us/vision-timeline-mobile.svg');
   // Design-supplied replacements for the inline 64x64 icons that used to live
   // above: same two marks (crossed-out wrench, crossed-out microphone), redrawn
   // at 48x48 on a white card with a lighter #E6EAEF hairline. Rendered at 40px
   // by .visionCompareIcon either way.
   const noDataRoomIcon = useBaseUrl('/img/icons/not-a-tool.svg');
   const noPitchCoachIcon = useBaseUrl('/img/icons/not-a-coach.svg');
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
                  Translating founder potential <br />
                  <span className={styles.heroAccent}> into investor-grade intelligence</span>
               </Heading>
               <div className={styles.heroActions}>
                  <Link className={styles.btnPrimary} to="https://app.raisetalks.com/startups">
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
                  <h2 className={styles.whyExistTitleLight}><em>Why</em> we Build.</h2>

                  <div className={styles.whyBuildBody}>
                     <p className={clsx(styles.whyExistBodyLight, styles.whyBuildP1)}>We strive to democratize access to capital by making every serious founder investor-ready - regardless of their network, their background, or how many times they've done this before.</p>

                     <p className={clsx(styles.whyExistBodyLight, styles.whyBuildP2)}>Capital has always flowed most easily to those who already know the language: the repeat founders, the Stanford alumni, the people who went to school with the partners.</p>

                     <p className={styles.whyBuildPullQuote}>RaiseTalks is the great equalizer.</p>

                     <p className={clsx(styles.whyExistBodyLight, styles.whyBuildP3)}>We encode the knowledge that used to live only in warm introductions, and we give it to every founder who's serious enough to show up.</p>

                     <p className={styles.whyExistBodyLight}>This is not a small aspiration.</p>

                     <p className={styles.whyExistBodyLight}>It is a structural reshaping of how capital moves in the world.</p>

                     <p className={clsx(styles.whyExistBodyLight, styles.whyBuildP4, "font-semibold")}>When great ideas stop dying in due diligence, the entire innovation ecosystem becomes more productive.</p>
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
                           <img src={noDataRoomIcon} alt="" aria-hidden="true" className={styles.visionCompareIcon} />
                           <p className={styles.visionCompareText}>Not just a data room tool.</p>
                        </div>
                        <div className={styles.visionCompareItem}>
                           <img src={noPitchCoachIcon} alt="" aria-hidden="true" className={styles.visionCompareIcon} />
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
                        <picture>
                           <source media="(max-width: 768px)" srcSet={visionTimelineMobileImg} />
                           <img
                              src={visionTimelineImg}
                              alt="Timeline: In 5 years, the RaiseTalks Readiness Score becomes the industry benchmark - the first thing investors ask about and founders prepare for. In 10 years, RaiseTalks becomes the infrastructure connecting founders and investors across markets, stages, and geographies - the Bloomberg Terminal of early-stage startup capital."
                              className={styles.visionHorizons}
                              loading="lazy"
                           />
                        </picture>
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
