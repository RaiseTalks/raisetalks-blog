import React from 'react';
import Link from '@docusaurus/Link';
import styles from './SolutionSection.module.css';

export default function SolutionSection() {
  const features = [
    'AI-scored data rooms',
    'Smart suggestions and improvement prompts',
    'Live tracking of investor activity',
    'Advanced access control and watermarking'
  ];

  return (
    <section className={styles.solutionSection}>
      <div className="container mx-auto px-4">
        {/* Main Solution Block */}
        <div className={styles.solutionMain}>
          <div className={styles.solutionHeader}>
            <h2 className={styles.solutionTitle}>
              AI-Powered Fundraising, Finally
            </h2>
            <p className={styles.solutionDescription}>
              <strong>RaiseTalks.ai</strong> is your intelligent co-pilot for everything from investor prep to final signature.
              Designed for speed, transparency, and precision.
            </p>
          </div>
          
          <div className={styles.featureGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>
                <span className={styles.featureText}>{feature}</span>
              </div>
            ))}
          </div>
          
          <div className={styles.solutionHighlight}>
            💡 One workspace. Zero chaos.
          </div>
          
          <div className={styles.solutionButtons}>
            <Link
              className={styles.primaryButton}
              to="/features">
              See What It Can Do →
            </Link>
            <Link
              className={styles.secondaryButton}
              to="https://raisetalks.ai/signup">
              Try For Free
            </Link>
          </div>
        </div>

        {/* Block 4A - Data Room Preview */}
        <div className={styles.dataRoomBlock}>
          <div className={styles.dataRoomContent}>
            <div className={styles.dataRoomImage}>
              <div className={styles.imagePlaceholder}>
                <p>Data Room Interface</p>
                <small>Smart, organized, investor-ready</small>
              </div>
            </div>
            <Link
              className={styles.featuresButton}
              to="/features">
              Check All Features
            </Link>
          </div>
        </div>

        {/* Block 4B - Investor Discovery */}
        <div className={styles.investorBlock}>
          <div className={styles.investorContent}>
            <h3 className={styles.investorTitle}>
              Discover Startups, Request Data Rooms Instantly
            </h3>
            <p className={styles.investorDescription}>
              RaiseTalks.ai makes it easy for investors to access a curated pipeline of early-stage startups—all organized, scored, and ready to engage.
            </p>
            <Link
              className={styles.exploreButton}
              to="https://raisetalks.ai/startups">
              Explore Startups
            </Link>
            <div className={styles.investorImage}>
              <div className={styles.imagePlaceholder}>
                <p>Investor Dashboard</p>
                <small>Curated startup pipeline</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}