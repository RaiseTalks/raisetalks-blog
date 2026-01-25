import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

// Icon components
const ClipboardCheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="m9 14 2 2 4-4" />
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

const CpuIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="m9 1 0 3" />
    <path d="m15 1 0 3" />
    <path d="m9 20 0 3" />
    <path d="m15 20 0 3" />
    <path d="m20 9 3 0" />
    <path d="m20 14 3 0" />
    <path d="m1 9 3 0" />
    <path d="m1 14 3 0" />
  </svg>
);

const GlobeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const HandshakeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
    <path d="m21 3 1 11h-2" />
    <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
    <path d="M3 4h8" />
  </svg>
);

const ScaleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="M7 21h10" />
    <path d="M12 3v18" />
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
  </svg>
);

const TargetIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const MessageSquareIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22,4 12,14.01 9,11.01" />
  </svg>
);

const ClipboardListIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="m16 4 2 0a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2l2 0" />
    <path d="M12 11h4" />
    <path d="M12 16h4" />
    <path d="M8 11h.01" />
    <path d="M8 16h.01" />
  </svg>
);

const CalculatorIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" x2="16" y1="6" y2="6" />
    <line x1="16" x2="16" y1="14" y2="18" />
    <path d="m8 10 0 8" />
    <path d="m12 14 0 4" />
  </svg>
);

const Building2Icon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
    <path d="M6 12H4a2 2 0 0 0-2 2v8h20v-8a2 2 0 0 0-2-2h-2" />
    <path d="M10 6h4" />
    <path d="M10 10h4" />
    <path d="M10 14h4" />
    <path d="M10 18h4" />
  </svg>
);

const ServerIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" x2="6.01" y1="6" y2="6" />
    <line x1="6" x2="6.01" y1="18" y2="18" />
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

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 13c0 5-3.5 7.5-8 12.5C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6-2 1.5.8 4 2 6 2a1 1 0 0 1 1 1z" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const ZapIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
  </svg>
);

const TrendingUpIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17" />
    <polyline points="16,7 22,7 22,13" />
  </svg>
);

// Data
const rubricItems = [
  { icon: UsersIcon, label: 'Team', description: 'Experience, expertise & execution capability' },
  { icon: CpuIcon, label: 'Product-Tech', description: 'Technology differentiation & moat' },
  { icon: GlobeIcon, label: 'Market', description: 'Size, timing & competitive dynamics' },
  { icon: HandshakeIcon, label: 'Deal', description: 'Terms, traction & investment thesis fit' },
];

const workspaceFeatures = [
  { icon: TargetIcon, title: 'Thesis Templates', description: 'Customizable scoring criteria aligned to fund strategy' },
  { icon: UsersIcon, title: 'Multi-Reviewer', description: 'Parallel scoring with automatic variance detection' },
  { icon: MessageSquareIcon, title: 'Discussion Thread', description: 'Structured debate and alignment on key questions' },
  { icon: CheckCircleIcon, title: 'Decision Controls', description: 'Clear pass/fail/hold workflow with audit trail' },
];

const ddCategories = [
  { icon: ScaleIcon, label: 'Legal', items: ['Cap table', 'IP ownership', 'Contracts'] },
  { icon: CalculatorIcon, label: 'Financial', items: ['Audited statements', 'Projections', 'Unit economics'] },
  { icon: Building2Icon, label: 'Commercial', items: ['Customer refs', 'Pipeline', 'Partnerships'] },
  { icon: ServerIcon, label: 'Tech', items: ['Architecture', 'Security audit', 'Scalability'] },
];

const benefits = [
  { icon: ZapIcon, title: 'Screen Faster', description: 'Reduce deal evaluation time with structured scoring' },
  { icon: TrendingUpIcon, title: 'Better Decisions', description: 'Evidence-based assessments with full audit trail' },
  { icon: UsersIcon, title: 'Team Alignment', description: 'Multi-reviewer workflows with variance detection' },
  { icon: FileTextIcon, title: 'IC-Ready Outputs', description: 'Generate memos and packs in standard formats' },
];

export default function InvestorsPage() {
  return (
    <Layout
      title="RaiseTalks Scoring OS"
      description="Turn raw startup info into standardized, IC-ready outputs with audit trail, benchmarks, and collaboration">

      {/* Hero Section */}
      <section className="cleanHeroSection">
        <div className="cleanHeroContainer">
          <Heading as="h1" className="cleanHeroTitle">
            RaiseTalks{' '}
            <span className="cleanHeroTitleAccent">Scoring OS</span>
          </Heading>
          <p className="cleanHeroDescription">
            Turn raw startup info into standardized, IC-ready outputs with audit trail,
            benchmarks, and collaboration — so funds screen faster and decide better.
          </p>
          <div className="cleanHeroButtons">
            <Link className="cleanHeroPrimaryButton" to="/startups">
              Browse Startups
            </Link>
            <Link className="cleanHeroSecondaryButton" to="https://app.raisetalks.com/investor-pipeline">
              View Dealflow
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Why Use Scoring OS</h2>
            <p className={styles.sectionSubtitle}>
              Structured evaluation tools for modern investment teams
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

      {/* Pre-Score Engine Section */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.badgeWrap}>
              <span className={styles.badge}>Live Queue</span>
            </div>
            <div className={styles.titleWithIcon}>
              <div className={styles.titleIconWrap}>
                <ClipboardCheckIcon className={styles.titleIcon} />
              </div>
              <h2 className={styles.sectionTitle}>Pre-Score Engine</h2>
            </div>
            <p className={styles.sectionSubtitle}>
              Quickly screen incoming deal flow with structured, evidence-based scoring
            </p>
          </div>

          <div className={styles.rubricGrid}>
            {rubricItems.map((item, idx) => (
              <div key={idx} className={styles.rubricCard}>
                <div className={styles.rubricIconWrap}>
                  <item.icon className={styles.rubricIcon} />
                </div>
                <h3 className={styles.rubricLabel}>{item.label}</h3>
                <p className={styles.rubricDescription}>{item.description}</p>
                <div className={styles.scoreIndicator}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div key={n} className={styles.scoreDot} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.outputCard}>
            <div className={styles.outputInfo}>
              <div className={styles.outputIconWrap}>
                <FileTextIcon className={styles.outputIcon} />
              </div>
              <div>
                <h4 className={styles.outputTitle}>Pre-Scoring Card</h4>
                <p className={styles.outputDescription}>Shareable link + PDF export for each evaluation</p>
              </div>
            </div>
            <div className={styles.valueTags}>
              <span className={styles.valueTag}>Screen faster</span>
              <span className={styles.valueTag}>Higher-quality inbound</span>
              <span className={styles.valueTag}>Cohort-ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Committee Workspace Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.badgeWrap}>
              <span className={styles.badge}>Next In Action</span>
            </div>
            <div className={styles.titleWithIcon}>
              <div className={styles.titleIconWrap}>
                <ScaleIcon className={styles.titleIcon} />
              </div>
              <h2 className={styles.sectionTitle}>Scoring & Committee Workspace</h2>
            </div>
            <p className={styles.sectionSubtitle}>
              Collaborative scoring with variance detection and structured decision-making
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {workspaceFeatures.map((feature, idx) => (
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

          <div className={styles.outputCard}>
            <div className={styles.outputInfo}>
              <div className={styles.outputIconWrapAlt}>
                <FileTextIcon className={styles.outputIcon} />
              </div>
              <div>
                <h4 className={styles.outputTitle}>Short Memo</h4>
                <p className={styles.outputDescription}>IC-lite format for faster committee reviews</p>
              </div>
            </div>
            <div className={styles.valueTags}>
              <span className={styles.valueTag}>Better decisions, less bias</span>
              <span className={styles.valueTag}>Faster IC prep</span>
              <span className={styles.valueTag}>Repeatable process</span>
            </div>
          </div>
        </div>
      </section>

      {/* Due Diligence Section */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.badgeWrap}>
              <span className={styles.badge}>Live Direction</span>
            </div>
            <div className={styles.titleWithIcon}>
              <div className={styles.titleIconWrap}>
                <ClipboardListIcon className={styles.titleIcon} />
              </div>
              <h2 className={styles.sectionTitle}>Due Diligence & IC Pack</h2>
            </div>
            <p className={styles.sectionSubtitle}>
              Comprehensive DD tracking with full audit trail and IC-ready exports
            </p>
          </div>

          <div className={styles.ddGrid}>
            {ddCategories.map((cat, idx) => (
              <div key={idx} className={styles.ddCard}>
                <div className={styles.ddHeader}>
                  <div className={styles.ddIconWrap}>
                    <cat.icon className={styles.ddIcon} />
                  </div>
                  <h3 className={styles.ddLabel}>{cat.label}</h3>
                </div>
                <ul className={styles.ddItems}>
                  {cat.items.map((item, itemIdx) => (
                    <li key={itemIdx} className={styles.ddItem}>
                      <span className={styles.ddBullet}>-</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={styles.verificationCard}>
            <h4 className={styles.verificationTitle}>Verification States</h4>
            <div className={styles.verificationStates}>
              <div className={styles.verificationItem}>
                <span className={`${styles.verificationDot} ${styles.dotMissing}`}></span>
                Missing
              </div>
              <div className={styles.verificationItem}>
                <span className={`${styles.verificationDot} ${styles.dotProvided}`}></span>
                Provided
              </div>
              <div className={styles.verificationItem}>
                <span className={`${styles.verificationDot} ${styles.dotVerified}`}></span>
                Verified
              </div>
            </div>
          </div>

          <div className={styles.additionalFeatures}>
            <div className={styles.additionalFeature}>
              <MessageSquareIcon className={styles.additionalIcon} />
              <span>Q&A Log</span>
            </div>
            <div className={styles.additionalFeature}>
              <FileTextIcon className={styles.additionalIcon} />
              <span>Document Requests</span>
            </div>
            <div className={styles.additionalFeature}>
              <ShieldIcon className={styles.additionalIcon} />
              <span>Audit Trail</span>
            </div>
          </div>

          <div className={styles.outputCard}>
            <div className={styles.outputInfo}>
              <div className={styles.outputIconWrapAccent}>
                <FileTextIcon className={styles.outputIcon} />
              </div>
              <div>
                <h4 className={styles.outputTitle}>Investment Memo + IC Pack</h4>
                <p className={styles.outputDescription}>Complete package ready for Investment Committee</p>
              </div>
            </div>
            <div className={styles.valueTags}>
              <span className={styles.valueTag}>De-risk decisions</span>
              <span className={styles.valueTag}>Close faster</span>
              <span className={styles.valueTag}>LP-grade professionalism</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>Ready to streamline your deal flow?</h2>
          <p className={styles.ctaDescription}>
            While we build the Scoring OS, explore startup profiles and manage your pipeline with our existing tools.
          </p>
          <div className={styles.ctaButtons}>
            <Link className={styles.ctaPrimary} to="/startups">
              Browse Startups
              <ArrowRightIcon className={styles.ctaArrow} />
            </Link>
            <Link className={styles.ctaSecondary} to="https://app.raisetalks.com/investor-pipeline">
              View Dealflow
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
