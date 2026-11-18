import fs from "node:fs/promises";
import path from "node:path";

import { slugifyHeading } from "./slug";

export type DiaryHeading = {
  depth: 2 | 3;
  text: string;
  id: string;
};

/** Drops inline Markdown so "On *home*" reads "On home". */
function plainText(markdown: string) {
  return markdown
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/(\*\*|__|\*|_)(.+?)\1/g, "$2")
    .replace(/<[^>]+>/g, "")
    .trim();
}

/** The `##` and `###` headings of an MDX source, skipping fenced code. */
export function extractHeadings(source: string): DiaryHeading[] {
  const headings: DiaryHeading[] = [];
  let inFence = false;

  for (const line of source.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) {
      continue;
    }

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) {
      continue;
    }

    const text = plainText(match[2]);
    headings.push({
      depth: match[1].length as 2 | 3,
      text,
      id: slugifyHeading(text),
    });
  }

  return headings;
}

export async function getDiaryEntryHeadings(slug: string) {
  const source = await fs.readFile(
    path.join(process.cwd(), "diary", `${slug}.mdx`),
    "utf8",
  );

  return extractHeadings(source);
}
