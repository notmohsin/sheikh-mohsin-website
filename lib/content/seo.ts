import type { SeoContent } from "./types";

export const SITE_TITLE_TEMPLATE = "%s | Sheikh Mohsin";

export function applySiteTitleTemplate(title: string) {
  return SITE_TITLE_TEMPLATE.replace("%s", title);
}

export const DIARY_DESCRIPTION =
  "Essays and research notes by Sheikh Mohsin: home and Kashmir, SSD storage systems, and craft that has to survive as commerce.";

export const SEO: SeoContent = {
  title: "Sheikh Mohsin | Computer Science & Business Analytics",
  description:
    "Sheikh Mohsin is a Computer Science and Business Analytics student at FLAME University, Pune. Research on SSD cache eviction at IIT Ropar, field research on Taraksi silver filigree, and essays on home and Kashmir.",
  url: "https://sheikh-mohsin.vercel.app",
  updatedAt: "2026-11-10",
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
