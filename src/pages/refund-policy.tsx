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

export default function RefundPolicy() {
  const contentRef = useScrollAnimation();

  return (
    <Layout
      title="Refund Policy"
      description="Refund Policy for RaiseTalks - Clear terms for subscription refunds, cancellations, and billing disputes. Stripe-powered secure payments.">

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
              <span className="text-sm font-semibold text-[#0174e1]">Billing</span>
            </div>

            {/* Main Title with gradient text */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Refund Policy
              </span>
            </h1>

            {/* Last updated */}
            <p className="text-lg text-gray-600 font-medium mb-4">
              Last Updated: <span className="text-[#0174e1] font-semibold">August 5, 2025</span>
            </p>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Transparent refund terms for our subscription services
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
                At <strong className="text-[#0174e1]">RaiseTalks</strong>, we strive to deliver exceptional value and service
                to help founders and investors accelerate fundraising. All payments are processed securely through{' '}
                <strong>Stripe</strong>. Please review our refund terms carefully before purchasing a subscription or service.
              </p>
            </div>

            <h2>1. Free Tier</h2>
            <p>
              Our Free Plan offers limited features for evaluation at no cost. No payment is required, and no refunds apply.
            </p>

            <h2>2. Paid Subscriptions</h2>

            <h3>Monthly and Annual Plans</h3>
            <ul>
              <li>Paid subscriptions are billed either monthly or annually based on your selected plan.</li>
              <li>Annual plans receive a <strong>40% discount</strong> compared to monthly billing.</li>
              <li>Payments are non-refundable except as expressly stated in this policy or required by law.</li>
            </ul>

            <h3>Cancellation and Renewal</h3>
            <ul>
              <li>You may cancel your subscription at any time via your dashboard or by contacting support.</li>
              <li>Cancellation takes effect at the end of the current billing period.</li>
              <li>We do not provide refunds or credits for partial months or unused service periods.</li>
            </ul>

            <h2>3. Refund Eligibility</h2>
            <p>Refunds may be granted only in the following cases:</p>
            <ul>
              <li><strong>Duplicate Charges:</strong> If you are accidentally charged multiple times for the same subscription period.</li>
              <li><strong>Payment Errors:</strong> If Stripe or RaiseTalks processes a payment in error.</li>
              <li><strong>Service Outages:</strong> In rare cases of prolonged service unavailability that materially impacts your use.</li>
            </ul>
            <p>
              Requests for refunds must be submitted within <strong>7 calendar days</strong> of the charge date by emailing{' '}
              <a href="mailto:billing@raisetalks.ai" className="text-[#0174e1] font-semibold hover:underline">billing@raisetalks.ai</a>{' '}
              with your account details and reason for refund.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 my-8">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Timeline</h3>
                  <p className="text-yellow-700 mb-0">
                    All refund requests must be submitted within <strong>7 calendar days</strong> of the charge date.
                    Requests submitted after this period will not be eligible for refunds.
                  </p>
                </div>
              </div>
            </div>

            <h2>4. Refund Process</h2>
            <ul>
              <li>All refund requests will be reviewed promptly.</li>
              <li>If approved, refunds will be issued to the original payment method via Stripe.</li>
              <li>Refund processing times vary by payment provider but typically take 5–10 business days.</li>
            </ul>

            <h2>5. Non-Refundable Situations</h2>
            <p>Refunds are <strong>not</strong> provided for:</p>
            <ul>
              <li>Change of mind or dissatisfaction with features or service</li>
              <li>Failure to use the Platform or any portion thereof during the subscription period</li>
              <li>Cancellation partway through a billing cycle</li>
            </ul>

            <div className="bg-red-50 border border-red-200 rounded-xl p-6 my-8">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">No Refunds For</h3>
                  <ul className="text-red-700 mb-0 space-y-1">
                    <li>• Change of mind about subscription</li>
                    <li>• Not using the platform during billing period</li>
                    <li>• Partial month cancellations</li>
                    <li>• Dissatisfaction with features</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2>6. Payment Disputes</h2>
            <p>
              If you believe a charge is incorrect or unauthorized, please contact us first at{' '}
              <a href="mailto:billing@raisetalks.ai" className="text-[#0174e1] font-semibold hover:underline">billing@raisetalks.ai</a>{' '}
              so we can assist you. Unauthorized charge disputes filed directly with your payment provider without contacting
              us may delay resolution.
            </p>

            <h2>7. Contact Us</h2>
            <p>For any billing questions or refund requests, please contact:</p>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <p className="font-semibold text-gray-900 mb-2">RaiseTalks Billing Support</p>
              <p>Email: <a href="mailto:billing@raisetalks.ai" className="text-[#0174e1] font-semibold hover:underline">billing@raisetalks.ai</a></p>
              <p className="text-sm text-gray-600 mt-4">
                <strong>Tip:</strong> Before requesting a refund, try our{' '}
                <Link to="/pricing" className="text-[#0174e1] font-semibold hover:underline">Free Tier</Link>{' '}
                to explore our features and see if they meet your needs.
              </p>
            </div>

            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-4">
                <Link
                  to="/pricing"
                  className="bg-gradient-to-r from-[#0174e1] to-[#0182f8] text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
                >
                  View Pricing Plans
                </Link>
                <Link
                  to="/terms-of-service"
                  className="border-2 border-[#0174e1] text-[#0174e1] hover:bg-[#0174e1] hover:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  Terms of Service
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}