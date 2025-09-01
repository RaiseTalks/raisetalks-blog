import React from 'react';
import Link from '@docusaurus/Link';
import styles from './SolutionSection.module.css';

export default function SolutionSection() {
  const features = [
    {
      text: 'AI - scored data rooms',
      icon: '/img/icons/AI-scored data rooms.svg'
    },
    {
      text: 'Tracking of investor activity',
      icon: '/img/icons/Tracking of investor activity.svg'
    },
    {
      text: 'Smart suggestions and improvement prompts',
      icon: '/img/icons/Smart suggestions and improvement prompts.svg'
    },
    {
      text: 'Advanced access control and watermarking',
      icon: '/img/icons/Advanced access control and watermarking.svg'
    }
  ];

  return (
    <section className={styles.solutionSection}>
      <div className="container px-4 mx-auto">
        {/* Main Solution Block */}
        <div className={styles.solutionMain}>
          <div className={styles.solutionHeader}>
            <h2 className={styles.solutionTitle}>
              AI-Powered Fundraising, Finally
            </h2>
            <p className={styles.solutionDescription}>
              <strong>RaiseTalks</strong> is your intelligent co-pilot for everything from investor prep to final signature
              Designed for speed, transparency, and precision
            </p>
          </div>

          <div className={styles.featureGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureItem}>
                <img
                  src={feature.icon}
                  alt={feature.text}
                  className={styles.featureIcon}
                />
                <span className={styles.featureText}>{feature.text}</span>
              </div>
            ))}
          </div>

          <div className={styles.solutionButtons}>
            <Link
              className={styles.primaryButton}
              to="/features">
              See What It Can Do
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
            <img
              src="/img/DataRoomInterface.png"
              alt="Data Room Interface - Smart, organized, investor-ready"
              className={styles.dataRoomScreenshot}
            />
          </div>
        </div>


        {/* Block 4B - Investor Discovery */}
        <div className={styles.investorBlock}>
          <div className={styles.investorContent}>
            <h3 className={styles.investorTitle}>
              Discover Startups, Request Data Rooms Instantly
            </h3>
            <p className={styles.investorDescription}>
              RaiseTalks makes it easy for investors to access a curated pipeline of early-stage startups—all organized, scored, and ready to engage
            </p>
            <Link
              className={styles.exploreButton}
              to="https://dev.raisetalks.ai/startups">
              Explore Startups
            </Link>
          </div>
          <img
            src="/img/startups-layout.png"
            alt="Investor Dashboard - Curated startup pipeline"
            className={styles.startupsLayoutImage}
          />
        </div>
      </div>
    </section>
  );
}