import React, { useRef, useState, type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Heading from '@theme/Heading';
import GridSeam from '@site/src/components/GridSeam';
import LucideIcon from '@site/src/components/LucideIcon';
import { BlogFAQ, BlogFAQItem } from '@site/src/components/BlogFAQ';
import styles from './support.module.css';

const SITE_URL = 'https://raisetalks.com';
const PAGE_URL = `${SITE_URL}/support`;
const SUPPORT_EMAIL = 'support@raisetalks.ai';
const BILLING_EMAIL = 'billing@raisetalks.ai';
const PRIVACY_EMAIL = 'privacy@raisetalks.ai';
const YOUTUBE_URL = 'https://youtube.com/@raisetalks';
const CALENDLY_URL = 'https://calendly.com/iamdariiava/30min';

// "How to Use RaiseTalks: The Complete Founders Guide (Step by Step)", uploaded 2026-10-05, 11:26 long
const VIDEO_ID = 'tVBOT9ymqiE';
const VIDEO_TITLE = 'How to Use RaiseTalks: The Complete Founders Guide (Step by Step)';
const VIDEO_WATCH_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`;

// Rendered as "Support: Tutorials, Guides and FAQ | RaiseTalks" (Layout appends the site title)
const PAGE_TITLE = 'Support: Tutorials, Guides and FAQ';
const FULL_TITLE = `${PAGE_TITLE} | RaiseTalks`;
const PAGE_DESCRIPTION =
  'RaiseTalks support: a step-by-step video guide, fundraising how-tos, answers on trials, billing and your data, and direct email help from the team.';
const PAGE_KEYWORDS =
  'RaiseTalks support, RaiseTalks help center, how to use RaiseTalks, RaiseTalks tutorial, data room help, readiness score, investor pipeline, RaiseTalks billing, RaiseTalks FAQ';
const OG_IMAGE = `${SITE_URL}/img/og-raisetalks.jpg`;

const CHANNELS = [
  {
    icon: 'square-play',
    label: 'Video',
    title: 'Watch tutorials',
    desc: 'Product walkthroughs and feature demos on the RaiseTalks YouTube channel.',
    action: 'Open YouTube',
    to: YOUTUBE_URL,
  },
  {
    icon: 'notebook-tabs',
    label: 'Guides',
    title: 'Read the blog',
    desc: 'In-depth guides on data rooms, readiness scores, investor pipelines and diligence.',
    action: 'Browse articles',
    to: '/blog',
  },
  {
    icon: 'headset',
    label: 'Email',
    title: 'Contact support',
    desc: 'Stuck on something in the app? Write to us and a member of the team will reply.',
    action: SUPPORT_EMAIL,
    to: `mailto:${SUPPORT_EMAIL}`,
  },
  {
    icon: 'lightbulb',
    label: 'Ideas',
    title: 'Request a feature',
    desc: 'Tell us what would make your raise or your dealflow easier to run.',
    action: 'Submit a request',
    to: '/feature-request',
  },
];

// Chapters from the video description; `end` is where the next chapter starts (for the Clip schema)
const CHAPTERS = [
  { time: '0:57', start: 57, end: 105, title: 'Set up in 5 minutes with pitch deck auto-fill' },
  { time: '1:45', start: 105, end: 161, title: 'Build an investor-grade data room' },
  { time: '2:41', start: 161, end: 205, title: 'Get your Readiness Score' },
  { time: '4:08', start: 248, end: 286, title: 'Control who sees what with access tiers' },
  { time: '6:01', start: 361, end: 404, title: 'IR Push to matched investors' },
  { time: '6:44', start: 404, end: 443, title: 'Run your round on one pipeline' },
];

// Live posts only: this page is not run through remark-unpublished-links
const GUIDES = [
  {
    label: 'Data Room',
    title: 'The Data Room Checklist for Pre-Seed and Seed Startups',
    to: '/blog/data-room-checklist-pre-seed-seed-startups',
  },
  {
    label: 'Data Room',
    title: 'Data Room Access Tiers: What to Share at First Contact vs Due Diligence',
    to: '/blog/data-room-access-tiers-what-to-share',
  },
  {
    label: 'Readiness Score',
    title: 'The Fundraising Readiness Score: How Investors Rate You Before the First Call',
    to: '/blog/fundraising-readiness-score-guide',
  },
  {
    label: 'IR Pipeline',
    title: 'Run Your Raise as a Pipeline: The 10-Stage Fundraising CRM',
    to: '/blog/run-your-raise-as-a-pipeline-10-stages',
  },
  {
    label: 'Investor Q&A',
    title: 'The Investor Q&A: Answer the Same 40 Questions Once',
    to: '/blog/investor-qa-answer-40-questions-once',
  },
  {
    label: 'For Investors',
    title: 'Pre-Screening at Scale: Scoring Startups Before the First Call',
    to: '/blog/pre-screening-at-scale-scoring-startups',
  },
];

// `text` feeds the FAQPage schema; `answer` is what renders
const FAQS: { question: string; text: string; answer: ReactNode }[] = [
  {
    question: 'How do I contact RaiseTalks support?',
    text: `Email ${SUPPORT_EMAIL} from the address you signed up with and describe what you were trying to do. Screenshots help. For billing questions, write to ${BILLING_EMAIL}.`,
    answer: (
      <p>
        Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> from the address you signed up with and
        describe what you were trying to do. Screenshots help. For billing questions, write to{' '}
        <a href={`mailto:${BILLING_EMAIL}`}>{BILLING_EMAIL}</a>.
      </p>
    ),
  },
  {
    question: 'Where can I learn how to use RaiseTalks?',
    text: 'Start with the complete founders guide video on this page or on the RaiseTalks YouTube channel, then use the blog for in-depth guides on data rooms, readiness scores, investor pipelines and diligence.',
    answer: (
      <p>
        Start with the complete founders guide video on this page or on the{' '}
        <Link to={YOUTUBE_URL}>RaiseTalks YouTube channel</Link>, then use the <Link to="/blog">blog</Link> for
        in-depth guides on data rooms, readiness scores, investor pipelines and diligence.
      </p>
    ),
  },
  {
    question: 'What do I get during the trial?',
    text: 'Every new account starts with a 30-day trial and no payment is taken during it. You can build your data room, get your readiness score and browse the catalogs, with the AI Advisor limited to 3 questions a day. Startup Pro or Investor Pro unlocks the full workspace.',
    answer: (
      <p>
        Every new account starts with a 30-day trial and no payment is taken during it. You can build your data
        room, get your readiness score and browse the catalogs, with the AI Advisor limited to 3 questions a day.
        Startup Pro or Investor Pro unlocks the full workspace - see <Link to="/pricing">pricing</Link>.
      </p>
    ),
  },
  {
    question: 'How do I cancel my subscription?',
    text: `Cancel at any time from your dashboard, or email ${SUPPORT_EMAIL}. Cancellation takes effect at the end of the current billing period.`,
    answer: (
      <p>
        Cancel at any time from your dashboard, or email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        Cancellation takes effect at the end of the current billing period.
      </p>
    ),
  },
  {
    question: 'Can I get a refund?',
    text: `Refund requests must reach ${BILLING_EMAIL} within 7 calendar days of the charge, with your account details and the reason. The Refund Policy lists which cases qualify.`,
    answer: (
      <p>
        Refund requests must reach <a href={`mailto:${BILLING_EMAIL}`}>{BILLING_EMAIL}</a> within 7 calendar days
        of the charge, with your account details and the reason. The <Link to="/refund-policy">Refund Policy</Link>{' '}
        lists which cases qualify.
      </p>
    ),
  },
  {
    question: 'How do I export or delete my data?',
    text: `Go to Profile in the app and choose Download my data for a full export, or Delete Account to erase your account permanently. For any other privacy request, email ${PRIVACY_EMAIL}.`,
    answer: (
      <p>
        Go to Profile in the app and choose Download my data for a full export, or Delete Account to erase your
        account permanently. For any other privacy request, email{' '}
        <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>.
      </p>
    ),
  },
  {
    question: 'How do I report a bug or suggest a feature?',
    text: `Email bugs to ${SUPPORT_EMAIL} with the steps that led to the problem. Ideas for new features go through the feature request form.`,
    answer: (
      <p>
        Email bugs to <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with the steps that led to the
        problem. Ideas for new features go through the <Link to="/feature-request">feature request form</Link>.
      </p>
    ),
  },
];

const FAQ_SCHEMA = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ question, text }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text },
  })),
});

const ORG_ID = `${SITE_URL}/#organization`;

const PAGE_SCHEMA = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: FULL_TITLE,
      description: PAGE_DESCRIPTION,
      inLanguage: 'en',
      isPartOf: { '@type': 'WebSite', name: 'RaiseTalks', url: SITE_URL },
      about: { '@id': ORG_ID },
      breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
      video: { '@id': `${PAGE_URL}#video` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Support', item: PAGE_URL },
      ],
    },
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'RaiseTalks',
      url: SITE_URL,
      logo: `${SITE_URL}/img/logomark.png`,
      sameAs: [
        'https://linkedin.com/company/raisetalks',
        YOUTUBE_URL,
        'https://instagram.com/raisetalks',
        'https://facebook.com/raisetalks',
      ],
      contactPoint: [
        { '@type': 'ContactPoint', contactType: 'customer support', email: SUPPORT_EMAIL, url: PAGE_URL },
        { '@type': 'ContactPoint', contactType: 'billing support', email: BILLING_EMAIL },
      ],
    },
    {
      '@type': 'VideoObject',
      '@id': `${PAGE_URL}#video`,
      name: VIDEO_TITLE,
      description:
        'A step-by-step walkthrough of RaiseTalks for founders: build an investor-grade data room, score your investment readiness, get in front of matched investors and run your whole round from one workspace.',
      thumbnailUrl: [
        `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`,
        `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`,
      ],
      uploadDate: '2026-10-05T14:24:25-07:00',
      duration: 'PT11M26S',
      embedUrl: `https://www.youtube.com/embed/${VIDEO_ID}`,
      url: VIDEO_WATCH_URL,
      publisher: { '@id': ORG_ID },
      hasPart: CHAPTERS.map(({ title, start, end }) => ({
        '@type': 'Clip',
        name: title,
        startOffset: start,
        endOffset: end,
        url: `${VIDEO_WATCH_URL}&t=${start}`,
      })),
    },
  ],
});

// Shared section heading: Poppins first line, serif-italic gradient second line (same as the homepage H2s)
function SectionTitle({ id, lead, accent }: { id: string; lead: string; accent: string }) {
  return (
    <h2 id={id} className={styles.sectionTitle}>
      <span>{lead}</span>
      <span className={styles.titleAccent}>{accent}</span>
    </h2>
  );
}

function VideoGuide() {
  // null until a chapter is picked; then the player reloads at that second and starts playing
  const [start, setStart] = useState<number | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const playFrom = (seconds: number) => {
    setStart(seconds);
    frameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const params = `controls=1&modestbranding=1&rel=0&playsinline=1${start !== null ? `&start=${start}&autoplay=1` : ''}`;

  return (
    <div className={`rt-rail ${styles.sectionInner} ${styles.videoGrid}`}>
      <div className={styles.videoHead}>
        <span className={`rt-eyebrow ${styles.eyebrow}`}>Founders guide</span>
        <SectionTitle id="support-video" lead="How to use RaiseTalks," accent="step by step" />
        <p className={styles.sectionDesc}>
          Follow a sample startup from its first pitch deck upload to a signed term sheet. Pick a step to jump
          straight to it.
        </p>
      </div>

      <div ref={frameRef} className={styles.videoFrame}>
        <iframe
          key={start ?? 'intro'}
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?${params}`}
          title={VIDEO_TITLE}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className={styles.videoChapters}>
        <ol className={styles.chapterList}>
          {CHAPTERS.map(({ time, start: seconds, title }) => (
            <li key={seconds}>
              <button
                type="button"
                className={`${styles.chapter} ${start === seconds ? styles.chapterActive : ''}`}
                onClick={() => playFrom(seconds)}
                aria-label={`Play from ${time}: ${title}`}>
                <span className={styles.chapterTime}>{time}</span>
                <span>{title}</span>
              </button>
            </li>
          ))}
        </ol>
        <Link className={styles.btnSecondary} to={YOUTUBE_URL}>
          More videos on YouTube
        </Link>
      </div>
    </div>
  );
}

export default function Support() {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <Head>
        <meta name="keywords" content={PAGE_KEYWORDS} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content={FULL_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:alt" content="RaiseTalks - AI-powered fundraising workspace" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={FULL_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:image:alt" content="RaiseTalks - AI-powered fundraising workspace" />
        <meta name="twitter:site" content="@raisetalks" />
        <script type="application/ld+json">{PAGE_SCHEMA}</script>
      </Head>

      {/* Hero — same shell as /pricing, /startups and /about-us */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Heading as="h1" className={styles.heroTitle}>
            RaiseTalks Support
            <br />
            <span className={styles.heroAccent}>How can we help?</span>
          </Heading>
          <p className={styles.heroDesc}>
            Video tutorials, step-by-step guides and a real team on the other end of every email.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.btnPrimary} to={`mailto:${SUPPORT_EMAIL}`}>
              Email support
            </Link>
            {/* Plain anchor: an in-page jump, not a route for Docusaurus to check */}
            <a className={styles.btnSecondary} href="#founders-guide">
              Watch the guide
            </a>
          </div>
        </div>
      </section>

      <GridSeam />

      {/* Ways to get help */}
      <section className={styles.section} aria-labelledby="support-channels">
        <div className={`rt-rail ${styles.sectionInner}`}>
          <header className={styles.sectionHeader}>
            <SectionTitle id="support-channels" lead="Get help" accent="your way" />
            <p className={styles.sectionDesc}>
              Pick the route that fits. Most questions are answered fastest by a video or a guide.
            </p>
          </header>
          <div className={styles.channelGrid}>
            {CHANNELS.map(({ icon, label, title, desc, action, to }) => (
              <Link key={label} to={to} className={styles.card}>
                <LucideIcon name={icon} className={styles.channelIcon} />
                <span className={`rt-eyebrow ${styles.eyebrow}`}>{label}</span>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardDesc}>{desc}</p>
                <span className={styles.cardAction}>{action} &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GridSeam />

      {/* Founders guide video */}
      <section
        id="founders-guide"
        className={`${styles.section} ${styles.sectionMuted} ${styles.jumpTarget}`}
        aria-labelledby="support-video">
        <VideoGuide />
      </section>

      <GridSeam />

      {/* Guides from the blog */}
      <section className={styles.section} aria-labelledby="support-guides">
        <div className={`rt-rail ${styles.sectionInner}`}>
          <header className={styles.sectionHeader}>
            <SectionTitle id="support-guides" lead="Popular guides" accent="from the blog" />
            <p className={styles.sectionDesc}>The questions we hear most, written up in full.</p>
          </header>
          <div className={styles.guideGrid}>
            {GUIDES.map(({ label, title, to }) => (
              <Link key={to} to={to} className={styles.card}>
                <span className={`rt-eyebrow ${styles.eyebrow}`}>{label}</span>
                <h3 className={styles.cardTitle}>{title}</h3>
                <span className={styles.cardAction}>Read guide &rarr;</span>
              </Link>
            ))}
          </div>
          <div className={styles.sectionFooter}>
            <Link className={styles.btnSecondary} to="/blog">
              Browse all articles
            </Link>
          </div>
        </div>
      </section>

      <GridSeam />

      {/* FAQ — the website accordion, inside the page rail so the vertical lines stay continuous */}
      <section className={styles.section} aria-labelledby="support-faq">
        <div className={`rt-rail ${styles.sectionInner}`}>
          <header className={styles.sectionHeader}>
            <h2 id="support-faq" className={styles.sectionTitle}>
              Frequently Asked Questions
            </h2>
          </header>
          <div className={styles.faqList}>
            <BlogFAQ schema={FAQ_SCHEMA}>
              {FAQS.map(({ question, answer }) => (
                <BlogFAQItem key={question} question={question}>
                  {answer}
                </BlogFAQItem>
              ))}
            </BlogFAQ>
          </div>
        </div>
      </section>

      {/* Closing CTA — same seams, rail box and rhythm as the homepage CTA */}
      <GridSeam />
      <GridSeam variant="dark" innerClassName={`rt-rail h-full ${styles.ctaSeamRail}`} />
      <section className={styles.ctaSection} aria-labelledby="support-cta">
        <div className={`rt-rail rt-rail-dark ${styles.ctaBorderBox}`}>
          <div className={styles.ctaContent}>
            <h2 id="support-cta" className={styles.ctaTitle}>
              Still need help?
              <br />
              <span className={styles.ctaAccent}>Talk to the team.</span>
            </h2>
            <p className={styles.ctaDesc}>
              Email us with what you were trying to do, or book a call and walk us through it.
            </p>
            <div className={styles.ctaButtons}>
              <Link className={styles.ctaBtnPrimary} to={`mailto:${SUPPORT_EMAIL}`}>
                Email support
              </Link>
              <Link className={styles.ctaBtnSecondary} to={CALENDLY_URL}>
                Book a call
              </Link>
            </div>
          </div>
        </div>
      </section>
      <GridSeam variant="dark" innerClassName={`rt-rail h-full ${styles.ctaSeamRail}`} />
    </Layout>
  );
}
