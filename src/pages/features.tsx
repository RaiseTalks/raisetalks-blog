import React, { useState, useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

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

interface FeatureCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageComponent?: React.ReactNode;
  layout?: 'default' | 'reverse';
  icon?: string;
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
  icon = '⚡',
  category = 'Core Feature',
  benefits = [],
  ctaText = 'Try This Feature',
  ctaLink = 'https://raisetalks.ai/signup'
}: FeatureCardProps) {
  const animationRef = useScrollAnimation();

  return (
    <div
      ref={animationRef}
      className={`py-20 border-b border-gray-100 last:border-b-0 ${layout === 'reverse' ? 'bg-gradient-to-r from-gray-50 to-blue-50' : 'bg-white'} opacity-0 translate-y-8 transition-all duration-700`}
      id={title.toLowerCase().replace(/\s+/g, '-')}
    >
      <div className="container mx-auto px-4">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${layout === 'reverse' ? 'lg:flex-row-reverse' : ''}`}>
          <div className={layout === 'reverse' ? 'lg:order-2' : ''}>
            {/* Category Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#0174e1]/10 text-[#0174e1] text-sm font-semibold mb-4">
              <span className="mr-2">{icon}</span>
              {category}
            </div>

            {/* Feature Content */}
            <h3 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{title}</h3>
            <p className="text-2xl text-[#0174e1] font-semibold mb-6 leading-relaxed">{subtitle}</p>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">{description}</p>

            {/* Benefits List */}
            {benefits.length > 0 && (
              <div className="mb-8">
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-green-600 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700 text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Feature CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                className="bg-gradient-to-r from-[#0174e1] to-[#0166ca] text-white px-6 py-3 rounded-xl font-semibold text-base hover:scale-105 hover:shadow-xl transition-all duration-300"
                to={ctaLink}>
                {ctaText}
              </Link>
              <Link
                className="border-2 border-[#0174e1] text-[#0174e1] px-6 py-3 rounded-xl font-semibold text-base hover:bg-[#0174e1] hover:text-white transition-all duration-300"
                to="#learn-more">
                Learn More
              </Link>
            </div>
          </div>

          <div className={`${layout === 'reverse' ? 'lg:order-1' : ''}`}>
            <div className="relative group">
              {imageComponent || (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-16 text-center border border-blue-200 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <div className="text-gray-400 text-xl">Feature Screenshot</div>
                  <div className="text-sm text-gray-500 mt-2">Coming Soon</div>
                </div>
              )}
              {/* Floating element for visual interest */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-[#0174e1] to-[#0166ca] rounded-full flex items-center justify-center shadow-lg opacity-90">
                <span className="text-white text-2xl">{icon}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnhancedImagePlaceholder({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-12 text-center border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div className="text-gray-600 text-lg font-semibold mb-2">{title}</div>
      <div className="text-gray-600 text-base font-medium mb-4">{children}</div>
      <div className="text-sm text-gray-500">Interactive Preview Coming Soon</div>
      {/* Mock UI elements */}
      <div className="mt-6 space-y-3">
        <div className="h-3 bg-gray-300 rounded-full w-3/4 mx-auto opacity-60"></div>
        <div className="h-3 bg-gray-300 rounded-full w-1/2 mx-auto opacity-40"></div>
        <div className="h-3 bg-gray-300 rounded-full w-2/3 mx-auto opacity-30"></div>
      </div>
    </div>
  );
}

function MultiImageGallery() {
  const images = [
    { title: "Dashboard Overview", desc: "Data Room Dashboard" },
    { title: "File Management", desc: "File Organization" },
    { title: "Secure Sharing", desc: "Document Sharing" },
    { title: "Access Controls", desc: "Security Controls" }
  ];

  return (
    <div className="grid grid-cols-2 gap-6">
      {images.map((img, index) => (
        <div key={index} className="group">
          <EnhancedImagePlaceholder title={img.title}>
            {img.desc}
          </EnhancedImagePlaceholder>
        </div>
      ))}
    </div>
  );
}

// Feature Navigation Component
function FeatureNavigation() {
  const [activeSection, setActiveSection] = useState('');

  const features = [
    { id: 'basic-data-room', name: 'Data Room', icon: '📁' },
    { id: 'ai-advisor', name: 'AI Advisor', icon: '🤖' },
    { id: 'ai-self-assessment-&-pre-scoring', name: 'AI Scoring', icon: '📊' },
    { id: 'real-time-engagement-tracking', name: 'Engagement', icon: '👁️' },
    { id: 'advanced-data-room-customization', name: 'Customization', icon: '⚙️' },
    { id: 'collaborative-fundraising', name: 'Collaboration', icon: '👥' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    features.forEach((feature) => {
      const element = document.getElementById(feature.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-4 mb-8">
      <div className="flex flex-wrap gap-2 justify-center">
        {features.map((feature) => (
          <Link
            key={feature.id}
            to={`#${feature.id}`}
            className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 ${activeSection === feature.id
              ? 'bg-[#0174e1] text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            <span className="mr-2">{feature.icon}</span>
            {feature.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

// Trust Indicators Component
function TrustIndicators() {
  return (
    <div className="py-12 bg-white/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Trusted by 1000+ startups</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          {/* Placeholder for trust badges */}
          <div className="bg-gray-200 rounded-lg px-6 py-3 text-gray-500 text-sm">Microsoft for Startups</div>
          <div className="bg-gray-200 rounded-lg px-6 py-3 text-gray-500 text-sm">Y Combinator</div>
          <div className="bg-gray-200 rounded-lg px-6 py-3 text-gray-500 text-sm">500 Startups</div>
          <div className="bg-gray-200 rounded-lg px-6 py-3 text-gray-500 text-sm">Techstars</div>
        </div>
      </div>
    </div>
  );
}

export default function Features() {
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

      {/* Enhanced Hero Section */}
      <section className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 flex items-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/img/raisetalks-hero-1.svg')] bg-center bg-cover opacity-30"></div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-16 border border-gray-100">
              {/* Category Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#0174e1]/10 text-[#0174e1] text-sm font-semibold mb-6">
                <span className="mr-2">🚀</span>
                AI-POWERED FUNDRAISING PLATFORM
              </div>

              <Heading as="h1" className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
                Features That Transform Your Fundraising
              </Heading>
              <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                <strong>RaiseTalks.ai</strong> replaces hours of prep, endless files, and expensive advisors with one smart, founder-first platform.
                <br />
                Get investor-ready faster—with AI precision and zero guesswork.
              </p>

              {/* Enhanced CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link
                  className="bg-gradient-to-r from-[#0174e1] to-[#0166ca] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300 min-w-[200px]"
                  to="https://raisetalks.ai/signup">
                  Start Free Trial
                </Link>
                <Link
                  className="border-2 border-[#0174e1] text-[#0174e1] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#0174e1] hover:text-white transition-all duration-300 min-w-[200px]"
                  to="#basic-data-room">
                  Explore Features
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0174e1]">1000+</div>
                  <div className="text-sm text-gray-500">Startups</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0174e1]">$2.5B+</div>
                  <div className="text-sm text-gray-500">Raised</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0174e1]">85%</div>
                  <div className="text-sm text-gray-500">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <TrustIndicators />

      {/* Features */}
      <main>
        {/* Basic Data Room */}
        <FeatureCard
          title="Basic Data Room"
          subtitle="Investor-grade files, ready in a flash."
          description="A secure, lightning-fast vault that lets you upload, organize, and share key docs with a single link."
          imageComponent={<MultiImageGallery />}
          icon="📁"
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
          subtitle="24/7 fundraising brain in your browser."
          description="Instant answers to investor questions, next-step prompts, and weak-spot flags before VCs notice."
          imageComponent={<EnhancedImagePlaceholder title="AI Chat Interface">Smart fundraising assistant</EnhancedImagePlaceholder>}
          layout="reverse"
          icon="🤖"
          category="AI-Powered"
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
          imageComponent={<EnhancedImagePlaceholder title="Readiness Dashboard">Comprehensive scoring system</EnhancedImagePlaceholder>}
          icon="📊"
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
          imageComponent={<EnhancedImagePlaceholder title="Analytics Dashboard">Real-time engagement metrics</EnhancedImagePlaceholder>}
          layout="reverse"
          icon="👁️"
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
          imageComponent={<EnhancedImagePlaceholder title="Customization Panel">Advanced permission controls</EnhancedImagePlaceholder>}
          icon="⚙️"
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
          imageComponent={<EnhancedImagePlaceholder title="Collaboration Hub">Team workflow management</EnhancedImagePlaceholder>}
          layout="reverse"
          icon="👥"
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

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#0174e1] to-[#0166ca] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/img/raisetalks-hero-1.svg')] bg-center bg-cover opacity-10"></div>
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <div className="max-w-4xl mx-auto">
            <Heading as="h2" className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Fundraising?
            </Heading>
            <p className="text-xl mb-8 opacity-95 leading-relaxed">
              Join 1000+ founders who've streamlined their fundraising with AI-powered tools.
              <br />
              Start your free trial today and see the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                className="bg-white text-[#0174e1] px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300 min-w-[200px]"
                to="https://raisetalks.ai/signup">
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