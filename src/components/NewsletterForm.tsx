import React, { useState } from 'react';
import styles from './NewsletterForm.module.css';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // TODO: Connect to newsletter API (e.g., Supabase or email service)
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className={styles.newsletterSection}>
      <div className={styles.newsletterContent}>
        <h3 className={styles.newsletterTitle}>
          Subscribe to our <strong>Newsletter</strong>
        </h3>
        <p className={styles.newsletterDescription}>
          Stay ahead with real fundraising playbooks, diligence checklists, and investor-ready tools - built for founders who want speed and trust in every round.
        </p>
        
        <form onSubmit={handleSubmit} className={styles.newsletterForm}>
          <div className={styles.formGroup}>
            <input
              type="email"
              placeholder="Enter your Email"
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.emailInput}
              disabled={status === 'loading'}
            />
            <button 
              type="submit" 
              className={styles.subscribeButton}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          
          {status === 'success' && (
            <p className={styles.successMessage}>
              ✓ Successfully subscribed to our newsletter!
            </p>
          )}
          
          {status === 'error' && (
            <p className={styles.errorMessage}>
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}