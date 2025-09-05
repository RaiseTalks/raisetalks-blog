import React, { useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import LogoCarousel from '@site/src/components/LogoCarousel';

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

export default function AboutUs() {
  const missionRef = useScrollAnimation();
  const whyRef = useScrollAnimation();
  const founderRef = useScrollAnimation();
  const partnersRef = useScrollAnimation();
  const ctaRef = useScrollAnimation();

  return (
    <Layout
      title="About Us"
      description="Learn about RaiseTalks - AI-powered fundraising workspace for early-stage startups to organize data rooms and close rounds faster.">

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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Pre-title badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <span className="text-sm font-semibold text-[#0174e1]">Our Story</span>
            </div>

            {/* Main Title with gradient text */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                About RaiseTalks
              </span>
            </h1>

            {/* Subtitle with enhanced typography */}
            <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-4xl mx-auto mb-8">
              An <span className="text-[#0174e1] font-semibold">AI-powered SaaS workspace</span> designed to help
              early-stage startups streamline their fundraising journey and close rounds faster.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#0174e1] to-[#0182f8] mx-auto mb-8"></div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
              <p className="text-2xl md:text-3xl text-gray-800 leading-relaxed text-center font-medium">
                We believe <span className="text-[#0174e1] font-bold">entrepreneurs are the greatest catalysts for positive change.</span>
                That's why we're building a world where every founder—regardless of background or geography—has the tools to
                <span className="text-[#0174e1] font-bold"> raise capital without friction, overwhelm, or delay.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why RaiseTalks Section */}
      <section ref={whyRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why RaiseTalks</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We use AI to help founders raise money faster by transforming raw startup data into investor-ready materials.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-[#0174e1] to-[#0182f8] rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-2xl text-white font-bold">DR</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Investor-Ready Materials</h3>
                <p className="text-gray-600 leading-relaxed">
                  Turn documents and inputs into polished, compliant data rooms automatically with AI assistance.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-[#0174e1] to-[#0182f8] rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-2xl text-white font-bold">RT</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-Time Insights</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get real-time visibility into investor interest and traction throughout your fundraising process.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-[#0174e1] to-[#0182f8] rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-2xl text-white font-bold">AI</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Guided Process</h3>
                <p className="text-gray-600 leading-relaxed">
                  Navigate fundraising with guided steps, smart prompts, and automated readiness scoring.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-xl font-semibold text-gray-800">
                One workspace. Zero chaos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section ref={founderRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 mt-4">Meet the Founder</h2>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3 text-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-[#0174e1] to-[#0182f8] rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-6xl text-white">👩‍💼</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Dariia Vasylieva</h3>
                  <p className="text-gray-600 font-medium">Founder & CEO</p>
                </div>

                <div className="md:w-2/3">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    I'm a serial entrepreneur and investor with <span className="font-bold text-[#0174e1]">17+ years in capital markets</span>,
                    venture capital, and private equity. This platform is the result of years spent working with over
                    <span className="font-bold text-[#0174e1]"> 7,000 startups</span>, seeing firsthand the barriers founders face while fundraising.
                  </p>

                  <blockquote className="border-l-4 border-[#0174e1] pl-6 py-4 bg-blue-50 rounded-r-lg">
                    <p className="text-xl italic text-gray-800 mb-2">
                      "We use AI to help founders raise money fast—by automatically turning their data into investor-ready
                      documents and surfacing the right investors at the right moment."
                    </p>
                    <cite className="text-[#0174e1] font-semibold">— Dariia Vasylieva</cite>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section ref={partnersRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Backers & Partners</h2>
            <p className="text-xl text-gray-600 mb-12">Proudly supported by</p>
            <LogoCarousel />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 bg-gradient-to-br from-[#0174e1] to-[#0182f8] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Build With Us</h2>
            <p className="text-xl md:text-2xl leading-relaxed mb-8 opacity-90">
              Whether you're raising your first round or scaling globally,
              <span className="font-bold"> RaiseTalks</span> is your partner in making fundraising
              faster, smarter, and less frustrating.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                className="bg-white text-[#0174e1] hover:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                to="#"
              >
                Contact Us
              </Link>
              <Link
                className="border-2 border-white text-white hover:bg-white hover:text-[#0174e1] px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
                to="#"
              >
                Try It For Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}