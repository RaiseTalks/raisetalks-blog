import React, { useState, useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

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

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const startupsRef = useScrollAnimation();
  const investorsRef = useScrollAnimation();

  return (
    <Layout
      title="Pricing"
      description="AI-powered fundraising workspace pricing - Free tier available. Plans for startups and investors to move faster with confidence.">

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
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Background Pattern - matching homepage */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              rgba(1, 116, 225, 0.03) 35px,
              rgba(1, 116, 225, 0.03) 70px
            )`
          }}></div>
        </div>

        {/* Animated gradient orb - matching homepage */}
        <div className="absolute top-0 -translate-x-1/2 rounded-full left-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-blue-600/20 blur-3xl animate-pulse"></div>

        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            {/* Pre-title badge */}
            <div className="inline-flex items-center px-4 py-2 mb-6 border border-blue-100 rounded-full bg-blue-50">
              <span className="text-sm font-semibold text-[#0174e1]">Pricing</span>
            </div>

            {/* Main Title with gradient text */}
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              <span className="text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text">
                Simple, Transparent Pricing
              </span>
            </h1>

            {/* Subtitle with enhanced typography */}
            <p className="max-w-4xl mx-auto mb-8 text-xl font-medium leading-relaxed text-gray-600 md:text-2xl">
              Whether you're <span className="text-[#0174e1] font-semibold">raising capital</span> or
              <span className="text-[#0174e1] font-semibold"> sourcing deals</span>, RaiseTalks offers plans designed to help you move faster—with clarity, confidence, and AI support.
            </p>
          </div>
        </div>
      </section>

      {/* For Startups Section */}
      <section ref={startupsRef} className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">For Startups</h2>
              <p className="text-2xl font-medium text-gray-600">From pitch to data room—fundraise smarter with AI.</p>
              <div className="w-24 h-1 bg-gradient-to-r from-[#0174e1] to-[#0166ca] mx-auto rounded-full mt-6"></div>
            </div>

            {/* Pricing Toggle */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center p-1 bg-gray-100 rounded-xl">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer ${!isAnnual
                    ? 'bg-white text-[#0174e1] shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 cursor-pointer ${isAnnual
                    ? 'bg-white text-[#0174e1] shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  Annually
                  <span className="px-2 py-1 text-xs text-green-700 bg-green-100 rounded-full">Save 40%</span>
                </button>
              </div>
            </div>

            <div className="grid max-w-5xl gap-8 mx-auto md:grid-cols-2">
              {/* Free Tier */}
              <div className="flex flex-col p-8 transition-shadow bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-xl">
                <h3 className="mb-2 text-2xl font-bold">Free Tier</h3>
                <p className="mb-6 text-gray-600">Perfect for testing the waters.</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$0</span>
                  <span className="ml-2 text-gray-600">/month</span>
                </div>
                <ul className="flex-grow mb-8 space-y-3">
                  <li className="flex items-center">
                    <span className="mr-3 text-green-500">✓</span>
                    <span>AI Advisor answers to 5 fundraising questions</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3 text-green-500">✓</span>
                    <span>Basic fundraising guidance</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3 text-green-500">✓</span>
                    <span>Limited access to templates</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3 text-green-500">✓</span>
                    <span>Starter data room tools</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3 text-green-500">✓</span>
                    <span>Community access</span>
                  </li>
                </ul>
                <Link
                  className="w-full py-3 px-6 border-2 border-[#0174e1] text-[#0174e1] rounded-lg font-semibold hover:bg-[#0174e1] hover:text-white transition-colors text-center block mt-auto"
                  to="#"
                >
                  Get Free
                </Link>
              </div>

              {/* Pro Plan */}
              <div className="bg-gradient-to-b from-[#0174e1] to-[#0166ca] rounded-2xl shadow-xl p-8 text-white flex flex-col">
                <div className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-white rounded-full bg-white/20">
                  MOST POPULAR
                </div>
                <h3 className="mb-2 text-2xl font-bold">Pro Plan</h3>
                <p className="mb-6 text-white/90">Everything you need to raise capital</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    ${isAnnual ? '59' : '99'}
                  </span>
                  <span className="ml-2 text-white/80">/month</span>
                  {isAnnual && (
                    <p className="mt-1 text-sm text-white/80">billed at $699/year • save 40%</p>
                  )}
                </div>
                <div className="mb-4">
                  <p className="text-sm text-white/90">All Free Tier features, plus:</p>
                </div>
                <ul className="flex-grow mb-8 space-y-3">
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
                  to="#"
                >
                  Start Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Investors Section */}
      <section ref={investorsRef} className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">For Investors</h2>
              <p className="text-2xl font-medium text-gray-600">Smarter pipeline access, data rooms on demand.</p>
              <div className="w-24 h-1 bg-gradient-to-r from-[#0174e1] to-[#0166ca] mx-auto rounded-full mt-6"></div>
            </div>

            <div className="max-w-md mx-auto">
              <div className="p-8 transition-all duration-300 bg-white border border-gray-200 shadow-xl rounded-3xl hover:shadow-2xl">
                <div className="mb-6 text-center">
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">Investor Plan</h3>
                  <p className="text-gray-600">Access curated startup pipeline</p>
                </div>

                <div className="mb-6 text-center">
                  <span className="text-4xl font-bold text-gray-900">
                    ${isAnnual ? '119' : '199'}
                  </span>
                  <span className="ml-2 text-gray-600">/month</span>
                  {isAnnual && (
                    <p className="text-sm text-gray-600">billed at $1,428/year • save 40%</p>
                  )}
                </div>

                <ul className="mb-8 space-y-3">
                  <li className="flex items-center">
                    <span className="text-[#0174e1] mr-3">✓</span>
                    <span>Curated startup deal flow</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#0174e1] mr-3">✓</span>
                    <span>AI-verified founder profiles</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#0174e1] mr-3">✓</span>
                    <span>One-click access to data rooms</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#0174e1] mr-3">✓</span>
                    <span>Investor insights & activity tracking</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#0174e1] mr-3">✓</span>
                    <span>Founder contact & notes</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#0174e1] mr-3">✓</span>
                    <span>Priority onboarding</span>
                  </li>
                </ul>

                <Link
                  className="w-full py-3 px-6 bg-gradient-to-r from-[#0174e1] to-[#0166ca] text-white rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center block mb-3"
                  to="#"
                >
                  Request Investor Access
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-8 border border-blue-100 bg-gradient-to-br from-blue-50 to-gray-50 rounded-3xl">
              <h3 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
                Ready to transform your fundraising?
              </h3>
              <p className="mb-6 text-lg text-gray-600">
                Join thousands of founders and investors using AI to move faster with confidence.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 mb-6 sm:flex-row">
                <Link
                  className="bg-gradient-to-r from-[#0174e1] to-[#0182f8] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                  to="https://dev.raisetalks.ai/sign-up"
                >
                  Start Free Today
                </Link>
                <Link
                  className="border-2 border-[#0174e1] text-[#0174e1] hover:bg-[#0174e1] hover:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
                  to="https://calendly.com/iamdariiava/30min?month=2025-08"
                >
                  Schedule Demo
                </Link>
              </div>

              <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}