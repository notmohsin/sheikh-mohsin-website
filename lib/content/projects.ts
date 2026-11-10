import type { ProjectItem } from "./types";

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
