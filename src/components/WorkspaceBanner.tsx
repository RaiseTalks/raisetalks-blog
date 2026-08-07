import React from 'react';
import styles from './WorkspaceBanner.module.css';

export default function WorkspaceBanner() {
  return (
    <section className={styles.banner}>
      <div className={`rt-rail ${styles.card}`}>
        <div className={styles.backgroundWindow} aria-hidden="true">
          <img src="/img/cta-navy-bg.svg" className={styles.backgroundArt} alt="" />
        </div>
        <p className={styles.text}>
          One Workspace. Zero chaos.
        </p>
      </div>
    </section>
  );
}
