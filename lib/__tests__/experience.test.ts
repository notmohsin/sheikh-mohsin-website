import { describe, expect, it } from "vitest";

import { EXPERIENCE, SKILLS } from "../content/site";
import {
  EARLIER_EXPERIENCE,
  FEATURED_EXPERIENCE,
  groupExperienceByCompany,
} from "../experience";

describe("experience", () => {
  it("groups consecutive roles at the same company", () => {
    const role = (company: string, period: string) => ({
      company,
      role: `${company} role`,
      period,
      category: "research" as const,
      description: [],
    });
    const groups = groupExperienceByCompany([
      role("A", "Sept 2026 — Present"),
      role("A", "May 2025 — Aug 2026"),
      role("B", "Jan 2025 — Apr 2025"),
      role("A", "2024"),
    ]);

    expect(groups.map((group) => group.company)).toEqual(["A", "B", "A"]);
    expect(groups[0].roles).toHaveLength(2);
    expect(groups[0].period).toBe("May 2025 — Present");
    expect(groups[1].period).toBe("Jan 2025 — Apr 2025");
    expect(groups[2].period).toBe("2024");
  });

  it("splits entries into featured and earlier roles without losing any", () => {
    expect([...FEATURED_EXPERIENCE, ...EARLIER_EXPERIENCE]).toHaveLength(
      EXPERIENCE.length,
    );
    expect(FEATURED_EXPERIENCE.every((entry) => !entry.compact)).toBe(true);
    expect(EARLIER_EXPERIENCE.every((entry) => entry.compact)).toBe(true);
  });

  it("keeps every skill category as a non-empty list", () => {
    for (const items of Object.values(SKILLS)) {
      expect(Array.isArray(items)).toBe(true);
      expect(items.length).toBeGreaterThan(0);
    }
  });
});
