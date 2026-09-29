import React, { useRef, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './NewsletterForm.module.css';

interface NewsletterFormProps {
  /** Lead magnet id known to the newsletter-subscribe function; the signup then returns its files */
  magnet?: string;
  /** Text above the form; null hides it (e.g. inside a BlogCTA that has its own copy) */
  description?: string | null;
  buttonText?: string;
}

export default function NewsletterForm({
  magnet,
  description = 'Get insights from RaiseTalks and build trust in every round.',
  buttonText = 'Subscribe',
}: NewsletterFormProps) {
  const { siteConfig } = useDocusaurusContext();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [files, setFiles] = useState<Record<string, string> | null>(null);

  // Bot protection: track form load time and honeypot value via refs
  const formLoadedAt = useRef(Date.now());
  const honeypotRef = useRef('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const SUPABASE_URL = (siteConfig.customFields?.SUPABASE_URL as string) || 'https://wzmlpdetrelxzunebnox.supabase.co';
      const SUPABASE_ANON_KEY = (siteConfig.customFields?.SUPABASE_ANON_KEY as string) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6bWxwZGV0cmVseHp1bmVibm94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NjMxNDksImV4cCI6MjA2MDAzOTE0OX0.-9StrWLSgULqZr_tW8vnqVqts8tVtwJKzEDx2gaBzGc';

      const response = await fetch(`${SUPABASE_URL}/functions/v1/newsletter-subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          email,
          magnet,
          website: honeypotRef.current,
          _formLoadedAt: formLoadedAt.current,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to subscribe');
      }

      if (magnet) {
        const body = await response.json();
        setFiles(body.files ?? null);
        setStatus('success');
        return;
      }

      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  // Lead magnet delivered: swap the form for the download links
  if (magnet && status === 'success' && files) {
    return (
      <div className={styles.newsletterContent}>
        <p className={styles.successMessage}>You are on the list. Download your files:</p>
        <div className={styles.downloads}>
          {Object.entries(files).map(([type, url]) => (
            <a key={type} href={url} download className="cta-button">
              Download {type === 'xlsx' ? 'Excel' : type.toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.newsletterContent}>
      {description && <p className={styles.newsletterDescription}>{description}</p>}

      <form onSubmit={handleSubmit} className={styles.newsletterForm}>
        {/* Honeypot field — invisible to real users, catches bots */}
        <input
          type="text"
          name="website"
          aria-hidden="true"
          tabIndex={-1}
          autoComplete="off"
          style={{ position: 'absolute', left: '-9999px' }}
          onChange={(e) => { honeypotRef.current = e.target.value; }}
        />

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
            {status === 'loading' ? 'Sending...' : buttonText}
          </button>
        </div>

        {status === 'success' && (
          <p className={styles.successMessage}>
            Successfully subscribed to our newsletter.
          </p>
        )}

        {status === 'error' && (
          <p className={styles.errorMessage}>
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}
