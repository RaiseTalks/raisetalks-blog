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

const ZapIcon = ({ className }: { className?: string }) => (
   <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
   </svg>
);

const EyeIcon = ({ className }: { className?: string }) => (
   <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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
         title="About Us"
         description="Learn about RaiseTalks - AI-powered fundraising workspace for early-stage startups to organize data rooms and close rounds faster."
      >
         {/* Hero Section */}
         <section className="cleanHeroSection">
            <div className="cleanHeroContainer">
               <Heading as="h1" className="cleanHeroTitle">
                  About <span className="cleanHeroTitleAccent">RaiseTalks</span>
               </Heading>
               <p className="cleanHeroDescription">
                  <strong>AI-first global fundraising workspace</strong> for startups and investors to run deals, streamline due diligence, and
                  close rounds faster.
               </p>
               <div className="cleanHeroButtons">
                  <Link className="cleanHeroPrimaryButton" to="https://calendly.com/iamdariiava/30min">
                     Book a Demo
                  </Link>
               </div>
            </div>
         </section>

         {/* RaiseTalks in Numbers Section */}
         <section className={clsx(styles.numbersSection, styles.animateIn)}>
            <div className={styles.sectionContainer}>
               <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>RaiseTalks in Numbers</h2>
                  <div className={styles.sectionDivider}></div>
               </div>

               <div className={styles.gridThree}>
                  <div className={styles.statCard} style={{ animationDelay: "0ms" }}>
                     <p className={styles.statValue}>49+</p>
                     <p className={styles.statLabel}>Countries with Active Users</p>
                  </div>

                  <div className={styles.statCard} style={{ animationDelay: "50ms" }}>
                     <p className={styles.statValue}>Public Beta</p>
                     <p className={styles.statLabel}>Live and Growing</p>
                  </div>

                  <div className={styles.statCard} style={{ animationDelay: "100ms" }}>
                     <p className={styles.statValue}>$300M+</p>
                     <p className={styles.statLabel}>VC Deals Closed by Founder</p>
                  </div>
               </div>
            </div>
         </section>

         {/* Mission & Vision Section */}
         <section className={clsx(styles.missionSection, styles.animateIn)}>
            <div className={styles.missionBackground}></div>
            <div className={styles.sectionContainer}>
               <div className={styles.sectionHeader}>
                  <h2 className={clsx(styles.sectionTitle, styles.sectionTitleWhite)}>Mission & Vision</h2>
                  <div className={clsx(styles.sectionDivider, styles.sectionDividerWhite)}></div>
               </div>

               <div className={styles.gridTwo}>
                  {/* Mission Card */}
                  <div className={styles.missionCard} style={{ animationDelay: "0ms" }}>
                     <div className={styles.missionCardHeader}>
                        <div className={styles.missionIconContainer}>
                           <ZapIcon className={styles.missionIcon} />
                        </div>
                        <h3 className={styles.missionCardTitle}>Mission</h3>
                     </div>
                     <p className={styles.missionCardText}>
                        Make fundraising and diligence fast and reliable by standardizing company data into one investor-ready workspace
                     </p>
                  </div>

                  {/* Vision Card */}
                  <div className={styles.missionCard} style={{ animationDelay: "50ms" }}>
                     <div className={styles.missionCardHeader}>
                        <div className={styles.missionIconContainer}>
                           <EyeIcon className={styles.missionIcon} />
                        </div>
                        <h3 className={styles.missionCardTitle}>Vision</h3>
                     </div>
                     <p className={styles.missionCardText}>
                        Provide the real-time intelligence data layer that powers efficient venture capital deal execution across private markets
                     </p>
                  </div>
               </div>

               {/* Photo Gallery */}
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

         {/* Why RaiseTalks Section */}
         <section className={clsx(styles.whySection, styles.animateIn)}>
            <div className={styles.sectionContainer}>
               <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Why RaiseTalks</h2>
                  <p className={styles.sectionSubtitle}>
                     RaiseTalks makes fundraising and diligence fast and reliable by turning scattered founder docs into a single investor-ready workspace - so investors can underwrite faster, and founders can close rounds with confidence.
                  </p>
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

               <div className={styles.whyTagline}>
                  <p className={styles.whyTaglineText}>One workspace. Zero chaos.</p>
               </div>
            </div>
         </section>

         {/* Founder Section */}
         <section className={clsx(styles.founderSection, styles.animateIn)}>
            <div className={styles.sectionContainer}>
               <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Meet the Founder</h2>
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
                        <h3 className={styles.founderName}>Dr. Dariia Vasylieva</h3>
                        <p className={styles.founderRole}>President, CEO</p>
                        <p className={styles.founderCompany}>RaiseTalks</p>
                        <a
                           href="https://www.linkedin.com/in/dvasylieva/"
                           target="_blank"
                           rel="noopener noreferrer"
                           className={styles.founderLinkedIn}
                        >
                           <LinkedInIcon className={styles.linkedInIcon} />
                        </a>
                     </div>

                     <div className={styles.founderContent}>
                        <blockquote className={styles.blockquote}>
                           <p className={styles.blockquoteText}>
                              "RaiseTalks is an AI-native VC investment-intelligence platform for early-stage portfolios: founders get investor-grade data rooms, readiness scores, and structured IR pipelines, while funds get faster diligence, clearer IC prep, and earlier visibility into the right deals. I've spent 17 years on the investment side, closed €3B+ in deals, and reviewed 10,000+ startups, and I'm turning that investment-readiness playbook into an AI-native platform that becomes the natural end-to-end workspace for VC investments."
                           </p>
                           <cite className={styles.blockquoteCite}>— Dr. Dariia Vasylieva</cite>
                        </blockquote>

                        <a
                           href="https://www.linkedin.com/in/dvasylieva/"
                           target="_blank"
                           rel="noopener noreferrer"
                           className={styles.founderButton}
                        >
                           Let's Talk
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Partners Section */}
         <section className={clsx(styles.partnersSection, styles.animateIn)}>
            <div className={styles.sectionContainer}>
               <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Our Backers & Partners</h2>
                  <p className={styles.sectionSubtitle}>Proudly supported by</p>
               </div>
               <LogoCarousel />
            </div>
         </section>

         {/* CTA Section */}
         <section className={clsx(styles.ctaSection, styles.animateIn)}>
            <div className={styles.ctaBackground}></div>
            <div className={styles.ctaContent}>
               <Heading as="h2" className={styles.ctaTitle}>
                  Build With Us
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
