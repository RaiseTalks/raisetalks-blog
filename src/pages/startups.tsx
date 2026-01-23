import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import FAQSection from '@site/src/components/FAQSection';

import styles from './startups.module.css';

// Custom hook for scroll animations
function useScrollAnimation() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return ref;
}

// Icon components - Simple SVG icons for features
const DataRoomIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </svg>
);

const AIAdvisorIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);

const EngagementIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 12h-2.48a2 2 0 0 0-1.93 2.52l-1.35 4.87a1 1 0 0 1-1.93-.01L9.8 9.35a1 1 0 0 0-1.93.01L6.52 14.5A2 2 0 0 1 4.6 16H2" />
  </svg>
);

const SecurityIcon = ({ className }: { className?: string }) => (
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

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    <circle cx="12" cy="12" r="3" />
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

function CardContent({ children }: { children: React.ReactNode }) {
  return <div className={styles.cardContent}>{children}</div>;
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

// Original FeatureCard component with 2-column layout
interface FeatureCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageComponent?: React.ReactNode;
  layout?: 'default' | 'reverse';
  category?: string;
  benefits?: string[];
  ctaText?: string;
  ctaLink?: string;
}

function FeatureCard({
  title,
  subtitle,
  description,
  imageComponent,
  layout = 'default',
  category = 'Core Feature',
  benefits = [],
  ctaText = 'Try This Feature',
  ctaLink = 'https://app.raisetalks.com/sign-up'
}: FeatureCardProps) {
  const animationRef = useScrollAnimation();

  return (
    <div
      ref={animationRef}
      className={clsx(
        'py-20 border-b last:border-b-0 transition-all duration-700',
        layout === 'reverse' ? styles.featureCardReverse : styles.featureCardDefault,
        styles.animateIn
      )}
      id={title.toLowerCase().replace(/&/g, '').replace(/\s+/g, '-')}
      style={{ animationDelay: '0.2s' }}
    >
      <div className={clsx('container px-4 mx-auto', styles.container)}>
        <div className={clsx('grid lg:grid-cols-2 gap-16 items-center', layout === 'reverse' ? 'lg:flex-row-reverse' : '')}>
          <div className={layout === 'reverse' ? 'lg:order-2' : ''}>
            {/* Category Badge */}
            <Badge variant="outline" className="mb-4">
              {category}
            </Badge>

            {/* Feature Content */}
            <CardTitle className={clsx(styles.heroTitle, 'mb-4 text-4xl font-bold leading-tight')}>{title}</CardTitle>
            <p className={clsx(styles.heroTitleAccent, 'text-2xl font-semibold mb-6 leading-relaxed')}>{subtitle}</p>
            <p className={clsx(styles.cardDescription, 'mb-8 text-xl leading-relaxed')}>{description}</p>

            {/* Benefits List */}
            {benefits.length > 0 && (
              <ul className={clsx(styles.benefitsList, 'mb-8')}>
                {benefits.map((benefit, index) => (
                  <li key={index} className={styles.benefitItem}>
                    <span className={styles.benefitCheck}>✓</span>
                    <span className={styles.benefitText}>{benefit}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Feature CTA */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                href={ctaLink}
              >
                {ctaText}
                <ArrowRightIcon className={styles.buttonIcon} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                href="https://calendly.com/iamdariiava/30min"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className={layout === 'reverse' ? 'lg:order-1' : ''}>
            <div className="relative group">
              {imageComponent || (
                <div className="p-16 text-center transition-all duration-300 border border-blue-200 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl group-hover:shadow-xl">
                  <div className="text-xl text-gray-400">Feature Screenshot</div>
                  <div className="mt-2 text-sm text-gray-500">Coming Soon</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnhancedImagePlaceholder({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="p-12 text-center transition-all duration-300 border border-blue-200 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl hover:shadow-xl group">
      <div className="mb-2 text-lg font-semibold text-gray-600">{title}</div>
      <div className="mb-4 text-base font-medium text-gray-600">{children}</div>
      <div className="text-sm text-gray-500">Interactive Preview Coming Soon</div>
      {/* Mock UI elements */}
      <div className="mt-6 space-y-3">
        <div className="w-3/4 h-3 mx-auto bg-gray-300 rounded-full opacity-60"></div>
        <div className="w-1/2 h-3 mx-auto bg-gray-300 rounded-full opacity-40"></div>
        <div className="w-2/3 h-3 mx-auto bg-gray-300 rounded-full opacity-30"></div>
      </div>
    </div>
  );
}

function MultiImageGallery() {
  const images = [
    { title: "General", src: "/img/icons/general.svg" },
    { title: "Product", src: "/img/icons/product.svg" },
    { title: "Market", src: "/img/icons/market.svg" },
    { title: "Finance", src: "/img/icons/finance.svg" }
  ];

  return (
    <div className="grid grid-cols-2">
      {images.map((image, index) => (
        <div key={index} className="flex justify-center">
          <img
            src={image.src}
            alt={image.title}
            className="h-60 max-w-full p-2"
          />
        </div>
      ))}
    </div>
  );
}

export default function Startups() {
  return (
    <Layout
      title="Features"
      description="AI-powered fundraising workspace features - data rooms, AI advisor, engagement tracking, and more">

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>

      {/* Hero Section */}
      <section className="cleanHeroSection">
        <div className="cleanHeroContainer">
          <Heading as="h1" className="cleanHeroTitle">
            Features That{' '}
            <span className="cleanHeroTitleAccent">Transform Your Fundraising</span>
          </Heading>
          <p className="cleanHeroDescription">
            <strong>RaiseTalks</strong> replaces hours of prep, endless files,
            and expensive advisors with one smart, founder-first platform.
            Get investor-ready faster with AI precision and zero guesswork.
          </p>
          <div className="cleanHeroButtons">
            <Link className="cleanHeroPrimaryButton" to="https://app.raisetalks.com/sign-up">
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <main>
        {/* Basic Data Room */}
        <FeatureCard
          title="Basic Data Room"
          subtitle="Investor-grade files, ready in a flash."
          description="A secure, lightning-fast vault that lets you upload, organize, and share key docs with a single link."
          imageComponent={<MultiImageGallery />}
          category="Core Platform"
          benefits={[
            "Upload and organize documents in minutes",
            "Share with a single secure link",
            "Enterprise-grade security and encryption",
            "Mobile-friendly access for investors"
          ]}
          ctaText="Create Data Room"
        />

        {/* AI Advisor */}
        <FeatureCard
          title="AI Advisor"
          subtitle="24/7 fundraising co-pilot in your team."
          description="Instant answers to investor questions, next-step prompts, and weak-spot flags before VCs notice."
          imageComponent={
            <div className="relative group">
              <img
                src="/img/icons/ai-advisor.svg"
                alt="AI Chat Interface"
                className="w-full h-auto transition-all duration-300 shadow-lg rounded-3xl group-hover:shadow-xl"
              />
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center shadow-lg opacity-95 border-2 border-gray-200 hover:bg-white hover:border-blue-600 transition-all duration-300">
                <img
                  src="/img/icons/ai-advisor-icon.svg"
                  alt="AI Icon"
                  className="w-10 h-6 drop-shadow-sm"
                />
              </div>
            </div>
          }
          layout="reverse"
          category="Startups"
          benefits={[
            "Get instant answers to fundraising questions",
            "Receive personalized next-step recommendations",
            "Identify and fix weak spots before investors see them",
            "24/7 availability with context-aware responses"
          ]}
          ctaText="Try AI Advisor"
        />

        {/* AI Self-Assessment & Pre-Scoring */}
        <FeatureCard
          title="AI Self-Assessment & Pre-Scoring"
          subtitle="Score your readiness. Close with confidence."
          description="Our AI audits your data room for completeness, clarity, and compliance—pinpointing gaps to fix early."
          imageComponent={
            <div className="relative group">
              <img
                src="/img/icons/ai-self-assesment.png"
                alt="Readiness Dashboard"
                className="w-full h-auto transition-all duration-300 shadow-lg rounded-3xl group-hover:shadow-xl"
              />
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center shadow-lg opacity-95 border-2 border-gray-200 hover:bg-white hover:border-blue-600 transition-all duration-300">
                <img
                  src="/img/icons/ai-self-assesment-icon.svg"
                  alt="Assessment Icon"
                  className="w-10 h-7 drop-shadow-sm"
                />
              </div>
            </div>
          }
          category="AI-Powered"
          benefits={[
            "Comprehensive readiness assessment",
            "Compliance checking for various regulations",
            "Gap identification with specific recommendations",
            "Benchmark against successful fundraising campaigns"
          ]}
          ctaText="Get Scored Now"
        />

        {/* Real-Time Engagement Tracking */}
        <FeatureCard
          title="Real-Time Engagement Tracking"
          subtitle="See interest spark—while it's happening."
          description="Live alerts reveal who opened what, how long they lingered, and which slides win—or lose—them."
          imageComponent={
            <div className="relative group">
              <img
                src="/img/icons/real-time-engagement-tracking.png"
                alt="Analytics Dashboard"
                className="w-full h-auto transition-all duration-300 shadow-lg rounded-3xl group-hover:shadow-xl"
              />
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center shadow-lg opacity-95 border-2 border-gray-200 hover:bg-white hover:border-blue-600 transition-all duration-300">
                <img
                  src="/img/icons/real-time-engagement-tracking-icon.svg"
                  alt="Analytics Icon"
                  className="w-8 h-8 drop-shadow-sm"
                />
              </div>
            </div>
          }
          layout="reverse"
          category="Analytics"
          benefits={[
            "Real-time notifications when investors view materials",
            "Detailed engagement analytics and heatmaps",
            "Time spent on each document and section",
            "Investor interest scoring and ranking"
          ]}
          ctaText="View Analytics"
        />

        {/* Advanced Data Room Customization */}
        <FeatureCard
          title="Advanced Data Room Customization"
          subtitle="Control every click. Impress every investor."
          description="Fine-tune permissions, watermark downloads, and track heat-maps of document views—no plug-ins required."
          imageComponent={
            <div className="relative group">
              <img
                src="/img/icons/advanced-data-room-customization.png"
                alt="Customization Panel"
                className="w-full h-auto transition-all duration-300 shadow-lg rounded-3xl group-hover:shadow-xl"
              />
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center shadow-lg opacity-95 border-2 border-gray-200 hover:bg-white hover:border-blue-600 transition-all duration-300">
                <img
                  src="/img/icons/advanced-data-room-customization.svg"
                  alt="Customization Icon"
                  className="w-8 h-8 drop-shadow-sm"
                />
              </div>
            </div>
          }
          category="Professional"
          benefits={[
            "Granular permission controls per investor",
            "Automatic watermarking and download protection",
            "Custom branding and white-label options",
            "Advanced access logs and audit trails"
          ]}
          ctaText="Customize Now"
        />

        {/* Collaborative Fundraising */}
        <FeatureCard
          title="Collaborative Fundraising"
          subtitle="Teamwork that actually saves time."
          description="Co-edit decks, leave inline comments, and assign tasks in real-time so your raise moves as one."
          imageComponent={
            <div className="relative group">
              <img
                src="/img/icons/collaborative-fundraising.png"
                alt="Collaboration Hub"
                className="w-full h-auto transition-all duration-300 shadow-lg rounded-3xl group-hover:shadow-xl"
              />
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center shadow-lg opacity-95 border-2 border-gray-200 hover:bg-white hover:border-blue-600 transition-all duration-300">
                <img
                  src="/img/icons/collaborative-fundraising-icon.svg"
                  alt="Collaboration Icon"
                  className="w-8 h-8 drop-shadow-sm"
                />
              </div>
            </div>
          }
          layout="reverse"
          category="Team Tools"
          benefits={[
            "Real-time collaborative editing",
            "Task assignment and progress tracking",
            "Inline comments and feedback system",
            "Version control and change history"
          ]}
          ctaText="Start Collaborating"
        />
      </main>

      {/* FAQ Section */}
      <FAQSection />

      {/* Enhanced CTA Section */}
      <section className="py-24 relative overflow-hidden" style={{background: 'var(--raisetalks-brand-gradient)'}}>
        <div className="absolute inset-0 bg-[url('/img/raisetalks-hero-1.svg')] bg-center bg-cover opacity-10"></div>
        <div className="container relative z-10 px-4 mx-auto text-center text-white">
          <div className="max-w-4xl mx-auto">
            <Heading as="h2" className="mb-6 text-4xl font-bold md:text-5xl">
              Ready to Transform Your Fundraising?
            </Heading>
            <p className="mb-8 text-xl leading-relaxed opacity-95">
              Join 1000+ founders who've streamlined their fundraising with AI-powered tools.
              <br />
              Start your free trial today and see the difference.
            </p>
            <div className="flex flex-col justify-center gap-4 mb-8 sm:flex-row">
              <Link
                className="bg-white text-[#0174e1] px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300 min-w-[200px]"
                to="https://app.raisetalks.com/sign-up">
                Start Free Trial
              </Link>
              <Link
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-[#0174e1] transition-all duration-300 min-w-[200px]"
                to="/pricing">
                View Pricing
              </Link>
            </div>
            <div className="text-sm opacity-80">
              ✓ No credit card required  ✓ 14-day free trial  ✓ Setup in 5 minutes
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}