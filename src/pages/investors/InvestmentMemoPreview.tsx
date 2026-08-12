import React from 'react';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import styles from './InvestmentMemoPreview.module.css';

// ---------------------------------------------------------------------------
// Sample "generated PDF" content for the Pre-Score Engine preview.
// Mirrors Figma node 1300:1266 (A4-PreScoring full length document).
// ---------------------------------------------------------------------------
const META = [
  { label: 'Date:', value: '24.04.2026' },
  { label: 'Company:', value: 'NUTRITRACK' },
  { label: 'Sector:', value: 'HealthTech / Nutrition' },
  { label: 'Stage:', value: 'Seed' },
  { label: 'Jurisdiction:', value: 'Netherlands' },
];

const TRANSACTION_FACTS = [
  { label: 'Target Raise:', value: ' €1,500,000' },
  { label: 'Offered Stake:', value: ' 15%' },
  { label: 'Instrument:', value: ' Equity' },
  { label: 'Implied Valuation:', value: ' €10,000,000' },
];

const USE_OF_FUNDS = [
  { pct: '40%', label: 'Product & Engineering', color: '#09254D' },
  { pct: '30%', label: 'Go-to-market & sales', color: '#1050B8' },
  { pct: '20%', label: 'Data/ML infrastructure & tooling', color: '#1E74D4' },
  { pct: '10%', label: 'General and administrative', color: '#9ED5EF' },
];

const TEAM = [
  {
    tag: 'FOUNDER',
    highlight: true,
    name: 'Sanne de Vries',
    role: 'CEO & Founder',
    bio: 'Registered dietitian turned product builder with 9 years across clinical nutrition and digital health. Previously led product at a Dutch telehealth scale-up before founding NutriTrack.',
  },
  {
    tag: 'advisor',
    highlight: true,
    name: 'Dr. Pieter Janssen',
    role: 'Medical & Clinical Advisor',
    bio: 'Practicing endocrinologist and former head of a hospital nutrition unit. Advises on clinical validation, reimbursement strategy, and medical-device regulatory pathways across the EU.',
  },
  {
    tag: 'Core team',
    highlight: false,
    name: 'Eva Bakker',
    role: 'Chief Product Officer',
    bio: 'Product leader specializing in patient-facing health apps and behavior-change design. Previously shipped consumer wellness products serving over 1 million monthly active users.',
  },
  {
    tag: 'CORE TEAM',
    highlight: false,
    name: 'Daan Visser',
    role: 'Head of Growth & Partnerships',
    bio: 'Growth lead with a strong network across EU clinics and insurers. Previously managed payer partnerships at a digital-therapeutics company operating in the Benelux region.',
  },
  {
    tag: 'Core team',
    highlight: false,
    name: 'Lukas Smit',
    role: 'Lead Engineer & Infrastructure Architect',
    bio: 'Backend and ML engineer focused on health-data pipelines and integrations. Built GDPR-compliant infrastructure connecting wearables and EHR systems at a prior medtech startup.',
  },
];

const PRODUCT_INFO = [
  { icon: 'badge-dollar-sign', title: 'Revenue Model', desc: 'SaaS Subscription (clinics) + Freemium consumer app' },
  { icon: 'tag', title: 'Pricing', desc: '€29 per clinician seat per month, annual billing' },
  { icon: 'chart-area', title: 'Monetization Stage', desc: 'Revenue generating, early traction' },
];

const PRODUCT_BULLETS = [
  { color: '#0C3272', text: 'AI photo-based food logging that automatically estimates macros and micronutrients to cut patient data-entry burden' },
  { color: '#0C3272', text: 'Clinician dashboard for dietitians to monitor adherence, set goals, and message patients securely in one place' },
  { color: '#0C3272', text: 'Wearable and health-data integrations (Apple Health, Google Fit, glucose monitors) for a unified nutrition record' },
  { color: '#0C3272', text: 'Personalized meal-planning engine with allergy, budget, and cultural dietary preference filters built in' },
];

const TRACTION_BULLETS = [
  { color: '#1E74D4', text: 'Month over month active-user growth averaging 18% over six consecutive months since product launch' },
  { color: '#1E74D4', text: '12 Dutch clinics and two regional health insurers running paid pilots covering roughly 3,000 patients' },
  { color: '#1E74D4', text: 'Selected for the Rockstart Health accelerator cohort with non-dilutive grant support secured' },
];

const ROADMAP_BULLETS = [
  { color: '#9ED5EF', text: '2026 Q3: Launch continuous glucose monitor (CGM) integration for diabetes and pre-diabetes cohorts' },
  { color: '#9ED5EF', text: '2026 Q4: Release multilingual clinician dashboard and expand pilots into Belgium and Germany' },
];

const TSOM = [
  { label: 'TAM', desc: '€18 Bn (global digital nutrition & wellness)' },
  { label: 'SAM', desc: '€3.2 Bn (EU clinical nutrition & chronic-disease management)' },
  { label: 'SOM', desc: '€180 Mn (achievable EU clinic + insurer share within current GTM)' },
];

const MARKET_INFO = [
  { icon: 'target', title: 'Target market', desc: 'Dietitians, hospital nutrition departments, chronic-disease clinics, and health insurers across the EU managing patients with diabetes, obesity, and cardiovascular risk who need measurable, continuous adherence data.' },
  { icon: 'rocket', title: 'Growth Drivers', desc: 'Rising chronic-disease burden and a reimbursement shift toward preventive digital care are pushing payers and clinics to adopt tools that prove patient adherence and outcomes at scale.' },
  { icon: 'box', title: 'Category', desc: 'HealthTech / Digital Nutrition / Clinical Decision Support / Chronic Disease Management' },
];

const COMPETITORS = [
  'MyFitnessPal — strong consumer logging but no clinician dashboard or provider reimbursement pathway',
  'Nutrium — dietitian-focused but limited AI logging and weak wearable and EHR integration',
  'Oviva — closest clinical competitor, but a service-heavy model with higher cost and slower onboarding',
];

const DIFFERENTIATION = [
  'AI photo-based logging reduces patient burden and improves adherence versus manual-entry competitors',
  'Clinician and insurer reporting designed around EU reimbursement and GDPR data handling from day one',
  'Open integration layer unifying wearables, CGMs, and EHRs into a single longitudinal nutrition record',
  'Dual B2B/B2C model lets clinics onboard patients who then continue on a paid consumer tier',
];

const MARKET_RISKS = [
  'Reimbursement timelines vary by country and could slow insurer-led adoption beyond the Netherlands',
  'The crowded consumer nutrition space could raise acquisition cost if B2C is pushed too early',
  'Clinical-grade accuracy claims for AI logging will require ongoing validation and regulatory diligence',
];

const DEAL_STATS = [
  { icon: 'milestone', label: 'Stage', value: 'Seed' },
  { icon: 'earth', label: 'Jurisdiction', value: 'Netherlands' },
  { icon: 'hand-coins', label: 'Amount', value: '€1,500,000' },
  { icon: 'form', label: 'Instrument', value: 'Equity' },
  { icon: 'chart-pie', label: 'Stake', value: '15%' },
  { icon: 'landmark', label: 'Valuation', value: '€10,000,000' },
];

const INVESTMENT_HIGHLIGHTS = [
  'Strong founder-market fit pairing registered-dietitian expertise with proven product and engineering delivery',
  'Genuine paid traction across 12 clinics and two insurers with healthy month-over-month user growth',
  'Defensible integration and reimbursement positioning in a large, structurally growing EU market',
];

const KEY_RISKS = [
  'The €10M valuation looks rich for seed stage relative to current ARR and early pilot revenue',
  'Regulatory and clinical-validation overhead could extend runway needs beyond this round',
  'Revenue is concentrated in early pilots; conversion to long-term paid contracts is still unproven',
];

// ---------------------------------------------------------------------------
// Small presentational helpers
// ---------------------------------------------------------------------------
type IconName =
  | 'check' | 'plus' | 'pie-chart' | 'circle-check-big' | 'circle-alert' | 'badge-dollar-sign' | 'tag'
  | 'chart-area' | 'target' | 'rocket' | 'box' | 'sparkles' | 'triangle-alert' | 'milestone'
  | 'earth' | 'hand-coins' | 'form' | 'chart-pie' | 'landmark' | 'star';

function useIcons() {
  const { withBaseUrl } = useBaseUrlUtils();
  return (name: IconName) => withBaseUrl(`/img/investors/memo-icons/${name}.svg`);
}

const ScorePill = ({ label, tone }: { label: string; tone: 'good' | 'veryGood' }) => (
  <span className={`${styles.pill} ${tone === 'good' ? styles.pillGood : styles.pillVeryGood}`}>{label}</span>
);

const Callout = ({
  tone, icon, iconSrc, title, body,
}: { tone: 'good' | 'bad'; icon: IconName; iconSrc: (n: IconName) => string; title: string; body: string }) => (
  <div className={`${styles.callout} ${tone === 'good' ? styles.calloutGood : styles.calloutBad}`}>
    <div className={styles.calloutHeadRow}>
      <img src={iconSrc(icon)} alt="" className={styles.calloutIcon} />
      <p className={styles.calloutTitle}>{title}</p>
    </div>
    <p className={styles.calloutBody}>{body}</p>
  </div>
);

const BarList = ({ items }: { items: { color: string; text: string }[] }) => (
  <div className={styles.barList}>
    {items.map((it) => (
      <div key={it.text} className={styles.barItem}>
        <span className={styles.bar} style={{ background: it.color }} aria-hidden="true" />
        <span className={styles.barText}>{it.text}</span>
      </div>
    ))}
  </div>
);

const IconList = ({
  icon, iconSrc, items,
}: { icon: IconName; iconSrc: (n: IconName) => string; items: string[] }) => (
  <div className={styles.iconList}>
    {items.map((text) => (
      <div key={text} className={styles.iconListItem}>
        <img src={iconSrc(icon)} alt="" className={styles.iconListIcon} />
        <span className={styles.iconListText}>{text}</span>
      </div>
    ))}
  </div>
);

// ---------------------------------------------------------------------------
export default function InvestmentMemoPreview() {
  const iconSrc = useIcons();

  return (
    <div className={styles.frame}>
      {/* This is the ONLY element that scrolls — see the module CSS for how */}
      <div className={styles.paper}>
        <div className={styles.doc}>
          <div className={styles.header}>
            <h3 className={styles.title}>Investment Memo</h3>
            <div className={styles.metaRow}>
              {META.map((m) => (
                <span key={m.label}>
                  {m.label}
                  <strong>{m.value}</strong>
                </span>
              ))}
            </div>
          </div>

          {/* Company overview */}
          <section className={styles.section}>
            <h4 className={styles.sectionTitle}>Company overview</h4>
            <p className={styles.sectionBody}>
              NutriTrack is a digital nutrition platform combining a consumer app with a clinician dashboard to
              help dietitians, clinics, and insurers manage patient nutrition through AI-assisted food logging
              and connected health data. The company operates in clinical nutrition and chronic-disease
              management, and enables patients with diabetes, obesity, and cardiovascular risk to track intake
              automatically while their care teams monitor adherence in real time.
            </p>
          </section>

          {/* Transaction overview */}
          <section className={styles.section}>
            <h4 className={styles.sectionTitle}>Transaction overview</h4>
            <div className={styles.transactionRow}>
              <div className={styles.factList}>
                {TRANSACTION_FACTS.map((f) => (
                  <p key={f.label} style={{ margin: 0 }}>
                    <strong>{f.label}</strong>
                    {f.value}
                  </p>
                ))}
              </div>
              <div className={styles.fundsBlock}>
                <p className={styles.fundsHeading}>Use of Funds</p>
                <div className={styles.fundsRow}>
                  <img src={iconSrc('pie-chart')} alt="Use of funds breakdown" className={styles.pieChart} />
                  <div className={styles.legend}>
                    {USE_OF_FUNDS.map((u) => (
                      <div key={u.label} className={styles.legendItem}>
                        <span className={styles.legendSwatch} style={{ background: u.color }} aria-hidden="true" />
                        <span className={styles.legendPct}>{u.pct}</span>
                        <span>{u.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Team */}
          <section className={styles.section}>
            <div className={styles.sectionHeadRow}>
              <h4 className={styles.sectionTitle}>Team</h4>
              <ScorePill label="Team Score: 4 / 5" tone="good" />
            </div>
            <div className={`${styles.grid} ${styles.wrap}`}>
              {TEAM.map((m) => (
                <div key={m.name} className={styles.nestedCard}>
                  <div>
                    <p className={`${styles.teamTag} ${m.highlight ? styles.highlight : ''}`}>{m.tag}</p>
                    <p className={styles.teamName}>{m.name}</p>
                    <p className={styles.teamRole}>{m.role}</p>
                  </div>
                  <p className={styles.teamBio}>{m.bio}</p>
                </div>
              ))}
            </div>
            <Callout
              tone="good"
              icon="circle-check-big"
              iconSrc={iconSrc}
              title="Strengths"
              body="The founding team blends clinical nutrition credibility with proven SaaS product and engineering delivery, backed by a respected practicing-clinician advisor who anchors regulatory and reimbursement strategy."
            />
            <Callout
              tone="bad"
              icon="circle-alert"
              iconSrc={iconSrc}
              title="Gaps"
              body="No dedicated commercial or insurer-contracting lead has been hired yet, and clinical-affairs and regulatory capacity currently depend on the part-time advisor rather than a full-time in-house function."
            />
          </section>

          {/* Product */}
          <section className={styles.section}>
            <div className={styles.sectionHeadRow}>
              <h4 className={styles.sectionTitle}>Product</h4>
              <ScorePill label="Product Score: 4 / 5" tone="good" />
            </div>
            <p className={styles.sectionBody}>
              The platform pairs a consumer app with a clinician dashboard. Patients log meals via photo and
              connected devices; AI estimates macros and micronutrients, while care teams set goals, track
              adherence, and message securely. Integrates with wearables and EHRs.
            </p>
            <div className={`${styles.grid} ${styles.wrap}`}>
              {PRODUCT_INFO.map((c) => (
                <div key={c.title} className={styles.nestedCard}>
                  <div className={styles.infoCardHead}>
                    <img src={iconSrc(c.icon as IconName)} alt="" className={styles.infoIcon} />
                    <div>
                      <p className={styles.infoTitle}>{c.title}</p>
                      <p className={styles.infoDesc}>{c.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <p className={styles.subheading}>Product/Service</p>
              <BarList items={PRODUCT_BULLETS} />
            </div>
            <div>
              <p className={styles.subheading}>Traction</p>
              <BarList items={TRACTION_BULLETS} />
            </div>
            <div>
              <p className={styles.subheading}>Roadmap</p>
              <BarList items={ROADMAP_BULLETS} />
            </div>
          </section>

          {/* Market */}
          <section className={styles.section}>
            <div className={styles.sectionHeadRow}>
              <h4 className={styles.sectionTitle}>Market</h4>
              <ScorePill label="Market Score: 5 / 5" tone="veryGood" />
            </div>
            <div className={styles.tsom}>
              {TSOM.map((t) => (
                <div key={t.label} className={styles.tsomItem}>
                  <span className={styles.tsomBar} aria-hidden="true" />
                  <div>
                    <p className={styles.tsomLabel}>{t.label}</p>
                    <p className={styles.tsomDesc}>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={`${styles.grid} ${styles.wrap}`}>
              {MARKET_INFO.map((c) => (
                <div key={c.title} className={styles.nestedCard}>
                  <img src={iconSrc(c.icon as IconName)} alt="" className={styles.infoIcon} />
                  <div>
                    <p className={styles.infoTitle}>{c.title}</p>
                    <p className={styles.infoDesc}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <p className={styles.subheading}>Why now</p>
              <p className={styles.sectionBody}>
                Insurers and regulators increasingly reimburse digital therapeutics, and mainstream wearable and
                CGM adoption now supplies the continuous data needed to make nutrition care measurable and
                clinically credible.
              </p>
            </div>
            <div>
              <p className={styles.subheading}>Competitive Landscape</p>
              <BarList items={COMPETITORS.map((text) => ({ color: '#0077FF', text }))} />
            </div>
            <div className={`${styles.callout} ${styles.calloutGood}`}>
              <p className={styles.calloutTitle}>Differentiation</p>
              <IconList icon="sparkles" iconSrc={iconSrc} items={DIFFERENTIATION} />
            </div>
            <div className={`${styles.callout} ${styles.calloutBad}`}>
              <p className={styles.calloutTitle}>Market Risks</p>
              <IconList icon="triangle-alert" iconSrc={iconSrc} items={MARKET_RISKS} />
            </div>
          </section>

          {/* Deal */}
          <section className={styles.section}>
            <div className={styles.sectionHeadRow}>
              <h4 className={styles.sectionTitle}>Deal</h4>
              <ScorePill label="Deal Score: 4 / 5" tone="good" />
            </div>
            <div className={styles.statRow}>
              {DEAL_STATS.map((s) => (
                <div key={s.label} className={styles.statItem}>
                  <img src={iconSrc(s.icon as IconName)} alt="" className={styles.statIcon} />
                  <p className={styles.statLabel}>{s.label}</p>
                  <p className={styles.statValue}>{s.value}</p>
                </div>
              ))}
            </div>
            <div className={`${styles.callout} ${styles.calloutGood}`}>
              <p className={styles.calloutTitle}>Investment Highlights</p>
              <IconList icon="star" iconSrc={iconSrc} items={INVESTMENT_HIGHLIGHTS} />
            </div>
            <div className={`${styles.callout} ${styles.calloutBad}`}>
              <p className={styles.calloutTitle}>Key Risks</p>
              <IconList icon="triangle-alert" iconSrc={iconSrc} items={KEY_RISKS} />
            </div>
          </section>

          {/* Closing recommendation + disclaimer */}
          <div className={styles.content}>
            <div className={styles.recommendation}>
              <p className={styles.recommendationTitle}>Investment Recommendation</p>
              <p className={styles.recommendationBody}>
                Proceed to full due diligence. NutriTrack shows strong founder-market fit, real paid traction
                across clinics and insurers, and a defensible position in a large EU market. Before committing,
                negotiate the valuation toward a more typical seed range, confirm pilot-to-contract conversion
                rates, and independently validate the accuracy of the AI nutrient-estimation engine.
              </p>
            </div>
            <div className={styles.disclaimer}>
              <div className={styles.disclaimerHead}>
                <img src={iconSrc('triangle-alert')} alt="" className={styles.disclaimerIcon} />
                <p className={styles.disclaimerLabel}>Disclaimer</p>
              </div>
              <p className={styles.disclaimerBody}>
                This is not investment advice. The pre-scoring analysis is generated for informational purposes
                only and should not be relied upon as a basis for making investment decisions. Always conduct
                your own due diligence.
              </p>
            </div>
          </div>

          {/* Only enters view once you've scrolled past every real
              section — that's what makes the frame's blue "reappear"
              exactly when the document ends. See the module CSS. */}
          <div className={styles.endCap} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
