import type { SeoContent } from "./types";

export const SITE_TITLE_TEMPLATE = "%s | Sheikh Mohsin";

export function applySiteTitleTemplate(title: string) {
  return SITE_TITLE_TEMPLATE.replace("%s", title);
}

export const DIARY_DESCRIPTION =
  "Writing by Sheikh Mohsin on systems, data, research, and technical craft.";

export const SEO: SeoContent = {
  title: "Sheikh Mohsin | Computer Science & Business Analytics",
  description:
    "Sheikh Mohsin is a B.Sc. Computer Science and Business Analytics student at FLAME University building systems software, data tools, and applied research across SSD storage, QA, and operations.",
  url: "https://sheikh-mohsin.vercel.app",
  updatedAt: "2026-09-17",
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
