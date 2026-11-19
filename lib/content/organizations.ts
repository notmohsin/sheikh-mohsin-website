/**
 * Organization marks shown next to experience, education, and leadership
 * entries. An entry with a `logo` renders that file from /public/logos; one
 * without falls back to a monogram badge in the site palette.
 *
 * Logos are the organizations' own marks (2026-11-19), used only to identify
 * where Mohsin studied or worked. All are SVG: FLAME's is its official vector
 * shield and wordmark rearranged side by side; IIT Ropar, Navodaya, Goonj and
 * Karta only publish rasters, so theirs are traces of the official images.
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
  /** Official website; the organization's name links here wherever it appears. */
  href?: string;
}

export const ORGANIZATIONS: Organization[] = [
  {
    name: "FLAME University",
    logo: "/logos/flame.svg",
    logoAspect: 168 / 64,
    monogram: "F",
    color: "#0c3f6a",
    colorDark: "#f5a97f",
    href: "https://www.flame.edu.in",
  },
  {
    // A FLAME program, so it carries the FLAME mark but links to its own site.
    name: "Discover India Program (DIP)",
    logo: "/logos/flame.svg",
    logoAspect: 168 / 64,
    monogram: "D",
    color: "#0c3f6a",
    colorDark: "#f5a97f",
    href: "https://dip.flame.edu.in/about/about-dip/",
  },
  {
    name: "IIT Ropar",
    logo: "/logos/iitrpr.svg",
    monogram: "IR",
    color: "#2b4c9a",
    colorDark: "#8aadf4",
    href: "https://www.iitrpr.ac.in",
  },
  {
    name: "Jawahar Navodaya Vidyalaya, Ganderbal",
    logo: "/logos/nvs.svg",
    monogram: "JN",
    color: "#c2560c",
    colorDark: "#f5a97f",
    href: "https://navodaya.gov.in/nvs/nvs-school/GANDERBAL/en/home",
  },
  {
    name: "Goonj, Delhi",
    logo: "/logos/goonj.svg",
    monogram: "G",
    color: "#8a5a12",
    colorDark: "#eed49f",
    href: "https://goonj.org",
  },
  {
    name: "PartyHub",
    monogram: "P",
  },
  {
    name: "Karta Inter-University Workshops",
    aliases: ["FLAME University — Karta Initiative"],
    logo: "/logos/karta.svg",
    logoAspect: 1275 / 639,
    monogram: "K",
    color: "#c97a12",
    colorDark: "#f5b93f",
    href: "https://karta-initiative.org.in/",
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
