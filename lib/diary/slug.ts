/**
 * Anchor id for a diary heading. Used both when rendering headings
 * (mdx-components.tsx) and when listing them for the table of contents
 * (lib/diary/headings.ts), so contents links always land.
 */
export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
