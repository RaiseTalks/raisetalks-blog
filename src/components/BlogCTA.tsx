import React from 'react';

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
}

const BlogCTA: React.FC<BlogCTAProps> = ({
  title,
  description,
  buttonText,
  buttonLink = '#',
  disclaimer,
  variant = 'default'
}) => {
  const containerClass = variant === 'primary' ? 'cta-box--primary' : 'cta-box';
  const buttonClass = variant === 'primary' ? 'cta-button--primary' : 'cta-button';
  const disclaimerClass = variant === 'primary' ? 'cta-disclaimer--primary' : 'cta-disclaimer';

  return (
    <div className={containerClass}>
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={buttonLink} className={buttonClass}>
        {buttonText}
      </a>
      {disclaimer && (
        <p className={disclaimerClass}>{disclaimer}</p>
      )}
    </div>
  );
};

export default BlogCTA;