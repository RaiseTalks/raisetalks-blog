import React, { useState } from 'react';
import styles from './FAQSection.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is RaiseTalks?",
    answer: "AI-powered SaaS fundraising workspace for early-stage startups to organise data rooms, streamline DD and secure funding."
  },
  {
    question: "Who is RaiseTalks for?",
    answer: "RaiseTalks is built for early-stage startups, founders, and entrepreneurs seeking to improve their investment readiness and increase their chances of securing funding."
  },
  {
    question: "How does AI Advisor works?",
    answer: "Simply ask the any question about fundraising preparation—whether it's about structuring your data room, crafting a pitch deck, or building a financial model—and it provides tailored answers, tools, and templates."
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
    answer: "Absolutely! RaiseTalks analyzes your pitch deck and offers suggestions for improvement, such as optimizing your slides, refining your messaging, and emphasizing key metrics."
  },
  {
    question: "How do I know what investors are looking for in a pitch deck?",
    answer: "RaiseTalks provides insights on investor expectations, ensuring your deck effectively communicates your value proposition, market opportunity, and growth potential."
  },
  {
    question: "Does RaiseTalks connect me with investors?",
    answer: "Currently, RaiseTalks focuses on preparing you for investment readiness. However, it provides tips and resources on how to approach and pitch to investors effectively."
  },
  {
    question: "Is RaiseTalks free to use?",
    answer: "RaiseTalks offers a free tier with basic features. For advanced tools and personalized guidance, you can subscribe to a Enhance or Growth plan."
  },
  {
    question: "Is RaiseTalks available worldwide?",
    answer: "Yes, RaiseTalks is accessible globally, as long as you have an internet connection."
  },
  {
    question: "How do I sign up?",
    answer: "Click the \"Sign Up\" button on the homepage, create an account, and start your fundraising journey with RaiseTalks"
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className="container mx-auto px-4">
        <div className={styles.faqHeader}>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <p className={styles.faqSubtitle}>
            Everything you need to know about RaiseTalks.ai
          </p>
        </div>
        
        <div className={styles.faqContainer}>
          {faqData.map((item, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                className={`${styles.faqQuestion} ${openIndex === index ? styles.active : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <span>{item.question}</span>
                <span className={styles.faqIcon}>
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              <div 
                className={`${styles.faqAnswer} ${openIndex === index ? styles.open : ''}`}
              >
                <div className={styles.faqAnswerContent}>
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}