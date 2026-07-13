// All user-facing copy and outbound URLs for bakarisoul.com live here.
// Components read from this module — no user-facing string should be
// hard-coded in a component.

export type BioSegment = { text: string; href?: string; italic?: boolean };
export type BioParagraph = BioSegment[];

export type PillarKey = "eng" | "ai" | "path";

export type LegalSection = { heading: string; paragraphs: BioParagraph[] };
export type LegalPageContent = {
  title: string;
  lastUpdated: string;
  intro: BioParagraph[];
  sections: LegalSection[];
};

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

const CONTACT_EMAIL = "bakarisoulllc@gmail.com";
const LEGAL_LAST_UPDATED = "July 13, 2026";

const privacy: LegalPageContent = {
  title: "Privacy",
  lastUpdated: LEGAL_LAST_UPDATED,
  intro: [
    [
      {
        text: "This is the plain-language version. I don't run my own database or trackers — almost everything here is handled by the third-party services embedded in the site.",
      },
    ],
  ],
  sections: [
    {
      heading: "What I collect",
      paragraphs: [
        [
          {
            text: "Nothing, directly. This site has no accounts, no database, and no first-party analytics or ad trackers. It's a static page.",
          },
        ],
      ],
    },
    {
      heading: "What happens when you use the site",
      paragraphs: [
        [
          {
            text: "If you subscribe to the newsletter, your email goes straight to ",
          },
          { text: "Substack", href: "https://substack.com/privacy" },
          {
            text: ", who sends it and manages your subscription. Unsubscribe anytime from any issue.",
          },
        ],
        [
          { text: "If you book time with me, " },
          { text: "Calendly", href: "https://calendly.com/privacy" },
          {
            text: " collects your name, email, and whatever you enter when scheduling. Paid sessions are billed through ",
          },
          { text: "Stripe", href: "https://stripe.com/privacy" },
          {
            text: ", via Calendly — I never see or store your card details.",
          },
        ],
        [
          {
            text: "The featured video doesn't load until you click play. After that, ",
          },
          { text: "YouTube", href: "https://policies.google.com/privacy" },
          { text: " may set cookies per Google's policy." },
        ],
        [
          { text: "The embedded music players are served directly by " },
          { text: "Bandcamp", href: "https://bandcamp.com/privacy" },
          { text: ", which sets its own cookies to enable playback." },
        ],
        [
          { text: "The site itself is hosted on " },
          {
            text: "Cloudflare",
            href: "https://www.cloudflare.com/privacypolicy/",
          },
          {
            text: ", which processes standard connection data to serve the page and block abuse.",
          },
        ],
      ],
    },
    {
      heading: "What I don't do",
      paragraphs: [
        [
          {
            text: "I don't sell your data, run ads, or use cross-site trackers. I don't have access to your payment details for paid bookings — that's between you, Calendly, and Stripe.",
          },
        ],
      ],
    },
    {
      heading: "Kids",
      paragraphs: [
        [
          {
            text: "This site isn't directed at children under 13, and I don't knowingly collect anything from them.",
          },
        ],
      ],
    },
    {
      heading: "Changes",
      paragraphs: [
        [{ text: "I'll update this page if what the site does changes." }],
      ],
    },
    {
      heading: "Questions",
      paragraphs: [
        [
          { text: "Email me: " },
          { text: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
        ],
      ],
    },
  ],
};

const terms: LegalPageContent = {
  title: "Terms",
  lastUpdated: LEGAL_LAST_UPDATED,
  intro: [
    [
      {
        text: "Using bakarisoul.com — reading it, subscribing, or booking time with me — means you're agreeing to these terms. Short and plain, on purpose.",
      },
    ],
    [
      {
        text: "This is a plain-language summary I wrote myself, not legal counsel. If you have a dispute or a serious question, talk to a lawyer, not just this page.",
        italic: true,
      },
    ],
  ],
  sections: [
    {
      heading: "The content",
      paragraphs: [
        [
          {
            text: "The writing, portrait, and music on this site are mine unless I say otherwise. Link to it freely; please don't republish it as your own.",
          },
        ],
      ],
    },
    {
      heading: "Third-party links",
      paragraphs: [
        [
          {
            text: "This site links out to and embeds interviewrubric.com, Substack, YouTube, Bandcamp, PeerPush, Calendly, and various social platforms. I'm not responsible for their content, availability, or policies.",
          },
        ],
      ],
    },
    {
      heading: "The newsletter",
      paragraphs: [
        [
          {
            text: "Subscribing is free and runs through Substack. Unsubscribe whenever you want.",
          },
        ],
      ],
    },
    {
      heading: "Booking a call",
      paragraphs: [
        [{ text: "Free intro calls are free, as advertised." }],
        [
          {
            text: "Paid sessions — consulting, coaching, or creative work — are billed through Stripe via Calendly. Cancel or reschedule at least 24 hours before the meeting for a full refund. Cancellations inside 24 hours aren't refunded.",
          },
        ],
        [
          {
            text: "I don't collect or store your payment information — that's handled entirely by Stripe and Calendly.",
          },
        ],
      ],
    },
    {
      heading: "What you get",
      paragraphs: [
        [
          {
            text: "Anything I create for you as part of paid work — a resume, an arrangement, coaching notes — is yours once payment clears, unless we agree otherwise in writing.",
          },
        ],
      ],
    },
    {
      heading: "Confidentiality",
      paragraphs: [
        [
          {
            text: "What you share with me in a coaching or consulting session stays between us. I won't share specifics without your permission.",
          },
        ],
      ],
    },
    {
      heading: "No guarantees",
      paragraphs: [
        [
          {
            text: "I bring what I've got, but I can't promise outcomes — job offers, interview results, audience reach — from any consulting, coaching, or creative work.",
          },
        ],
      ],
    },
    {
      heading: "Liability",
      paragraphs: [
        [
          {
            text: "This site and my services are provided as-is. To the extent the law allows, I'm not liable for indirect or consequential damages arising from your use of the site or my services.",
          },
        ],
      ],
    },
    {
      heading: "Governing law",
      paragraphs: [
        [
          {
            text: "These terms are governed by the laws of the State of Georgia, where I live and work.",
          },
        ],
      ],
    },
    {
      heading: "Changes",
      paragraphs: [
        [
          {
            text: "I may update these terms from time to time. Using the site after a change means you accept the update.",
          },
        ],
      ],
    },
    {
      heading: "Questions",
      paragraphs: [
        [
          { text: "Email me: " },
          { text: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
        ],
      ],
    },
  ],
};

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
    { glyph: "speaking", label: "speaker", pillar: "eng" as PillarKey },
    { glyph: "hugging", label: "human", pillar: "path" as PillarKey },
  ],

  hero: {
    portraitAlt: "Bakari Holmes, in a pink suit, mid-laugh",
    titlePrefix: "Six versions of the same job: ",
    titleEmphasis: "making hard things make sense",
    titleSuffix: ".",
    subtitle:
      "Bakari Holmes · engineering manager, staff frontend engineer, speaker, educator and interview coach, bass/baritone with commUNITY ATL. Based in Atlanta.",
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
    privacyLabel: "Privacy",
    termsLabel: "Terms",
  },

  legal: {
    contactEmail: CONTACT_EMAIL,
    privacy,
    terms,
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
