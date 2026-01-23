import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './investors.module.css';

// Icon components - Simple SVG replacements for Lucide icons
const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ClipboardCheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="m9 12 2 2 4-4" />
    <path d="M21 12V8a2 2 0 0 0-2-2h-1" />
    <path d="M11 6a2 2 0 0 1 2-2h1" />
    <path d="m9 13-2-2" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="m22 21-2-2" />
    <circle cx="16" cy="11" r="3" />
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
    <path d="m9 12 2 2 4-4" />
    <path d="M21 12c.83 0 1.5-.67 1.5-1.5v-3A1.5 1.5 0 0 0 21 6h-3c-.83 0-1.5.67-1.5 1.5v3c0 .83.67 1.5 1.5 1.5z" />
    <path d="M9 12c-.83 0-1.5-.67-1.5-1.5v-3A1.5 1.5 0 0 1 9 6h3c.83 0 1.5.67 1.5 1.5v3c0 .83-.67 1.5-1.5 1.5z" />
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
    <path d="m12 11 2 2 4-4" />
  </svg>
);

const CalculatorIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" x2="16" y1="6" y2="6" />
    <line x1="16" x2="16" y1="14" y2="18" />
    <path d="m16 10 0 4" />
    <path d="m8 14 0 4" />
    <path d="m8 10 0 4" />
    <path d="m12 14 0 2" />
    <path d="m12 18 0 0" />
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

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 13c0 5-3.5 7.5-8 12.5C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6-2 1.5.8 4 2 6 2a1 1 0 0 1 1 1z" />
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

const Share2Icon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
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

const LockIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// Badge Component
function Badge({ 
  children, 
  variant = 'default', 
  className = '' 
}: { 
  children: React.ReactNode; 
  variant?: 'default' | 'secondary' | 'outline';
  className?: string;
}) {
  return (
    <span className={clsx(styles.badge, styles[`badge--${variant}`], className)}>
      {children}
    </span>
  );
}

// Card Components
function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx(styles.card, className)}>{children}</div>;
}

function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className={styles.cardHeader}>{children}</div>;
}

function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx(styles.cardContent, className)}>{children}</div>;
}

function CardTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <h3 className={clsx(styles.cardTitle, className)}>{children}</h3>;
}

function CardDescription({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={clsx(styles.cardDescription, className)}>{children}</p>;
}

// Button Component
function Button({ 
  children, 
  size = 'default', 
  variant = 'default', 
  className = '',
  onClick,
  href
}: { 
  children: React.ReactNode; 
  size?: 'default' | 'lg';
  variant?: 'default' | 'outline';
  className?: string;
  onClick?: () => void;
  href?: string;
}) {
  const buttonClass = clsx(styles.button, styles[`button--${variant}`], styles[`button--${size}`], className);
  
  if (href) {
    return <Link className={buttonClass} to={href}>{children}</Link>;
  }
  
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
}

export default function InvestorsPage() {
  const { siteConfig } = useDocusaurusContext();

  const rubricItems = [
    { icon: UsersIcon, label: 'Team', description: 'Experience, expertise & execution capability' },
    { icon: CpuIcon, label: 'Product-Tech', description: 'Technology differentiation & moat' },
    { icon: GlobeIcon, label: 'Market', description: 'Size, timing & competitive dynamics' },
    { icon: HandshakeIcon, label: 'Deal', description: 'Terms, traction & investment thesis fit' },
  ];

  const workspaceFeatures = [
    { icon: TargetIcon, label: 'Thesis Templates', description: 'Customizable scoring criteria aligned to fund strategy' },
    { icon: UsersIcon, label: 'Multi-Reviewer', description: 'Parallel scoring with automatic variance detection' },
    { icon: MessageSquareIcon, label: 'Discussion Thread', description: 'Structured debate and alignment on key questions' },
    { icon: CheckCircleIcon, label: 'Decision Controls', description: 'Clear pass/fail/hold workflow with audit trail' },
  ];

  const ddCategories = [
    { icon: ScaleIcon, label: 'Legal', items: ['Cap table', 'IP ownership', 'Contracts'] },
    { icon: CalculatorIcon, label: 'Financial', items: ['Audited statements', 'Projections', 'Unit economics'] },
    { icon: Building2Icon, label: 'Commercial', items: ['Customer refs', 'Pipeline', 'Partnerships'] },
    { icon: ServerIcon, label: 'Tech', items: ['Architecture', 'Security audit', 'Scalability'] },
  ];

  return (
    <Layout
      title="RaiseTalks Scoring OS"
      description="Turn raw startup info into standardized, IC-ready outputs with audit trail, benchmarks, and collaboration">
      {/* Enhanced Hero Section */}
      <section className="relative flex items-center min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/img/raisetalks-hero-1.svg')] bg-center bg-cover opacity-30"></div>

        <div className="container relative z-10 px-4 py-16 mx-auto">
          <div className="max-w-5xl mx-auto text-center">
            <div className="p-8 border border-gray-100 shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl md:p-16">
              {/* Category Badge */}
              <Badge variant="outline" className="mb-6">
                <SparklesIcon className={styles.badgeIcon} />
                FOR INVESTORS
              </Badge>

              <Heading as="h1" className={clsx(styles.heroTitle, 'max-w-4xl mx-auto mb-6 text-4xl font-bold leading-tight md:text-6xl')}>
                RaiseTalks{' '}
                <span className={styles.heroTitleAccent}>
                  Scoring OS
                </span>
              </Heading>
              
              <p className={clsx(styles.heroDescription, 'max-w-4xl mx-auto mb-8 text-xl leading-relaxed')}>
                Turn raw startup info into standardized, IC-ready outputs with audit trail,
                benchmarks, and collaboration — so funds screen faster and decide better.
              </p>

              {/* Enhanced CTAs */}
              <div className="flex flex-col justify-center gap-4 mb-8 sm:flex-row">
                <Button
                  size="lg"
                  className="min-w-[200px]"
                  href="/startups"
                >
                  Browse Startups
                  <ArrowRightIcon className={styles.buttonIcon} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="min-w-[200px]"
                  href="https://app.raisetalks.com/investor-pipeline"
                >
                  View Dealflow
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Content */}
      <main className={clsx('container', styles.container, styles.heroToContentSpacing)}>

        {/* Pre-Score Engine Section */}
        <section className={clsx(styles.section, styles.animateIn)} style={{ animationDelay: '100ms' }}>
          <Card className={styles.featureCard}>
            <CardHeader>
              <div className={styles.cardHeaderContent}>
                <div className={styles.cardHeaderMain}>
                  <div className={styles.iconContainer}>
                    <ClipboardCheckIcon className={styles.icon} />
                  </div>
                  <div>
                    <CardTitle>
                      Pre-Score Engine
                    </CardTitle>
                    <CardDescription>
                      Quickly screen incoming deal flow with structured, evidence-based scoring
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary">
                  Coming Soon
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className={styles.sectionContent}>
                {/* Scoring Rubric Grid */}
                <div>
                  <h4 className={styles.subsectionTitle}>
                    <span className={styles.dividerLine} />
                    Scoring Rubric (1-5 Scale)
                    <span className={styles.dividerLine} />
                  </h4>
                  <div className={styles.gridFour}>
                    {rubricItems.map((item, idx) => (
                      <div
                        key={item.label}
                        className={clsx(styles.gridItem, styles.rubricItem)}
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <item.icon className={styles.rubricIcon} />
                        <div className={styles.rubricLabel}>
                          {item.label}
                        </div>
                        <div className={styles.rubricDescription}>
                          {item.description}
                        </div>
                        <div className={styles.scoreIndicator}>
                          {[1, 2, 3, 4, 5].map((n) => (
                            <div
                              key={n}
                              className={styles.scoreDot}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements callout */}
                <div className={styles.callout}>
                  <div className={styles.calloutContent}>
                    <LockIcon className={styles.calloutIcon} />
                    <div className={styles.calloutText}>
                      <span className={styles.calloutTitle}>Mandatory for each dimension:</span>{' '}
                      Score (1-5) + Written rationale + Evidence link from data room
                    </div>
                  </div>
                </div>

                {/* Output section */}
                <div className={styles.outputSection}>
                  <div className={styles.outputInfo}>
                    <div className={clsx(styles.outputIcon, styles.outputIconEmerald)}>
                      <FileTextIcon className={styles.icon} />
                    </div>
                    <div>
                      <div className={styles.outputTitle}>Pre-Scoring Card</div>
                      <div className={styles.outputSubtitle}>
                        <Share2Icon className={styles.subtitleIcon} /> Shareable link + PDF export
                      </div>
                    </div>
                  </div>
                  <div className={styles.benefitTags}>
                    <Badge variant="outline">
                      <ZapIcon className={styles.benefitIcon} />
                      Screen faster
                    </Badge>
                    <Badge variant="outline">
                      <TrendingUpIcon className={styles.benefitIcon} />
                      Higher-quality inbound
                    </Badge>
                    <Badge variant="outline">
                      <UsersIcon className={styles.benefitIcon} />
                      Cohort-ready
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Scoring & Committee Workspace Section */}
        <section className={clsx(styles.section, styles.animateIn)} style={{ animationDelay: '200ms' }}>
          <Card className={styles.featureCard}>
            <CardHeader>
              <div className={styles.cardHeaderContent}>
                <div className={styles.cardHeaderMain}>
                  <div className={styles.iconContainer}>
                    <ScaleIcon className={styles.icon} />
                  </div>
                  <div>
                    <CardTitle>
                      Scoring & Committee Workspace
                    </CardTitle>
                    <CardDescription>
                      Collaborative scoring with variance detection and structured decision-making
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary">
                  Coming Soon
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className={styles.sectionContent}>
                {/* Features Grid */}
                <div className={styles.gridTwo}>
                  {workspaceFeatures.map((feature, idx) => (
                    <div
                      key={feature.label}
                      className={clsx(styles.gridItem, styles.featureItem)}
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className={styles.featureIconContainer}>
                        <feature.icon className={styles.featureIcon} />
                      </div>
                      <div>
                        <div className={styles.featureLabel}>
                          {feature.label}
                        </div>
                        <div className={styles.featureDescription}>
                          {feature.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Output section */}
                <div className={styles.outputSection}>
                  <div className={styles.outputInfo}>
                    <div className={clsx(styles.outputIcon, styles.outputIconViolet)}>
                      <FileTextIcon className={styles.icon} />
                    </div>
                    <div>
                      <div className={styles.outputTitle}>Short Memo</div>
                      <div className={styles.outputDescription}>
                        IC-lite format for faster committee reviews
                      </div>
                    </div>
                  </div>
                  <div className={styles.benefitTags}>
                    <Badge variant="outline">
                      Better decisions, less bias
                    </Badge>
                    <Badge variant="outline">
                      Faster IC prep
                    </Badge>
                    <Badge variant="outline">
                      Repeatable process
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Due Diligence & IC Pack Section */}
        <section className={clsx(styles.section, styles.animateIn)} style={{ animationDelay: '300ms' }}>
          <Card className={styles.featureCard}>
            <CardHeader>
              <div className={styles.cardHeaderContent}>
                <div className={styles.cardHeaderMain}>
                  <div className={styles.iconContainer}>
                    <ClipboardListIcon className={styles.icon} />
                  </div>
                  <div>
                    <CardTitle>
                      Due Diligence & IC Pack
                    </CardTitle>
                    <CardDescription>
                      Comprehensive DD tracking with full audit trail and IC-ready exports
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary">
                  Coming Soon
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className={styles.sectionContent}>
                {/* DD Categories Grid */}
                <div>
                  <h4 className={styles.subsectionTitle}>
                    <span className={styles.dividerLine} />
                    DD Checklist by Category
                    <span className={styles.dividerLine} />
                  </h4>
                  <div className={styles.gridFourResponsive}>
                    {ddCategories.map((cat, idx) => (
                      <div
                        key={cat.label}
                        className={clsx(styles.gridItem, styles.categoryItem)}
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <div className={styles.categoryHeader}>
                          <cat.icon className={styles.categoryIcon} />
                          <div className={styles.categoryLabel}>
                            {cat.label}
                          </div>
                        </div>
                        <ul className={styles.categoryItems}>
                          {cat.items.map((item) => (
                            <li key={item} className={styles.categoryItem}>
                              <div className={styles.categoryBullet} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verification States */}
                <div className={styles.verificationStates}>
                  <div className={styles.verificationTitle}>
                    Verification States
                  </div>
                  <div className={styles.verificationList}>
                    <div className={styles.verificationItem}>
                      <div className={clsx(styles.verificationDot, styles.dotMissing)} />
                      <span>Missing</span>
                    </div>
                    <div className={styles.verificationItem}>
                      <div className={clsx(styles.verificationDot, styles.dotProvided)} />
                      <span>Provided</span>
                    </div>
                    <div className={styles.verificationItem}>
                      <div className={clsx(styles.verificationDot, styles.dotVerified)} />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>

                {/* Features row */}
                <div className={styles.gridThree}>
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

                {/* Output section */}
                <div className={styles.outputSection}>
                  <div className={styles.outputInfo}>
                    <div className={clsx(styles.outputIcon, styles.outputIconRose)}>
                      <FileTextIcon className={styles.icon} />
                    </div>
                    <div>
                      <div className={styles.outputTitle}>Investment Memo + IC Pack</div>
                      <div className={styles.outputDescription}>
                        Complete package ready for Investment Committee
                      </div>
                    </div>
                  </div>
                  <div className={styles.benefitTags}>
                    <Badge variant="outline">
                      De-risk decisions
                    </Badge>
                    <Badge variant="outline">
                      Close faster
                    </Badge>
                    <Badge variant="outline">
                      LP-grade professionalism
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer CTA */}
      <section className="py-24 relative overflow-hidden" style={{background: 'var(--raisetalks-brand-gradient)'}}>
        <div className="absolute inset-0 bg-[url('/img/raisetalks-hero-1.svg')] bg-center bg-cover opacity-10"></div>
        <div className="container relative z-10 px-4 mx-auto text-center text-white">
          <div className="max-w-4xl mx-auto">
            <Heading as="h2" className="mb-6 text-4xl font-bold md:text-5xl">
              Ready to streamline your deal flow?
            </Heading>
            <p className="mb-8 text-xl leading-relaxed opacity-95">
              While we build the Scoring OS, explore startup profiles and manage your pipeline
              <br />
              with our existing tools.
            </p>
            <div className="flex flex-col justify-center gap-4 mb-8 sm:flex-row">
              <Link
                className="bg-white text-[#0174e1] px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300 min-w-[200px]"
                to="/startups">
                Browse Startups
              </Link>
              <Link
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-[#0174e1] transition-all duration-300 min-w-[200px]"
                to="https://app.raisetalks.com/investor-pipeline">
                View Dealflow
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}