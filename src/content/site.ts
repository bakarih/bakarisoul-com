// All user-facing copy and outbound URLs for bakarisoul.com live here.
// Components read from this module — no user-facing string should be
// hard-coded in a component.

export type BioSegment = { text: string; href?: string; italic?: boolean };
export type BioParagraph = BioSegment[];

export type PillarKey = "eng" | "ai" | "path";

const bio: BioParagraph[] = [
  [
    {
      text: "I'm an engineering manager and staff-level frontend engineer with 9+ years shipping React/TypeScript at consumer scale — 23andMe, CompetesTV, CodePath. Before that, twelve years as an educator — K–12 physics and engineering (National Master Teacher Award).",
    },
  ],
  [
    {
      text: "Making hard things make sense is what a rubric does. A good standup does it. A good bass line does it. Whether I'm writing about engineering leadership, building ",
    },
    { text: "interviewrubric.com", href: "https://interviewrubric.com" },
    {
      text: ", arranging music for a 75-voice choir, or singing a solo — same job, different medium.",
    },
  ],
  [
    {
      text: "Right now: shipping interviewrubric.com, writing on Substack, and singing with commUNITY ATL — 40 of us return to ",
    },
    { text: "America's Got Talent", italic: true },
    { text: " in August." },
  ],
];

export const site = {
  name: "Bakari Holmes",
  handle: "bakarisoul",
  logoMark: "Bakari",
  logoSuffix: "soul",
  tagline: "I make hard things make sense.",
  location: "Atlanta, GA",

  nav: [
    { key: "eng" as PillarKey, label: "Eng. Leadership", href: "#c-eng" },
    { key: "ai" as PillarKey, label: "Building w/ AI", href: "#c-ai" },
    { key: "path" as PillarKey, label: "Non-Linear Path", href: "#c-path" },
  ],

  identityStrip: [
    { glyph: "piano", label: "musician", pillar: "path" as PillarKey },
    { glyph: "singing", label: "vocalist", pillar: "path" as PillarKey },
    { glyph: "teaching", label: "teacher", pillar: "eng" as PillarKey },
    { glyph: "coding", label: "engineer", pillar: "ai" as PillarKey },
    { glyph: "speaking", label: "founder", pillar: "eng" as PillarKey },
    { glyph: "hugging", label: "human", pillar: "path" as PillarKey },
  ],

  hero: {
    portraitAlt: "Bakari Holmes, in a pink suit, mid-laugh",
    titlePrefix: "Six versions of the same job: ",
    titleEmphasis: "making hard things make sense",
    titleSuffix: ".",
    subtitle:
      "Bakari Holmes · engineering manager, staff frontend engineer, educator and interview coach, bass/baritone with commUNITY ATL. Based in Atlanta.",
  },

  bio,

  pillars: {
    eng: {
      number: "01",
      title: ["Engineering", "Leadership"],
      tagline: "Rubrics, standups, and everything I stopped debating.",
    },
    ai: {
      number: "02",
      title: ["Building", "with AI"],
      tagline: "Team-grade standards, as a team of one.",
    },
    path: {
      number: "03",
      title: ["The Non-", "Linear Path"],
      tagline:
        "Teacher → engineer → musician. The résumé is a line. The life is a chord.",
    },
  },

  substack: {
    name: "Making Hard Things Make Sense",
    kicker: "Newsletter · Substack",
    description: "Free weekly. Occasional paid deep-dives.",
    url: "https://bakarisoul.substack.com",
    embedUrl: "https://bakarisoul.substack.com/embed",
    subscribeApiUrl: "https://bakarisoul.substack.com/api/v1/free",
    emailPlaceholder: "you@example.com",
    submitLabel: "Subscribe",
    successMessage: "You're in — check your inbox to confirm.",
    errorMessage: "Something went wrong. Try the Substack page directly.",
  },

  interviewrubric: {
    kicker: "Product · Live",
    name: "interviewrubric",
    nameSuffix: ".com",
    description:
      "Open-source hiring-alignment toolkit. Turn a JD into a weighted rubric. Generate polished JDs from plain English. Prep candidates for a specific interview loop. Free for job seekers — team pricing coming after open beta.",
    url: "https://interviewrubric.com",
    ctaLabel: "Try it →",
    peerpushUrl: "https://peerpush.com/p/interview-rubric",
    peerpushCtaLabel: "Review on PeerPush →",
    peerpushNote: "Also on PeerPush: help me get more indie devs seeing it.",
  },

  music: {
    kicker: "Music · commUNITY ATL",
    featuredTitlePrefix: "Evolution of ",
    featuredTitleEmphasis: "Earth, Wind & Fire",
    description:
      "Arranged and sung with top acapella singers around the world. Winner of 7 International Film Festival Awards.",
    youtubeUrl: "https://www.youtube.com/watch?v=AFn-MHyNFd4",
    youtubeId: "AFn-MHyNFd4",
    youtubeCaption: "YouTube · Evolution of EWF",
    youtubeCtaLabel: "Watch on YouTube →",
    bandcampUrl: "https://bakarisoul.bandcamp.com",
    bandcampCtaLabel: "Bandcamp →",
    bandcampKicker: "More tracks · Bandcamp",
    bandcampTracks: [
      {
        title: "Evolution of Earth, Wind and Fire",
        trackId: "3085161897",
        url: "https://bakarisoul.bandcamp.com/track/evolution-of-earth-wind-and-fire",
      },
      {
        title: "Cruisin'",
        trackId: "2488527881",
        url: "https://bakarisoul.bandcamp.com/track/cruisin",
      },
    ],
  },

  hire: {
    // TODO: swap for a paid "Consulting" Calendly event type (with Stripe
    // payment collection configured in the Calendly dashboard) once set up —
    // see README.
    calendlyUrl: "https://calendly.com/bakari-holmes/30min",
    consulting: {
      kicker: "Speaking & Coaching",
      title: "Book me for a call",
      description:
        "Public speaking, technical interview coaching, and engineering consulting.",
      services: [
        "public speaking",
        "technical interview coaching",
        "engineering consultant",
      ],
      ctaLabel: "Book on Calendly →",
    },
    creative: {
      kicker: "Music & Writing",
      title: "Book me for a session",
      description:
        "Songwriting, arranging, choreography, and vocals — plus resume and writing help.",
      services: [
        "songwriter",
        "arranger",
        "bass/baritone",
        "choreographer",
        "resume writer",
        "author",
      ],
      ctaLabel: "Book on Calendly →",
    },
  },

  socials: {
    kicker: "Elsewhere",
    x: { label: "X", handle: "@BakMamba74", url: "https://x.com/BakMamba74" },
    instagram: {
      label: "Instagram",
      handle: "@_bakarisoul",
      url: "https://instagram.com/_bakarisoul",
    },
    tiktok: {
      label: "TikTok",
      handle: "@bakarisoul",
      url: "https://tiktok.com/@bakarisoul",
    },
    facebook: {
      label: "Facebook",
      handle: "@bakarisoul",
      url: "https://facebook.com/bakarisoul",
    },
    linkedin: { label: "LinkedIn", url: "https://www.linkedin.com/in/bakariholmes/" },
    github: { label: "GitHub", url: "https://github.com/bakarih" },
    youtube: {
      label: "YouTube",
      url: "https://www.youtube.com/watch?v=AFn-MHyNFd4",
    },
    substack: { label: "Substack", url: "https://bakarisoul.substack.com" },
  },

  footer: {
    name: "Bakari Holmes",
    domain: "bakarisoul.com",
    location: "Atlanta, GA",
  },

  seo: {
    title: "Bakari Holmes — Making Hard Things Make Sense",
    description:
      "Engineering manager, staff frontend engineer, educator and interview coach, bass/baritone. Building interviewrubric.com, writing on Substack, singing with commUNITY ATL.",
    url: "https://bakarisoul.com",
    twitterCreator: "@BakMamba74",
  },
} as const;

export type Site = typeof site;
