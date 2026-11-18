import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { EDUCATION, PRIOR_EDUCATION } from "../content/education";
import { EXPERIENCE } from "../content/experience";
import { LEADERSHIP } from "../content/leadership";
import { ORGANIZATIONS, getOrganization } from "../content/organizations";

describe("organizations", () => {
  it("has a mark for every organization named in content", () => {
    const names = [
      ...EXPERIENCE.map((entry) => entry.company),
      ...EDUCATION.map((entry) => entry.institution),
      ...PRIOR_EDUCATION.map((entry) => entry.institution),
      ...LEADERSHIP.map((entry) => entry.organization),
    ];

    for (const name of names) {
      expect(getOrganization(name), name).toBeDefined();
    }
  });

  it("points every logo at an SVG that exists in public/", () => {
    for (const org of ORGANIZATIONS) {
      if (!org.logo) {
        continue;
      }
      expect(org.logo).toMatch(/^\/logos\/.+\.svg$/);
      expect(
        fs.existsSync(path.join(process.cwd(), "public", org.logo)),
        org.logo,
      ).toBe(true);
    }
  });
});
