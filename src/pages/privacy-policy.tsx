import React, { useEffect, useRef } from 'react';
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

export default function PrivacyPolicy() {
  const contentRef = useScrollAnimation();

  return (
    <Layout
      title="Privacy Policy"
      description="Privacy Policy for RaiseTalks - How we collect, use, and protect your personal data. GDPR compliant with full transparency.">

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
          color: #0174e1;
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
        .legal-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .legal-content th,
        .legal-content td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        .legal-content th {
          background-color: #f8fafc;
          font-weight: 600;
          color: #1e293b;
        }
        .legal-content tr:last-child td {
          border-bottom: none;
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
              <span className="text-sm font-semibold text-[#0174e1]">🔒 Privacy</span>
            </div>

            {/* Main Title with gradient text */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>

            {/* Last updated */}
            <p className="text-lg text-gray-600 font-medium mb-4">
              Last Updated: <span className="text-[#0174e1] font-semibold">August 5, 2025</span>
            </p>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Your privacy is important to us. Learn how we protect your data.
            </p>
          </div>
        </div>
      </section>

      {/* Legal Content */}
      <section ref={contentRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto legal-content text-gray-700">

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100 mb-8">
              <p className="text-lg leading-relaxed mb-0">
                This Privacy Policy explains how <strong className="text-[#0174e1]">RAISETALKS AI, Inc.</strong>, a Delaware Corporation,
                collects, uses, stores, and protects your personal data when you interact with our platform and services at{' '}
                <strong className="text-[#0174e1]">RaiseTalks</strong> ("RaiseTalks", "we", "us", or "our"). We are committed to
                safeguarding your privacy and complying with applicable data protection laws, including the{' '}
                <strong>General Data Protection Regulation (GDPR)</strong> and relevant <strong>U.S. privacy regulations</strong>.
              </p>
            </div>

            <h2>1. What This Privacy Policy Covers</h2>
            <p>This policy outlines:</p>
            <ul>
              <li>What personal data we collect</li>
              <li>How we use, store, and protect your data</li>
              <li>The legal bases for processing under GDPR</li>
              <li>Your rights and how to exercise them</li>
              <li>Our data retention and international transfer policies</li>
            </ul>
            <p>This policy does not apply to third-party platforms or services linked through RaiseTalks.</p>

            <h2>2. Data We Collect</h2>
            <p>We collect the following categories of personal data:</p>

            <h3>a. Contact & Account Information</h3>
            <ul>
              <li>Full name</li>
              <li>Email address</li>
              <li>Company/startup name</li>
              <li>Title or position</li>
              <li>Login credentials (encrypted)</li>
            </ul>

            <h3>b. Business & Usage Information</h3>
            <ul>
              <li>Uploaded files and documents</li>
              <li>Fundraising or investor-related inputs</li>
              <li>Affiliate/referral activity</li>
              <li>Feedback and support inquiries</li>
            </ul>

            <h3>c. Technical Data</h3>
            <ul>
              <li>IP address, browser type, and operating system</li>
              <li>Cookies and usage analytics (page views, time on site, actions)</li>
              <li>Device and session metadata</li>
            </ul>

            <h3>d. Communication History</h3>
            <ul>
              <li>Emails, messages, and feedback submitted to our team</li>
            </ul>
            <p>
              We do not intentionally collect sensitive personal data unless explicitly provided for specific services with your consent.
            </p>

            <h2>3. How We Collect Data</h2>
            <ul>
              <li><strong>Directly from you</strong> – when you sign up, use features, or contact us</li>
              <li><strong>Automatically</strong> – via cookies and analytics tools</li>
              <li><strong>From third parties</strong> – such as referral sources or integrations you connect</li>
            </ul>

            <h2>4. Why We Process Your Data</h2>
            <table>
              <thead>
                <tr>
                  <th>Purpose</th>
                  <th>Legal Basis</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Provide and improve our services</td>
                  <td>Contractual necessity / Legitimate interest</td>
                </tr>
                <tr>
                  <td>Communicate with you (e.g., updates, onboarding)</td>
                  <td>Contractual necessity</td>
                </tr>
                <tr>
                  <td>Send marketing or partner content</td>
                  <td>Consent</td>
                </tr>
                <tr>
                  <td>Ensure platform security and prevent misuse</td>
                  <td>Legitimate interest</td>
                </tr>
                <tr>
                  <td>Fulfill legal and regulatory obligations</td>
                  <td>Legal obligation</td>
                </tr>
              </tbody>
            </table>

            <h2>5. GDPR Compliance & Your Rights (EU/EEA Residents)</h2>
            <p>If you are located in the European Economic Area, you have rights under the GDPR, including:</p>
            <ul>
              <li><strong>Right to Access</strong> – Request access to your data</li>
              <li><strong>Right to Rectification</strong> – Correct any inaccurate data</li>
              <li><strong>Right to Erasure</strong> – Ask us to delete your data ("right to be forgotten")</li>
              <li><strong>Right to Restriction</strong> – Limit how we process your data</li>
              <li><strong>Right to Data Portability</strong> – Obtain your data in a readable format</li>
              <li><strong>Right to Object</strong> – Object to processing under legitimate interests</li>
              <li><strong>Right to Withdraw Consent</strong> – Revoke your consent at any time</li>
            </ul>
            <p>
              To exercise any of these rights, email us at <strong>privacy@raisetalks.ai</strong>. We may need to verify your identity.
            </p>

            <h2>6. Data Security</h2>
            <p>We implement robust technical and organizational measures to protect your data, including:</p>
            <ul>
              <li>Encrypted transmission and storage</li>
              <li>Role-based access control</li>
              <li>Regular audits and system monitoring</li>
              <li>Secure third-party service providers (e.g., Stripe for payments)</li>
            </ul>

            <h2>7. Data Retention</h2>
            <p>
              We retain your data only as long as necessary for the purposes described in this policy, or as required by law.
              When no longer needed, data is securely deleted or anonymized.
            </p>

            <h2>8. International Data Transfers</h2>
            <p>
              If your data is transferred outside the United States or the European Economic Area (EEA), we ensure appropriate
              safeguards, such as:
            </p>
            <ul>
              <li>Standard Contractual Clauses (SCCs)</li>
              <li>Transfer to jurisdictions recognized by the European Commission as providing adequate protection</li>
            </ul>

            <h2>9. Cookies and Analytics</h2>
            <p>
              We use cookies and tracking technologies to enhance your experience and analyze usage. You can control cookie
              preferences through your browser settings or by adjusting cookie consent settings when visiting our site.
            </p>

            <h2>10. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy as our services evolve or as required by law. The updated version will always
              be posted on our website with the revised date.
            </p>

            <h2>11. Contact Us</h2>
            <p>If you have any questions or requests regarding this Privacy Policy or your personal data:</p>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <p className="font-semibold text-gray-900 mb-2">RAISETALKS AI, Inc.</p>
              <p>1111B S Governors Ave STE 34329</p>
              <p>Dover, DE 19904</p>
              <p>United States</p>
              <p className="mt-3">Email: <a href="mailto:privacy@raisetalks.ai" className="text-[#0174e1] font-semibold hover:underline">privacy@raisetalks.ai</a></p>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}