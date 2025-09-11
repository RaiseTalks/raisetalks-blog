import React, { useState, useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import FAQSection from '@site/src/components/FAQSection';

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
  ctaLink = 'https://dev.raisetalks.com/signup'
}: FeatureCardProps) {
  const animationRef = useScrollAnimation();

  return (
    <div
      ref={animationRef}
      className={`py-20 border-b border-gray-100 last:border-b-0 ${layout === 'reverse' ? 'bg-gradient-to-r from-gray-50 to-blue-50' : 'bg-white'} opacity-100 translate-y-0 transition-all duration-700`}
      id={title.toLowerCase().replace(/&/g, '').replace(/\s+/g, '-')}
    >
      <div className="container px-4 mx-auto">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${layout === 'reverse' ? 'lg:flex-row-reverse' : ''}`}>
          <div className={layout === 'reverse' ? 'lg:order-2' : ''}>
            {/* Category Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#0174e1]/10 text-[#0174e1] text-sm font-semibold mb-4">
              {category}
            </div>

            {/* Feature Content */}
            <h3 className="mb-4 text-4xl font-bold leading-tight text-gray-900">{title}</h3>
            <p className="text-2xl text-[#0174e1] font-semibold mb-6 leading-relaxed">{subtitle}</p>
            <p className="mb-8 text-xl leading-relaxed text-gray-600">{description}</p>

            {/* Benefits List */}
            {benefits.length > 0 && (
              <div className="mb-8">
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      <span className="text-lg text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Feature CTA */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                className="bg-gradient-to-r from-[#0174e1] to-[#0166ca] text-white px-6 py-3 rounded-xl font-semibold text-base hover:scale-105 hover:shadow-xl transition-all duration-300"
                to={ctaLink}>
                {ctaText}
              </Link>
              <Link
                className="border-2 border-[#0174e1] text-[#0174e1] px-6 py-3 rounded-xl font-semibold text-base hover:bg-[#0174e1] hover:text-white transition-all duration-300"
                to="https://calendly.com/iamdariiava/30min">
                Learn More
              </Link>
            </div>
          </div>

          <div className={`${layout === 'reverse' ? 'lg:order-1' : ''}`}>
            <div className="relative group">
              {imageComponent || (
                <div className="p-16 text-center transition-all duration-300 border border-blue-200 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl group-hover:shadow-xl">
                  <div className="text-xl text-gray-400">Feature Screenshot</div>
                  <div className="mt-2 text-sm text-gray-500">Coming Soon</div>
                </div>
              )}
              {/* Floating element for visual interest */}

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
      <section className="relative flex items-center min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/img/raisetalks-hero-1.svg')] bg-center bg-cover opacity-30"></div>

        <div className="container relative z-10 px-4 py-16 mx-auto">
          <div className="max-w-5xl mx-auto text-center">
            <div className="p-8 border border-gray-100 shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl md:p-16">
              {/* Category Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#0174e1]/10 text-[#0174e1] text-sm font-semibold mb-6">
                AI-POWERED FUNDRAISING PLATFORM
              </div>

              <Heading as="h1" className="max-w-4xl mx-auto mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
                Features That Transform Your Fundraising
              </Heading>
              <p className="max-w-4xl mx-auto mb-8 text-xl leading-relaxed text-gray-600">
                <strong>RaiseTalks</strong> replaces hours of prep, endless files, <br />
                and expensive advisors with one smart, founder-first platform
                <br />
                Get investor-ready faster with AI precision and zero guesswork
              </p>

              {/* Enhanced CTAs */}
              <div className="flex flex-col justify-center gap-4 mb-8 sm:flex-row">
                <Link
                  className="bg-gradient-to-r from-[#0174e1] to-[#0166ca] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300 min-w-[200px]"
                  to="https://dev.raisetalks.com/signup">
                  Start Free Trial
                </Link>
              </div>

            </div>
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
          subtitle="24/7 fundraising brain in your browser."
          description="Instant answers to investor questions, next-step prompts, and weak-spot flags before VCs notice."
          imageComponent={
            <div className="relative group">
              <img
                src="/img/icons/ai-advisor.svg"
                alt="AI Chat Interface"
                className="w-full h-auto transition-all duration-300 shadow-lg rounded-3xl group-hover:shadow-xl"
              />
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center shadow-lg opacity-95 border-2 border-gray-200 hover:bg-white hover:border-[#0174e1] transition-all duration-300">
                <img
                  src="/img/icons/ai-advisor-icon.svg"
                  alt="AI Icon"
                  className="w-10 h-6 drop-shadow-sm"
                />
              </div>
            </div>
          }
          layout="reverse"
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
          imageComponent={
            <div className="relative group">
              <img
                src="/img/icons/ai-self-assesment.png"
                alt="Readiness Dashboard"
                className="w-full h-auto transition-all duration-300 shadow-lg rounded-3xl group-hover:shadow-xl"
              />
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center shadow-lg opacity-95 border-2 border-gray-200 hover:bg-white hover:border-[#0174e1] transition-all duration-300">
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
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center shadow-lg opacity-95 border-2 border-gray-200 hover:bg-white hover:border-[#0174e1] transition-all duration-300">
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
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center shadow-lg opacity-95 border-2 border-gray-200 hover:bg-white hover:border-[#0174e1] transition-all duration-300">
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
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center shadow-lg opacity-95 border-2 border-gray-200 hover:bg-white hover:border-[#0174e1] transition-all duration-300">
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
      <section className="py-24 bg-gradient-to-r from-[#0174e1] to-[#0166ca] relative overflow-hidden">
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
                to="https://dev.raisetalks.com/signup">
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