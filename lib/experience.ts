import { EXPERIENCE } from "@/lib/content/site";
import type { ExperienceItem } from "@/lib/content/types";

/** Consecutive roles at one organization, shown under a single header. */
export interface ExperienceGroup {
  company: string;
  /** Span from the earliest start to the latest end across the roles. */
  period: string;
  roles: ExperienceItem[];
}

/** Roles shown up front, and older ones behind "earlier roles". */
export const FEATURED_EXPERIENCE = EXPERIENCE.filter((entry) => !entry.compact);
export const EARLIER_EXPERIENCE = EXPERIENCE.filter((entry) => entry.compact);

const PERIOD_SEPARATOR = " — ";

/**
 * Groups consecutive entries with the same company, LinkedIn style. Entries
 * are listed newest first, so the group starts when the last role started
 * and ends when the first role ends.
 */
export function groupExperienceByCompany(
  entries: readonly ExperienceItem[],
): ExperienceGroup[] {
  const groups: ExperienceGroup[] = [];

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
