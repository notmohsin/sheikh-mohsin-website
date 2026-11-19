import Image from "next/image";
import Link from "next/link";

import TagChip from "./tag-chip";
import TagFilter from "@/components/ui/tag-filter";
import type { PublishedDiaryEntrySummary } from "@/lib/diary/metadata";

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDiaryDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00.000Z`));
}

/**
 * One diary entry as an open row: cover thumbnail (when the entry has one),
 * then title, date, excerpt and tags. The title link stretches over the row;
 * tag chips sit above it as their own links.
 */
export function DiaryCard({
  entry,
  activeTag,
}: {
  entry: PublishedDiaryEntrySummary;
  activeTag?: string;
}) {
  return (
    <article className="group relative flex flex-col gap-4 rounded-md has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring has-[a:focus-visible]:ring-offset-4 has-[a:focus-visible]:ring-offset-background sm:flex-row sm:gap-6">
      {entry.cover && (
        <div className="relative aspect-[16/9] shrink-0 overflow-hidden rounded-md bg-input/20 ring-1 ring-border sm:aspect-[4/3] sm:w-40">
          <Image
            src={entry.cover}
            alt=""
            fill
            sizes="(min-width: 40rem) 10rem, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="text-xs text-muted-foreground">
          <time dateTime={entry.publishedAt}>
            {formatDiaryDate(entry.publishedAt)}
          </time>
        </p>
        <h3 className="text-base font-bold leading-snug text-primary-readable sm:text-lg">
          <Link
            href={`/diary/${entry.slug}`}
            className="underline decoration-primary-readable/0 underline-offset-4 outline-none transition-colors group-hover:decoration-primary-readable/60 after:absolute after:inset-0 after:content-['']"
          >
            {entry.title}
          </Link>
        </h3>
        <p className="max-w-[68ch] text-sm leading-relaxed text-subtext">
          {entry.description}
        </p>
        {entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {entry.tags.map((tag) => (
              <TagChip
                key={tag}
                tag={tag}
                active={tag === activeTag}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

/** A plain list of diary cards (used on tag pages). */
export default function DiaryEntryList({
  entries,
  activeTag,
}: {
  entries: readonly PublishedDiaryEntrySummary[];
  activeTag?: string;
}) {
  return (
    <ul className="space-y-10">
      {entries.map((entry) => (
        <li key={entry.slug}>
          <DiaryCard
            entry={entry}
            activeTag={activeTag}
          />
        </li>
      ))}
    </ul>
  );
}

/** Diary cards behind a pbb.sh-style tag filter panel. */
export function FilterableDiaryList({
  entries,
}: {
  entries: readonly PublishedDiaryEntrySummary[];
}) {
  return (
    <TagFilter
      listClassName="space-y-10"
      items={entries.map((entry) => ({
        key: entry.slug,
        tags: entry.tags,
        node: <DiaryCard entry={entry} />,
      }))}
    />
  );
}
