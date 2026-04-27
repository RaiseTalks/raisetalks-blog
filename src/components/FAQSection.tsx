import React, { useState } from 'react';
import styles from './FAQSection.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

const primaryFAQs: FAQItem[] = [
  {
    question: "What makes RaiseTalks different from a Google Drive or Notion setup?",
    answer: "Because investors don't invest in folders. They invest in founders who understand what investors need to see, in what order, and why. RaiseTalks structures your data room the way a VC would build it - not the way a founder would organise it."
  },
  {
    question: "Who is RaiseTalks built for?",
    answer: "Pre-seed and seed founders preparing for their first or second institutional raise. If you're going into investor meetings without a readiness score, you're flying blind."
  },
  {
    question: "What is an investor readiness score?",
    answer: "A diagnostic that tells you exactly where your raise will break down - before an investor tells you with a pass. We score your data room, narrative consistency, and gap coverage against what institutional investors actually expect."
  },
  {
    question: "How long does it take to set up a data room?",
    answer: "Most founders have a structured, shareable data room live in under an hour. We give you the exact document checklist investors use, you fill it, we score it."
  },
  {
    question: "Can RaiseTalks help me if I don't have revenue yet?",
    answer: "Yes. Most of our founders are pre-revenue. Investor readiness isn't about traction - it's about how you present what you have. We help you close the gap between where you are and what investors need to see."
  },
  {
    question: "What documents should be in my data room?",
    answer: "Pitch deck, financial model, cap table, team bios, product demo, market research, and legal docs. We give you the exact checklist and flag what's missing before your investor does."
  },
  {
    question: "How is my data room kept secure?",
    answer: "Enterprise encryption, granular access controls, and a single shareable link - so you control exactly who sees what, and when."
  },
];

const moreFAQs: FAQItem[] = [
  {
    question: "Will RaiseTalks tell me if my pitch deck is weak?",
    answer: "Yes, and we won't soften it. If slide 14 is the problem, we'll tell you it's slide 14. Radical transparency isn't a brand value for us - it's the product."
  },
  {
    question: "What's the difference between free and paid plans?",
    answer: "Free gives you the data room and readiness score. Paid unlocks the AI narrative coach, IC memo generator, and priority onboarding. Start free, upgrade when you're ready to go deep."
  },
  {
    question: "I'm raising right now. Is it too late to use RaiseTalks?",
    answer: "No - it's exactly the right time. Founders who set this up mid-raise consistently catch gaps they didn't know existed. One fixed inconsistency can be the difference between a pass and a term sheet."
  },
  {
    question: "What is RaiseTalks?",
    answer: "AI-powered SaaS fundraising workspace for early-stage startups to organise data rooms, streamline DD and secure funding."
  },
  {
    question: "How does AI Advisor work?",
    answer: "Simply ask any question about fundraising preparation - whether it's about structuring your data room, crafting a pitch deck, or building a financial model - and it provides tailored answers, tools, and templates."
  },
  {
    question: "What is a data room, and why do I need one?",
    answer: "A data room is a secure space where startups organize essential documents and data for investors during the due diligence process. It ensures transparency and helps investors evaluate your business."
  },
  {
    question: "What kinds of documents should I include in a data room?",
    answer: "Typical data room documents include your pitch deck, team bios, and product demos, market research, financial statements, legal agreements. RaiseTalks will guide you through each step."
  },
  {
    question: "Can RaiseTalks help improve my pitch deck?",
    answer: "Absolutely. RaiseTalks analyzes your pitch deck and offers suggestions for improvement, such as optimizing your slides, refining your messaging, and emphasizing key metrics."
  },
  {
    question: "How do I know what investors are looking for in a pitch deck?",
    answer: "RaiseTalks provides insights on investor expectations, ensuring your deck effectively communicates your value proposition, market opportunity, and growth potential."
  },
  {
    question: "Does RaiseTalks connect me with investors?",
    answer: "Yes, RaiseTalks facilitates introductions to investors once your readiness score meets the threshold. This feature is currently in beta."
  },
  {
    question: "Is RaiseTalks free to use?",
    answer: "RaiseTalks offers a free tier with basic features. For advanced tools and personalized guidance, you can subscribe to an Enhance or Growth plan."
  },
  {
    question: "Is RaiseTalks available worldwide?",
    answer: "Yes, RaiseTalks is accessible globally, as long as you have an internet connection."
  },
  {
    question: "How do I sign up?",
    answer: "Click the \"Sign Up\" button on the homepage, create an account, and start your fundraising journey with RaiseTalks."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  const renderItem = (item: FAQItem, id: string) => (
    <div key={id} className={styles.faqItem}>
      <button
        className={`${styles.faqQuestion} ${openIndex === id ? styles.active : ''}`}
        onClick={() => toggleFAQ(id)}
      >
        <span>{item.question}</span>
        <span className={styles.faqIcon}>
          {openIndex === id ? '−' : '+'}
        </span>
      </button>
      <div className={`${styles.faqAnswer} ${openIndex === id ? styles.open : ''}`}>
        <div className={styles.faqAnswerContent}>
          {item.answer}
        </div>
      </div>
    </div>
  );

  return (
    <section className={styles.faqSection}>
      <div className="container mx-auto px-4">
        <div className={styles.faqHeader}>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
        </div>

        <div className={styles.faqContainer}>
          {primaryFAQs.map((item, index) => renderItem(item, `primary-${index}`))}

          {showMore && moreFAQs.map((item, index) => renderItem(item, `more-${index}`))}

          <div className={styles.showMoreWrapper}>
            <button
              className={styles.showMoreButton}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? 'Show Less' : 'Show More'}
              <span className={styles.showMoreIcon}>{showMore ? '↑' : '↓'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
