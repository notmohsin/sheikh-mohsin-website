import { ABOUT } from "@/lib/content/about";
import { AWARDS } from "@/lib/content/awards";
import { COURSEWORK } from "@/lib/content/coursework";
import { EDUCATION, PRIOR_EDUCATION } from "@/lib/content/education";
import { EXPERIENCE } from "@/lib/content/experience";
import { LEADERSHIP } from "@/lib/content/leadership";
import { PROJECTS } from "@/lib/content/projects";
import { RESEARCH } from "@/lib/content/research";
import { SKILLS } from "@/lib/content/skills";
import { SOCIALS } from "@/lib/content/socials";
import type {
  EducationItem,
  AwardItem,
  CourseworkItem,
  ExperienceItem,
  PriorEducationItem,
  ProjectItem,
  ResearchItem,
  SocialLink,
  LeadershipItem,
} from "@/lib/content/types";

export type SiteSectionId =
  | "intro"
  | "socials"
  | "experience"
  | "research"
  | "skills"
  | "projects"
  | "education";

export const CONTENT_SECTION_IDS: SiteSectionId[] = [
  "intro",
  "socials",
  "experience",
  "research",
  "skills",
  "projects",
  "education",
];

export type SocialLinkModel = SocialLink;
export type ExperienceEntryModel = ExperienceItem;
export type ResearchEntryModel = ResearchItem;
export type ProjectEntryModel = ProjectItem;
export type EducationEntryModel = EducationItem;
export type CourseworkEntryModel = CourseworkItem;
export type PriorEducationEntryModel = PriorEducationItem;
export type AwardEntryModel = AwardItem;
export type LeadershipEntryModel = LeadershipItem;

export interface IntroSectionModel {
  id: "intro";
  name: string;
  role: string;
  location: string;
  bio: string;
  socialLinks: SocialLinkModel[];
}

export interface SocialsSectionModel {
  id: "socials";
  links: SocialLinkModel[];
}

export interface ExperienceSectionModel {
  id: "experience";
  featuredEntries: ExperienceEntryModel[];
  compactEntries: ExperienceEntryModel[];
}

/** Consecutive roles at one organization, shown under a single header. */
export interface ExperienceGroupModel {
  company: string;
  /** Span from the earliest start to the latest end across the roles. */
  period: string;
  roles: ExperienceEntryModel[];
}

export interface ResearchSectionModel {
  id: "research";
  entries: ResearchEntryModel[];
}

export interface SkillCategoryModel {
  name: string;
  items: string[];
}

export interface SkillsSectionModel {
  id: "skills";
  categories: SkillCategoryModel[];
}

export interface ProjectsSectionModel {
  id: "projects";
  entries: ProjectEntryModel[];
}

export interface EducationSectionModel {
  id: "education";
  higherEducation: EducationEntryModel[];
  priorEducation: PriorEducationEntryModel[];
  coursework: CourseworkEntryModel[];
}

export interface AwardsSectionModel {
  entries: AwardEntryModel[];
}

export interface LeadershipSectionModel {
  entries: LeadershipEntryModel[];
}

export function buildSocialsSection(): SocialsSectionModel {
  return {
    id: "socials",
    links: SOCIALS,
  };
}

export function buildIntroSection(): IntroSectionModel {
  return {
    id: "intro",
    name: ABOUT.name,
    role: ABOUT.role,
    location: ABOUT.location,
    bio: ABOUT.bio,
    socialLinks: SOCIALS,
  };
}

export function buildExperienceSection(): ExperienceSectionModel {
  return {
    id: "experience",
    featuredEntries: EXPERIENCE.filter((entry) => !entry.compact),
    compactEntries: EXPERIENCE.filter((entry) => entry.compact),
  };
}

const PERIOD_SEPARATOR = " — ";

/**
 * Groups consecutive entries with the same company, LinkedIn style. Entries
 * are listed newest first, so the group starts when the last role started
 * and ends when the first role ends.
 */
export function groupExperienceByCompany(
  entries: readonly ExperienceEntryModel[],
): ExperienceGroupModel[] {
  const groups: ExperienceGroupModel[] = [];

  for (const entry of entries) {
    const current = groups.at(-1);
    if (current && current.company === entry.company) {
      current.roles.push(entry);
    } else {
      groups.push({ company: entry.company, period: "", roles: [entry] });
    }
  }

  for (const group of groups) {
    const newest = group.roles[0].period.split(PERIOD_SEPARATOR);
    const oldest = group.roles.at(-1)!.period.split(PERIOD_SEPARATOR);
    group.period =
      group.roles.length === 1 ?
        group.roles[0].period
      : `${oldest[0]}${PERIOD_SEPARATOR}${newest.at(-1)}`;
  }

  return groups;
}

export function buildResearchSection(): ResearchSectionModel {
  return {
    id: "research",
    entries: RESEARCH,
  };
}

export function buildSkillsSection(): SkillsSectionModel {
  return {
    id: "skills",
    categories: Object.entries(SKILLS).map(([name, items]) => ({
      name,
      items,
    })),
  };
}

export function buildProjectsSection(): ProjectsSectionModel {
  return {
    id: "projects",
    entries: PROJECTS,
  };
}

export function buildEducationSection(): EducationSectionModel {
  return {
    id: "education",
    higherEducation: EDUCATION,
    priorEducation: PRIOR_EDUCATION,
    coursework: COURSEWORK,
  };
}

export function buildAwardsSection(): AwardsSectionModel {
  return { entries: AWARDS };
}

export function buildLeadershipSection(): LeadershipSectionModel {
  return { entries: LEADERSHIP };
}
