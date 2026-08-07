import React from 'react';
import styles from './PhotoCarousel.module.css';

type Photo = { src: string; alt: string };

// Default two-row team strip used on the about-us page.
const DEFAULT_ROWS: Photo[][] = [
  [
    { src: '/img/about-us/43.webp', alt: 'RaiseTalks team' },
    { src: '/img/about-us/44.webp', alt: 'RaiseTalks team' },
    { src: '/img/about-us/45.webp', alt: 'RaiseTalks team' },
  ],
  [
    { src: '/img/about-us/46.webp', alt: 'RaiseTalks team' },
    { src: '/img/about-us/47.webp', alt: 'RaiseTalks team' },
    { src: '/img/about-us/48.webp', alt: 'RaiseTalks team' },
  ],
];

interface PhotoCarouselProps {
  /** One array per row. Even rows scroll left, odd rows scroll right. */
  rows?: Photo[][];
  /** Card orientation — 'landscape' (default) or 'portrait'. */
  variant?: 'landscape' | 'portrait';
}

export default function PhotoCarousel({
  rows = DEFAULT_ROWS,
  variant = 'landscape',
}: PhotoCarouselProps) {
  return (
    <div
      className={`${styles.photoCarousel} ${
        variant === 'portrait' ? styles.portraitCarousel : ''
      }`}
    >
      {rows.map((photos, rowIndex) => (
        <div className={styles.photoRow} key={rowIndex}>
          <div
            className={
              rowIndex % 2 === 0 ? styles.photoTrackLeft : styles.photoTrackRight
            }
          >
            {/* Quadrupled so the -25% keyframe loops seamlessly. */}
            {[...photos, ...photos, ...photos, ...photos].map((photo, index) => (
              <div
                key={index}
                className={`${styles.photoItem} ${
                  variant === 'portrait' ? styles.portrait : ''
                }`}
              >
                <img src={photo.src} alt={photo.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
