// Blog page copy. Article text lives in /blog/*.md (one Markdown file per post).

export const blog = {
  path: "/blog",
  title: "Blog",
  metaDescription: "How investors evaluate early-stage startups: data rooms, diligence, benchmarks, and the work that moves a round to a term sheet.",
  eyebrow: "RaiseTalks Blog",
  heading: { lead: "Fundraising,", accent: "decoded" },
  text: "How investors evaluate early-stage startups: data rooms, diligence, benchmarks, and the work that moves a round to a term sheet.",
  topicsLabel: "Browse by topic",
  allLabel: "All articles",
  allTopicsLabel: "All topics",
  /** Entry points into the archive, in the order a founder tends to need them (ids from blog/tags.yml). */
  topics: [
    { id: "data-room", label: "Data Room" },
    { id: "due-diligence", label: "Due Diligence" },
    { id: "fundraising", label: "Fundraising" },
    { id: "benchmarks", label: "Benchmarks" },
    { id: "dealflow", label: "Dealflow" },
    { id: "investor-playbook", label: "Investor Playbook" },
  ],
  topicsPage: {
    title: "Blog topics",
    heading: { lead: "Browse by", accent: "topic" },
    text: "Every subject the RaiseTalks blog covers, from data rooms and diligence to benchmarks and dealflow.",
    count: (n: number) => `${n} ${n === 1 ? "article" : "articles"}`,
  },
  article: {
    readingTime: (min: number) => `${min} min read`,
    onThisPage: "On this page",
    backToBlog: "All articles",
    faqHeading: { lead: "Frequently Asked Questions" },
    readNextHeading: { lead: "Read next" },
  },
};
