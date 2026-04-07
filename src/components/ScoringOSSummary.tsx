import React from "react";
import Link from "@docusaurus/Link";
import styles from "./ScoringOSSummary.module.css";

// ========================================
// Pipeline Card Icons
// ========================================

const GaugeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
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
    stroke="currentColor"
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
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="m9 15 2 2 4-4" />
  </svg>
);


const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

// ========================================
// Data
// ========================================


const pipelineSteps = [
  {
    step: 1,
    title: "Pre-Score Engine",
    desc: "Standardized scorecards so every deal gets a fair, consistent look.",
    icon: GaugeIcon,
  },
  {
    step: 2,
    title: "Committee Workspace",
    desc: "One place for partners to align, debate, and decide.",
    icon: UsersRoundIcon,
  },
  {
    step: 3,
    title: "DD & IC Pack",
    desc: "Diligence and investment memos, version-controlled and always current.",
    icon: FileCheckIcon,
  },
];

// ========================================
// Component
// ========================================

export default function ScoringOSSummary() {
  return (
    <section className={styles.scoringSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>For Investors</span>
          <h2 className={styles.title}>IC decision. <span className={styles.titleAccent}>4x faster.</span></h2>
          <p className={styles.subtitle}>
            RaiseTalks Scoring OS gives your fund a single system to evaluate, align, and decide.
          </p>
        </div>

        {/* Pipeline Cards */}
        <div className={styles.pipelineContainer}>
          <div className={styles.pipelineGrid}>
            {pipelineSteps.map((step, index) => (
              <div key={index} className={styles.pipelineCard}>
                <div className={styles.cardIconContainer}>
                  <step.icon className={styles.cardIcon} />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>{step.title}</h3>
                  <p className={styles.cardDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className={styles.ctaContainer}>
          <Link className={styles.ctaPrimary} to="/investors">
            Explore Scoring OS
            <ArrowRightIcon className={styles.ctaArrow} />
          </Link>
          <Link
            className={styles.ctaSecondary}
            to="https://calendly.com/iamdariiava/30min"
          >
            See Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
