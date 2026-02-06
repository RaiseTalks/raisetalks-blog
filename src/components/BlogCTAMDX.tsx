import React from 'react';
import BlogCTA from './BlogCTA';

// Pre-configured CTA components for common use cases
export const DataRoomCTA: React.FC = () => (
  <BlogCTA
    title="Download the Complete Data Room Checklist"
    description="Join 2,500+ funded founders who collectively raised $847M using this exact system"
    buttonText="Get Free Checklist + Email Course →"
    buttonLink="https://app.raisetalks.com/sign-up"
    disclaimer="No spam. Unsubscribe anytime. Used by founders at YC, Techstars & 500 Startups."
    variant="default"
  />
);

export const DataRoomCTAPrimary: React.FC = () => (
  <BlogCTA
    title="Get Your Free Data Room Checklist Now"
    description="Join 2,500+ funded founders who raised $847M using this proven system"
    buttonText="Download Free Checklist + Bonus Email Course →"
    buttonLink="https://app.raisetalks.com/sign-up"
    disclaimer="Instant download • No spam • Unsubscribe anytime"
    variant="primary"
  />
);

// Generic CTA that can be customized via props
export const CustomCTA: React.FC<{
  title: string;
  description: string;
  buttonText: string;
  buttonLink?: string;
  disclaimer?: string;
  variant?: 'default' | 'primary';
}> = (props) => <BlogCTA {...props} />;

export default BlogCTA;