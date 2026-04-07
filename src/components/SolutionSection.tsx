import React from "react";
import Link from "@docusaurus/Link";
import styles from "./SolutionSection.module.css";

declare global {
   interface Window {
      YT: any;
      onYouTubeIframeAPIReady: () => void;
   }
}

// Icon components
const FileStackIcon = ({ className }: { className?: string }) => (
   <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
   >
      <path d="M21 7h-3a2 2 0 0 1-2-2V2" />
      <path d="M21 6v6.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5H17l4 4z" />
      <path d="M7 8v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H15" />
      <path d="M3 12v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H11" />
   </svg>
);

const SparklesIcon = ({ className }: { className?: string }) => (
   <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
   >
      <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
   </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
   <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
   >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
   </svg>
);

const ShieldCheckIcon = ({ className }: { className?: string }) => (
   <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
   >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
   </svg>
);

// AI Advisor Demo Component - Clean autoplay video, no controls
function DiligenceVideoBlock() {
   return (
      <div className={styles.aiAdvisorBlock}>
         <div className={styles.videoSectionHeader}>
            <span className={styles.videoEyebrow}>See It In Action</span>
            <h2 className={styles.videoSectionTitle}>
               Your Next Investor Meeting<br />
               <span className={styles.videoSectionAccent}>Is Closer Than You Think</span>
            </h2>
            <p className={styles.aiAdvisorText}>
               RaiseTalks gives you one workspace to run your entire raise - so you spend less time on infrastructure and more time closing.
            </p>
         </div>
         <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, borderRadius: '1rem', overflow: 'hidden', background: '#000', marginBottom: '2rem' }}>
            <iframe
               src="https://www.youtube-nocookie.com/embed/8WOwPsQE158?controls=1&modestbranding=1&rel=0&playsinline=1"
               title="Your Next Investor Meeting Is Closer Than You Think"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowFullScreen
               style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            />
         </div>
         <div className={styles.aiAdvisorContent}>
            <Link className={styles.aiAdvisorButton} to="https://calendly.com/iamdariiava/30min">
               See It In Action
            </Link>
         </div>
      </div>
   );
}


export default function SolutionSection() {
   const features = [
      {
         title: "Investor-Ready Data Room",
         desc: "Organized, structured, and built to impress from day one.",
         icon: FileStackIcon,
      },
      {
         title: "AI Readiness Score",
         desc: "Know exactly what's missing before investors find it.",
         icon: SparklesIcon,
      },
      {
         title: "Investor Matchmaking & Pipeline",
         desc: "Connect with the right investors at the right stage.",
         icon: UsersIcon,
      },
      {
         title: "Secure, Controlled Sharing",
         desc: "Share with confidence, revoke access anytime.",
         icon: ShieldCheckIcon,
      },
   ];

   return (
      <section className={styles.solutionSection}>
         <div className="container px-4 mx-auto">
            {/* Main Solution Block */}
            <div className={styles.solutionMain}>
               <div className={styles.solutionHeader}>
                  <span className={styles.badge}>For Startups</span>
                  <h2 className={styles.solutionTitle}>Investors Decide Fast.{' '}<span className={styles.solutionTitleAccent}>Be Ready Faster.</span></h2>
                  <p className={styles.solutionDescription}>
                     RaiseTalks transforms your startup data into a structured, investor-grade Data Room with AI-powered gap analysis, so you walk into every conversation with confidence.
                  </p>
               </div>

               <div className={styles.featureGrid}>
                  {features.map((feature, index) => (
                     <div key={index} className={styles.featureCard}>
                        <div className={styles.featureIconContainer}>
                           <feature.icon className={styles.featureIcon} />
                        </div>
                        <div>
                           <h3 className={styles.featureTitle}>{feature.title}</h3>
                           <p className={styles.featureDesc}>{feature.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
               <div className={styles.perksAction}>
                  <div className={styles.perksText}>
                     <span className={styles.perksTextTitle}>Exclusive Founder Perks</span>
                     <span className={styles.perksTextDesc}>Tools and deals to accelerate your raise.</span>
                  </div>
                  <Link className={styles.perksButton} to="/startups#perks">
                     Get access to Perks
                  </Link>
               </div>
            </div>

            {/* Diligence Video Block */}
            <DiligenceVideoBlock />

            {/* AI Advisor Demo Block - temporarily hidden */}
            {/* <AIAdvisorDemo /> */}

         </div>

         {/* Narrative Block — full-width grey */}
         <div className={styles.narrativeBlock}>
            <div className={styles.narrativeInner}>
               <div className={styles.narrativeRow1}>
                  <div className={styles.narrativeHeadGroup}>
                     <span className={styles.narrativeEyebrow}>RaiseTalks TV</span>
                     <h2 className={styles.narrativeTitle}>
                        Your Story Is the{' '}
                        <span className={styles.narrativeTitleAccent}>Strategy</span>
                     </h2>
                     <p className={styles.narrativeSubtitle}>
                        Cinema is the method. Narrative is the product. Perception is the outcome.
                     </p>
                  </div>
                  <div className={styles.narrativeCta}>
                     <Link className={styles.narrativeButton} to="https://tv.raisetalks.com">
                        Explore Founder Originals
                     </Link>
                  </div>
               </div>
               <div className={styles.narrativeGrid}>
                  {[
                     { label: 'Diagnostic', desc: 'Audit your story, find the gaps weakening your raise.' },
                     { label: 'Architecture', desc: 'Build the core system: category story, positioning, and investor messaging.' },
                     { label: 'Engine', desc: 'A content system that reinforces your story consistently across channels.' },
                     { label: 'Founder Original', desc: 'A flagship cinematic piece for investor communication, launches, and major announcements.' },
                  ].map(({ label, desc }) => (
                     <div key={label} className={styles.narrativeCard}>
                        <div className={styles.narrativeCardLabel}>{label}</div>
                        <p className={styles.narrativeCardDesc}>{desc}</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
}

export function InvestorDiscoveryBlock() {
   return (
      <div className={styles.investorBlock}>
         <div className={styles.investorInner}>
            <div className={styles.investorContent}>
               <h3 className={styles.investorTitle}>The Deals Worth Seeing -{' '}<span className={styles.investorTitleAccent}>Curated and Ready.</span></h3>
               <p className={styles.investorDescription}>
                  RaiseTalks surfaces pre-scored, diligence-ready startups - so you spend less time on due diligence.
               </p>
               <Link className={styles.exploreButton} to="https://app.raisetalks.com/startups">
                  Explore Startups
               </Link>
            </div>
            <div className={styles.investorImageCol}>
               <img
                  src="/img/startups-layout.png"
                  alt="Investor Dashboard - Curated startup pipeline"
                  className={styles.startupsLayoutImage}
                  loading="lazy"
               />
            </div>
         </div>
      </div>
   );
}
