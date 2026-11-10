import type { ResearchItem } from "./types";

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
      "Summer research at IIT Ropar on SSD cache eviction, spatial prefetching for address-translation entries, and how ransomware write bursts collide with the cleanup a drive does in private. Along the way: a cache-order bug where newly loaded entries evicted one another before anything used them, and an open question about whether a targeted defense against that collision is a contribution in its own right.",
    featured: true,
    links: [
      {
        label: "Note",
        href: "/diary/the-entries-that-evict-each-other",
      },
    ],
  },
];
