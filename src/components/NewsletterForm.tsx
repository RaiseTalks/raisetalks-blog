import React, { useState } from 'react';
import styles from './NewsletterForm.module.css';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      console.log('Newsletter signup:', email);
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
          Fundraising is hard—we make it easier.<br />
          Join our founders-only newsletter for no-fluff tips, investor updates, and smart tools that actually help.
        </p>
        
        <form onSubmit={handleSubmit} className={styles.newsletterForm}>
          <div className={styles.formGroup}>
            <input
              type="email"
              placeholder="Enter your Email"
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