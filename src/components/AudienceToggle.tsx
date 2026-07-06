import React from 'react';
import styles from './AudienceToggle.module.css';

type AudienceToggleProps = {
  active: 'startups' | 'investors';
  onSelect?: (tab: 'startups' | 'investors') => void;
};

export default function AudienceToggle({ active, onSelect }: AudienceToggleProps) {
  return (
    <div className={styles.toggle}>
      <button
        type="button"
        className={`${styles.pill} ${active === 'startups' ? styles.active : ''}`}
        onClick={() => onSelect?.('startups')}
      >
        <span className={`${styles.dot} ${styles.dotBlue}`} />
        For Startups
      </button>
      <button
        type="button"
        className={`${styles.pill} ${active === 'investors' ? styles.active : ''}`}
        onClick={() => onSelect?.('investors')}
      >
        <span className={`${styles.dot} ${styles.dotYellow}`} />
        For Investors
      </button>
    </div>
  );
}
