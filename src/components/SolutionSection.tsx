import React, { useState, useRef, useEffect } from "react";
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
function AIAdvisorDemo() {
   const [isReady, setIsReady] = useState(false);
   const [isStarted, setIsStarted] = useState(false);
   const playerRef = useRef<any>(null);
   const containerRef = useRef<HTMLDivElement>(null);
   const hasAutoplayedRef = useRef(false);
   const videoId = "sFMcoNhLodg";
   const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

   // Load YouTube IFrame API
   useEffect(() => {
      if (!window.YT) {
         const tag = document.createElement("script");
         tag.src = "https://www.youtube.com/iframe_api";
         const firstScriptTag = document.getElementsByTagName("script")[0];
         firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }
   }, []);

   // Intersection Observer for autoplay
   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !hasAutoplayedRef.current) {
               hasAutoplayedRef.current = true;
               handleStart();
            }

            // Pause when scrolled out of view
            if (!entry.isIntersecting && playerRef.current && isReady) {
               try {
                  playerRef.current.pauseVideo();
               } catch (e) {}
            }

            // Resume when scrolled back into view
            if (entry.isIntersecting && playerRef.current && isStarted && isReady) {
               try {
                  playerRef.current.playVideo();
               } catch (e) {}
            }
         },
         { threshold: [0, 0.5, 1] },
      );

      if (containerRef.current) {
         observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
   }, [isStarted, isReady]);

   const initPlayer = () => {
      if (window.YT && window.YT.Player) {
         playerRef.current = new window.YT.Player("yt-player", {
            videoId: videoId,
            playerVars: {
               autoplay: 1,
               controls: 0,
               disablekb: 0,
               fs: 0,
               iv_load_policy: 3,
               modestbranding: 1,
               rel: 0,
               showinfo: 0,
               playsinline: 1,
               mute: 1,
               loop: 1,
               playlist: videoId,
            },
            events: {
               onReady: (event: any) => {
                  event.target.playVideo();
               },
               onStateChange: (event: any) => {
                  // Only show video after playing and YouTube UI has faded
                  if (event.data === window.YT.PlayerState.PLAYING) {
                     setTimeout(() => {
                        setIsReady(true);
                     }, 1000);
                  }
               },
            },
         });
      } else {
         window.onYouTubeIframeAPIReady = () => {
            initPlayer();
         };
      }
   };

   const handleStart = () => {
      setIsStarted(true);
      setTimeout(initPlayer, 100);
   };

   return (
      <div className={styles.aiAdvisorBlock}>
         <h3 className={styles.aiAdvisorTitle}>Talk to your AI Fundraising Advisor</h3>
         <div ref={containerRef} className={styles.aiAdvisorVideo}>
            {/* Thumbnail - covers video until it's actually playing */}
            <div className={`${styles.videoThumbnail} ${isReady ? styles.hidden : ""}`}>
               <img src={thumbnailUrl} alt="AI Advisor Demo" className={styles.thumbnailImage} />
            </div>
            {/* YouTube player - hidden behind thumbnail until ready */}
            {isStarted && <div id="yt-player" className={styles.ytPlayer}></div>}
         </div>
         <div className={styles.aiAdvisorContent}>
            <p className={styles.aiAdvisorText}>
               Your AI Fundraising Advisor turns your data room into IC-ready answers - grounded in your actual data. It doesn't guess. It
               stress-tests your story like an investor
            </p>
            <Link className={styles.aiAdvisorButton} to="https://app.raisetalks.com/sign-up">
               Run Investor Q&A
            </Link>
         </div>
      </div>
   );
}

export default function SolutionSection() {
   const features = [
      {
         title: "Investor-ready Structured Data Room",
         icon: FileStackIcon,
      },
      {
         title: "AI Advisor for Readiness Preparation",
         icon: SparklesIcon,
      },
      {
         title: "Investor Matchmaking + Pipeline",
         icon: UsersIcon,
      },
      {
         title: "Secure Sharing & Controlled Access",
         icon: ShieldCheckIcon,
      },
   ];

   return (
      <section className={styles.solutionSection}>
         <div className="container px-4 mx-auto">
            {/* Block 4A - Data Room Preview (moved up) */}
            <div className={styles.dataRoomBlock}>
               <div className={styles.dataRoomContent}>
                  <img
                     src="/img/DataRoomInterface.png"
                     alt="Data Room Interface - Smart, organized, investor-ready"
                     className={styles.dataRoomScreenshot}
                     loading="lazy"
                  />
               </div>
            </div>

            {/* Main Solution Block */}
            <div className={styles.solutionMain}>
               <div className={styles.solutionHeader}>
                  <span className={styles.badge}>For Startups</span>
                  <h2 className={styles.solutionTitle}>AI-Powered Fundraising, Finally.</h2>
                  <p className={styles.solutionDescription}>
                     <strong>RaiseTalks</strong> turns your startup information into an investor-ready, structured Data Room with AI
                     guidance and readiness scoring — so you fix gaps before investor diligence starts.
                  </p>
               </div>

               <div className={styles.featureGrid}>
                  {features.map((feature, index) => (
                     <div key={index} className={styles.featureCard}>
                        <div className={styles.featureIconContainer}>
                           <feature.icon className={styles.featureIcon} />
                        </div>
                        <h3 className={styles.featureTitle}>{feature.title}</h3>
                     </div>
                  ))}
               </div>
            </div>

            {/* AI Advisor Demo Block */}
            <AIAdvisorDemo />

            {/* Block 4B - Investor Discovery */}
            <div className={styles.investorBlock}>
               <div className={styles.investorContent}>
                  <h3 className={styles.investorTitle}>Discover Startups, Request Data Rooms Instantly</h3>
                  <p className={styles.investorDescription}>
                     RaiseTalks makes it easy for investors to access a curated pipeline of early-stage startups—all organized, scored, and
                     ready to engage
                  </p>
                  <Link className={styles.exploreButton} to="https://app.raisetalks.com/startups">
                     Explore Startups
                  </Link>
               </div>
               <img
                  src="/img/startups-layout.png"
                  alt="Investor Dashboard - Curated startup pipeline"
                  className={styles.startupsLayoutImage}
                  loading="lazy"
               />
            </div>
         </div>
      </section>
   );
}
