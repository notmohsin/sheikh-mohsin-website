import type { PublishedDiaryEntrySummary } from "@/lib/diary/metadata";

/**
 * Chip colours for diary tags, drawn from the site's Catppuccin tokens. A tag
 * keeps the same colour everywhere because the pick is a hash of its name.
 */
const TAG_COLOR_CLASSNAMES = [
  "bg-primary/12 text-primary-readable",
  "bg-secondary/14 text-secondary-readable",
  "bg-accent/14 text-accent-readable",
  "bg-success/16 text-foreground",
  "bg-warning/20 text-foreground",
  "bg-destructive/14 text-foreground",
] as const;

export function tagColorClassName(tag: string) {
  let hash = 0;
  for (const char of tag) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return TAG_COLOR_CLASSNAMES[hash % TAG_COLOR_CLASSNAMES.length];
}

export function tagHref(tag: string) {
  return `/diary/tags/${encodeURIComponent(tag)}`;
}

export type DiaryTagCount = { tag: string; count: number };

/** Every tag in use, most-used first, then alphabetical. */
export function countDiaryTags(
  entries: readonly Pick<PublishedDiaryEntrySummary, "tags">[],
): DiaryTagCount[] {
  const counts = new Map<string, number>();
  for (const entry of entries) {
    for (const tag of entry.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
