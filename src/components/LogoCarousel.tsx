import React from 'react';
import styles from './LogoCarousel.module.css';

const partners = [
  { name: 'Microsoft for Startups', logo: '/img/logos/microsoft-for-startups.webp' },
  { name: 'Web Summit', logo: '/img/logos/web-summit.webp' },
  { name: 'Founders Institute', logo: '/img/logos/founders-institute.webp' },
  { name: 'NLSQL', logo: '/img/logos/nlsql.webp' },
  { name: 'GetVision', logo: '/img/logos/getvision.webp' },
  { name: 'Global AI Show', logo: '/img/logos/global-ai-show.webp' },
  { name: 'NVIDIA', logo: '/img/logos/nvidia.webp' },
  { name: 'Step Conference', logo: '/img/logos/step-conference.webp' },
  { name: 'Dubai AI Festival', logo: '/img/logos/dubai-ai-festival.webp' },
  { name: 'AWS', logo: '/img/logos/aws.webp' },
  { name: 'Grechka Media', logo: '/img/logos/grechka-media.webp' },
  { name: 'Al Liwan', logo: '/img/logos/al-liwan.webp' },
  { name: 'Founders to Founders', logo: '/img/logos/founders-to-founders.webp' },
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