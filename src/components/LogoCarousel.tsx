import React from 'react';
import styles from './LogoCarousel.module.css';

const partners = [
  { name: 'Microsoft for Startups', logo: '/img/logos/logo_microsoft_for_startups.png' },
  { name: 'Web Summit', logo: '/img/logos/Web_Summit_logo.svg' },
  { name: 'Founders Institute', logo: '/img/logos/founders-institute.png' },
  { name: 'Beyond Enterprizes', logo: '/img/logos/Beyond-Enterprizes-logo.png' },
  { name: 'NLSQL', logo: '/img/logos/nlsql.png' },
  { name: 'GetVision', logo: '/img/logos/getvision-new-logo.svg' },
  { name: 'Grechka Media', logo: '/img/logos/grechka-media.svg' },
];

export default function LogoCarousel() {
  return (
    <section className={styles.logoSection}>
      <div className="container mx-auto px-4">
        <div className={styles.logoCarousel}>
          <div className={styles.logoTrack}>
            {/* Double the partners for infinite scroll effect */}
            {[...partners, ...partners].map((partner, index) => (
              <div key={index} className={styles.logoItem}>
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className={styles.logoImage}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}