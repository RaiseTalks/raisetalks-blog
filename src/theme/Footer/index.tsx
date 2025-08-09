import React, {type ReactNode} from 'react';
import Footer from '@theme-original/Footer';
import type FooterType from '@theme/Footer';
import type {WrapperProps} from '@docusaurus/types';
import NewsletterForm from '@site/src/components/NewsletterForm';

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props): ReactNode {
  return (
    <>
      {/* Newsletter Section */}
      <div className="newsletter-footer-section">
        <div className="container">
          <NewsletterForm />
        </div>
      </div>
      {/* Standard Docusaurus Footer */}
      <Footer {...props} />
    </>
  );
}
