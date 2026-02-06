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

export default function TermsOfService() {
  const contentRef = useScrollAnimation();

  return (
    <Layout
      title="Terms of Service"
      description="Terms of Service for RaiseTalks - AI-powered fundraising workspace. Legal terms and conditions governing the use of our platform.">

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
        .legal-content h2 {
          color: var(--raisetalks-blue-primary-flat);
          font-size: 1.5rem;
          font-weight: 700;
          margin: 2.5rem 0 1rem 0;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #f1f5f9;
        }
        .legal-content h3 {
          color: #1e293b;
          font-size: 1.25rem;
          font-weight: 600;
          margin: 2rem 0 1rem 0;
        }
        .legal-content p {
          margin-bottom: 1.25rem;
          line-height: 1.7;
        }
        .legal-content ul {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }
        .legal-content li {
          margin-bottom: 0.75rem;
          line-height: 1.6;
        }
      `}</style>

      {/* Hero Section */}
      <section className="cleanHeroSection">
        <div className="cleanHeroContainer">
          <h1 className="cleanHeroTitle">
            <span className="cleanHeroTitleAccent">Terms of Service</span>
          </h1>
          <p className="cleanHeroSubtitle">
            Last Updated: <strong>August 5, 2025</strong>
          </p>
          <p className="cleanHeroDescription">
            Please read these terms carefully before using RaiseTalks.
          </p>
        </div>
      </section>

      {/* Legal Content */}
      <section ref={contentRef} className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto legal-content text-gray-700">

            <div className="bg-gradient-to-br from-blue-50 to-blue-50 rounded-2xl p-4 sm:p-6 border border-blue-100 mb-8">
              <p className="text-lg leading-relaxed mb-0">
                Welcome to RaiseTalks, operated by <strong className="text-[var(--raisetalks-blue-primary-flat)]">RAISETALKS AI, Inc.</strong>, a Delaware Corporation,
                registered at 1111B S Governors Ave STE 34329, Dover, DE 19904 (Registration No. 10212227), and represented by
                Director Dariia Vasylieva ("RaiseTalks", "we", "us", or "our").
              </p>
            </div>

            <p>
              These Terms of Use ("Terms") govern your access to and use of RaiseTalks (the "Platform") and all associated
              services, content, tools, and functionality (collectively, the "Services"). By using the Platform, you agree to be
              bound by these Terms and our Privacy Policy. If you do not agree, please do not use the Platform.
            </p>

            <h2>1. Eligibility and User Accounts</h2>
            <p>
              To use RaiseTalks, you must be at least 18 years old and legally capable of entering into binding agreements.
              You agree to provide accurate account information and to keep it up to date.
            </p>
            <p>
              You are responsible for all activities that occur under your account. You must safeguard your login credentials
              and notify us immediately if you suspect unauthorized use.
            </p>

            <h2>2. Platform Use and User Conduct</h2>
            <p>
              RaiseTalks is an AI-powered SaaS platform designed to help startups prepare for fundraising through features
              such as data room creation, investor engagement tracking, document scoring, and AI-generated feedback.
            </p>
            <p>By using the Platform, you agree <strong>not to:</strong></p>
            <ul>
              <li>Upload content that violates third-party intellectual property rights or applicable law</li>
              <li>Upload malware, viruses, or other harmful code</li>
              <li>Use automated scripts or bots to access the Platform</li>
              <li>Attempt to interfere with the integrity, security, or performance of the Platform</li>
              <li>Impersonate any person or misrepresent your affiliation with a startup, company, or investor</li>
              <li>Engage in spamming, unsolicited marketing, pyramid schemes, or commercial solicitations</li>
              <li>Access another user's account without authorization</li>
              <li>Use the Platform to collect personal data from others without their consent</li>
            </ul>
            <p>
              Violation of any of the above may result in suspension or termination of your access and reporting to relevant authorities.
            </p>

            <h2>3. Data Privacy and Compliance</h2>
            <p>
              We are committed to protecting your privacy. All personal data is processed in accordance with our{' '}
              <Link to="/privacy-policy" className="text-[var(--raisetalks-blue-primary-flat)] font-semibold hover:underline">Privacy Policy</Link>{' '}
              and applicable data protection laws, including the <strong>General Data Protection Regulation (GDPR)</strong> and
              relevant U.S. regulations.
            </p>
            <p>By using the Platform, you consent to our data practices.</p>
            <p>
              If you are an investor, you agree to handle any founder or startup data accessed via RaiseTalks in accordance
              with confidentiality principles and applicable data protection laws.
            </p>

            <h2>4. AI-Generated Content Disclaimer</h2>
            <p>
              RaiseTalks uses machine learning technologies to assist with pitch readiness, investor matching, and documentation.
              AI-generated content is provided for informational purposes only and is <strong>not</strong> guaranteed to be accurate,
              complete, or investor-approved.
            </p>
            <p>
              You are solely responsible for verifying the correctness of AI-generated output before using it in any fundraising activity.
            </p>

            <h2>5. Commercial Use and Resale Restrictions</h2>
            <p>
              The Services are intended for individual startup and investor use only. You may not reproduce, redistribute, license,
              or commercially exploit any aspect of the Platform without prior written consent from RaiseTalks.
            </p>
            <p>
              Platform content, features, and workflows may not be copied or resold as part of any advisory, consulting, or
              fundraising service.
            </p>

            <h2>6. Intellectual Property</h2>
            <p>
              All intellectual property rights in the Platform—including but not limited to content, visuals, code, tools,
              templates, and AI models—are owned or licensed by RaiseTalks.
            </p>
            <p>
              You may not use, reproduce, or distribute any part of the Platform except as expressly permitted in writing.
            </p>

            <h2>7. User Content and License</h2>
            <p>
              By uploading documents, data, or materials to RaiseTalks, you grant us a non-exclusive, royalty-free, worldwide
              license to store, process, and analyze such content solely for the purpose of delivering Services to you.
            </p>
            <p>You retain ownership of your content and are responsible for its accuracy and legality.</p>
            <p>
              We do not share your data with third parties except as required to deliver the service (e.g., infrastructure
              providers like AWS) or when legally compelled.
            </p>

            <h2>8. Third-Party Integrations and Links</h2>
            <p>
              RaiseTalks may include integrations with third-party services (e.g., Stripe, Google, Notion). Use of these
              services is governed by their respective terms and privacy policies. We are not responsible for third-party
              content or actions.
            </p>

            <h2>9. Payment Terms</h2>
            <p>
              Access to premium features requires payment as outlined on our{' '}
              <Link to="https://app.raisetalks.com/pricing" className="text-[var(--raisetalks-blue-primary-flat)] font-semibold hover:underline">Pricing Page</Link>.
              All payments are processed through third-party providers (e.g., Stripe) and are subject to our{' '}
              <Link to="/refund-policy" className="text-[var(--raisetalks-blue-primary-flat)] font-semibold hover:underline">Refund Policy</Link>.
            </p>
            <p>
              You authorize us to charge your payment method on a recurring basis unless you cancel before renewal.
            </p>

            <h2>10. Termination</h2>
            <p>
              RaiseTalks reserves the right to suspend or terminate your account at any time for violation of these Terms,
              misuse of the platform, or abuse of AI functionality.
            </p>
            <p>
              You may terminate your account at any time via your dashboard or by contacting support. Termination does not
              release you from any outstanding payment obligations.
            </p>

            <h2>11. Indemnity</h2>
            <p>
              You agree to indemnify, defend, and hold harmless RaiseTalks, its officers, employees, and affiliates from
              any claims, liabilities, or damages arising from your use of the Platform, your content, or violation of these Terms.
            </p>

            <h2>12. Limitation of Liability</h2>
            <p>
              RaiseTalks is provided "as is" without warranties of any kind. We do not guarantee uninterrupted service or
              that all features will be error-free.
            </p>
            <p>
              To the maximum extent permitted by law, our total liability to you for any claim arising out of the use of the
              Platform will not exceed <strong>$100</strong>.
            </p>
            <p>
              We are not liable for any indirect, incidental, or consequential damages (e.g., loss of revenue, goodwill, or opportunities).
            </p>

            <h2>13. Disputes and Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of Delaware, United States, without regard to conflict-of-law principles.
            </p>
            <p>
              Any disputes shall be resolved through binding arbitration in Delaware or a court of competent jurisdiction.
            </p>

            <h2>14. Modifications to These Terms</h2>
            <p>
              We may update these Terms from time to time. If changes are significant, we will notify you by email or in-app
              notification. Continued use of the Platform after changes go into effect constitutes your acceptance.
            </p>

            <h2>15. Contact Information</h2>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <p className="font-semibold text-gray-900 mb-2">RAISETALKS AI, Inc.</p>
              <p>1111B S Governors Ave STE 34329</p>
              <p>Dover, DE 19904</p>
              <p>Email: <a href="mailto:legal@raisetalks.ai" className="text-[var(--raisetalks-blue-primary-flat)] font-semibold hover:underline">legal@raisetalks.ai</a></p>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}