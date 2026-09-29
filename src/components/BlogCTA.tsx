import React from 'react';
import NewsletterForm from './NewsletterForm';

interface BlogCTAProps {
  /** Main heading text */
  title: string;
  /** Description text below the title */
  description: string;
  /** Button text */
  buttonText: string;
  /** Button link URL */
  buttonLink?: string;
  /** Disclaimer text below the button */
  disclaimer?: string;
  /** CTA variant - primary (larger) or default */
  variant?: 'default' | 'primary';
  /** Lead magnet id: shows the email form (button text = submit label) instead of the link */
  magnet?: string;
}

const BlogCTA: React.FC<BlogCTAProps> = ({
  title,
  description,
  buttonText,
  buttonLink = '#',
  disclaimer,
  variant = 'default',
  magnet
}) => {
  const containerClass = variant === 'primary' ? 'cta-box--primary' : 'cta-box';
  const buttonClass = variant === 'primary' ? 'cta-button--primary' : 'cta-button';
  const disclaimerClass = variant === 'primary' ? 'cta-disclaimer--primary' : 'cta-disclaimer';

  return (
    <div className={containerClass}>
      <h3>{title}</h3>
      <p>{description}</p>
      {magnet ? (
        <NewsletterForm magnet={magnet} description={null} buttonText={buttonText} />
      ) : (
        <a href={buttonLink} className={buttonClass}>
          {buttonText}
        </a>
      )}
      {disclaimer && (
        <p className={disclaimerClass}>{disclaimer}</p>
      )}
    </div>
  );
};

export default BlogCTA;