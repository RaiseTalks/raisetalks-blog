import React, {createContext, useContext, useId, useState, type ReactNode} from 'react';
import Head from '@docusaurus/Head';
import styles from './FAQSection.module.css';

// Blog version of the website FAQ accordion (FAQSection): same classes, same look, one item open
// at a time. Posts don't use these directly: src/plugins/remark-blog-faq.js generates them from the
// Markdown "Frequently asked questions" section.

type FAQContextValue = {openId: string | null; toggle: (id: string) => void};

const FAQContext = createContext<FAQContextValue | null>(null);

export function BlogFAQ({children, schema}: {children: ReactNode; schema?: string}): ReactNode {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId((current) => (current === id ? null : id));

  return (
    <FAQContext.Provider value={{openId, toggle}}>
      {schema && (
        <Head>
          <script type="application/ld+json">{schema}</script>
        </Head>
      )}
      <div className={styles.blogFaq}>{children}</div>
    </FAQContext.Provider>
  );
}

export function BlogFAQItem({question, children}: {question: string; children: ReactNode}): ReactNode {
  const context = useContext(FAQContext);
  const [localOpen, setLocalOpen] = useState(false);
  const id = useId();
  const isOpen = context ? context.openId === id : localOpen;
  const toggle = () => (context ? context.toggle(id) : setLocalOpen(!localOpen));
  const panelId = `faq-panel-${id}`;
  const buttonId = `faq-button-${id}`;

  return (
    <div className={styles.faqItem}>
      <h3 className={styles.blogFaqHeading}>
        <button
          id={buttonId}
          type="button"
          className={`${styles.faqQuestion} ${isOpen ? styles.active : ''}`}
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls={panelId}>
          <svg
            className={styles.faqIcon}
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true">
            {!isOpen && <line x1="12" y1="5" x2="12" y2="19" />}
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>{question}</span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`${styles.faqAnswer} ${styles.blogFaqAnswer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.faqAnswerContent}>{children}</div>
      </div>
    </div>
  );
}
