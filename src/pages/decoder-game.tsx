import React, {useState} from "react";
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import styles from './decoder-game.module.css';
import CheckmarkIcon from '@site/src/components/CheckmarkIcon';
import PhotoCarousel from '@site/src/components/PhotoCarousel';


const CAROUSEL_SLIDES = Array.from({ length: 12 }, (_, i) => ({
    src: `/img/decoder-game/speaker-${i + 1}.webp`,
    alt: 'Speaker at a RaiseTalks event',
}));

const faqs = [
  {
    question: "What is the RaiseTalks Decoder Game?",
    answer: `A 60-minute live format where the audience builds the agenda instead of sitting through one.

Every person in the room walks in with a symbolic $1,000 knowledge budget and one chip. They bet that chip on the single fundraising question they would actually pay to have answered tonight. The four most-backed questions become the program, and the room answers them out loud: founders, investors and operators on the same question, in the same hour.

No pre-baked panel. No moderator's script. The room decides what matters, then decodes it.`,
  },
  {
    question: "How does a night actually run?",
    answer: `Eight questions on the wheel. One chip per person. Sixty minutes.

1. Place your bet. Every participant puts their chip on the one question worth their $1,000.
2. The room sets the agenda. Top 4 questions by bet volume become the program of the night. Live, visible, unarguable.
3. Three voices per question. Founder, investor, operator each answer the same question from their own chip role. Same question, three vantage points, zero hedging.
4. The room closes it. Open floor, live scoring, and the answers that changed people's minds get captured.

Every answer unlocks insight that normally sits behind a closed-door coffee. Every game produces a dataset of real pains.`,
  },
  {
    question: "Is the $1,000 real money? Does anyone pay to attend?",
    answer: `No. The $1,000 is a knowledge budget, not a ticket.

It exists to force a real choice. Ask people "any questions?" and you get politeness. Give them one chip and a budget and you get truth: the thing they are actually stuck on. That constraint is the whole engine of the format, and it is why the questions that surface are the ones people never raise on a panel.`,
  },
  {
    question: "Do we need to pay anything to co-host?",
    answer: `No. There is no fee to co-host a RaiseTalks Decoder Game.

We are not selling a sponsorship. We are trading assets. What we ask from a co-host:

- A venue or community space for 30 to 80 guests
- An audience of founders, investors or operators
- Local promotion and community reach — your channels, your list, your city
- Co-branding on the night — your name on the room, next to ours

That is the whole ask. If external sponsorship comes in on top, it is possible and we profit-share it with you.`,
  },
  {
    question: "What does RaiseTalks bring?",
    answer: `The entire game, run and moderated end to end. You open the room, we run the night.

- The Decoder Game format and IP, fully facilitated
- Dr. Dariia Vasylieva hosting on stage
- Chip kits, question bank and live scoring
- Promotion to the RaiseTalks founder and investor network
- A post-event insights report: the ranked dataset of real pains from your room

You are not producing an event. You are hosting one that is already built.`,
  },
  {
    question: "What does a founder get out of playing?",
    answer: `Two things that almost never happen in the same hour: being heard by investors, and being seen by peers.

You get heard. When you bet your chip, you put your actual blocker in front of real investors and get their answer to it live. Not a generic "traction matters" from a stage. Their read on your question, in the room, with follow-ups. Most founders pay for that access in months of cold outreach.

You get seen. When you answer, you show your own judgment on venture capital out loud. Your read on dilution, on terms, on what a data room really needs, on what killed your last round. That is the moment other founders remember you, and the moment an investor in the room decides you are worth a coffee. You do not pitch your way into credibility here. You reason your way into it.

And it runs both ways. You hear how an investor answers the exact question you were about to answer, and how a founder two years ahead of you answers it. The gap between those three answers is the education. Nobody leaves with only their own perspective intact.`,
  },
  {
    question: "What do investors get?",
    answer: `Unfiltered signal on what founders are actually stuck on, before it reaches a pitch deck.

The betting round is a live, ranked map of founder pain in your market. You see which questions the room paid for, then you watch how founders reason in real time under real questions. That tells you more about judgment than 30 pitches will. It is also the least awkward way to be visible to a curated room of founders: you are useful for an hour instead of being sold to for an hour.`,
  },
  {
    question: "Why not just run a panel or a pitch night?",
    answer: `Because panels answer the questions the organizer guessed, and pitch nights reward performance over thinking.

The Decoder Game inverts both. The agenda is voted with chips, so the content is provably what the room wanted. Founders and investors answer the same question side by side, so you get contrast instead of consensus theatre. And the format is visually distinct on camera: chips, a wheel, live scoring, real reactions. It photographs and films like a game, not like a row of chairs.`,
  },
  {
    question: "What does a co-host walk away with?",
    answer: `Four assets, all of them reusable after the night ends.

- A curated room. Direct visibility with founders, investors and operators who showed up to trade real questions for real answers.
- A proprietary dataset. Every night's votes become a ranked map of your market's live pains. Yours to use for content, positioning and programming.
- Ready-made content. Photo, video and quote assets from a high-energy, visually distinct format, built for social.
- A proven format. Already run in Dubai with strong reviews from the founders and investors in the room.`,
  },
  {
    question: "Where is it running, and how do we bring it to our city?",
    answer: `Run in Dubai. Next: Cyprus, UK, San Francisco during STEP Conference, and Dubai again.

If your city is not on that list, that is the point of this page. Pick your city, open your room, and let your audience build the agenda. We handle the game. You host the night that gets talked about after.`,
  },
];


export default function decoderGame () {
    const [openIndex, setOpenIndex] = useState(null)
    return (
        <>
        <Layout
         title="RaiseTalks Decoder Game | Fundraising Answered Live"
         description="A 60-minute live format where founders, investors and operators answer the fundraising questions the room actually paid to ask. Join the next game or co-host it in your city."
      >
         <Head>
           <meta name="description" content="A 60-minute live format where founders, investors and operators answer the fundraising questions the room actually paid to ask. Join the next game or co-host it in your city." />
           <meta name="robots" content="index, follow" />
           <link rel="canonical" href="https://raisetalks.com/decoder-game" />
           <meta property="og:title" content="RaiseTalks Decoder Game | Fundraising Answered Live" />
           <meta property="og:description" content="A 60-minute live format where founders, investors and operators answer the fundraising questions the room actually paid to ask." />
           <meta property="og:url" content="https://raisetalks.com/decoder-game" />
           <meta property="og:type" content="website" />
           <meta property="og:image" content="https://raisetalks.com/img/og-raisetalks.jpg" />
           <meta name="twitter:card" content="summary_large_image" />
           <meta name="twitter:title" content="RaiseTalks Decoder Game | Fundraising Answered Live" />
           <meta name="twitter:description" content="A 60-minute live format where founders, investors and operators answer the fundraising questions the room actually paid to ask." />
           <meta name="twitter:image" content="https://raisetalks.com/img/og-raisetalks.jpg" />
           <meta name="twitter:site" content="@raisetalks" />
           <script type="application/ld+json">{JSON.stringify({
             "@context": "https://schema.org",
             "@type": "WebPage",
             "name": "RaiseTalks Decoder Game",
             "url": "https://raisetalks.com/decoder-game",
             "description": "A 60-minute live format where founders, investors and operators answer the fundraising questions the room actually paid to ask.",
             "publisher": { "@type": "Organization", "name": "RaiseTalks", "url": "https://raisetalks.com" }
           })}</script>
         </Head>

        <div className={styles.heroRails}>
        <div className={styles.railDivider} />
        <div className="flex flex-col gap-[36px] text-center max-w-4xl mx-auto px-6 pt-[96px] md:pt-[128px] pb-[80px]">
        <div className="rt-hero tracking-[0.5px]">If you'd pay for one piece <br /> of knowledge tonight, <br /> <span className="font-[Georgia] italic text-brand-gradient">what would you pay for?</span></div>
        <div className="rt-body text-[#4B4B4B] mx-auto">One chip. One question you'd actually pay to have answered. <br />
        The room picks the night's agenda and answers it live. <br />
        Join the next game, or bring it to your city.
        </div>

        <div className="flex flex-wrap gap-[24px] justify-center">

        <a
          href="https://luma.com/z0q3ykpd"
          target="_blank"
          rel="noopener noreferrer"
          className="rt-body inline-block py-[12px] px-[16px] border-b-[3px] border-[#003687] rounded-[8px] text-[#FFFFFF] hover:text-[#FFFFFF] no-underline hover:no-underline"
          style={{ background: 'linear-gradient(75.88deg, #003687 -3.42%, #0077FF 99.98%)' }}>
            Join The Game
        </a>
        <a
          href="mailto:hq@raisetalks.ai?subject=Co-Host%20RaiseTalks%20Decoder%20Game"
          className="rt-body inline-block py-[12px] px-[16px] rounded-[8px] text-black hover:text-black no-underline hover:no-underline"
          style={{
            border: '1px solid transparent',
            borderBottomWidth: '3px',
            background:
              'linear-gradient(#fff,#fff) padding-box, linear-gradient(75.88deg, #003687 -3.42%, #0077FF 99.98%) border-box',
          }}>
            Join as Co-Host
        </a>

        </div>


        </div>
        <div className={styles.railDivider} />

        </div>

        {/* Continuous page rails down the rest of the page (matches the hero rails) */}
        <div className={styles.pageRails}>

        {/* 64px transition strip between hero and One Chip (Figma spacer 2601:7819) */}
        <div className="h-[32px] sm:h-[48px] lg:h-[64px]" />
        <div className={styles.railDivider} />

        <div className={`${styles.railContainer} flex flex-col gap-[64px] md:gap-[128px] px-6 md:px-[64px] py-[64px] justify-center`}>
            <div className="flex flex-col md:flex-row gap-[64px]">
                <div className="flex-1 min-w-0 gap-[24px]">
                    <div className="rt-h2">One Chip - <span className="italic font-[Georgia] text-brand-gradient">One Bet</span></div>
                    <div className="rt-body text-[#333333]">
                    <div className="flex items-center gap-[6px] py-[4px]">
                        <CheckmarkIcon />
                        <p>Every participant bets on one question.</p>
                    </div>
                    <div className="flex items-center gap-[6px] py-[4px]">
                        <CheckmarkIcon />
                        <p>Top 4 questions = the program of the night.</p>
                    </div>
                    <div className="flex items-center gap-[6px] py-[4px]">
                        <CheckmarkIcon />
                        <p>Every answer unlocks priceless insights.</p>
                    </div>
                    <div className="flex items-center gap-[6px] py-[4px]">
                        <CheckmarkIcon />
                        <p>Every game is a dataset of real pains.</p>
                    </div>
                    </div>
                </div>
                <div className="flex-1 min-w-0 grid grid-cols-2 md:grid-cols-[minmax(min-content,1fr)_minmax(min-content,1fr)] gap-[32px]">
                    <div className="flex flex-col gap-[24px] min-w-0 min-h-[146px] bg-[#F7F7F7] p-[36px] rounded-[16px] border border-[#DEDEDE]">
                        <p className="rt-h4">Timeline</p>
                        <p className="rt-h4-alt text-brand-gradient">60 Minutes</p>
                    </div>
                    <div className="flex flex-col gap-[24px] min-h-[146px] bg-[#F7F7F7] p-[36px] rounded-[16px] border border-[#DEDEDE]">
                        <p className="rt-h4 md:whitespace-nowrap">Knowledge Budget</p>
                        <p className="rt-h4-alt text-brand-gradient">$1,000</p>
                    </div>
                    <div className="flex flex-col gap-[24px] col-span-2 w-full min-h-[146px] bg-[#F7F7F7] p-[36px] rounded-[16px] border border-[#DEDEDE]">
                        <p className="rt-h4">Voices Chip Roles:</p>
                        <div className="flex items-center gap-[12px] rt-body">
                            <span>Founder</span>
                            <span className="w-[8px] h-[8px] rounded-full bg-[#0077FF]" />
                            <span>Investor</span>
                            <span className="w-[8px] h-[8px] rounded-full bg-[#0077FF]" />
                            <span>Operator</span>
                        </div>
                    </div>
                </div>


            </div>

            {/* Decoder Game wheel — full wheel on md+, mobile-cropped variant below md */}
            <img
              src="/img/decoder-game/wheel.svg"
              alt="RaiseTalks Decoder Game wheel with eight fundraising questions"
              className="hidden md:block w-full max-w-[1100px] mx-auto"
            />
            <img
              src="/img/decoder-game/wheel-mobile.svg"
              alt="RaiseTalks Decoder Game wheel with eight fundraising questions"
              className="block md:hidden w-full mx-auto"
            />

        </div>

        {/* section divider */}
        <div className={styles.railDivider} />
        <div className="h-[32px] sm:h-[48px] lg:h-[64px]" />
        <div className={styles.railDivider} />

        {/* Speaker photo carousel — auto-scroll marquee, single row of portrait cards */}
        <PhotoCarousel rows={[CAROUSEL_SLIDES]} variant="portrait" />

        {/* Blue testimonials block — inset 12px each side from the screen edges
            per Figma (frame at x=12, width 1896 within the 1920 artboard). */}
        <div className="px-3">

        {/* Blue divider bar below the carousel (Figma 2601:7853) — #0077ff, 64px,
            48px rounded top corners, 1px #258bff top/bottom border, and an inner
            1480px column with 1px #258bff side lines. Sits above the page rails. */}
        <div
          className="relative z-[3] flex h-[32px] sm:h-[48px] lg:h-[64px] w-full items-center justify-center overflow-hidden"
          style={{
            background: '#0077ff',
            borderTop: '0.5px solid #258bff',
            borderBottom: '0.5px solid #258bff',
            borderTopLeftRadius: '48px',
            borderTopRightRadius: '48px',
          }}
        >
          {/* Inner column matches the page rail ladder so the side lines align
              with the vertical rails above and below. */}
          <div
            className={`${styles.railContainer} h-full`}
            style={{ borderLeft: '0.5px solid #258bff', borderRight: '0.5px solid #258bff' }}
          />
        </div>

        <div
            className={`${styles.pageRailsDark} flex flex-col items-center text-white min-h-[599px] py-[64px] gap-[64px] w-full`}
            style={{
                backgroundImage: 'url(/img/backgrounds/blue-section-desktop.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="rt-h2 text-center">What People are Saying </div>

            <div className={`${styles.railContainer} flex flex-col md:flex-row gap-[32px] px-6 md:px-[64px]`}>

            <div className="flex flex-col text-white justify-between min-h-[347px] flex-1 min-w-0 p-[36px] rounded-[16px]"
                  style={{
  borderBottom: '4px solid transparent',
  borderRadius: '16px',
  background:
    'linear-gradient(270deg, #0072F5 -0.15%, #005AC2 103.5%) padding-box, ' +
    'linear-gradient(75.88deg, #003687 -3.42%, #0077FF 99.98%) border-box',
}}
>
                <div className="rt-h4-alt">“It was a great event and the best part was getting to know Dariia Vasylieva. Excellent topic and amazing workshop."</div>

                <div>
                    <p>Reza Ghiasi, </p>
                    <p className="rt-body text-[#E5E5E5]">Co-Founder @ YEX</p>
                </div>

            </div>

               <div className="flex flex-col text-white justify-between min-h-[347px] flex-1 min-w-0 p-[36px] rounded-[16px]"
                  style={{
  borderBottom: '4px solid transparent',
  borderRadius: '16px',
  background:
    'linear-gradient(270deg, #0072F5 -0.15%, #005AC2 103.5%) padding-box, ' +
    'linear-gradient(75.88deg, #003687 -3.42%, #0077FF 99.98%) border-box',
}}
>
                <div className="rt-h4-alt">
                    “Events like this remind you how important strong communities and meaningful conversations are in building the next generation of companies.”
                </div>

                <div>
                    <p>Ikram Boumedience, </p>
                    <p className="rt-body text-[#E5E5E5]">Founder & CEO @ ScoutLabs.io</p>
                </div>

            </div>

               <div className="flex flex-col text-white min-h-[347px] flex-1 min-w-0 justify-between p-[36px] rounded-[16px]"
                  style={{
  borderBottom: '4px solid transparent',
  borderRadius: '16px',
  background:
    'linear-gradient(270deg, #0072F5 -0.15%, #005AC2 103.5%) padding-box, ' +
    'linear-gradient(75.88deg, #003687 -3.42%, #0077FF 99.98%) border-box',
}}
>
                <div className="rt-h4-alt">
                    “It was a pleasure connecting with so many talented professionals, innovators, and thought leaders.”
                    </div>

                <div>
                    <p>Hanan Al-Shayeb, </p>
                    <p className="rt-body text-[#E5E5E5]">CEO @ Altery</p>
                </div>

            </div>
            </div>

        </div>

        {/* Blue divider bar closing the testimonials section — mirrors the top bar
            (Figma 2601:7853) but with 48px rounded BOTTOM corners. */}
        <div
          className="relative z-[3] flex h-[32px] sm:h-[48px] lg:h-[64px] w-full items-center justify-center overflow-hidden"
          style={{
            background: '#0077ff',
            borderTop: '0.5px solid #258bff',
            borderBottom: '0.5px solid #258bff',
            borderBottomLeftRadius: '48px',
            borderBottomRightRadius: '48px',
          }}
        >
          {/* Inner column matches the page rail ladder so the side lines align
              with the vertical rails above and below. */}
          <div
            className={`${styles.railContainer} h-full`}
            style={{ borderLeft: '0.5px solid #258bff', borderRight: '0.5px solid #258bff' }}
          />
        </div>

        </div>
        {/* /Blue testimonials block */}

        {/* Horizontal grid divider above "Join us as Co-Host" (Figma 2601:8098) —
            #f7f7f7 band, 64px, 1px #d7dde5 top/bottom border + inner column side
            lines aligned to the page rails. */}
        <div
          className="relative z-[3] flex h-[32px] sm:h-[48px] lg:h-[64px] w-full items-center justify-center overflow-hidden"
          style={{
            background: '#f7f7f7',
            borderTop: '0.5px solid #d7dde5',
            borderBottom: '0.5px solid #d7dde5',
          }}
        >
          <div
            className={`${styles.railContainer} h-full`}
            style={{ borderLeft: '0.5px solid #d7dde5', borderRight: '0.5px solid #d7dde5' }}
          />
        </div>

        {/* Join us as Co-Host — full-width #F7F7F7 so the area outside the
            centered grid is grey too, not white. */}
        <div className="w-full bg-[#F7F7F7]">
        <div className={`${styles.railContainer} flex flex-col md:flex-row px-6 md:px-[64px] py-[64px] gap-[64px]`}>
            <div className="flex flex-col items-start py-[64px] gap-[36px] font-normal">
                <p className="rt-h2">Join us as <br /> <span className="rt-h2-alt text-brand-gradient">Co-Host</span></p>
                <a 
                href="mailto:hq@raisetalks.ai?subject=Co-Host%20RaiseTalks%20Decoder%20Game"
                className="rt-body py-[12px] px-[16px] border-b-[3px] border-[#003687] rounded-[8px] text-[#FFFFFF]"
                style={{ background: 'linear-gradient(75.88deg, #003687 -3.42%, #0077FF 99.98%)' }}>
                    Co-Host RaiseTalks Decoder Game
                </a>

            </div>
            <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2">
                <div className="p-[48px] min-h-[193px] min-w-0 flex items-start gap-[24px] border-b border-r border-b-[#E0E5EB] border-r-[#E0E5EB] border-solid bg-[#F7F7F7]">
                    <img src="/img/decoder-game/icons/lightbulb.svg" alt="" width={48} height={48} className="shrink-0" />
                    <div className="flex flex-col gap-[4px] font-[Poppins]">
                        <p className="rt-h4">A curated Room</p>
                        <p className="rt-body text-[#333333]">Direct visibility with founders, investors, and operators who showed up to trade real questions for real answers.</p>
                    </div>
                </div>
                <div className="p-[48px] min-h-[193px] min-w-0 flex items-start gap-[24px] border-b border-b-[#E0E5EB] border-solid bg-[#F7F7F7]">
                    <img src="/img/decoder-game/icons/star-check.svg" alt="" width={48} height={48} className="shrink-0" />
                    <div className="flex flex-col gap-[4px] font-[Poppins]">
                        <p className="rt-h4">A proprietary dataset</p>
                        <p className="rt-body text-[#333333]">Every night's votes become a ranked map of the market's live pains - yours to use for content and positioning.</p>
                    </div>
                </div>
                <div className="p-[48px] min-h-[193px] min-w-0 flex items-start gap-[24px] border-r border-r-[#E0E5EB] border-solid">
                    <img src="/img/decoder-game/icons/camera.svg" alt="" width={48} height={48} className="shrink-0" />
                    <div className="flex flex-col gap-[4px] font-[Poppins]">
                        <p className="rt-h4">Ready-made content</p>
                        <p className="rt-body text-[#333333]">Photo, video and quote assets from a high-energy, visually distinct format  - built for social.</p>
                    </div>
                </div>
                <div className="p-[48px] min-h-[193px] min-w-0 flex items-start gap-[24px] bg-[#F7F7F7]">
                    <img src="/img/decoder-game/icons/file-check.svg" alt="" width={48} height={48} className="shrink-0" />
                    <div className="flex flex-col gap-[4px] font-[Poppins]">
                        <p className="rt-h4">A proven format</p>
                        <p className="rt-body text-[#333333]">Already run in Dubai, with strong reviews from founders and investors in the room.</p>
                    </div>
                </div>

            </div>

        </div>
        </div>

        </div>

        {/* FAQ block — its own narrower rails, like the hero */}
        <div className={styles.faqRails}>

        {/* Horizontal grid divider below "Join us as Co-Host" (mirrors the one
            above) — #f7f7f7 band, 64px, 1px #d7dde5 top/bottom + inner column lines. */}
        <div
          className="relative z-[3] flex h-[32px] sm:h-[48px] lg:h-[64px] w-full items-center justify-center overflow-hidden"
          style={{
            background: '#f7f7f7',
            borderTop: '0.5px solid #d7dde5',
            borderBottom: '0.5px solid #d7dde5',
          }}
        >
          <div
            className={`${styles.railContainer} h-full`}
            style={{ borderLeft: '0.5px solid #d7dde5', borderRight: '0.5px solid #d7dde5' }}          />
        </div>

        {/* FAQ */}
        <div className="flex flex-col mx-auto px-6 md:px-[64px] pt-[64px] pb-[120px] md:pb-[202px] w-full max-w-[1024px] gap-[32px]">

            <div className="rt-h2 text-center">Frequently Asked Questions</div>
        <div className="flex flex-col">
        {faqs.map((item, index) => (
            <div key={index} className="border-b border-[#f6f7f9] py-[24px]">
                <button className="w-full flex items-center gap-[16px] text-left bg-transparent"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0077FF" strokeWidth="2" strokeLinecap="round" className="shrink-0">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    {openIndex !== index && <line x1="12" y1="5" x2="12" y2="19" />}
                </svg>

                <span className="rt-h4-bold">{item.question}</span>

            </button>
            {openIndex === index && <p className="bg-[#F7F7F7] border border-[#d7dde5] rounded-[16px] p-[24px] rt-body text-[#333] ml-[48px] mt-[16px] whitespace-pre-line">{item.answer}</p>}

            </div>
        ))

        

        

            
}
</div>
</div>

        </div>

        {/* CTA block — back to the wider page rails */}
        <div className={styles.pageRails}>

        {/* QR code (Figma 2601:8685) straddling the FAQ / CTA boundary — centered
            horizontally, half above (FAQ) and half below (the section beneath). */}
        <div className="relative z-[4]">
          <img
            src="/img/decoder-game/qr-code.svg"
            alt="Scan to join the RaiseTalks Decoder Game"
            width={290.64}
            height={285}
            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[290px] max-w-[80vw] h-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
          />
        </div>

        {/* Navy grid divider above the CTA — #0C1B31 band, 0.5px #16315A lines. */}
        <div
          className="relative z-[3] flex h-[32px] sm:h-[48px] lg:h-[64px] w-full items-center justify-center overflow-hidden"
          style={{
            background: '#0C1B31',
            borderTop: '0.5px solid #16315A',
            borderBottom: '0.5px solid #16315A',
          }}
        >
          <div
            className={`${styles.railContainer} h-full`}
            style={{ borderLeft: '0.5px solid #16315A', borderRight: '0.5px solid #16315A' }}
          />
        </div>

{/* CTA — full-width navy gutters; bg image + 0.5px #16315A vertical grid lines
    confined to the centered rail column. */}
<div className="w-full flex justify-center" style={{ backgroundColor: '#0C1B31' }}>
    <div
        className={`${styles.railContainer} ${styles.ctaBg} flex flex-col items-center justify-center min-h-[445px] px-6 md:px-[64px] pt-[96px] md:pt-[128px] pb-[64px] text-white`}
        style={{
            borderLeft: '0.5px solid #16315A',
            borderRight: '0.5px solid #16315A',
        }}
    >
    <div className="flex flex-col items-center gap-[48px]">
        <div className="flex flex-col items-center gap-[12px]">
            <div className="flex flex-col items-center gap-[4px] text-center text-white">
                <p className="rt-h2">Pick your city, open your room</p>
                <p className="rt-h2-alt">Let your audience build the agenda</p>
            </div>
            <p className="rt-body text-[#d7d7d7] text-center max-w-[540px]">We handle the game — you host the night that gets talked about after.</p>
        </div>
        <a
            href="https://calendly.com/iamdariiava/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="rt-body inline-block py-[12px] px-[16px] border-b-[3px] border-[#003687] rounded-[8px] text-[#FFFFFF] hover:text-[#FFFFFF] no-underline hover:no-underline"
            style={{ background: 'linear-gradient(75.88deg, #003687 -3.42%, #0077FF 99.98%)' }}
        >
            Book a Call
        </a>
    </div>
    </div>
</div>

        {/* Navy grid divider below the CTA — mirrors the one above. */}
        <div
          className="relative z-[3] flex h-[32px] sm:h-[48px] lg:h-[64px] w-full items-center justify-center overflow-hidden"
          style={{
            background: '#0C1B31',
            borderTop: '0.5px solid #16315A',
            borderBottom: '0.5px solid #16315A',
          }}
        >
          <div
            className={`${styles.railContainer} h-full`}
            style={{ borderLeft: '0.5px solid #16315A', borderRight: '0.5px solid #16315A' }}
          />
        </div>

        </div>

        </Layout>
        </>
)
}