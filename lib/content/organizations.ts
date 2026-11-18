/**
 * Organization marks shown next to experience, education, and leadership
 * entries. An entry with a `logo` renders that file from /public/logos; one
 * without falls back to a monogram badge in the site palette.
 *
 * Logos are the organizations' own marks (2026-11-19), used only to identify
 * where Mohsin studied or worked. All are SVG: FLAME's is its official vector
 * shield and wordmark rearranged side by side; IIT Ropar, Navodaya and Goonj
 * only publish rasters, so theirs are colour-layer traces of the official
 * images.
 */

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
}

export const ORGANIZATIONS: Organization[] = [
  {
    name: "FLAME University",
    aliases: ["Discover India Program (DIP)"],
    logo: "/logos/flame.svg",
    logoAspect: 168 / 64,
    monogram: "F",
    color: "#0c3f6a",
    colorDark: "#f5a97f",
  },
  {
    name: "IIT Ropar",
    logo: "/logos/iitrpr.svg",
    monogram: "IR",
    color: "#2b4c9a",
    colorDark: "#8aadf4",
  },
  {
    name: "Jawahar Navodaya Vidyalaya, Ganderbal",
    logo: "/logos/nvs.svg",
    monogram: "JN",
    color: "#c2560c",
    colorDark: "#f5a97f",
  },
  {
    name: "Goonj, Delhi",
    logo: "/logos/goonj.svg",
    monogram: "G",
    color: "#8a5a12",
    colorDark: "#eed49f",
  },
  {
    name: "PartyHub",
    monogram: "P",
  },
  {
    name: "Karta Inter-University Workshops",
    aliases: ["FLAME University — Karta Initiative"],
    monogram: "K",
  },
];

const lookup = new Map<string, Organization>();
for (const org of ORGANIZATIONS) {
  lookup.set(org.name, org);
  for (const alias of org.aliases ?? []) {
    lookup.set(alias, org);
  }
}

export function getOrganization(name: string): Organization | undefined {
  return lookup.get(name);
}
