import React from 'react';
import styles from './LogoCarousel.module.css';

const partners = [
  { name: 'Microsoft for Startups', logo: '/img/partners/microsoft.svg' },
  { name: 'Web Summit', logo: '/img/partners/websummit.svg' },
  { name: 'Founders Institute', logo: '/img/partners/founders-institute.svg' },
  { name: 'Beyond Enterprizes', logo: '/img/partners/beyond.svg' },
  { name: 'NLSQL', logo: '/img/partners/nlsql.svg' },
  { name: 'GETVISION', logo: '/img/partners/getvision.svg' },
  { name: 'Grechka Media', logo: '/img/partners/grechka.svg' },
];

export default function LogoCarousel() {
  return (
    <section className={styles.logoSection}>
      <div className="container mx-auto px-4">
        <div className={styles.logoHeader}>
          <h2 className={styles.logoTitle}>Trusted by</h2>
        </div>
        <div className={styles.logoCarousel}>
          <div className={styles.logoTrack}>
            {/* Double the partners for infinite scroll effect */}
            {[...partners, ...partners].map((partner, index) => (
              <div key={index} className={styles.logoItem}>
                <div className={styles.logoPlaceholder}>
                  {partner.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}