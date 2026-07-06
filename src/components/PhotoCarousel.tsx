import React from 'react';
import styles from './PhotoCarousel.module.css';

const rowOne = [
  { src: '/img/about-us/43.jpg', alt: 'RaiseTalks team' },
  { src: '/img/about-us/44.jpg', alt: 'RaiseTalks team' },
  { src: '/img/about-us/45.jpg', alt: 'RaiseTalks team' },
];

const rowTwo = [
  { src: '/img/about-us/46.jpg', alt: 'RaiseTalks team' },
  { src: '/img/about-us/47.jpg', alt: 'RaiseTalks team' },
  { src: '/img/about-us/48.jpg', alt: 'RaiseTalks team' },
];

export default function PhotoCarousel() {
  return (
    <div className={styles.photoCarousel}>
      <div className={styles.photoRow}>
        <div className={styles.photoTrackLeft}>
          {[...rowOne, ...rowOne, ...rowOne, ...rowOne].map((photo, index) => (
            <div key={index} className={styles.photoItem}>
              <img src={photo.src} alt={photo.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.photoRow}>
        <div className={styles.photoTrackRight}>
          {[...rowTwo, ...rowTwo, ...rowTwo, ...rowTwo].map((photo, index) => (
            <div key={index} className={styles.photoItem}>
              <img src={photo.src} alt={photo.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
