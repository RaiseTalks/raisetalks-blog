import React from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function AboutUs(): JSX.Element {
  return (
    <Layout
      title="About Us"
      description="Learn about RaiseTalks and our mission to streamline due diligence with AI-powered insights">
      <main>
        <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--12">
              <h1>About Us</h1>
              <p>Content coming soon...</p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}