import type { TablerIcon } from "@tabler/icons-react";
import type { DateString } from "@/lib/diary/metadata";

export interface AboutQuote {
  text: string;
  /** Where the line comes from, shown after an em dash. */
  source: string;
  href?: string;
}

export interface AboutContent {
  name: string;
  role: string;
  location: string;
  bio: string;
  /**
   * Paragraphs after the bio on the About page. Same inline markup as
   * `misc`, plus `**bold**` and `*italic*`.
   */
  intro?: string[];
  /** Square photo under /public for the profile card; the chinar icon stands in until set. */
  avatar?: string;
  /** Short italic line under the bio. */
  quote?: AboutQuote;
  /**
   * One closing line at the foot of the homepage. `{Org name}` (or
   * `{Org name|shown text}`) renders as an
   * organization mention (see lib/content/organizations.ts) and
   * `[text](href)` as a link.
   */
  misc?: string;
}

export interface SeoContent {
  title: string;
  description: string;
  url: string;
  updatedAt: DateString;
  areas: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: TablerIcon;
}

export interface LinkItem {
  label: string;
  href: string;
}

export interface ResearchItem {
  title: string;
  year: string;
  citationAuthors?: string;
  kind: "preprint" | "thesis" | "presentation" | "interest";
  status?: "preprint" | "completed" | "presented" | "in-progress";
  summary: string;
  featured?: boolean;
  contribution?: string;
  result?: string;
  links?: LinkItem[];
}

export interface EducationItem {
  institution: string;
  period: string;
  location: string;
  degree: string;
  details: string[];
}

export interface CourseworkItem {
  code: string;
  title: string;
  artifact: string;
  link: string;
}

export interface PriorEducationItem {
  institution: string;
  period: string;
  degree: string;
  details: string[];
}

export interface ExperienceTextLink {
  label: string;
  href: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  category: "engineering" | "research" | "teaching-writing";
  description: string[];
  compact?: boolean;
  textLinks?: ExperienceTextLink[];
}

export interface ProjectItem {
  title: string;
  /** One-line value statement shown above the description on cards. */
  summary?: string;
  description: string;
  status?: "public" | "private" | "pre-beta" | "research";
  stack?: string[];
  highlights?: string[];
  links: LinkItem[];
  confidentialityNote?: string;
  featured?: boolean;
  /** Optional cover image shown at the top of the card (file in /public). */
  cover?: CoverImage;
}

export interface CoverImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface AwardItem {
  title: string;
  year: string;
  result: string;
  link?: LinkItem;
}

export interface LeadershipItem {
  organization: string;
  roles: string[];
  period: string;
  description?: string;
}

export type Skills = Record<string, string[]>;

export type UsesGroup = {
  heading: string;
  items: { name: string; note: string }[];
};

export type ListeningSnapshot = {
  label: string;
  note: string;
};

export interface Organization {
  /** Name as it appears in content, used for matching. */
  name: string;
  /** Other spellings used across content files. */
  aliases?: string[];
  /** SVG under /public/logos, transparent background. */
  logo?: string;
  /** Logo width ÷ height when it is not square (a wordmark beside a mark). */
  logoAspect?: number;
  /** One or two letters for the monogram fallback. */
  monogram: string;
  /** Brand colour for inline mentions (light mode). */
  color?: string;
  /** Brand colour for dark mode, picked to stay readable on #24273a. */
  colorDark?: string;
  /** Official website; the organization's name links here wherever it appears. */
  href?: string;
}
