import React, { useState } from "react";
import Link from "@docusaurus/Link";
import styles from "./SolutionSection.module.css";
import AudienceToggle from './AudienceToggle';

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

// Investor-facing icons - gradient stroke (brand yellow -> brand pink),
// matching the "For Investors" toggle dot
const IconGradientDefs = () => (
   <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
         <linearGradient id="investorIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="20%" stopColor="#ffab0e" />
            <stop offset="75%" stopColor="#ea2640" />
         </linearGradient>
      </defs>
   </svg>
);

const GaugeIcon = ({ className }: { className?: string }) => (
   <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#investorIconGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
   >
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
   </svg>
);

const UsersRoundIcon = ({ className }: { className?: string }) => (
   <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#investorIconGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
   >
      <path d="M18 21a8 8 0 0 0-16 0" />
      <circle cx="10" cy="8" r="5" />
      <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
   </svg>
);

const FileCheckIcon = ({ className }: { className?: string }) => (
   <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#investorIconGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
   >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="m9 15 2 2 4-4" />
   </svg>
);

// AI Advisor Demo Component - Clean autoplay video, no controls
export function DiligenceVideoBlock() {
   return (
      <section className={styles.videoSection}>
         <div className="container px-4 mx-auto">
            <div className={styles.videoInner}>
               <div className={styles.videoMedia}>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '1369 / 778', borderRadius: '1rem', overflow: 'hidden', background: '#000'}}>
                   <iframe
                        src="https://www.youtube-nocookie.com/embed/8WOwPsQE158?controls=1&modestbranding=1&rel=0&playsinline=1"
                        title="Your Next Investor Meeting Is Closer Than You Think"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                     />
                  </div>
               </div>
                <div className={styles.videoText}>
                  <h2 className={styles.videoTitle}>
                     Your Next Investor Meeting<br />
                     <span className={styles.videoTitleAccent}>Is Closer Than You Think</span>
                  </h2>
                  <p className={styles.videoDesc}>
                     RaiseTalks gives you one workspace to run your entire raise - so you spend less time on infrastructure and more time closing.
                  </p>
                  <Link className={styles.videoButton} to="https://calendly.com/iamdariiava/30min">
                     See it in action
                  </Link>
               </div>
            </div>   
         </div>

      </section>
   )
}


export default function SolutionSection() {
   const [active, setActive] = useState<'startups' | 'investors'>('startups');

   const startupFeatures = [
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

   const investorFeatures = [
      {
         title: "Pre-Score Engine",
         desc: "Standardized scorecards so every deal gets a fair, consistent look.",
         icon: GaugeIcon,
      },
      {
         title: "Committee Workspace",
         desc: "One place for partners to align, debate, and decide.",
         icon: UsersRoundIcon,
      },
      {
         title: "DD & IC Pack",
         desc: "Diligence and investment memos, version-controlled and always current.",
         icon: FileCheckIcon,
      },
   ];

   const features = active === 'startups' ? startupFeatures : investorFeatures;

   return (
      <section className={styles.solutionSection}>
         <IconGradientDefs />
         {/* Main Solution Block */}
         <div className={`container mx-auto ${styles.solutionMain}`}>
               <div className={styles.solutionHeader}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                     <AudienceToggle active={active} onSelect={setActive} />
                  </div>
                  {active === 'startups' ? (
                     <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                        <h2 className={`${styles.solutionTitle} flex-1`}>Investors Decide Fast.<br /> <span className={styles.solutionTitleAccent}>Be Ready Faster.</span></h2>
                        <div className="flex flex-1 flex-col items-start gap-6">
                           <div className="flex flex-col gap-2">
                              <p className={styles.solutionDescription}>
                                 RaiseTalks transforms your startup data into a structured, investor-grade Data Room with AI-powered gap analysis, so you walk into every conversation with confidence.
                              </p>
                              <p className={styles.solutionDescription}>
                                 We provide you with tools and deals to accelerate your raise.
                              </p>
                           </div>
                           <Link className={styles.perksButton} to="/startups#perks">
                              Get access to Perks
                           </Link>
                        </div>
                     </div>
                  ) : (
                     <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                        <h2 className={`${styles.solutionTitle} flex-1`}>IC decision.<br /><span className={styles.solutionTitleAccent}>4x faster</span></h2>
                        <div className="flex flex-1 flex-col items-start gap-6">
                           <p className={styles.solutionDescription}>
                              RaiseTalks Scoring OS gives your fund a single system to evaluate, align, and decide.
                           </p>
                           <div className="flex gap-6 flex-wrap">
                              <Link className={styles.perksButton} to="/investors">
                                 Start Scoring OS
                              </Link>
                              <Link className={styles.perksButtonSecondary} to="https://calendly.com/iamdariiava/30min">
                                 See Demo
                              </Link>
                           </div>
                        </div>
                     </div>
                  )}
               </div>

               <div className={`${styles.featureGrid} ${active === 'investors' ? styles.featureGridThree : ''}`}>

                  {features.map((feature, index) => (
                     <div key={index} className={styles.featureCard}>
                        <feature.icon className={styles.featureIcon} />
                        <div>
                           <h3 className={styles.featureTitle}>{feature.title}</h3>
                           <p className={styles.featureDesc}>{feature.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
         </div>
      </section>
   );
}

export function NarrativeBlock() {
   const items = [
      { icon: '/img/icons/stethoscope.svg', label: 'Diagnostic', desc: 'Audit your story, find the gaps weakening your raise.' },
      { icon: '/img/icons/brain-cog.svg', label: 'Architecture', desc: 'Build the core system: category story, positioning, and investor messaging.' },
      { icon: '/img/icons/atom.svg', label: 'Engine', desc: 'A content system that reinforces your story consistently across channels.' },
      { icon: '/img/icons/tv-minimal-play.svg', label: 'Founder Original', desc: 'A flagship cinematic piece for investor communication, launches, and major announcements.' },
   ];

   return (
      <section className={styles.narrativeBlock}>
         <div className={`container mx-auto ${styles.narrativePanel}`}>
               <div className={styles.narrativeTop}>
                  <div className={styles.narrativeLeft}>
                     <img src="/img/raisetalks-tv-logo.svg" alt="RaiseTalks TV" className={styles.narrativeLogo} />
                     <h2 className={styles.narrativeTitle}>
                        Your Story<br />
                        <span className={styles.narrativeTitleAccent}>Is the Strategy</span>
                     </h2>
                     <p className={styles.narrativeSubtitle}>
                        Cinema is the method.<br />
                        Narrative is the product.<br />
                        Perception is the outcome.
                     </p>
                  </div>
                  <div className={styles.narrativeGrid}>
                     {items.map(({ icon, label, desc }) => (
                        <div key={label} className={styles.narrativeItem}>
                           <img src={icon} alt="" className={styles.narrativeItemIcon} />
                           <h4 className={styles.narrativeItemTitle}>{label}</h4>
                           <p className={styles.narrativeItemDesc}>{desc}</p>
                        </div>
                     ))}
                  </div>
               </div>
               <Link className={styles.narrativeButton} to="https://tv.raisetalks.com">
                  <img src="/img/icons/play.svg" alt="" className={styles.narrativeButtonIcon} />
                  Explore Founder Originals
               </Link>
         </div>
      </section>
   );
}

export function InvestorDiscoveryBlock() {
   return (
      <section className={styles.investorSection}>
         <div className="container px-4 mx-auto">
            <div className={styles.investorCard}>
               <div className={styles.investorInner}>
                  <div className={styles.investorImageCol}>
                     <div className={styles.imageGlowWrap}>
                        <div className={`${styles.imageGlow} ${styles.imageGlowOne}`} aria-hidden="true" />
                        <div className={`${styles.imageGlow} ${styles.imageGlowTwo}`} aria-hidden="true" />
                        <img
                           src="/img/startup-catalog-mockup.png"
                           alt="Investor Dashboard - Curated startup pipeline"
                           className={styles.startupsLayoutImage}
                           loading="lazy"
                        />
                     </div>
                  </div>
                  <div className={styles.investorContent}>
                     <h3 className={styles.investorTitle}>Spend less time <br /><span className={styles.investorTitleAccent}>on Due Diligence</span></h3>
                     <p className={styles.investorDescription}>
                        RaiseTalks surfaces curated and ready pre-scored startups worth seeing.
                     </p>
                     <Link className={styles.exploreButton} to="https://app.raisetalks.com/startups">
                        Explore Startups
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
