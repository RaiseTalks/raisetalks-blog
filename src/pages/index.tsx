import React, { useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import NavbarScroll from '@site/src/components/NavbarScroll';
import LogoCarousel from '@site/src/components/LogoCarousel';
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
    <section className={styles.heroSection}>
      <div className={styles.heroBackground}></div>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <div className={styles.heroGlassCard}>
            <span className={styles.heroBadge}>
              STREAMLINE DUE DILIGENCE
            </span>
            <Heading as="h1" className={styles.heroTitle}>
              Your <span className={styles.heroTitleAccent}>AI-powered</span> fundraising workspace
            </Heading>
            <p className={styles.heroDescription}>
              Built for early-stage founders to organize data rooms and close rounds faster.
            </p>
            <div className={styles.heroButtons}>
              <Link
                className={styles.heroPrimaryButton}
                to="https://app.raisetalks.com/sign-up">
                Try It Free
              </Link>
              <Link
                className={styles.heroSecondaryButton}
                to="https://www.producthunt.com/@dariiava"
                target="_blank">
                We're on Product Hunt
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
      <div className="container px-4 mx-auto">
        <div className="mb-16 text-center">
          <Heading as="h2" className="mb-4 text-4xl font-bold leading-tight md:text-5xl gradient-text">
            Entrepreneurial Challenges
          </Heading>
          <p className="mb-4 text-xl text-gray-600">
            The Hidden Hurdles of Startup Success
          </p>
          <div className="w-24 h-1 mx-auto rounded-full bg-brand-gradient"></div>
        </div>

        <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-3">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl hover:border-blue-600 transition-all duration-300 group">
              <div className="mb-6 text-center">
                <div className="text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300 gradient-text">
                  {stat.number}
                </div>
                <p className="text-sm leading-relaxed text-gray-700">
                  {stat.description}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h3 className="mb-3 text-xl font-bold text-center gradient-text">
                  {stat.title}
                </h3>
                <p className="text-sm leading-relaxed text-center text-gray-600">
                  {stat.details}
                </p>
              </div>

              {/* Decorative element */}
              <div className="flex justify-center mt-6">
                <div className="w-12 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand-gradient"></div>
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
      description: 'Cut out expensive advisors—get investor-ready without the overhead',
      icon: '/img/icons/Cost-Smart.svg'
    },
    {
      title: 'AI-Driven Speed',
      description: 'Automate the time-consuming prep and focus on closing your round',
      icon: '/img/icons/AI-DrivenSpeed.svg'
    },
    {
      title: 'VC-Grade Materials',
      description: 'Stand out with globally compliant, investor-trusted documents',
      icon: '/img/icons/VC-GradeMaterials.svg'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div className="mb-12 text-center">
          <Heading as="h2" className="mb-4 text-4xl font-bold md:text-5xl gradient-text">
            Why Founders Choose RaiseTalks
          </Heading>
          <div className="w-24 h-1 mx-auto rounded-full bg-brand-gradient"></div>
        </div>

        <div className="grid max-w-5xl gap-8 mx-auto md:grid-cols-3">
          {reasons.map((reason, idx) => (
            <div key={idx} className="p-8 text-center transition-all duration-300 border border-gray-100 rounded-2xl bg-gradient-to-b from-gray-50 to-white hover:shadow-xl group">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 transition-transform duration-300 group-hover:scale-110">
                <img
                  src={reason.icon}
                  alt={reason.title}
                  className="w-14 h-14"
                />
              </div>
              <h3 className="mb-4 text-2xl font-bold gradient-text">{reason.title}</h3>
              <p className="leading-relaxed text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section Component
function HomepageCTA() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaBackground}></div>
      <div className={styles.ctaContent}>
        <Heading as="h2" className={styles.ctaTitle}>
          Fundraising isn't guesswork. It's a process.
        </Heading>
        <p className={styles.ctaDescription}>
          RaiseTalks helps you run it like a pro with automated data rooms, real investor insights, and deal-ready files. Join the Beta and lead your round with confidence.
        </p>
        <div className={styles.ctaButtons}>
          <Link
            className={styles.ctaButtonPrimary}
            to="https://app.raisetalks.com/sign-up">
            Start Free Trial
          </Link>
          <Link
            className={styles.ctaButtonSecondary}
            to="/pricing">
            View Pricing
          </Link>
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
      description="RaiseTalks - Your AI-powered fundraising workspace for early-stage founders">
      <NavbarScroll />
      <HomepageHero />
      <LogoCarousel />
      <HomepageStats />
      <SolutionSection />
      <HomepageWhyChoose />
      <HomepageCTA />
    </Layout>
  );
}