import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import NavbarScroll from '@site/src/components/NavbarScroll';
import PricingCards from '@site/src/components/PricingCards';

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

// Modal Component for Waitlist
function WaitlistModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Waitlist signup:', { name, email });
    alert('Thank you for joining our waitlist!');
    onClose();
    setEmail('');
    setName('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative" onClick={(e) => e.stopPropagation()}>
        <button 
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Join the Waitlist</h2>
        <p className="text-gray-600 mb-6">Be the first to know when RaiseTalks.ai launches!</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0174e1] focus:border-transparent"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0174e1] focus:border-transparent"
          />
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[#0174e1] to-[#0166ca] text-white py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
          >
            Join Waitlist
          </button>
        </form>
      </div>
    </div>
  );
}

// Hero Section Component
function HomepageHero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 flex items-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/img/raisetalks-hero-1.svg')] bg-center bg-cover opacity-50"></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <p className="text-sm font-bold text-[#0174e1] uppercase tracking-wider mb-4">
                STREAMLINING DUE DILIGENCE
              </p>
              <Heading as="h1" className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                AI Assistant Providing Personalised Guidance on Data Rooms
              </Heading>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Transform your fundraising journey with AI-powered insights and personalized guidance
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  className="bg-gradient-to-r from-[#0174e1] to-[#0166ca] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300 min-w-[200px]"
                  onClick={() => setIsModalOpen(true)}>
                  Join Waiting List
                </button>
                <Link
                  className="border-2 border-[#0174e1] text-[#0174e1] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#0174e1] hover:text-white transition-all duration-300 min-w-[200px] text-center"
                  to="https://buy.stripe.com/14k9Dq8HDanK4bCcMN"
                  target="_blank">
                  Contribute us 💝
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
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
            Entrepreneurial Challenges:
            <br />
            <span className="text-[#0174e1]">The Hidden Hurdles of Startup Success</span>
          </Heading>
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

// Quote Section Component
function HomepageQuote() {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src="/img/Dasha-quote-1-1024x1024.webp"
                    alt="Dariia Vasylieva"
                    className="w-80 h-80 rounded-2xl shadow-lg object-cover"
                  />
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-[#0174e1] to-[#0166ca] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl">"</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-bold text-[#0174e1] uppercase tracking-wider mb-2">
                    FUNDRAISING
                  </p>
                  <p className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-2">
                    IS NO LONGER
                  </p>
                  <p className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">
                    A DAUNTING TASK…
                  </p>
                  <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    IT'S A <span className="text-[#0174e1]">CONVERSATION</span>.
                  </p>
                </div>
                
                <blockquote className="text-lg text-gray-700 leading-relaxed italic border-l-4 border-[#0174e1] pl-6">
                  "With RaiseTalks.ai, startups gain a personalized fundraising advisor at their fingertips—ready to answer any question, deliver tailored guidance, and streamline every step of the investment journey. From navigating complex challenges to crafting investor-ready materials, RaiseTalks.ai turns fundraising into a seamless, empowering experience."
                </blockquote>
                
                <div className="flex items-center pt-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-[#0174e1] to-[#0166ca] rounded-full mr-4"></div>
                  <p className="font-semibold text-gray-900 text-lg">Dariia Vasylieva</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Pricing Section Component - Using dedicated pricing page component
function HomepagePricing() {
  return <PricingCards />;
}

// Journey Section Component
function HomepageJourney() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-block bg-[#0174e1]/10 text-[#0174e1] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  ✨ AI-Powered Platform
                </div>
                <Heading as="h2" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  The Fundraising Journey: <span className="text-[#0174e1]">Unlocking Investor Confidence</span> with RaiseTalk.ai
                </Heading>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  RaiseTalks.ai transforms the fundraising process into a seamless, data-driven experience that empowers startups and delights investors.
                </p>
                <Link
                  className="inline-flex items-center bg-gradient-to-r from-[#0174e1] to-[#0166ca] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
                  to="https://raisetalks.ai/#join-beta">
                  Join Closed Beta
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-r from-[#0174e1]/10 to-[#0166ca]/10 rounded-3xl p-8">
                <img 
                  src="/img/chat-bg-1024x630.webp" 
                  alt="RaiseTalks.ai Chat Interface" 
                  className="w-full h-auto rounded-2xl shadow-2xl border border-gray-200"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-[#0174e1] to-[#0166ca] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">🚀</span>
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100">
                <span className="text-2xl">💬</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Roadmap Section Component
function HomepageRoadmap() {
  const roadmapData = [
    {
      quarter: 'Q1',
      year: '2025',
      features: [
        'Personalized AI guidance on Pitch Deck development',
        'Basic data room templates',
        'Early-stage fundraising Q&A support'
      ]
    },
    {
      quarter: 'Q2',
      year: '2025',
      features: [
        'Customizable data room feature tailored for startups across various industries',
        'Investor Platform to connect investors with startups using RaiseTalks.ai'
      ]
    },
    {
      quarter: 'Q3',
      year: '2025',
      features: [
        'BI dashboards to track investor interactions and funding readiness',
        'AI algorithms to match startups with suitable investors based on sector, geography, and stage'
      ]
    },
    {
      quarter: 'Q4',
      year: '2025',
      features: [
        'Seamless integration of due diligence tools',
        'Inaugural Raise Talks Global Summit'
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Heading as="h2" className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ROADMAP
          </Heading>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our roadmap charts our path to transforming startup growth with AI-powered fundraising and investor connections.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#0174e1] to-[#0166ca] mx-auto rounded-full mt-6"></div>
        </div>

        <div className="flex justify-center mb-16">
          <img
            src="/img/Tripple-point.svg"
            alt="Roadmap Timeline"
            className="hidden md:block max-w-full h-auto"
          />
          <img
            src="/img/3point-mobile.svg"
            alt="Roadmap Timeline Mobile"
            className="md:hidden max-w-full h-auto"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {roadmapData.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl hover:border-[#0174e1] transition-all duration-300 group"
            >
              <div className="mb-6">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#0174e1] to-[#0166ca] rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">{item.quarter}</span>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-900">{item.quarter}</span>
                  <span className="text-gray-500 ml-1">/ {item.year}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {item.features.map((feature, featureIdx) => (
                  <div key={featureIdx} className="flex items-start">
                    <div className="w-2 h-2 bg-[#0174e1] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
              
              {/* Quarter indicator at bottom */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div 
                    className="bg-gradient-to-r from-[#0174e1] to-[#0166ca] h-1 rounded-full transition-all duration-500 group-hover:w-full"
                    style={{ width: `${25 * (idx + 1)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Why Choose Us Section Component
function HomepageWhyUs() {
  const features = [
    {
      icon: '/img/savings-icon.svg',
      title: 'Cost-Effective',
      description: 'Save on traditional advisory fees while getting premium insights and guidance for your fundraising journey.'
    },
    {
      icon: '/img/aipower-icon.svg',
      title: 'AI-Powered',
      description: 'Cutting-edge artificial intelligence technology provides personalized recommendations at your service.'
    },
    {
      icon: '/img/global-icon.svg',
      title: 'Global Reach',
      description: 'Connect with investors worldwide and access international funding opportunities seamlessly.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Heading as="h2" className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-[#0174e1]">RaiseTalks?</span>
          </Heading>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover what makes our platform the perfect choice for your fundraising success
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#0174e1] to-[#0166ca] mx-auto rounded-full mt-6"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl hover:border-[#0174e1] transition-all duration-300 group text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-[#0174e1]/10 to-[#0166ca]/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <img 
                    src={feature.icon} 
                    alt={feature.title} 
                    className="w-10 h-10 filter group-hover:brightness-110"
                  />
                </div>
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              
              {/* Hover effect indicator */}
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

export default function Home(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="RaiseTalks.ai - AI Assistant Providing Personalised Guidance on Data Rooms">
      <NavbarScroll />
      <HomepageHero />
      <HomepageStats />
      <HomepageQuote />
      <HomepageJourney />
      <HomepageRoadmap />
      <HomepagePricing />
      <HomepageWhyUs />
    </Layout>
  );
}