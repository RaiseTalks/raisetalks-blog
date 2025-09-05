import React, { useEffect, useRef } from 'react';
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

export default function AffiliateProgram() {
  const overviewRef = useScrollAnimation();
  const comparisonRef = useScrollAnimation();
  const basicRef = useScrollAnimation();
  const proRef = useScrollAnimation();
  const toolkitRef = useScrollAnimation();
  const contactRef = useScrollAnimation();

  return (
    <Layout
      title="Affiliate Program - Turn Your Network into Capital"
      description="Join RaiseTalks Affiliate Program. Earn 20% one-time or 10% recurring commissions. Perfect for startup mentors, VC scouts, and accelerators.">

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
        .tier-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .tier-card:hover {
          transform: scale(1.05);
          box-shadow: 0 20px 40px rgba(1, 116, 225, 0.2);
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Pre-title badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <span className="text-sm font-semibold text-[#0174e1]">Affiliate Program</span>
            </div>

            {/* Main Title with gradient text */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Turn your network into capital
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-3xl mx-auto mb-8">
              Support founders, earn rewards. Whether you're a startup enthusiast, VC scout, accelerator lead, or
              founder community builder—our affiliate program lets you grow with us.
            </p>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section ref={overviewRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-[#0174e1] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">M</span>
                </div>
                <h3 className="font-semibold text-gray-900">Startup Mentors</h3>
                <p className="text-sm text-gray-600 mt-2">Guide founders to better fundraising</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-[#0174e1] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">V</span>
                </div>
                <h3 className="font-semibold text-gray-900">VC Scouts</h3>
                <p className="text-sm text-gray-600 mt-2">Connect promising startups</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-[#0174e1] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">A</span>
                </div>
                <h3 className="font-semibold text-gray-900">Accelerators</h3>
                <p className="text-sm text-gray-600 mt-2">Empower your portfolio</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-[#0174e1] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">C</span>
                </div>
                <h3 className="font-semibold text-gray-900">Community Builders</h3>
                <p className="text-sm text-gray-600 mt-2">Add value to your network</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliate Program Plans */}
      <section ref={comparisonRef} className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Affiliate Program Tiers
            </h2>
            <p className="text-xl text-gray-600">
              Choose the tier that matches your impact
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0174e1] to-[#0166ca] mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Basic: Referral Partner */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold mb-2">Basic: Referral Partner</h3>
              <p className="text-gray-600 mb-6">Perfect for startup mentors, community builders, early users</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#0174e1]">20%</span>
                <span className="text-gray-600 ml-2">one-time commission</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Personalized referral link</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Monthly payouts</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Performance dashboard</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Standard partner kit</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="text-gray-300 mr-3">✗</span>
                  <span>Co-branded campaigns</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="text-gray-300 mr-3">✗</span>
                  <span>Dedicated partner manager</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="text-gray-300 mr-3">✗</span>
                  <span>Official ambassador badge</span>
                </li>
              </ul>
              <Link
                className="w-full py-3 px-6 border-2 border-[#0174e1] text-[#0174e1] rounded-lg font-semibold hover:bg-[#0174e1] hover:text-white transition-colors text-center block"
                to="#"
              >
                Join as Referral Partner
              </Link>
            </div>

            {/* Pro: Venture Ambassador */}
            <div className="bg-gradient-to-b from-[#0174e1] to-[#0166ca] rounded-2xl shadow-xl p-8 text-white">
              <div className="bg-white/20 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                RECOMMENDED
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro: Venture Ambassador</h3>
              <p className="text-white/90 mb-6">For VC scouts, accelerators, incubators</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">10%</span>
                <span className="text-white/80 ml-2">recurring commission</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="mr-3">✓</span>
                  <span>Personalized link + onboarding toolkit</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-3">✓</span>
                  <span>Monthly payouts</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-3">✓</span>
                  <span>Advanced performance dashboard</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-3">✓</span>
                  <span>Pro partner kit + support</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-3">✓</span>
                  <span>Co-branded campaigns eligible</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-3">✓</span>
                  <span>Dedicated partner manager</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-3">✓</span>
                  <span>RaiseTalks Venture Ambassador badge</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-3">✓</span>
                  <span>Early access to features & events</span>
                </li>
              </ul>
              <Link
                className="w-full py-3 px-6 bg-white text-[#0174e1] rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center block"
                to="#"
              >
                Apply to Become Venture Ambassador
              </Link>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-600 text-lg mb-4">
              Both tiers include full tracking, monthly payouts, and partner support.
            </p>
            <p className="text-sm text-gray-500">
              Questions? <a href="#" className="text-[#0174e1] hover:underline">Contact our partner team</a>
            </p>
          </div>
        </div>
      </section>

      {/* Basic: Referral Partner */}
      <section ref={basicRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Basic: Referral Partner</h2>
                <p className="text-xl text-gray-600 mb-6">
                  Perfect for founders, startup mentors, or content creators who want to share RaiseTalks
                  with their audience and earn rewards along the way.
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">You'll get:</h3>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✓</span>
                    <span>20% one-time commission per paying startup</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✓</span>
                    <span>Unique referral link to track conversions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✓</span>
                    <span>Quick-start partner kit with visuals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✓</span>
                    <span>Monthly payouts via Stripe or PayPal</span>
                  </li>
                </ul>
                <p className="text-lg font-semibold text-gray-900 mb-4">
                  Start sharing, start earning—no approval needed.
                </p>
                <Link
                  className="bg-gradient-to-r from-[#0174e1] to-[#0166ca] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300 inline-block"
                  to="#"
                >
                  Join as a Referral Partner →
                </Link>
              </div>
              <div className="tier-card bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 border border-blue-100">
                <div className="text-center">
                  <h3 className="text-6xl font-bold text-[#0174e1] mb-2">20%</h3>
                  <p className="text-xl text-gray-600">One-time commission</p>
                  <div className="mt-6 pt-6 border-t border-blue-100">
                    <p className="text-sm text-gray-500">Average earnings per referral</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">$20 - $100</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pro: Venture Ambassador */}
      <section ref={proRef} className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="tier-card bg-gradient-to-br from-[#0174e1] to-[#0166ca] rounded-3xl p-8 text-white">
                <div className="text-center">
                  <h3 className="text-6xl font-bold mb-2">10%</h3>
                  <p className="text-xl opacity-90">Recurring commission</p>
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <p className="text-sm opacity-80">Lifetime earnings potential</p>
                    <p className="text-2xl font-bold mt-2">$1,000+</p>
                    <p className="text-sm opacity-80 mt-2">per active referral</p>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Pro: Venture Ambassador</h2>
                <p className="text-xl text-gray-600 mb-6">
                  Built for ecosystem leaders actively scouting or supporting startups. Venture Ambassadors earn
                  recurring income and unlock exclusive access to the RaiseTalks partner network.
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">You'll get:</h3>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-[#0174e1] mr-3 mt-0.5">✓</span>
                    <span>10% recurring commission on all payments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0174e1] mr-3 mt-0.5">✓</span>
                    <span>Featured access to deal-flow insights and beta features</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0174e1] mr-3 mt-0.5">✓</span>
                    <span>Co-branded campaigns & speaking opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0174e1] mr-3 mt-0.5">✓</span>
                    <span>Personalized onboarding and partner success support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0174e1] mr-3 mt-0.5">✓</span>
                    <span>RaiseTalks Venture Ambassador badge</span>
                  </li>
                </ul>
                <p className="text-lg font-semibold text-gray-900 mb-4">
                  Apply to join our Pro network and grow with us.
                </p>
                <Link
                  className="bg-gradient-to-r from-[#0174e1] to-[#0166ca] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300 inline-block"
                  to="#"
                >
                  Apply to Become a Venture Ambassador →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Toolkit Overview */}
      <section ref={toolkitRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Pro Toolkit Overview</h2>
            <p className="text-xl text-center text-gray-600 mb-12">Everything you need to succeed as a Venture Ambassador</p>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Ambassador Welcome Guide */}
              <div className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-xl hover:border-[#0174e1] transition-all duration-300">
                <h3 className="font-semibold text-gray-900 mb-2">Ambassador Welcome Guide</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Step-by-step guide to succeed as a Venture Ambassador</p>
              </div>

              {/* Unique Referral Link */}
              <div className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-xl hover:border-[#0174e1] transition-all duration-300">
                <h3 className="font-semibold text-gray-900 mb-2">Unique Referral Link</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Personalized tracking link for all referrals</p>
              </div>

              {/* Startup Fit Criteria */}
              <div className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-xl hover:border-[#0174e1] transition-all duration-300">
                <h3 className="font-semibold text-gray-900 mb-2">Startup Fit Criteria</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Checklist for qualified leads (ideal startup persona)</p>
              </div>

              {/* Outreach Templates */}
              <div className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-xl hover:border-[#0174e1] transition-all duration-300">
                <h3 className="font-semibold text-gray-900 mb-2">Outreach Templates</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Pre-written email, LinkedIn DM, and WhatsApp scripts</p>
              </div>

              {/* Brand Assets */}
              <div className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-xl hover:border-[#0174e1] transition-all duration-300">
                <h3 className="font-semibold text-gray-900 mb-2">Brand Assets</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Logos, screenshots, badges, and social media graphics</p>
              </div>

              {/* Demo Deck + Video */}
              <div className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-xl hover:border-[#0174e1] transition-all duration-300">
                <h3 className="font-semibold text-gray-900 mb-2">Demo Deck + Video</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Short product intro deck + founder pitch demo</p>
              </div>

              {/* Performance Dashboard */}
              <div className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-xl hover:border-[#0174e1] transition-all duration-300">
                <h3 className="font-semibold text-gray-900 mb-2">Performance Dashboard</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Real-time referral tracking and payout history</p>
              </div>

              {/* Partner Agreement */}
              <div className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-xl hover:border-[#0174e1] transition-all duration-300">
                <h3 className="font-semibold text-gray-900 mb-2">Partner Agreement</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Commission structure, payout terms, usage rights</p>
              </div>

              {/* Perks & Recognition */}
              <div className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-xl hover:border-[#0174e1] transition-all duration-300">
                <h3 className="font-semibold text-gray-900 mb-2">Perks & Recognition</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Early feature access, public spotlight, co-branded PR</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Have Questions?</h2>
            <p className="text-xl text-gray-600 mb-8">
              We're happy to walk you through the program or help you onboard your first referral.
            </p>
            <Link
              className="bg-gradient-to-r from-[#0174e1] to-[#0166ca] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl inline-block"
              to="#"
            >
              Contact Our Partner Team →
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
}