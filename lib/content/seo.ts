import type { SeoContent } from "./types";

export const SITE_TITLE_TEMPLATE = "%s | Sheikh Mohsin";

export function applySiteTitleTemplate(title: string) {
  return SITE_TITLE_TEMPLATE.replace("%s", title);
}

export const DIARY_DESCRIPTION =
  "Writing by Sheikh Mohsin on home, research, and systems.";

export const SEO: SeoContent = {
  title: "Sheikh Mohsin | Computer Science & Business Analytics",
  description:
    "Sheikh Mohsin writes from Pune about how a drive decides what to keep, how a craft survives once it has to be sold, and what a classroom does when its language is not the language of home.",
  url: "https://sheikh-mohsin.vercel.app",
  updatedAt: "2026-09-29",
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
