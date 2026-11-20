/**
 * All of the site's copy and data in one place, in the order the site reads.
 * Edit this file to change what the site says; components only render it.
 * Shapes are in ./types.ts.
 */
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconNews,
} from "@tabler/icons-react";

import type {
  AboutContent,
  AwardItem,
  CourseworkItem,
  EducationItem,
  ExperienceItem,
  LeadershipItem,
  ListeningSnapshot,
  Organization,
  PriorEducationItem,
  ProjectItem,
  ResearchItem,
  SeoContent,
  Skills,
  SocialLink,
  UsesGroup,
} from "./types";

// ---------------------------------------------------------------------------
// Profile: name, bio, intro paragraphs, quote, closing line
// ---------------------------------------------------------------------------

export const ABOUT: AboutContent = {
  name: "Sheikh Mohsin",
  role: "BSc (Hons) Computer Science and Business Analytics",
  location: "Pune, India",
  avatar: "/mohsin.jpg",
  bio: "I am still turning things over until they get a little less opaque: how a *drive* decides what to keep, how a *craft* survives once it has to be sold, and what a *classroom* does when its language is not the language of home. I write when the question will not leave me alone.",
  intro: [
    "I study **Computer Science and Business Analytics** at {FLAME University} on a full scholarship. There I am a research assistant to Prof. Lokendra Vishwakarma, building a tamper-evident chain-of-custody ledger for criminal evidence on Hyperledger Fabric, and a student campus ambassador. I am also a research intern at {IIT Ropar}, working on how SSDs cache their address-translation entries. Before that I studied Taraksi silver filigree with FLAME's Discover India Program, tested software at {PartyHub}, and worked on data and operations at {Goonj, Delhi|Goonj}.",
  ],
  quote: {
    text: "A here and a there.",
    source: "On Home, Belonging and Kashmir",
    href: "/diary/on-home-belonging-and-kashmir",
  },
  misc: "From Kashmir, by way of {Jawahar Navodaya Vidyalaya, Ganderbal|JNV Ganderbal}; now at {FLAME University} in Pune. I write at [Feelings and Numbers](https://feelingsandnumbers.substack.com).",
};

// ---------------------------------------------------------------------------
// Search engines and page titles
// ---------------------------------------------------------------------------

export const SITE_TITLE_TEMPLATE = "%s | Sheikh Mohsin";

export const DIARY_DESCRIPTION =
  "Essays and research notes by Sheikh Mohsin: home and Kashmir, SSD storage systems, and craft that has to survive as commerce.";

export const SEO: SeoContent = {
  title: "Sheikh Mohsin | Computer Science & Business Analytics",
  description:
    "Sheikh Mohsin is a Computer Science and Business Analytics student at FLAME University, Pune. Research on SSD cache eviction at IIT Ropar, field research on Taraksi silver filigree, and essays on home and Kashmir.",
  url: "https://sheikhmohsin.vercel.app",
  updatedAt: "2026-11-19",
  areas: [
    "Computer science",
    "Business analytics",
    "FLAME University",
    "Systems programming",
    "SSD storage",
    "Data analysis",
    "Technical writing",
    "Research",
    "C++",
    "Python",
    "JavaScript",
  ],
};

// ---------------------------------------------------------------------------
// Social links
// ---------------------------------------------------------------------------

export const SOCIALS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/notmohsin",
    icon: IconBrandGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sheikh-mohsin-213653254",
    icon: IconBrandLinkedin,
  },
  {
    label: "Substack",
    href: "https://feelingsandnumbers.substack.com",
    // Tabler has no Substack brand icon; a newsletter glyph stands in.
    icon: IconNews,
  },
  {
    label: "Email",
    href: "mailto:sheikh.mohsin@flame.edu.in",
    icon: IconMail,
  },
];

// ---------------------------------------------------------------------------
// Experience (newest first; consecutive roles at one organization are grouped)
// ---------------------------------------------------------------------------

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "FLAME University",
    role: "Research Assistant — Blockchain",
    period: "Sept 2026 — Present",
    category: "research",
    description: [
      "Building CustodyChain under the guidance of Prof. Lokendra Vishwakarma: a permissioned Hyperledger Fabric ledger that keeps a tamper-evident chain of custody for criminal evidence.",
      "Reproduced a published Fabric chain-of-custody prototype and found that its records held free text but nothing tying a record to the evidence it described.",
      "Designed an evidence-fingerprinting model that separates integrity (SHA-256 over a canonical, schema-validated manifest and a salted Merkle root of its files) from identity (perceptual image hashes and 3D-scan comparison), so only fingerprints and custody events go on-chain.",
      "Built a Byzantine-fault-tolerant ordering service on Fabric v3 (SmartBFT) with four orderers run by separate agencies, tested it through node failures, leader failover, and restarts, and made the ledger persist across shutdowns.",
    ],
    textLinks: [
      {
        label: "Prof. Lokendra Vishwakarma",
        href: "https://www.flame.edu.in/faculty/lokendra-vishwakarma",
      },
    ],
  },
  {
    company: "FLAME University",
    role: "Student Campus Ambassador",
    period: "Sept 2026 — Present",
    category: "teaching-writing",
    description: [
      "Give campus tours to prospective students and their families, showing what studying and living at FLAME looks like day to day.",
      "Talk with prospective students about the move from school to college and help them work out whether FLAME is the right fit for them.",
    ],
  },
  {
    company: "IIT Ropar",
    role: "Research Intern (Summer Internship Program) — SSD Systems",
    period: "May 2026 — Present",
    category: "research",
    description: [
      "Learned SSD storage systems from first principles under Prof. Venkata Kalyan Tavva and compared recency- and frequency-based cache eviction strategies in the SimpleSSD-Standalone 2.0 simulator.",
      "Designed and implemented a spatial prefetching approach that predicts nearby address-translation entries from how data is grouped in flash; found and fixed a cache-order bug that caused newly loaded entries to evict one another before use.",
      "Investigated how ransomware write bursts interact with an SSD's internal cleanup process and assessed whether a targeted defense could form a new research contribution.",
    ],
  },
  {
    company: "Discover India Program (DIP)",
    role: "Research — Taraksi (Silver Filigree)",
    period: "Sept 2025 — April 2026",
    category: "research",
    description: [
      "Studied, within a 13-member research team, how Taraksi silver filigree moved from a household craft to a commercial practice.",
      "Traced the craft's history and technique through literature, then designed field surveys and semi-structured interviews to capture how artisans describe the shift from craft to commerce.",
      "Synthesized qualitative findings into academic documentation and cultural analysis.",
    ],
  },
  {
    company: "PartyHub",
    role: "QA Testing Intern",
    period: "Jul 2025 — Aug 2025",
    category: "engineering",
    description: [
      "Tested frontend and backend features before release, focusing on edge cases that could break real user flows rather than checking only the happy path.",
      "Wrote reproducible bug reports with exact steps and expected-versus-actual behavior, giving developers a clear path from discovery to triage.",
      "Checked API responses and cross-device behavior to expose integration issues before release.",
    ],
  },
  {
    company: "Goonj, Delhi",
    role: "Research and Operations Intern",
    period: "May 2025 — Jul 2025",
    category: "engineering",
    description: [
      "Traced donation and redistribution data through the sorting pipeline, isolated stages that created backlog, and built structured datasets and visual summaries to support allocation decisions.",
      "Tested data patterns against field-team observations before proposing process changes, separating patterns that reflected real field conditions from patterns caused by incomplete records.",
    ],
  },
];

// ---------------------------------------------------------------------------
// Education and coursework
// ---------------------------------------------------------------------------

export const EDUCATION: EducationItem[] = [
  {
    institution: "FLAME University",
    period: "Aug 2024 — Present",
    location: "Pune, India",
    degree: "B.Sc. Computer Science & Business Analytics (Full Scholarship)",
    details: [
      "Cumulative GPA: 7.65/10",
      "Modeled concurrent and distributed systems with SAT solvers, temporal-logic model checking, and Alloy/TLA+ specifications",
      "Implemented and compared classification and clustering methods, using PCA to test how feature selection affected model behavior",
      "Joined Dot Slash Club and completed interdisciplinary projects connecting computer science with Philosophy and Public Policy",
    ],
  },
];

export const PRIOR_EDUCATION: PriorEducationItem[] = [
  {
    institution: "Jawahar Navodaya Vidyalaya, Ganderbal",
    period: "2017 — 2024",
    degree: "Senior Secondary Education (Merit Scholarship, Residential)",
    details: [
      "Grades 6–12",
      "Led extracurricular activities and coordinated Atal Tinkering Labs; taught junior students to turn ideas into 3D-printed prototypes",
    ],
  },
];

export const COURSEWORK: CourseworkItem[] = [
  {
    code: "CS",
    title: "Concurrent and Distributed Systems",
    artifact:
      "Modeled and verified concurrent and distributed systems with SAT solvers, temporal-logic model checking, and Alloy/TLA+ specifications.",
    link: "",
  },
  {
    code: "ML",
    title: "Classification and Clustering",
    artifact:
      "Implemented and compared classification and clustering methods, using PCA to test how feature selection affected model behavior.",
    link: "",
  },
  {
    code: "PP",
    title: "Globalization and India's LPG-era Economic Reforms",
    artifact:
      "Term paper on globalization and India's LPG-era economic reforms for Public Policy coursework.",
    link: "",
  },
];

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const PROJECTS: ProjectItem[] = [
  {
    title: "Cache Performance Benchmark Suite",
    summary:
      "Clock-cycle costs of 16 data structures, measured with hardware counters instead of wall-clock time.",
    description:
      "A benchmarking harness that measured hardware clock-cycle costs across 16 data structures, using performance counters to isolate machine-level behavior from wall-clock noise. Compared contiguous and pointer-based layouts across access patterns and data sizes, then automated collection, CSV export, and Chart.js visualization.",
    status: "public",
    links: [
      {
        label: "Repository",
        href: "https://github.com/notmohsin/Performance-and-Data-Representation",
      },
    ],
    stack: ["C++", "perf_event_open", "RDTSCP", "Chart.js"],
    featured: true,
  },
  {
    title: "IPL Data Mining",
    summary:
      "Match records turned into checkable findings, with preparation kept separate from interpretation.",
    description:
      "Cleaned and explored IPL data to compare team and player patterns, turning match records into findings that could be inspected through visual summaries. Built a repeatable analysis workflow in Python, separating data preparation from interpretation so conclusions could be checked against the underlying records.",
    status: "public",
    links: [
      {
        label: "Repository",
        href: "https://github.com/notmohsin/IPL---Data-Mining",
      },
    ],
    stack: ["Python", "Data Analysis", "Data Visualization"],
    featured: true,
  },
  {
    title: "Personal Website & Portfolio",
    summary:
      "This site: a terminal, a diary, and a CV pipeline in one Next.js app.",
    description:
      "A Next.js portfolio and file-based MDX diary with terminal and PDF views, built to present projects, research, and writing in one place. Forked from Jeet Shah's jeetsh4h-dev template; the content, Spotify integration, guestbook, and extra pages are mine.",
    status: "public",
    links: [
      {
        label: "Repository",
        href: "https://github.com/notmohsin/sheikh-mohsin-website",
      },
      {
        label: "Template credit",
        href: "/credits",
      },
    ],
    stack: ["Next.js", "TypeScript", "MDX", "Tailwind CSS", "LaTeX"],
    featured: true,
  },
];

// ---------------------------------------------------------------------------
// Research
// ---------------------------------------------------------------------------

export const RESEARCH: ResearchItem[] = [
  {
    title: "Lost in Instruction",
    year: "2025",
    citationAuthors: "Sheikh Mohsin (co-author)",
    kind: "interest",
    status: "completed",
    summary:
      "A co-authored piece for Deccan Herald on education policy and technology. Instruction is supposed to lead somewhere; this sits with what happens when it does not, and with the students expected to follow it anyway, especially when the language of the classroom is not the language of home.",
    featured: true,
    links: [
      {
        label: "Deccan Herald",
        href: "https://www.deccanherald.com/india/lost-in-instruction-3568384",
      },
    ],
  },
  {
    title: "Taraksi Silver Filigree — Craft to Commerce",
    year: "2026",
    citationAuthors: "Discover India Program research team",
    kind: "interest",
    status: "in-progress",
    summary:
      "Field research with a thirteen-person team on how Taraksi silver filigree moved from a household craft into something that has to survive as commerce. We read the history, designed surveys and interviews, and sat with artisans. The story is not only one of progress: it is also about what remains, and what gets priced, once a practice has to live outside the house it grew up in.",
    featured: true,
    links: [
      {
        label: "Note",
        href: "/diary/what-remains-when-a-craft-has-to-leave-the-house",
      },
    ],
  },
  {
    title: "SSD Spatial Prefetching & Ransomware Write Patterns",
    year: "2026",
    citationAuthors: "Sheikh Mohsin",
    kind: "interest",
    status: "in-progress",
    summary:
      "Summer research at {IIT Ropar} on SSD cache eviction, spatial prefetching for address-translation entries, and how ransomware write bursts collide with the cleanup a drive does in private. Along the way: a cache-order bug where newly loaded entries evicted one another before anything used them, and an open question about whether a targeted defense against that collision is a contribution in its own right.",
    featured: true,
    links: [
      {
        label: "Note",
        href: "/diary/the-entries-that-evict-each-other",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

export const SKILLS: Skills = {
  Languages: [
    "Python",
    "C++",
    "JavaScript",
    "SQL",
    "HTML/CSS",
    "LaTeX",
    "Markdown",
  ],
  "Data & systems": [
    "Data Structures & Algorithms",
    "Data Analysis",
    "Data Mining",
    "Data Visualization",
    "Statistical Reasoning",
    "FTL/NAND flash internals",
    "Blockchain consensus (Raft, BFT)",
    "Hardware performance profiling",
    "Basic AWS",
  ],
  "Programming & tools": [
    "Git/GitHub",
    "Linux",
    "Docker",
    "Hyperledger Fabric",
    "perf_event_open",
    "RDTSCP",
  ],
  Communication: [
    "Technical writing",
    "Research communication",
    "Analytical thinking",
    "Collaboration",
  ],
  "Spoken languages": ["English", "Hindi", "Urdu", "Kashmiri"],
};

// ---------------------------------------------------------------------------
// Leadership
// ---------------------------------------------------------------------------

export const LEADERSHIP: LeadershipItem[] = [
  {
    organization: "Karta Inter-University Workshops",
    roles: ["Technical Lead (Winter)", "Operations Lead (Summer)"],
    period: "Dec 2025; Jul 2026",
    description:
      "Led technical operations during the five-day winter workshop and coordinated housing, food, events, and schedules for the summer workshop through the Karta Initiative India Foundation.",
  },
  {
    organization: "FLAME University — Karta Initiative",
    roles: ["University Leader"],
    period: "Aug 2024 — Present",
    description:
      "Served as a peer representative for a cohort of more than 40 Karta Scholars, running weekly Sabhas and onboarding new scholars while maintaining records and escalating concerns to mentors.",
  },
];

// ---------------------------------------------------------------------------
// Awards
// ---------------------------------------------------------------------------

export const AWARDS: AwardItem[] = [
  {
    title: "FLAME University Full Scholarship",
    year: "2024",
    result: "Full scholarship for B.Sc. Computer Science & Business Analytics.",
  },
  {
    title: "JNV Merit Scholarship",
    year: "2017",
    result:
      "Merit scholarship for residential senior secondary education at Jawahar Navodaya Vidyalaya, Ganderbal.",
  },
];

// ---------------------------------------------------------------------------
// Organizations: logos, brand colours and links
// ---------------------------------------------------------------------------

/*
 * Organization marks shown next to experience, education, and leadership
 * entries. An entry with a `logo` renders that file from /public/logos; one
 * without falls back to a monogram badge in the site palette.
 *
 * Logos are the organizations' own marks (2026-11-19), used only to identify
 * where Mohsin studied or worked. All are SVG: FLAME's is its official vector
 * shield and wordmark rearranged side by side; IIT Ropar, Navodaya, Goonj and
 * Karta only publish rasters, so theirs are traces of the official images.
 */
export const ORGANIZATIONS: Organization[] = [
  {
    name: "FLAME University",
    logo: "/logos/flame.svg",
    logoAspect: 168 / 64,
    monogram: "F",
    color: "#0c3f6a",
    colorDark: "#f5a97f",
    href: "https://www.flame.edu.in",
  },
  {
    // A FLAME program, so it carries the FLAME mark but links to its own site.
    name: "Discover India Program (DIP)",
    logo: "/logos/flame.svg",
    logoAspect: 168 / 64,
    monogram: "D",
    color: "#0c3f6a",
    colorDark: "#f5a97f",
    href: "https://dip.flame.edu.in/about/about-dip/",
  },
  {
    name: "IIT Ropar",
    logo: "/logos/iitrpr.svg",
    monogram: "IR",
    color: "#2b4c9a",
    colorDark: "#8aadf4",
    href: "https://www.iitrpr.ac.in",
  },
  {
    name: "Jawahar Navodaya Vidyalaya, Ganderbal",
    logo: "/logos/nvs.svg",
    monogram: "JN",
    color: "#c2560c",
    colorDark: "#f5a97f",
    href: "https://navodaya.gov.in/nvs/nvs-school/GANDERBAL/en/home",
  },
  {
    name: "Goonj, Delhi",
    logo: "/logos/goonj.svg",
    monogram: "G",
    color: "#8a5a12",
    colorDark: "#eed49f",
    href: "https://goonj.org",
  },
  {
    name: "PartyHub",
    monogram: "P",
  },
  {
    name: "Karta Inter-University Workshops",
    aliases: ["FLAME University — Karta Initiative"],
    logo: "/logos/karta.svg",
    logoAspect: 1275 / 639,
    monogram: "K",
    color: "#c97a12",
    colorDark: "#f5b93f",
    href: "https://karta-initiative.org.in/",
  },
];

// ---------------------------------------------------------------------------
// /now page
// ---------------------------------------------------------------------------

export const NOW = {
  asOf: "September 2026",
  location: "Pune, India",
  lines: [
    "I am in Pune, in the fifth semester of a B.Sc. in Computer Science and Business Analytics at {FLAME University}.",
    "The summer research internship at {IIT Ropar} is still the work I go back to: SSD cache eviction and spatial prefetching, from May 2026 onward.",
    "I started a series, On Home, Belonging and Kashmir, on Substack. The first piece is also in the diary.",
  ],
};

// ---------------------------------------------------------------------------
// /uses page
// ---------------------------------------------------------------------------

export const USES: UsesGroup[] = [
  {
    heading: "Editor",
    items: [
      {
        name: "Cursor",
        note: "Where I write code, notes that have to become code, and most of this site.",
      },
    ],
  },
  {
    heading: "System",
    items: [
      {
        name: "Omarchy",
        note: "Hyprland on Linux. The machine I actually sit at.",
      },
    ],
  },
  {
    heading: "Languages",
    items: [
      {
        name: "Python, C++, JavaScript",
        note: "The ones I reach for when the work is a program.",
      },
      {
        name: "English, Hindi, Urdu, Kashmiri",
        note: "The ones I reach for when the work is a sentence.",
      },
    ],
  },
  {
    heading: "Research",
    items: [
      {
        name: "Obsidian",
        note: "Drafts, course notes, and the writing that is not ready to be public.",
      },
      {
        name: "SimpleSSD-Standalone 2.0",
        note: "The simulator for the SSD cache work at IIT Ropar.",
      },
      {
        name: "LaTeX",
        note: "The CV, and anything that has to stay still on a page.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// /music page: listening snapshot
// ---------------------------------------------------------------------------

// Curated static snapshot. Leave empty until there is something worth keeping.
export const LISTENING_SNAPSHOT: ListeningSnapshot[] = [];

// ---------------------------------------------------------------------------
// Credits
// ---------------------------------------------------------------------------

export const CREDITS = {
  siteTemplate: {
    author: "Jeet Shah",
    siteLabel: "jeetsh4h.dev",
    siteHref: "https://jeetsh4h.dev",
    repoLabel: "jeetsh4h-dev",
    repoHref: "https://github.com/jeetsh4h/jeetsh4h-dev",
  },
  thisRepoHref: "https://github.com/notmohsin/sheikh-mohsin-website",
  catAscii: [
    {
      label: "ASCII cats (xmission)",
      href: "https://user.xmission.com/~emailbox/ascii_cats.htm",
    },
    {
      label: "Cute cat ASCII",
      href: "https://emojicombos.com/cute-cat-ascii-art",
    },
    {
      label: "ASCII Art Europe — cat",
      href: "https://www.asciiart.eu/animals/cat",
    },
    {
      label: "asciiart.website cats",
      href: "https://asciiart.website/cat.php?category_id=32",
    },
  ],
  catSprites: {
    label: "Pet Cat Pack (Luiz Melo)",
    href: "https://luizmelo.itch.io/pet-cat-pack",
  },
  designIdeas: {
    author: "Pingbang Hu",
    label: "pbb.sh",
    href: "https://github.com/sleepymalc/pbb.sh",
  },
  colors: {
    label: "Catppuccin",
    href: "https://catppuccin.com",
  },
} as const;
