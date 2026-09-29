import React from 'react';
import Head from '@docusaurus/Head';
import {Redirect} from '@docusaurus/router';

/**
 * Short link used in the LinkedIn post's first comment (raisetalks.com/funds-2026).
 * The content lives in the blog post blog/2026-09-30-new-vc-funds-2026.md.
 */
const TARGET = '/blog/new-vc-funds-2026';

export default function Funds2026Redirect() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={`https://raisetalks.com${TARGET}`} />
        <meta httpEquiv="refresh" content={`0; url=${TARGET}`} />
      </Head>
      <Redirect to={TARGET} />
    </>
  );
}
