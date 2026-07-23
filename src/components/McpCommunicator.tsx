import React, { useState } from "react";
import styles from './McpCommunicator.module.css'

export default function McpCommunicator() {
  const [copied, setCopied] = useState(false);
  const url = "https://mcp.raisetalks.com/";

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
    return(
    <section className={styles.sectionInner}>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[90px]">
        <div className="w-full lg:w-[480px] lg:flex-shrink-0">
        <p className="text-[48px] leading-[1.25] font-normal mb-5 text-center lg:text-left">Your data room, <br /> <span className="italic font-serif bg-gradient-to-r from-[#003687] to-[#0077FF] bg-clip-text text-transparent">right inside Claude</span></p>
        <p className="text-xs text-center lg:text-left mb-10">Connect RaiseTalks to Claude and run your raise from a prompt —
            update any section of your data room, see what's still missing, and
             sharpen your story without leaving the chat.</p>

        </div>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div className="p-6 border-b border-b-[0.5px] border-[#DAE0E7]">
            <p className="font-semibold text-black mb-2">Update from a prompt</p>
            <p className="text-sm text-gray-600">Edit any data-room section - profile, vision, traction - just by describing the change</p>
        </div>
        <div className="p-6 border-b border-b-[0.5px] border-[#DAE0E7] border-l border-l-[0.5px] border-[#DAE0E7]">
            <p className="font-semibold text-black mb-2">Spot what's missing</p>
            <p className="text-sm text-gray-600">Ask what's still incomplete before you share your room with an investor</p>
        </div>
        <div className="p-6">
            <p className="font-semibold text-black mb-2">Sharpen your story</p>
            <p className="text-sm text-gray-600">Draft and refine copy that reads straight from your live RaiseTalks data</p>
        </div>
        <div className="p-6 border-l border-l-[0.5px] border-[#DAE0E7]">
            <p className="font-semibold text-black mb-2">Secure by design</p>
            <p className="text-sm text-gray-600">OAuth sign-in with your own account - Claude only ever sees what you allow.</p>
        </div>
    </div>
    </div>

     <div className="bg-[#0C1B31] p-10 mt-15 lg:rounded-[16px] flex-1">
        <div className="flex justify-between mb-10">
        <p className="text-white/75 text-[14.5px]">Connect in three steps</p>
        <p className="text-white/75 text-[14.5px] text-white">Works with Claude</p>
        </div>
        
        


        <div className="grid lg:grid-cols-3 gap-5 text-white/75">

        <div className="flex flex-col border-b lg:border-b-0 border-r-0 lg:border-r-[0.5px] border-[#DAE0E7] p-5">
            <div className="rounded-[8px] p-1 mb-5 text-center bg-[#ffab0e] text-black w-8">1</div>
            <p className="text-white font-bold mb-3">Copy the RaiseTalks URL</p>
            <p className="text-sm">Click to copy the connector URL - you'll paste it into Claude in the next step</p>
            <div className="mt-auto pt-8">
              <div
                className={`rounded-lg transition-all duration-300 ${
                  copied ? 'bg-green-500 p-px' : 'bg-gradient-to-r from-[#0174e1] to-[#0166ca] p-px'
                }`}
              >
                <button
                  onClick={handleCopy}
                  className={`w-full flex items-center justify-between gap-4 p-4 rounded-[7px] transition-all duration-300 cursor-pointer ${
                    copied ? 'bg-green-900/20' : 'bg-[#0C1B31]'
                  }`}
                  title="Click to copy URL to clipboard"
                >
                  <span className={`text-sm font-mono flex-1 truncate ${copied ? 'text-green-400' : 'text-white'}`}>
                    {copied ? 'Copied to clipboard' : url}
                  </span>
                  <div className={`w-5 h-5 flex-shrink-0 ${copied ? 'text-green-400' : 'text-white'}`}>
                    {copied ? (
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                </button>
              </div>
            </div>
        </div>

        <div className="flex flex-col border-b lg:border-b-0 border-r-0 lg:border-r-[0.5px] border-[#DAE0E7]/75 p-5">
            <div className="rounded-[8px] p-1 mb-5 text-center bg-[#0077FF] text-white w-8">2</div>
            <p className="text-white font-bold mb-3">Add it in Claude</p>
            <p className="text-sm">In Claude desktop or claude.ai, go to <span className="text-white font-bold">Settings → Connectors</span>, add a custom connector, name it <span className="text-white font-bold">RaiseTalks</span>, and paste the URL.</p>
            <div className="mt-auto pt-8">
              <a
                href="https://claude.ai/new#settings/customize-connectors"
                className="w-full flex items-center justify-center gap-2 p-4 rounded-lg bg-gradient-to-r from-[#f5a623] to-[#e5484d] text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Open Claude Customize
                <svg className="size-4 shrink-0" aria-hidden="true" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.25 14V18.65C18.25 19.2101 18.25 19.4901 18.141 19.704C18.0451 19.8922 17.8922 20.0451 17.704 20.141C17.4901 20.25 17.2101 20.25 16.65 20.25H5.35C4.78995 20.25 4.50992 20.25 4.29601 20.141C4.10785 20.0451 3.95487 19.8922 3.85899 19.704C3.75 19.4901 3.75 19.2101 3.75 18.65V7.35C3.75 6.78995 3.75 6.50992 3.85899 6.29601C3.95487 6.10785 4.10785 5.95487 4.29601 5.85899C4.50992 5.75 4.78995 5.75 5.35 5.75H9.25M13.75 3.75H20.25M20.25 3.75V10.25M20.25 3.75L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
        </div>

        <div className="p-5">
            <div className="rounded-[8px] p-1 mb-5 text-center bg-red-500 text-white w-8">3</div>
            <p className="text-white font-bold mb-3">Connect and sign</p>
            <p className="text-sm">Click <span className="text-white font-bold">Add → Connect</span> and sign in with your RaiseTalks account. Then just ask Claude to update your data room.</p>

        </div>
    </div>

    <p className="text-center text-white/75 text-xs mt-5">Using Claude Code or another  CLI? Connect from <span className="text-[#0077FF]">the command line </span> instead.</p>
   </div>


    </section>
    )
}