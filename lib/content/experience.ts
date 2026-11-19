import type { ExperienceItem } from "./types";

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
