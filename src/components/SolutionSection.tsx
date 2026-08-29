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
         icon: '/img/icons/lucide/folder-tree',
      },
      {
         title: "AI Readiness Score",
         desc: "Know exactly what's missing before investors find it.",
         icon: '/img/icons/lucide/list-todo',
      },
      {
         title: "Investor Matchmaking & Pipeline",
         desc: "Connect with the right investors at the right stage.",
         // Figma names this layer lucide/file-stack, same as the card below,
         // but the artwork is a workflow glyph. Drive keeps both under that one
         // folder and disambiguates by suffix — this is its desktop-1.svg set.
         icon: '/img/icons/lucide/workflow',
      },
      {
         title: "Secure, Controlled Sharing",
         desc: "Share with confidence, revoke access anytime.",
         // The unsuffixed half of that same folder: a shield-check, which is
         // what this card wants. The folder name is wrong for both icons in it.
         icon: '/img/icons/lucide/file-stack',
      },
   ];

   const investorFeatures = [
      {
         title: "Pre-Score Engine",
         desc: "Standardized scorecards so every deal gets a fair, consistent look.",
         icon: '/img/icons/lucide/gauge',
      },
      {
         title: "Committee Workspace",
         desc: "One place for partners to align, debate, and decide.",
         icon: '/img/icons/lucide/message-square-lock',
      },
      {
         title: "DD & IC Pack",
         desc: "Diligence and investment memos, version-controlled and always current.",
         icon: '/img/icons/lucide/file-check',
      },
   ];

   const features = active === 'startups' ? startupFeatures : investorFeatures;

   return (
      <>
      <section className={styles.solutionSection}>

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
                        {/* Narrowest media query first — <source> is first-match-wins. */}
                        <picture>
                           <source media="(max-width: 768px)" srcSet={`${feature.icon}/mobile.svg`} />
                           <source media="(max-width: 1024px)" srcSet={`${feature.icon}/tablet.svg`} />
                           <img src={`${feature.icon}/desktop.svg`} alt="" className={styles.featureIcon} />
                        </picture>
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
   // Icon paths are a directory, not a file: Figma ships each lucide icon as
   // three exports with the size and stroke baked in (42px/3px desktop,
   // 36px/2.5px tablet, 32px/2.5px mobile), so the variant is picked below.
   // Glyphs come from the panel's own frames (desktop 2872-4781, tablet
   // 1405-421, mobile 1405-472). Those frames are flattened images with no
   // text layers, which is why a text search of the canvas never found this
   // section — the four icons had to be read off the render.
   const items = [
      { icon: '/img/icons/lucide/stethoscope', label: 'Diagnostic', desc: 'Audit your story, find the gaps weakening your raise.' },
      { icon: '/img/icons/lucide/layers', label: 'Architecture', desc: 'Build the core system: category story, positioning, and investor messaging.' },
      { icon: '/img/icons/lucide/square-play', label: 'Engine', desc: 'A content system that reinforces your story consistently across channels.' },
      { icon: '/img/icons/lucide/film', label: 'Founder Original', desc: 'A flagship cinematic piece for investor communication, launches, and major announcements.' },
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
                           {/* Narrowest media query first — <source> is first-match-wins. */}
                           <picture>
                              <source media="(max-width: 768px)" srcSet={`${icon}/mobile.svg`} />
                              <source media="(max-width: 1024px)" srcSet={`${icon}/tablet.svg`} />
                              <img src={`${icon}/desktop.svg`} alt="" className={styles.narrativeItemIcon} />
                           </picture>
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
