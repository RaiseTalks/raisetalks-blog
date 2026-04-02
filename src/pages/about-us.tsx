import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import LogoCarousel from "@site/src/components/LogoCarousel";

import styles from "./about-us.module.css";

// Icon components
const SparklesIcon = ({ className }: { className?: string }) => (
   <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      <circle cx="12" cy="12" r="3" />
   </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
   <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
   </svg>
);



const FileStackIcon = ({ className }: { className?: string }) => (
   <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 7h-3a2 2 0 0 1-2-2V2" />
      <path d="M21 6v6.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5H17l4 4z" />
      <path d="M7 8v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H15" />
      <path d="M3 12v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H11" />
   </svg>
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
   <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
   </svg>
);

const BarChartIcon = ({ className }: { className?: string }) => (
   <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
   </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
   <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
   </svg>
);

// Badge Component
function Badge({
   children,
   variant = "default",
   className = "",
}: {
   children: React.ReactNode;
   variant?: "default" | "secondary" | "outline";
   className?: string;
}) {
   return <span className={clsx(styles.badge, styles[`badge--${variant}`], className)}>{children}</span>;
}

// Button Component
function Button({
   children,
   size = "default",
   variant = "default",
   className = "",
   href,
}: {
   children: React.ReactNode;
   size?: "default" | "lg";
   variant?: "default" | "outline";
   className?: string;
   href?: string;
}) {
   const buttonClass = clsx(styles.button, styles[`button--${variant}`], styles[`button--${size}`], className);

   if (href) {
      return (
         <Link className={buttonClass} to={href}>
            {children}
         </Link>
      );
   }

   return <button className={buttonClass}>{children}</button>;
}

export default function AboutUs() {
   return (
      <Layout
         title="About Us | RaiseTalks"
         description="RaiseTalks is an AI-native fundraising workspace translating founder potential into investor-grade intelligence. Learn our mission, values, and vision."
      >
         {/* Hero Section */}
         <section className={styles.hero}>
            <div className={styles.heroInner}>
               <div className={styles.heroEyebrow}>What We Do</div>
               <Heading as="h1" className={styles.heroTitle}>
                  Translating founder potential into{' '}
                  <span className={styles.heroAccent}>investor-grade intelligence</span>
               </Heading>
               <div className={styles.heroActions}>
                  <Link className={styles.btnPrimary} to="https://calendly.com/iamdariiava/30min">
                     Book a Demo
                  </Link>
                  <Link className={styles.btnSecondary} to="/startups#perks">
                     Get access to Perks
                  </Link>
               </div>
            </div>
         </section>

         {/* Goal Section */}
         <section className={clsx(styles.goalSection, styles.animateIn)}>
            <div className={styles.sectionContainer}>
               <div className={styles.goalBar}>
                  <span className={styles.goalBarLabel}>10Y Goal</span>
                  <blockquote className={styles.goalBarQuote}>
                     Power 1M entrepreneurs to close rounds faster, deploying over{' '}
                     <span className={styles.accentText}>$100 Bn</span>{' '}
                     in capital by 2036.
                     <span className={styles.goalBarSub}>We believe it's possible - and worth it because it changes the world.</span>
                  </blockquote>
               </div>
            </div>
         </section>

         {/* Why We Exist Section */}
         <section className={clsx(styles.missionSection, styles.animateIn)}>
            <div className={styles.missionBackground}></div>
            <div className={styles.sectionContainer}>
               <div className={styles.whyExistInner}>
                  <div className={styles.eyebrowPillLight}>Purpose</div>
                  <h2 className={styles.whyExistTitleLight}>Why We <em>Build</em></h2>
                  <div className={styles.whyExistStatementLight}>
                     To democratize access to capital by making every serious founder investor-ready - regardless of their network, their background, or how many times they've done this before.
                  </div>
                  <p className={styles.whyExistBodyLight}>
                     Capital has always flowed most easily to those who already know the language - the repeat founders, the Stanford alumni, the people who went to school with the partners. RaiseTalks is the great equalizer. We encode the knowledge that used to live only in warm introductions, and we give it to every founder who's serious enough to show up.
                  </p>
                  <p className={styles.whyExistBodyLight}>
                     This is not a small aspiration. It is a structural reshaping of how capital moves in the world. When great ideas stop dying in due diligence, the entire innovation ecosystem becomes more productive.
                  </p>
               </div>
               <div className={styles.missionGallery}>
                  <div className={styles.missionGalleryItem}>
                     <img src="/img/about-us/43.jpg" alt="RaiseTalks team" className={styles.missionGalleryImage} />
                  </div>
                  <div className={styles.missionGalleryItem}>
                     <img src="/img/about-us/44.jpg" alt="RaiseTalks team" className={styles.missionGalleryImage} />
                  </div>
                  <div className={styles.missionGalleryItem}>
                     <img src="/img/about-us/45.jpg" alt="RaiseTalks team" className={styles.missionGalleryImage} />
                  </div>
                  <div className={styles.missionGalleryItem}>
                     <img src="/img/about-us/46.jpg" alt="RaiseTalks team" className={styles.missionGalleryImage} />
                  </div>
                  <div className={styles.missionGalleryItem}>
                     <img src="/img/about-us/47.jpg" alt="RaiseTalks team" className={styles.missionGalleryImage} />
                  </div>
                  <div className={styles.missionGalleryItem}>
                     <img src="/img/about-us/48.jpg" alt="RaiseTalks team" className={styles.missionGalleryImage} />
                  </div>
               </div>
            </div>
         </section>


         {/* Vision Section */}
         <section className={clsx(styles.visionSection, styles.animateIn)}>
            <div className={styles.sectionContainer}>
               <div className={styles.sectionHeader}>
                  <div className={styles.eyebrowPill}>Vision</div>
                  <h2 className={styles.sectionTitlePlain}>What We're <em className={styles.accentText}>Building Toward</em></h2>
                  <p className={styles.sectionSubtitle}>
                     RaiseTalks is the operating system of early-stage capital - the infrastructure layer through which deals are organized, evaluated, and funded globally.
                  </p>
               </div>
               <div className={styles.goalInner}>
                  <p className={styles.whyExistBody}>
                     Not a data room tool. Not a pitch coach. The connective tissue between the world's best founders and the capital they need to change it. A platform that has processed enough raises, tracked enough outcomes, and built enough intelligence to know - with genuine predictive accuracy - <em>what a successful company looks like at the seed stage</em>.
                  </p>
                  <div className={styles.visionHorizons}>
                     <div className={styles.visionHorizonCard}>
                        <div className={styles.visionTimelinePoint}>
                           <span className={styles.visionTimelineLabel}>5YR</span>
                           <div className={styles.visionTimelineDot}></div>
                        </div>
                        <h3 className={styles.visionHorizonTitle}>The Intelligence Standard</h3>
                        <p className={styles.visionHorizonDesc}>RaiseTalks Readiness Score becomes the industry benchmark - the first thing investors ask about and the first thing founders prepare for. "What's your RaiseTalks score?" is a standard pre-meeting question.</p>
                     </div>
                     <div className={styles.visionHorizonCard}>
                        <div className={styles.visionTimelinePoint}>
                           <span className={styles.visionTimelineLabel}>10YR</span>
                           <div className={styles.visionTimelineDot}></div>
                        </div>
                        <h3 className={styles.visionHorizonTitle}>The Capital Layer</h3>
                        <p className={styles.visionHorizonDesc}>RaiseTalks becomes the infrastructure that connects founders and investors across markets, stages, and geographies - the Bloomberg Terminal of early-stage startup capital.</p>
                     </div>
                     <div className={styles.visionHorizonLine} aria-hidden="true"></div>
                  </div>
               </div>
            </div>
         </section>

         {/* Why RaiseTalks Section */}
         <section className={clsx(styles.whySection, styles.animateIn)}>
            <div className={styles.sectionContainer}>
               <div className={styles.sectionHeader}>
                  <div className={styles.eyebrowPill}>One workspace. Zero chaos.</div>
                  <h2 className={styles.sectionTitle}>Why RaiseTalks</h2>
               </div>

               <div className={styles.gridThree}>
                  <div className={styles.featureCard} style={{ animationDelay: "0ms" }}>
                     <div className={styles.featureCardHeader}>
                        <div className={styles.featureIconContainer}>
                           <FileStackIcon className={styles.featureIcon} />
                        </div>
                        <h3 className={styles.featureTitle}>From messy docs to investor-grade data</h3>
                     </div>
                     <p className={styles.featureDescription}>
                        We transform raw startup inputs into structured, consistent, investor-ready materials - data room, narrative, metrics, and diligence-ready evidence - so your story and numbers match.
                     </p>
                  </div>

                  <div className={styles.featureCard} style={{ animationDelay: "50ms" }}>
                     <div className={styles.featureCardHeader}>
                        <div className={styles.featureIconContainer}>
                           <CheckCircleIcon className={styles.featureIcon} />
                        </div>
                        <h3 className={styles.featureTitle}>Standardized diligence that moves deals faster</h3>
                     </div>
                     <p className={styles.featureDescription}>
                        RaiseTalks aligns founders, VCs, and accelerators on one shared structure and workflow - reducing back-and-forth, version chaos, and missing information.
                     </p>
                  </div>

                  <div className={styles.featureCard} style={{ animationDelay: "100ms" }}>
                     <div className={styles.featureCardHeader}>
                        <div className={styles.featureIconContainer}>
                           <BarChartIcon className={styles.featureIcon} />
                        </div>
                        <h3 className={styles.featureTitle}>Data rails for VC private markets</h3>
                     </div>
                     <p className={styles.featureDescription}>
                        As your workspace stays current, RaiseTalks becomes a real-time intelligence layer: interest signals, readiness scoring, and decision support - so trust compounds from round to round.
                     </p>
                  </div>
               </div>

               <div className={styles.founderCard}>
                  <div className={styles.founderLayout}>
                     <div className={styles.founderImageContainer}>
                        <div className={styles.founderImage}>
                           <img
                              src="/img/icons/dariia.png"
                              alt="Dr. Dariia Vasylieva - President, CEO"
                              className={styles.founderImageInner}
                           />
                        </div>
                        <div className={styles.founderMeta}>
                           <div className={styles.founderNameRow}>
                              <h3 className={styles.founderName}>Dr. Dariia Vasylieva</h3>
                              <span className={styles.founderRoleLine}>President, CEO at RaiseTalks</span>
                           </div>
                           <a
                              href="https://www.linkedin.com/in/dvasylieva/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.founderLinkedIn}
                           >
                              <LinkedInIcon className={styles.linkedInIcon} />
                           </a>
                        </div>
                     </div>

                     <div className={styles.founderContent}>
                        <blockquote className={styles.blockquote}>
                           <p className={styles.blockquoteText}>
                              "RaiseTalks is an AI-native VC investment-intelligence platform for early-stage portfolios: founders get investor-grade data rooms, readiness scores, and structured IR pipelines, while funds get faster diligence, clearer IC prep, and earlier visibility into the right deals. I've spent 17 years on the investment side, closed €3B+ in deals, and reviewed 10,000+ startups, and I'm turning that investment-readiness playbook into an AI-native platform that becomes the natural end-to-end workspace for VC investments."
                           </p>
                           <cite className={styles.blockquoteCite}>— Dr. Dariia Vasylieva</cite>
                        </blockquote>

                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Values Section */}
         <section className={clsx(styles.valuesSection, styles.animateIn)}>
            <div className={styles.sectionContainer}>
               <div className={styles.sectionHeader}>
                  <span className={styles.eyebrowPill}>Values</span>
                  <h2 className={styles.sectionTitlePlain}>What We Believe</h2>
                  <p className={styles.sectionSubtitle}>
                     Values are not wall art. They are the decisions we make when no one is watching - and especially when the right choice is the expensive one.
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
                        <div className={styles.valueCardNumWrap}>
                           <span className={styles.valueCardNum}>{num}</span>
                        </div>
                        <div>
                           <h3 className={styles.valueCardName}>{name}</h3>
                           <p className={styles.valueCardQuote}>{quote}</p>
                           <p className={styles.valueCardDesc}>{desc}</p>
                        </div>
                     </div>
                  ))}

               </div>
            </div>
         </section>

         {/* Partners Section */}
         <section className={clsx(styles.partnersSection, styles.animateIn)}>
            <div className={styles.sectionContainer}>
               <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitlePlain}>Our Backers & Partners</h2>
               </div>
               <LogoCarousel />
            </div>
         </section>

         {/* CTA Section */}
         <section className={clsx(styles.ctaSection, styles.animateIn)}>
            <div className={styles.ctaBackground}></div>
            <div className={styles.ctaContent}>
               <Heading as="h2" className={styles.ctaTitle}>
                  Investors Build With Us
               </Heading>
               <p className={styles.ctaDescription}>
                  Bring a trusted, standardized diligence layer to your portfolio or program - accelerating deal execution with investor-grade structure and real-time intelligence.
               </p>

               <div className={styles.ctaButtons}>
                  <Link className={styles.ctaButtonPrimary} to="https://calendly.com/iamdariiava/30min">
                     Book A Demo
                  </Link>
                  <Link className={styles.ctaButtonSecondary} to="https://app.raisetalks.com/sign-up">
                     Try It Free
                  </Link>
               </div>
            </div>
         </section>
      </Layout>
   );
}
