import React, { useState } from "react";
import Link from "@docusaurus/Link";
import styles from "./SolutionSection.module.css";
import AudienceToggle from './AudienceToggle';
import McpCommunicator from './McpCommunicator';
import GridSeam from './GridSeam';

declare global {
   interface Window {
      YT: any;
      onYouTubeIframeAPIReady: () => void;
   }
}

// Icon components
const FileStackIcon = ({ className }: { className?: string }) => (
   <svg width="35" height="39" viewBox="0 0 35 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.25 5.25C1.25 6.31087 1.6246 7.32828 2.2914 8.07843C2.95819 8.82857 3.86256 9.25 4.80556 9.25H10.1389M1.25 1.25V27.25C1.25 28.3109 1.6246 29.3283 2.2914 30.0784C2.95819 30.8286 3.86256 31.25 4.80556 31.25H10.1389M31.4722 15.25C31.9437 15.25 32.3959 15.0393 32.7293 14.6642C33.0627 14.2891 33.25 13.7804 33.25 13.25V7.25C33.25 6.71957 33.0627 6.21086 32.7293 5.83579C32.3959 5.46071 31.9437 5.25 31.4722 5.25H27.0278C26.7518 5.25 26.4796 5.17771 26.2327 5.03885C25.9859 4.9 25.7712 4.69839 25.6056 4.45L24.0056 2.05C23.84 1.80161 23.6252 1.6 23.3784 1.46115C23.1315 1.32229 22.8593 1.25 22.5833 1.25H19.0278C18.5563 1.25 18.1041 1.46071 17.7707 1.83579C17.4373 2.21086 17.25 2.71957 17.25 3.25V13.25C17.25 13.7804 17.4373 14.2891 17.7707 14.6642C18.1041 15.0393 18.5563 15.25 19.0278 15.25H31.4722ZM31.4722 37.25C31.9437 37.25 32.3959 37.0393 32.7293 36.6642C33.0627 36.2891 33.25 35.7804 33.25 35.25V29.25C33.25 28.7196 33.0627 28.2109 32.7293 27.8358C32.3959 27.4607 31.9437 27.25 31.4722 27.25H26.3167C25.9914 27.2452 25.6735 27.1401 25.3977 26.9462C25.1218 26.7522 24.8986 26.4768 24.7522 26.15L24.0056 24.45C23.8668 24.0922 23.638 23.788 23.3473 23.5748C23.0567 23.3615 22.717 23.2486 22.37 23.25H19.0278C18.5563 23.25 18.1041 23.4607 17.7707 23.8358C17.4373 24.2109 17.25 24.7196 17.25 25.25V35.25C17.25 35.7804 17.4373 36.2891 17.7707 36.6642C18.1041 37.0393 18.5563 37.25 19.0278 37.25H31.4722Z" stroke="url(#paint0_linear_2823_6875)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_2823_6875" x1="2.1896" y1="67.0646" x2="48.2407" y2="52.9649" gradientUnits="userSpaceOnUse">
<stop offset="0.355985" stop-color="#FFAB0E"/>
<stop offset="0.769725" stop-color="#EA2640"/>
</linearGradient>
</defs>
</svg>

);

const SparklesIcon = ({ className }: { className?: string }) => (
   <svg width="39" height="33" viewBox="0 0 39 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.25 3.25H37.25M21.25 17.25H37.25M21.25 31.25H37.25M1.25 27.25L5.25 31.25L13.25 23.25M3.25 1.25H11.25C12.3546 1.25 13.25 2.14543 13.25 3.25V11.25C13.25 12.3546 12.3546 13.25 11.25 13.25H3.25C2.14543 13.25 1.25 12.3546 1.25 11.25V3.25C1.25 2.14543 2.14543 1.25 3.25 1.25Z" stroke="url(#paint0_linear_2823_6893)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_2823_6893" x1="2.30704" y1="56.0955" x2="50.7028" y2="36.0917" gradientUnits="userSpaceOnUse">
<stop offset="0.355985" stop-color="#FFAB0E"/>
<stop offset="0.769725" stop-color="#EA2640"/>
</linearGradient>
</defs>
</svg>

);

const UsersIcon = ({ className }: { className?: string }) => (
   <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.25 17.25V25.25C9.25 26.3109 9.67143 27.3283 10.4216 28.0784C11.1717 28.8286 12.1891 29.25 13.25 29.25H21.25M5.25 1.25H13.25C15.4591 1.25 17.25 3.04086 17.25 5.25V13.25C17.25 15.4591 15.4591 17.25 13.25 17.25H5.25C3.04086 17.25 1.25 15.4591 1.25 13.25V5.25C1.25 3.04086 3.04086 1.25 5.25 1.25ZM25.25 21.25H33.25C35.4591 21.25 37.25 23.0409 37.25 25.25V33.25C37.25 35.4591 35.4591 37.25 33.25 37.25H25.25C23.0409 37.25 21.25 35.4591 21.25 33.25V25.25C21.25 23.0409 23.0409 21.25 25.25 21.25Z" stroke="url(#paint0_linear_2602_4628)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_2602_4628" x1="2.30704" y1="67.0646" x2="52.9613" y2="49.6169" gradientUnits="userSpaceOnUse">
<stop offset="0.355985" stop-color="#FFAB0E"/>
<stop offset="0.769725" stop-color="#EA2640"/>
</linearGradient>
</defs>
</svg>

);

const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg width="33" height="39" viewBox="0 0 33 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.625 19.2478L14.375 22.8472L21.875 15.6484M31.25 21.0475C31.25 30.046 24.6875 34.5452 16.8875 37.1548C16.4791 37.2876 16.0354 37.2813 15.6313 37.1368C7.8125 34.5452 1.25 30.046 1.25 21.0475V8.4496C1.25 7.97229 1.44754 7.51453 1.79918 7.17702C2.15081 6.83952 2.62772 6.64991 3.125 6.64991C6.875 6.64991 11.5625 4.49027 14.825 1.75472C15.2222 1.42898 15.7275 1.25 16.25 1.25C16.7725 1.25 17.2778 1.42898 17.675 1.75472C20.9563 4.50826 25.625 6.64991 29.375 6.64991C29.8723 6.64991 30.3492 6.83952 30.7008 7.17702C31.0525 7.51453 31.25 7.97229 31.25 8.4496V21.0475Z" stroke="url(#paint0_linear_2602_4634)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_2602_4634" x1="2.13087" y1="67.0646" x2="45.7565" y2="54.5423" gradientUnits="userSpaceOnUse">
<stop offset="0.355985" stop-color="#FFAB0E"/>
<stop offset="0.769725" stop-color="#EA2640"/>
</linearGradient>
</defs>
</svg>

);

// Investor-facing icons - gradient stroke (brand dark blue -> brand light blue)
const IconGradientDefs = () => (
   <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
         <linearGradient id="investorIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="20%" stopColor="#003687" />
            <stop offset="75%" stopColor="#0077ff" />
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
      <>
      <section className={styles.solutionSection}>
         <IconGradientDefs />

         {/* Toggle */}
         <div className={`rt-rail ${styles.solutionMain}`}>
               <div className={styles.solutionHeader}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                     <AudienceToggle active={active} onSelect={setActive} />
                  </div>
               </div>
         </div>

         {/* MCP connector — data room / deal flow — comes first, per Figma order */}
         <McpCommunicator variant={active} />

         {/* Main Solution Block */}
         <div className={`rt-rail ${styles.solutionMain}`}>
               <div className={styles.solutionHeader}>
                  {active === 'startups' ? (
                     <div className="flex flex-col items-center text-center gap-6">
                        <h2 className={styles.solutionTitle}>Investors Decide Fast.<br /> <span className={`${styles.solutionTitleAccent} ${styles.solutionTitleAccentStartup}`}>Be Ready Faster.</span></h2>
                        <div className="flex flex-col items-center gap-6">
                           <div className="flex flex-col items-center gap-2 max-w-xl">
                              <p className={styles.solutionDescription}>
                                 RaiseTalks transforms your startup data into a structured, investor-grade Data Room with AI-powered gap analysis, so you walk into every conversation with confidence.
                              </p>
                           </div>
                           <Link className={`${styles.perksButton} ${styles.perksButtonAccent}`} to="/startups#perks">
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

      {active === 'startups' && (
         <>
            <GridSeam />
            <section className={styles.investorSection}>
               <div className={`rt-rail ${styles.investorCard}`}>
                  <div className={styles.investorInner}>
                        <div className={styles.investorImageCol}>
                           <div className={styles.imageGlowWrap}>
                              <div className={`${styles.imageGlow} ${styles.imageGlowInvestorOne}`} aria-hidden="true" />
                              <div className={`${styles.imageGlow} ${styles.imageGlowInvestorTwo}`} aria-hidden="true" />
                              <img
                                 src="/img/investor-catalog-mockup.webp"
                                 alt="Investor Catalog - Curated investors matched to your raise"
                                 className={styles.startupsLayoutImage}
                                 loading="lazy"
                              />
                           </div>
                        </div>
                        <div className={`${styles.investorContent} ${styles.investorContentWide}`}>
                           <h3 className={styles.investorTitle}>Spend less time <br /><span className={`rt-h2-alt ${styles.investorTitleAccentAlt}`}>Searching Investors</span></h3>
                           <p className={styles.investorDescription}>
                              RaiseTalks gets your data room pre-scored and ready, in front of investors worth meeting.
                           </p>
                           <Link className={`${styles.exploreButton} ${styles.exploreButtonAccent}`} to="https://app.raisetalks.com/investors">
                              Explore Investors
                           </Link>
                        </div>
                     </div>
               </div>
            </section>
         </>
      )}

      {active === 'investors' && (
         <>
            <GridSeam />
            <section className={styles.investorSection}>
               <div className={`rt-rail ${styles.investorCard}`}>
                  <div className={styles.investorInner}>
                        <div className={styles.investorImageCol}>
                           <div className={styles.imageGlowWrap}>
                              <div className={`${styles.imageGlow} ${styles.imageGlowStartupOne}`} aria-hidden="true" />
                              <div className={`${styles.imageGlow} ${styles.imageGlowStartupTwo}`} aria-hidden="true" />
                              <img
                                 src="/img/startup-catalog-mockup.webp"
                                 alt="Startup Catalog - Curated startups matched to your thesis"
                                 className={styles.startupsLayoutImage}
                                 loading="lazy"
                              />
                           </div>
                        </div>
                        <div className={`${styles.investorContent} ${styles.investorContentWide}`}>
                           <h3 className={styles.investorTitle}>Spend less time <br /><span className={`rt-h2-alt ${styles.investorTitleAccent}`}>Searching Startups</span></h3>
                           <p className={styles.investorDescription}>
                              RaiseTalks surfaces curated, pre-scored startups worth seeing.
                           </p>
                           <Link className={styles.exploreButton} to="https://app.raisetalks.com/startups">
                              Explore Startups
                           </Link>
                        </div>
                     </div>
               </div>
            </section>
         </>
      )}
      </>
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
         <div className={`rt-rail rt-rail-dark ${styles.narrativePanel}`}>
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
