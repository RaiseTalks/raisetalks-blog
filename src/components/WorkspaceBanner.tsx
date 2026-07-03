import React from 'react';
import styles from './WorkspaceBanner.module.css';

export default function WorkspaceBanner() {
  return (
    <section className={styles.banner}>
      <div className={`container mx-auto ${styles.card}`}>
        <div className={styles.backgroundWindow} aria-hidden="true">
          <img src="/img/cta-navy-bg.svg" className={styles.backgroundArt} alt="" />
        </div>
        <p className={styles.text}>
          RaiseTalks is a full-stack fundraising workspace built for founders. That means
          organized data rooms, smart investor matching, and an ecosystem that brings founders
          and investors together in one place.
        </p>
      </div>
    </section>
  );
}
