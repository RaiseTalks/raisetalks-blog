import React from "react";
import Link from "@docusaurus/Link";
import styles from "./ScoringOSSummary.module.css";

// ========================================
// Dimension Icons
// ========================================

const TeamIcon = ({ className }: { className?: string }) => (
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

const ProductIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);

const MarketIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

const DealIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

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

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
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

const scoringDimensions = [
  { label: "Team", icon: TeamIcon },
  { label: "Product", icon: ProductIcon },
  { label: "Market", icon: MarketIcon },
  { label: "Deal", icon: DealIcon },
];

const pipelineSteps = [
  {
    step: 1,
    title: "Pre-Score Engine",
    icon: GaugeIcon,
    features: ["Auto-score analysis", "Benchmark against portfolio"],
  },
  {
    step: 2,
    title: "Committee Workspace",
    icon: UsersRoundIcon,
    features: ["Multi-reviewer scoring", "Evidence-linked rationales"],
  },
  {
    step: 3,
    title: "DD & IC Pack",
    icon: FileCheckIcon,
    features: ["Complete audit trail", "LP-grade exports"],
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
          <h2 className={styles.title}>Scoring OS</h2>
          <p className={styles.subtitle}>
            Standardized scorecards, IC packs, and version-controlled
            diligence—collaborate in one place and move decisions 4x faster.
          </p>
        </div>

        {/* Scoring Dimensions Bar */}
        <div className={styles.dimensionsBar}>
          {scoringDimensions.map((dim, index) => (
            <div key={index} className={styles.dimensionPill}>
              <dim.icon className={styles.dimensionIcon} />
              <span className={styles.dimensionLabel}>{dim.label}</span>
            </div>
          ))}
        </div>

        {/* Pipeline Cards */}
        <div className={styles.pipelineContainer}>
          <div className={styles.pipelineGrid}>
            {pipelineSteps.map((step, index) => (
              <div key={index} className={styles.pipelineCard}>
                <div className={styles.cardIconContainer}>
                  <step.icon className={styles.cardIcon} />
                </div>
                <h3 className={styles.cardTitle}>{step.title}</h3>
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
