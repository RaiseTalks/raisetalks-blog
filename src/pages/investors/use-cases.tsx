import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './use-cases.module.css';

// Icon components
const TrophyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const RocketIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const TargetIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22,4 12,14.01 9,11.01" />
  </svg>
);

const FileTextIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </svg>
);

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
  </svg>
);

const MessageIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

// Data
const benefits = [
  {
    icon: TrophyIcon,
    title: 'Vetted Startups',
    description: 'Access pre-screened startups competing for investment opportunities',
  },
  {
    icon: TargetIcon,
    title: 'Structured Evaluation',
    description: 'Consistent scoring across Team, Product, Market, and Deal dimensions',
  },
  {
    icon: UsersIcon,
    title: 'Founder Access',
    description: 'Connect directly with founders building the next big thing',
  },
  {
    icon: RocketIcon,
    title: 'Early Deal Flow',
    description: 'Get first look at high-potential startups before they hit the market',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Apply',
    description: 'Startups submit structured profiles and data rooms',
  },
  {
    step: '02',
    title: 'Screen',
    description: 'AI-powered pre-scoring filters top candidates',
  },
  {
    step: '03',
    title: 'Pitch',
    description: 'Live or async presentations to investor panel',
  },
  {
    step: '04',
    title: 'Connect',
    description: 'Direct introductions to matching investors',
  },
];

const investorFeatures = [
  { icon: FileTextIcon, title: 'Standardized Data Rooms', description: 'Consistent format across all participants' },
  { icon: SparklesIcon, title: 'Pre-Score Cards', description: 'AI-generated initial assessments' },
  { icon: UsersIcon, title: 'Founder Profiles', description: 'Team backgrounds and track records' },
  { icon: TargetIcon, title: 'Market Analysis', description: 'Competitive landscape and sizing' },
  { icon: CheckCircleIcon, title: 'Financial Projections', description: 'Unit economics and runway' },
  { icon: MessageIcon, title: 'Direct Messaging', description: 'Reach founders instantly' },
];

const metrics = [
  { value: '4x', label: 'Faster deal screening' },
  { value: '85%', label: 'Investor satisfaction' },
  { value: '60+', label: 'Startups per cohort' },
  { value: '72hrs', label: 'Avg response time' },
];

export default function PitchCompetitions() {
  return (
    <Layout
      title="Pitch Competitions"
      description="Discover high-potential startups through curated pitch competitions on RaiseTalks">

      {/* Hero Section */}
      <section className="cleanHeroSection">
        <div className="cleanHeroContainer">
          <Heading as="h1" className="cleanHeroTitle">
            <span className="cleanHeroTitleAccent">Pitch Competitions</span>
          </Heading>
          <p className="cleanHeroDescription">
            Discover high-potential startups through curated pitch competitions
            and streamline your deal sourcing workflow.
          </p>
          <div className="cleanHeroButtons">
            <Link className="cleanHeroPrimaryButton" to="/startups">
              Browse Startups
            </Link>
            <Link className="cleanHeroSecondaryButton" to="https://calendly.com/iamdariiava/30min">
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Why Join Our Pitch Competitions</h2>
            <p className={styles.sectionSubtitle}>
              Curated startup showcases designed for smart capital deployment
            </p>
          </div>
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, idx) => (
              <div key={idx} className={styles.benefitCard}>
                <div className={styles.benefitIconWrap}>
                  <benefit.icon className={styles.benefitIcon} />
                </div>
                <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                <p className={styles.benefitDescription}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>
              From application to investment decision in one platform
            </p>
          </div>
          <div className={styles.stepsGrid}>
            {processSteps.map((step, idx) => (
              <div key={idx} className={styles.stepCard}>
                <span className={styles.stepNumber}>{step.step}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>What You Get</h2>
            <p className={styles.sectionSubtitle}>
              Everything you need to evaluate and engage with startups
            </p>
          </div>
          <div className={styles.featuresGrid}>
            {investorFeatures.map((feature, idx) => (
              <div key={idx} className={styles.featureCard}>
                <div className={styles.featureIconWrap}>
                  <feature.icon className={styles.featureIcon} />
                </div>
                <div>
                  <h4 className={styles.featureTitle}>{feature.title}</h4>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Results That Matter</h2>
            <p className={styles.sectionSubtitle}>
              Metrics from our pitch competition cohorts
            </p>
          </div>
          <div className={styles.metricsGrid}>
            {metrics.map((metric, idx) => (
              <div key={idx} className={styles.metricCard}>
                <span className={styles.metricValue}>{metric.value}</span>
                <span className={styles.metricLabel}>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>Ready to discover your next investment?</h2>
          <p className={styles.ctaDescription}>
            Browse startup profiles and connect with founders building innovative solutions.
          </p>
          <div className={styles.ctaButtons}>
            <Link className={styles.ctaPrimary} to="/startups">
              Browse Startups
              <ArrowRightIcon className={styles.ctaArrow} />
            </Link>
            <Link className={styles.ctaSecondary} to="https://calendly.com/iamdariiava/30min">
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
