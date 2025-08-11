import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import NavbarScroll from '@site/src/components/NavbarScroll';
import LogoCarousel from '@site/src/components/LogoCarousel';
import FAQSection from '@site/src/components/FAQSection';
import SolutionSection from '@site/src/components/SolutionSection';

import styles from './index.module.css';

// Custom hook for scroll animations
function useScrollAnimation() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.animate);
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


// Hero Section Component
function HomepageHero() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 flex items-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/img/raisetalks-hero-1.svg')] bg-center bg-cover opacity-50"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <p className="text-sm font-bold text-[#0174e1] uppercase tracking-wider mb-4">
              STREAMLINE DUE DILIGENCE
            </p>
            <Heading as="h1" className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your AI-powered fundraising workspace
            </Heading>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Built for early-stage founders to organize data rooms and close rounds faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                className="bg-gradient-to-r from-[#0174e1] to-[#0166ca] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300 min-w-[200px] text-center"
                to="https://raisetalks.ai/signup">
                Try It Free
              </Link>
              <Link
                className="border-2 border-[#0174e1] text-[#0174e1] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#0174e1] hover:text-white transition-all duration-300 min-w-[200px] text-center flex items-center justify-center"
                to="https://www.producthunt.com/@dariiava"
                target="_blank">
                <span className="mr-2">🚀</span> We're on Product Hunt →Soon
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Statistics Section Component
function HomepageStats() {
  const animationRef = useScrollAnimation();
  const stats = [
    {
      number: '80%',
      description: 'of startups are undervalued due to insufficient disclosure of information',
      title: 'Preparation for Investment Rounds',
      details: 'Without a well-organized data room tailored to their growth stage, startups struggle to build the trust and transparency necessary for investors to commit.'
    },
    {
      number: '30%',
      description: 'of promising startups stop operating because they did not have time to raise funds. It\'s the 3rd most common cause startups fail',
      title: 'Global Access to Capital',
      details: 'Startups are no longer limited to local investors, driving the need for professional materials to appeal to global audiences.'
    },
    {
      number: '100+',
      description: 'pitch decks are viewed by investors every week, but only 1-2 of these startups are selected each month to the investment committee',
      title: 'Weak Communication',
      details: 'Startups often falter in articulating their unique value proposition, leaving potential investors unconvinced or disengaged.'
    }
  ];

  return (
    <section className="py-20 bg-white" ref={animationRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Heading as="h2" className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Entrepreneurial Challenges
          </Heading>
          <p className="text-xl text-gray-600 mb-4">
            The Hidden Hurdles of Startup Success
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#0174e1] to-[#0166ca] mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl hover:border-[#0174e1] transition-all duration-300 group">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-[#0174e1] mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                  {stat.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed text-center">
                  {stat.details}
                </p>
              </div>
              
              {/* Decorative element */}
              <div className="mt-6 flex justify-center">
                <div className="w-12 h-1 bg-gradient-to-r from-[#0174e1] to-[#0166ca] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Why Choose Us Section Component
function HomepageWhyChoose() {
  const reasons = [
    {
      title: 'Cost-Smart',
      description: 'Cut out expensive advisors—get investor-ready without the overhead.'
    },
    {
      title: 'AI-Driven Speed',
      description: 'Automate the time-consuming prep and focus on closing your round.'
    },
    {
      title: 'VC-Grade Materials',
      description: 'Stand out with globally compliant, investor-trusted documents.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Heading as="h2" className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Founders Choose <span className="text-[#0174e1]">RaiseTalks.ai</span>
          </Heading>
          <div className="w-24 h-1 bg-gradient-to-r from-[#0174e1] to-[#0166ca] mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, idx) => (
            <div key={idx} className="text-center p-8 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-[#0174e1] to-[#0166ca] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl">✓</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{reason.title}</h3>
              <p className="text-gray-600 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pricing Section Component
function HomepagePricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Heading as="h2" className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </Heading>
          <p className="text-xl text-gray-600">
            Choose the plan that's right for your startup
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#0174e1] to-[#0166ca] mx-auto rounded-full mt-6"></div>
        </div>
        
        {/* Pricing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-xl flex items-center">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer ${
                !isAnnual
                  ? 'bg-white text-[#0174e1] shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                isAnnual
                  ? 'bg-white text-[#0174e1] shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annually
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Save 40%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow flex flex-col">
            <h3 className="text-2xl font-bold mb-2">Free Tier</h3>
            <p className="text-gray-600 mb-6">Perfect for testing the waters.</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$0</span>
              <span className="text-gray-600 ml-2">/month</span>
            </div>
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>AI Advisor answers to 5 fundraising questions</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>Basic fundraising guidance</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>Limited access to templates</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>Starter data room tools</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>Community access</span>
              </li>
            </ul>
            <Link
              className="w-full py-3 px-6 border-2 border-[#0174e1] text-[#0174e1] rounded-lg font-semibold hover:bg-[#0174e1] hover:text-white transition-colors text-center block mt-auto"
              to="https://raisetalks.ai/signup"
            >
              Start Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-b from-[#0174e1] to-[#0166ca] rounded-2xl shadow-xl p-8 text-white transform scale-105 flex flex-col">
            <div className="bg-white/20 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
              MOST POPULAR
            </div>
            <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
            <p className="text-white/90 mb-6">Everything you need to raise capital</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">
                ${isAnnual ? '59' : '99'}
              </span>
              <span className="text-white/80 ml-2">/month</span>
              {isAnnual && (
                <p className="text-sm text-white/80 mt-1">billed at $699/year • save 40%</p>
              )}
            </div>
            <div className="mb-4">
              <p className="text-sm text-white/90">All Free Tier features, plus:</p>
            </div>
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-center">
                <span className="mr-3">✓</span>
                <span>Full AI-powered fundraising Advisor</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3">✓</span>
                <span>Smart data room builder</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3">✓</span>
                <span>Investor-readiness scoring</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3">✓</span>
                <span>Engagement tracking</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3">✓</span>
                <span>Deal room templates</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3">✓</span>
                <span>Email support</span>
              </li>
            </ul>
            <Link
              className="w-full py-3 px-6 bg-white text-[#0174e1] rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center block mt-auto"
              to="https://raisetalks.ai/signup"
            >
              Start Free
            </Link>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 text-lg mb-4">
            All plans include 14-day free trial. No credit card required.
          </p>
          <p className="text-sm text-gray-500">
            Questions? <Link to="/pricing" className="text-[#0174e1] hover:underline">View full pricing details</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

// CTA Section Component
function HomepageCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <Heading as="h2" className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Fundraising isn't guesswork—it's a process.
            </Heading>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              RaiseTalks.ai helps you run it like a pro with automated data rooms, real investor insights, and deal-ready files.
            </p>
            <p className="text-lg font-semibold text-[#0174e1] mb-8">
              Join the Beta and lead your round with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                className="bg-gradient-to-r from-[#0174e1] to-[#0166ca] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300 min-w-[250px] text-center"
                to="https://raisetalks.ai/signup">
                Get started today with a free 14-day trial
              </Link>
              <Link
                className="border-2 border-[#0174e1] text-[#0174e1] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#0174e1] hover:text-white transition-all duration-300 min-w-[150px] text-center"
                to="/pricing">
                Pricing
              </Link>
            </div>
          </div>
        </div>
        
        {/* Social Connect Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Let's build the future of fundraising—together!
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Connect with founders, investors, and stay ahead with product updates.
          </p>
          <div className="flex gap-6 justify-center">
            <Link to="https://twitter.com/raisetalks" className="text-gray-600 hover:text-[#0174e1] transition-colors">
              <span className="text-2xl">𝕏</span>
            </Link>
            <Link to="https://linkedin.com/company/raisetalks" className="text-gray-600 hover:text-[#0174e1] transition-colors">
              <span className="text-2xl">in</span>
            </Link>
            <Link to="https://instagram.com/raisetalks" className="text-gray-600 hover:text-[#0174e1] transition-colors">
              <span className="text-2xl">📷</span>
            </Link>
            <Link to="https://discord.gg/raisetalks" className="text-gray-600 hover:text-[#0174e1] transition-colors">
              <span className="text-2xl">💬</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}



export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="RaiseTalks.ai - Your AI-powered fundraising workspace for early-stage founders">
      <NavbarScroll />
      <HomepageHero />
      <LogoCarousel />
      <HomepageStats />
      <SolutionSection />
      <HomepageWhyChoose />
      <FAQSection />
      <HomepageCTA />
      <HomepagePricing />
    </Layout>
  );
}