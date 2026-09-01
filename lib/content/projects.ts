import type { ProjectItem } from "./types";

export const PROJECTS: ProjectItem[] = [
  {
    title: "Cache Performance Benchmark Suite",
    description:
      "A benchmarking harness that measured hardware clock-cycle costs across 16 data structures, using performance counters to isolate machine-level behavior from wall-clock noise. Compared contiguous and pointer-based layouts across access patterns and data sizes, then automated collection, CSV export, and Chart.js visualization.",
    status: "public",
    links: [
      {
        label: "Repository",
        href: "https://github.com/SheikhMohsin9311/Performance-and-Data-Representation",
      },
    ],
    stack: ["C++", "perf_event_open", "RDTSCP", "Chart.js"],
    featured: true,
  },
  {
    title: "IPL Data Mining",
    description:
      "Cleaned and explored IPL data to compare team and player patterns, turning match records into findings that could be inspected through visual summaries. Built a repeatable analysis workflow in Python, separating data preparation from interpretation so conclusions could be checked against the underlying records.",
    status: "public",
    links: [
      {
        label: "Repository",
        href: "https://github.com/SheikhMohsin9311/IPL---Data-Mining",
      },
    ],
    stack: ["Python", "Data Analysis", "Data Visualization"],
    featured: true,
  },
  {
    title: "Personal Website & Portfolio",
    description:
      "A Next.js portfolio and file-based MDX diary with terminal and PDF views, inspired by modern developer portfolios and built to present projects, research, and writing in one place.",
    status: "public",
    links: [
      {
        label: "Website",
        href: "https://sheikh-mohsin.vercel.app/",
      },
    ],
    stack: ["Next.js", "TypeScript", "MDX", "Tailwind CSS", "LaTeX"],
    featured: true,
  },
];
