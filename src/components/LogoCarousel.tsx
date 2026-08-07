import React from 'react';
import styles from './LogoCarousel.module.css';

const partners = [
  { name: 'Microsoft for Startups', logo: '/img/logos/microsoft-for-startups.webp', width: 360, height: 120 },
  { name: 'Web Summit', logo: '/img/logos/web-summit.webp', width: 360, height: 120 },
  { name: 'Founders Institute', logo: '/img/logos/founders-institute.webp', width: 360, height: 120 },
  { name: 'NLSQL', logo: '/img/logos/nlsql.webp', width: 360, height: 120 },
  { name: 'GetVision', logo: '/img/logos/getvision.webp', width: 360, height: 120 },
  { name: 'Global AI Show', logo: '/img/logos/global-ai-show.webp', width: 360, height: 120 },
  { name: 'NVIDIA', logo: '/img/logos/nvidia.webp', width: 360, height: 120 },
  { name: 'Step Conference', logo: '/img/logos/step-conference.webp', width: 240, height: 120 },
  { name: 'Dubai AI Festival', logo: '/img/logos/dubai-ai-festival.webp', width: 360, height: 120 },
  { name: 'AWS', logo: '/img/logos/aws.webp', width: 360, height: 120 },
  { name: 'Grechka Media', logo: '/img/logos/grechka-media.webp', width: 360, height: 120 },
  { name: 'Al Liwan', logo: '/img/logos/al-liwan.webp', width: 360, height: 120 },
  { name: 'Founders to Founders', logo: '/img/logos/founders-to-founders.webp', width: 240, height: 120 },
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
                  width={partner.width}
                  height={partner.height}
                  className={styles.logoImage}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}