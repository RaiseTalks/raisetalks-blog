import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import NavbarScroll from '@site/src/components/NavbarScroll';

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
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>×</button>
        <h2>Join the Waitlist</h2>
        <p>Be the first to know when RaiseTalks.ai launches!</p>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="button button--primary button--block">
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
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <p className={styles.heroTagline}>STREAMLINING DUE DILIGENCE</p>
            <Heading as="h1" className={styles.heroTitle}>
              AI Assistant Providing Personalised Guidance on Data Rooms
            </Heading>
            <div className={styles.heroButtons}>
              <button
                className={clsx('button button--primary button--lg', styles.heroButton)}
                onClick={() => setIsModalOpen(true)}>
                Join Waiting List
              </button>
              <Link
                className={clsx('button button--secondary button--lg', styles.heroButtonSecondary)}
                to="https://buy.stripe.com/14k9Dq8HDanK4bCcMN"
                target="_blank">
                Contribute to RaiseTalks.ai
              </Link>
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
    <section className={styles.stats} ref={animationRef}>
      <div className="container">
        <Heading as="h2" className={styles.statsTitle}>
          Entrepreneurial Challenges: The Hidden Hurdles of Startup Success
        </Heading>
        <div className={styles.statsGrid}>
          {stats.map((stat, idx) => (
            <div key={idx} className={styles.statCard}>
              <div className={styles.statNumber}>{stat.number}</div>
              <p className={styles.statDescription}>{stat.description}</p>
              <h3 className={styles.statTitle}>{stat.title}</h3>
              <p className={styles.statDetails}>{stat.details}</p>
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
    <section className={styles.quote}>
      <div className="container">
        <div className={styles.quoteContent}>
          <div className={styles.quoteLeft}>
            <img
              src="/img/Dasha-quote-1-1024x1024.webp"
              alt="Dariia Vasylieva"
              className={styles.quoteImage}
            />
          </div>
          <div className={styles.quoteRight}>
            <p className={styles.quotePretext}>FUNDRAISING IS</p>
            <p className={styles.quotePretext}>IS NO LONGER</p>
            <p className={styles.quotePretext}>A DAUNTING TASK…</p>
            <p className={styles.quoteMainText}>IT'S A <strong>CONVERSATION</strong>.</p>
            <blockquote className={styles.quoteText}>
              "With RaiseTalks.ai, startups gain a personalized fundraising advisor at their fingertips—ready to answer any question, deliver tailored guidance, and streamline every step of the investment journey. From navigating complex challenges to crafting investor-ready materials, RaiseTalks.ai turns fundraising into a seamless, empowering experience."
            </blockquote>
            <p className={styles.quoteAuthor}>– Dariia Vasylieva</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Pricing Section Component
function HomepagePricing() {
  const plans = [
    {
      name: 'STARTER',
      price: '$1',
      period: '/ ANNUALLY',
      description: 'Explore our platform and try out the essentials with minimal commitment!',
      features: [
        'First 5 questions answered by RaiseTalks.ai',
        'Basic fundraising guidance',
        'Limited access to templates and tools'
      ],
      buttonText: 'Select Starter Plan',
      available: true,
      gradient: 'starterGradient'
    },
    {
      name: 'ENHANCE',
      originalPrice: '$999',
      price: '$499',
      period: '/ ANNUALLY',
      description: 'This special price is valid only for the first 500 startups that apply.',
      features: [
        'Up to 100 questions',
        'AI-powered answers tailored to early-stage fundraising',
        'Basic investor engagement insights.'
      ],
      buttonText: 'Not Available',
      available: false,
      gradient: 'enhanceGradient'
    },
    {
      name: 'GROWTH',
      originalPrice: '$1999',
      price: '$999',
      period: '/ ANNUALLY',
      description: 'This special price is valid only for the first 500 startups that apply.',
      features: [
        'Unlimited AI Q&A support.',
        'Advanced Data Room templates.',
        'Priority support and AI-driven fundraising strategies.'
      ],
      buttonText: 'Not Available',
      available: false,
      gradient: 'growthGradient'
    }
  ];

  return (
    <section className={styles.pricing}>
      <div className="container">
        <Heading as="h2" className={styles.pricingTitle}>Pricing</Heading>
        <p className={styles.pricingSubtitle}>
          Whether you're just starting or scaling to the next level, we've got the perfect plan for your journey
        </p>
        <div className={styles.pricingGrid}>
          {plans.map((plan, idx) => (
            <div key={idx} className={styles.pricingCard}>
              <div className={clsx(styles.pricingHeader, styles[plan.gradient])}>
                <h3>{plan.name}</h3>
              </div>
              <div className={styles.pricingBody}>
                {plan.originalPrice && (
                  <p className={styles.originalPrice}>{plan.originalPrice}</p>
                )}
                <div className={styles.priceDisplay}>
                  <span className={styles.price}>{plan.price}</span>
                  <span className={styles.period}>{plan.period}</span>
                </div>
                {plan.description && (
                  <p className={styles.specialNote}>
                    <span className={styles.infoIcon}>ℹ️</span>
                    {plan.description}
                  </p>
                )}
                <button
                  className={clsx(
                    'button button--block',
                    plan.available ? 'button--primary' : 'button--secondary'
                  )}
                  disabled={!plan.available}>
                  {plan.buttonText}
                </button>
                <ul className={styles.featureList}>
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Journey Section Component
function HomepageJourney() {
  return (
    <section className={styles.journey}>
      <div className="container">
        <div className={styles.journeyContent}>
          <Heading as="h2" className={styles.journeyTitle}>
            The Fundraising Journey: Unlocking Investor Confidence with RaiseTalk.ai
          </Heading>
          <p className={styles.journeySubtitle}>
            RaiseTalks.ai transforms the fundraising process into a seamless, data-driven experience.
          </p>
          <Link
            className={clsx('button button--primary button--lg', styles.journeyButton)}
            to="https://raisetalks.ai/#join-beta">
            Join Closed Beta
          </Link>
        </div>
        <div className={styles.journeyImage}>
          <img src="/img/chat-bg-1024x630.webp" alt="RaiseTalks.ai Chat Interface" />
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
    <section className={styles.roadmap}>
      <div className="container">
        <div className={styles.roadmapHeader}>
          <Heading as="h2" className={styles.roadmapTitle}>ROADMAP</Heading>
          <p className={styles.roadmapSubtitle}>
            Our roadmap charts our path to transforming startup growth with AI-powered fundraising and investor connections.
          </p>
        </div>
        
        <div className={styles.roadmapVisual}>
          <img 
            src="/img/Tripple-point.svg" 
            alt="Roadmap Timeline" 
            className={styles.roadmapDesktop}
          />
          <img 
            src="/img/3point-mobile.svg" 
            alt="Roadmap Timeline Mobile" 
            className={styles.roadmapMobile}
          />
        </div>

        <div className={styles.roadmapGrid}>
          {roadmapData.map((item, idx) => (
            <div 
              key={idx} 
              className={clsx(styles.roadmapCard, styles[`roadmapCard${idx + 1}`])}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className={styles.roadmapCardHeader}>
                <div className={styles.quarterInfo}>
                  <span className={styles.quarter}>{item.quarter}</span>
                  <span className={styles.year}>/ {item.year}</span>
                </div>
              </div>
              <div className={styles.roadmapCardBody}>
                {item.features.map((feature, featureIdx) => (
                  <div key={featureIdx} className={styles.roadmapFeature}>
                    <p>{feature}</p>
                  </div>
                ))}
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
      description: 'Save on traditional advisory fees'
    },
    {
      icon: '/img/aipower-icon.svg',
      title: 'AI-Powered',
      description: 'Cutting-edge technology at your service'
    },
    {
      icon: '/img/global-icon.svg',
      title: 'Global Reach',
      description: 'Connect with investors worldwide'
    }
  ];

  return (
    <section className={styles.whyUs}>
      <div className="container">
        <Heading as="h2" className={styles.whyUsTitle}>Why choose Us?</Heading>
        <div className={styles.featuresGrid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <img src={feature.icon} alt={feature.title} className={styles.featureIcon} />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
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