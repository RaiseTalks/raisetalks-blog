import React, { useState } from "react";
import styles from './McpCommunicator.module.css';

// Copy + color scheme per audience. Startups content is from Figma node
// 2715:19419 (yellow/pink accent). Investors content is from Figma node
// 2781:4757 (blue accent) — the first accordion item's body in each case is
// from Figma; the remaining bodies are written to match the same voice.
const VARIANTS = {
  startups: {
    headingLine1: 'Your data room,',
    headingAccent: 'Right inside Claude',
    description:
      "Connect RaiseTalks to Claude and run your raise from a prompt — build and update your data room, see what's still missing, and sharpen your story without leaving the chat.",
    accordion: [
      {
        title: 'Build from a prompt',
        body: 'Create or update any data-room section — profile, vision, traction — just by describing the change.',
      },
      {
        title: 'Know your score',
        body: 'Ask for your AI readiness score and see exactly what investors will judge you on.',
      },
      {
        title: 'Fix the gaps',
        body: "Surface what's still missing before you share your room, then fill it in without leaving the chat.",
      },
      {
        title: "See who's engaged",
        body: 'See which investors opened your room and what they spent their time on.',
      },
    ],
    accentGradient: 'bg-gradient-to-r from-[#FFAB0E] to-[#EA2640]',
    stepBadge: 'bg-[#ffab0e] border-[#e39a05]',
    step2Border: 'border-[#ffab0e]',
    step3Body: 'Click Add → Connect and sign in with your RaiseTalks account. Then just ask Claude to build or update your data room.',
  },
  investors: {
    headingLine1: 'Your deal flow,',
    headingAccent: 'Right inside Claude',
    description:
      'Connect RaiseTalks to Claude and run your screening from a prompt — score a startup, compare your shortlist, and draft an IC memo without leaving the chat.',
    accordion: [
      {
        title: 'Score from a prompt',
        body: 'Score any startup across 22 dimensions — team, market, financials, risk — just by asking.',
      },
      {
        title: 'Compare side by side',
        body: 'Put two or more startups next to each other and see where each one is strongest, or weakest, before you decide.',
      },
      {
        title: 'Get your shortlist',
        body: 'Ask for your top matches by stage, sector, or score, and get a ranked list ready to review.',
      },
      {
        title: 'Draft the IC memo',
        body: 'Turn a scored startup straight into an investment-committee memo, structured and ready to circulate.',
      },
    ],
    accentGradient: 'bg-gradient-to-r from-[#003687] to-[#0077FF]',
    stepBadge: 'bg-[#0077ff] border-[#003687]',
    step2Border: 'border-[#003687]',
    step3Body: 'Click Add → Connect and sign in with your RaiseTalks account. Then just ask Claude to score a startup or prep an IC memo.',
  },
} as const;

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="#1a1a1a" strokeWidth={2} strokeLinecap="round"
      className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export default function McpCommunicator({ variant = 'startups' }: { variant?: keyof typeof VARIANTS }) {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const url = "https://mcp.raisetalks.com/";
  const content = VARIANTS[variant];

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={`rt-rail ${styles.sectionInner}`}>
      {/* Heading + accordion */}
      <div className="flex flex-col lg:flex-row gap-[48px] lg:gap-[64px] items-start">
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <div className="flex flex-col gap-1 leading-[1.25]">
            <p className="text-[40px] md:text-[48px] font-normal text-black m-0">{content.headingLine1}</p>
            <p className={`text-[42px] md:text-[50px] italic font-serif m-0 ${content.accentGradient} bg-clip-text text-transparent`}>
              {content.headingAccent}
            </p>
          </div>
          <p className="text-[#333] text-[14.4px] leading-[1.45] max-w-[513px] m-0">
            {content.description}
          </p>
        </div>

        <div className="flex-1 min-w-0 w-full flex flex-col gap-3">
          {content.accordion.map((item, index) => {
            const open = openIndex === index;
            return (
              <div key={index} className="bg-[#fcfcfc] border border-[#f7f7f7] rounded-[16px] p-4">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  aria-expanded={open}
                  className="w-full flex items-center justify-between gap-4 bg-transparent text-left cursor-pointer p-0"
                >
                  <span className="font-semibold text-[#1a1a1a] text-[14.4px] leading-[1.45]">{item.title}</span>
                  <PlusIcon open={open} />
                </button>
                {open && (
                  <p className="text-[#333] text-[14.4px] leading-[1.45] mt-3 m-0">{item.body}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Connector card */}
      <div className="relative w-full">
        <img
          src="/img/mcp-connect-logos.webp"
          alt="RaiseTalks connected to Claude"
          className="absolute left-6 md:left-9 -top-[40px] md:-top-[56px] w-[180px] md:w-[240px] h-auto pointer-events-none select-none z-[1]"
        />
        <div className="bg-[#f7f7f7] border border-[#dedede] rounded-[24px] px-6 md:px-[48px] pt-[96px] md:pt-[128px] pb-[48px]">
          <div className="flex flex-col lg:flex-row gap-[48px] lg:gap-[64px] items-stretch">
            {/* Step 1 */}
            <div className="flex-1 min-w-0 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-6">
                <span className={`w-9 h-9 rounded-[4px] border-b-[3px] flex items-center justify-center text-white text-[22px] leading-none ${content.stepBadge}`}>1</span>
                <div className="flex flex-col gap-1">
                  <p className="text-[#1a1a1a] text-[22px] leading-[1.35] m-0">Copy the RaiseTalks URL</p>
                  <p className="text-[#333] text-[14.4px] leading-[1.45] m-0">Click to copy the connector URL - you'll paste it into Claude in the next step.</p>
                </div>
              </div>
              {variant === 'investors' ? (
                <a
                  href="mailto:hq@raisetalks.ai?subject=Request%20MCP%20Link"
                  className="w-full flex gap-[10px] items-center justify-center px-4 py-3 rounded-[8px] text-white no-underline hover:no-underline hover:text-white transition-opacity hover:opacity-90 border-b-[3px] border-[#003687] bg-gradient-to-r from-[#003687] to-[#0077FF]"
                >
                  <span className="text-[14.4px] text-center">Request MCP Link</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={handleCopy}
                  title="Click to copy URL to clipboard"
                  className="w-full flex gap-[10px] items-center justify-center px-4 py-3 rounded-[8px] bg-[#f2f2f2] border border-[#ebebeb] cursor-pointer transition-colors hover:bg-[#ececec]"
                >
                  <span className="text-[14.4px] text-black text-center truncate">{copied ? 'Copied to clipboard' : url}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true">
                    {copied ? (
                      <path d="M20 6 9 17l-5-5" />
                    ) : (
                      <><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>
                    )}
                  </svg>
                </button>
              )}
            </div>

            {/* Step 2 */}
            <div className="flex-1 min-w-0 flex flex-col justify-between gap-6 lg:border-l lg:border-[#ebebeb] lg:pl-[48px] border-t border-[#ebebeb] pt-6 lg:border-t-0 lg:pt-0">
              <div className="flex flex-col gap-6">
                <span className={`w-9 h-9 rounded-[4px] border-b-[3px] flex items-center justify-center text-white text-[22px] leading-none ${content.stepBadge}`}>2</span>
                <div className="flex flex-col gap-1">
                  <p className="text-[#1a1a1a] text-[22px] leading-[1.35] m-0">Add it in Claude</p>
                  <p className="text-[#333] text-[14.4px] leading-[1.45] m-0">In Claude desktop or claude.ai, go to Settings → Connectors, add a custom connector, name it RaiseTalks, and paste the URL.</p>
                </div>
              </div>
              <a
                href="https://claude.ai/new#settings/customize-connectors"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex gap-[10px] items-center justify-center px-4 py-3 rounded-[8px] bg-white border border-b-[3px] text-black no-underline hover:no-underline hover:text-black transition-opacity hover:opacity-90 ${content.step2Border}`}
              >
                <span className="text-[14.4px] text-center">Open in Claude</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true">
                  <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                </svg>
              </a>
            </div>

            {/* Step 3 */}
            <div className="flex-1 min-w-0 flex flex-col gap-6 lg:border-l lg:border-[#ebebeb] lg:pl-[48px] border-t border-[#ebebeb] pt-6 lg:border-t-0 lg:pt-0">
              <span className={`w-9 h-9 rounded-[4px] border-b-[3px] flex items-center justify-center text-white text-[22px] leading-none ${content.stepBadge}`}>3</span>
              <div className="flex flex-col gap-1">
                <p className="text-[#1a1a1a] text-[22px] leading-[1.35] m-0">Connect and sign in</p>
                <p className="text-[#333] text-[14.4px] leading-[1.45] m-0">{content.step3Body}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
