import React, { useEffect, useState } from 'react';
import styles from './InvestorMcpAccess.module.css';

// ---------------------------------------------------------------------------
// Investor MCP Access — a lead-gated version of the connector handoff.
//
// The startup-facing <McpCommunicator /> shows the connector URL openly. For
// investors we treat the connector as a lead magnet: the URL and connect
// steps stay locked behind a short qualification form. Once an investor
// submits their details we reveal the connector and remember the unlock so
// they never see the gate again on this device.
//
// Lead delivery: submissions POST to LEAD_ENDPOINT when set. Leave it empty to
// unlock client-side only (matches the stubbed NewsletterForm pattern). Wire
// it to HubSpot / Supabase / Formspree when the backend is ready.
// ---------------------------------------------------------------------------

const MCP_URL = 'https://mcp.raisetalks.com/';
const LEAD_ENDPOINT = ''; // e.g. 'https://formspree.io/f/xxxx' or a Supabase function URL
const STORAGE_KEY = 'rt_mcp_investor_unlocked';

const investorBenefits = [
  {
    title: 'Score any deal from a prompt',
    desc: 'Ask Claude for the 22-dimension readiness score on any startup in your pipeline — no dashboard hopping.',
  },
  {
    title: 'Pull IC-ready memos on demand',
    desc: 'Generate a committee-ready summary — snapshot, score breakdown, flagged risks — without leaving the chat.',
  },
  {
    title: 'Compare deals side by side',
    desc: '“Compare these three seed rounds.” Benchmarks, traction and risk signals in a single answer.',
  },
  {
    title: 'Secure by design',
    desc: 'OAuth sign-in with your own investor account. Claude only ever sees the deals you already have access to.',
  },
];

// ── Icons ──────────────────────────────────────────────────────────────────
const LockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 1 1 8 0v4" strokeLinecap="round" />
  </svg>
);
const CheckIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);
const CopyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);
const ExternalIcon = () => (
  <svg className="size-4 shrink-0" aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <path d="M18.25 14V18.65C18.25 19.2101 18.25 19.4901 18.141 19.704C18.0451 19.8922 17.8922 20.0451 17.704 20.141C17.4901 20.25 17.2101 20.25 16.65 20.25H5.35C4.78995 20.25 4.50992 20.25 4.29601 20.141C4.10785 20.0451 3.95487 19.8922 3.85899 19.704C3.75 19.4901 3.75 19.2101 3.75 18.65V7.35C3.75 6.78995 3.75 6.50992 3.85899 6.29601C3.95487 6.10785 4.10785 5.95487 4.29601 5.85899C4.50992 5.75 4.78995 5.75 5.35 5.75H9.25M13.75 3.75H20.25M20.25 3.75V10.25M20.25 3.75L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function InvestorMcpAccess() {
  const [unlocked, setUnlocked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', firm: '' });

  // Remember prior unlocks so investors skip the gate on return visits.
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY) === '1') {
        setUnlocked(true);
      }
    } catch {
      /* localStorage unavailable — gate stays up, no harm */
    }
  }, []);

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      if (LEAD_ENDPOINT) {
        const res = await fetch(LEAD_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...form, source: 'investors-mcp-access' }),
        });
        if (!res.ok) throw new Error('Request failed');
      }
      try {
        window.localStorage.setItem(STORAGE_KEY, '1');
      } catch {
        /* ignore persistence failure */
      }
      setStatus('idle');
      setUnlocked(true);
    } catch {
      setStatus('error');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(MCP_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={styles.sectionInner}>
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-[90px]">
        {/* ── Left: investor value prop ── */}
        <div className="w-full lg:w-[480px] lg:flex-shrink-0">
          <span className="inline-block text-xs font-semibold tracking-wide uppercase text-[#0077FF] mb-4">
            RaiseTalks MCP · Investor Access
          </span>
          <p className="text-[40px] lg:text-[48px] leading-[1.2] font-normal mb-5 text-center lg:text-left">
            Your dealflow,{' '}
            <span className="italic font-serif bg-gradient-to-r from-[#003687] to-[#0077FF] bg-clip-text text-transparent">
              right inside Claude
            </span>
          </p>
          <p className="text-sm text-gray-600 text-center lg:text-left mb-8">
            Connect RaiseTalks to Claude and run diligence from a prompt — score any
            deal, pull an IC-ready memo, and compare rounds without leaving the chat.
          </p>

          <ul className="space-y-5">
            {investorBenefits.map((b) => (
              <li key={b.title} className="flex gap-3">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#0077FF]/10 text-[#0077FF] flex items-center justify-center">
                  <CheckIcon />
                </span>
                <div>
                  <p className="font-semibold text-black text-sm mb-1">{b.title}</p>
                  <p className="text-sm text-gray-600">{b.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Right: the gated connector card ── */}
        <div className="bg-[#0C1B31] p-8 lg:p-10 lg:rounded-[16px] flex-1 flex flex-col">
          {!unlocked ? (
            <>
              <div className="flex items-center gap-2 text-[#ffab0e] mb-6">
                <LockIcon />
                <span className="text-sm font-semibold uppercase tracking-wide">Investor connector — locked</span>
              </div>
              <p className="text-white text-2xl font-bold mb-2">Unlock the RaiseTalks connector</p>
              <p className="text-white/70 text-sm mb-8">
                Tell us who you are and we&apos;ll hand you the connector URL plus a
                60-second setup — the same diligence engine investors use inside Claude.
              </p>

              <form onSubmit={handleUnlock} className="flex flex-col gap-4 mt-auto">
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  aria-label="Full name"
                  value={form.name}
                  onChange={update('name')}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder-white/40 text-sm outline-none focus:border-[#0077FF] transition-colors"
                />
                <input
                  type="email"
                  required
                  placeholder="Work email"
                  aria-label="Work email"
                  value={form.email}
                  onChange={update('email')}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder-white/40 text-sm outline-none focus:border-[#0077FF] transition-colors"
                />
                <input
                  type="text"
                  required
                  placeholder="Fund / firm"
                  aria-label="Fund or firm"
                  value={form.firm}
                  onChange={update('firm')}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder-white/40 text-sm outline-none focus:border-[#0077FF] transition-colors"
                />

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 p-4 rounded-lg bg-gradient-to-r from-[#0174e1] to-[#0166ca] text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {status === 'loading' ? 'Unlocking…' : 'Unlock MCP Access'}
                </button>

                {status === 'error' && (
                  <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
                )}
                <p className="text-white/50 text-xs text-center">
                  No spam. We use your details to grant connector access and share investor updates.
                </p>
              </form>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 text-green-400 mb-6">
                <CheckIcon />
                <span className="text-sm font-semibold uppercase tracking-wide">Access granted</span>
              </div>
              <p className="text-white text-2xl font-bold mb-2">You&apos;re in. Connect in three steps.</p>
              <p className="text-white/70 text-sm mb-8">
                Copy the connector URL below, add it in Claude, and sign in with your
                RaiseTalks investor account.
              </p>

              {/* Step 1 — copy URL */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="rounded-[8px] p-1 text-center bg-[#ffab0e] text-black w-7 text-sm font-bold leading-none flex items-center justify-center h-7">1</span>
                  <p className="text-white font-bold text-sm">Copy the RaiseTalks connector URL</p>
                </div>
                <div
                  className={`rounded-lg transition-all duration-300 ${
                    copied ? 'bg-green-500 p-px' : 'bg-gradient-to-r from-[#0174e1] to-[#0166ca] p-px'
                  }`}
                >
                  <button
                    onClick={handleCopy}
                    title="Click to copy URL to clipboard"
                    className={`w-full flex items-center justify-between gap-4 p-4 rounded-[7px] transition-all duration-300 cursor-pointer ${
                      copied ? 'bg-green-900/20' : 'bg-[#0C1B31]'
                    }`}
                  >
                    <span className={`text-sm font-mono flex-1 truncate text-left ${copied ? 'text-green-400' : 'text-white'}`}>
                      {copied ? 'Copied to clipboard' : MCP_URL}
                    </span>
                    <span className={`flex-shrink-0 ${copied ? 'text-green-400' : 'text-white'}`}>
                      {copied ? <CheckIcon /> : <CopyIcon />}
                    </span>
                  </button>
                </div>
              </div>

              {/* Step 2 — add in Claude */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="rounded-[8px] p-1 text-center bg-[#0077FF] text-white w-7 text-sm font-bold leading-none flex items-center justify-center h-7">2</span>
                  <p className="text-white font-bold text-sm">Add it in Claude</p>
                </div>
                <p className="text-white/70 text-sm mb-3">
                  In Claude desktop or claude.ai, open{' '}
                  <span className="text-white font-semibold">Settings → Connectors</span>, add a
                  custom connector, name it <span className="text-white font-semibold">RaiseTalks</span>, and paste the URL.
                </p>
                <a
                  href="https://claude.ai/new#settings/customize-connectors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-colors"
                >
                  Open Claude Connectors
                  <ExternalIcon />
                </a>
              </div>

              {/* Step 3 — connect & sign */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="rounded-[8px] p-1 text-center bg-green-500 text-white w-7 text-sm font-bold leading-none flex items-center justify-center h-7">3</span>
                  <p className="text-white font-bold text-sm">Connect and sign in</p>
                </div>
                <p className="text-white/70 text-sm">
                  Click <span className="text-white font-semibold">Add → Connect</span> and sign in
                  with your RaiseTalks account. Then ask Claude to score a deal or draft an IC memo.
                </p>
              </div>

              <p className="text-white/50 text-xs mt-8">
                Using Claude Code or another CLI? Connect from{' '}
                <span className="text-[#0077FF]">the command line</span> instead.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
