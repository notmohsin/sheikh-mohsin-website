import Image from "next/image";
import Link from "next/link";

import TagChip from "./tag-chip";
import { Badge } from "@/components/ui/badge";
import TagFilter from "@/components/ui/tag-filter";
import type { PublishedDiaryEntrySummary } from "@/lib/diary/metadata";
import { cn } from "@/lib/utils";

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
 * One diary entry as a pbb.sh-style post card: cover image on the left (when
 * the entry has one), title, date, excerpt and tags on the right. The title
 * link stretches over the card; tag chips sit above it as their own links.
 */
export function DiaryCard({
  entry,
  activeTag,
}: {
  entry: PublishedDiaryEntrySummary;
  activeTag?: string;
}) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-input/60 bg-card transition-colors hover:border-accent has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring sm:flex-row">
      {entry.cover && (
        <div className="relative aspect-[16/9] shrink-0 overflow-hidden bg-input/20 sm:aspect-auto sm:w-48 md:w-56">
          <Image
            src={entry.cover}
            alt=""
            fill
            sizes="(min-width: 48rem) 14rem, (min-width: 40rem) 12rem, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        </div>
      )}
      <div className={cn("flex min-w-0 flex-1 flex-col gap-2 p-5")}>
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
          <h3 className="text-base font-bold leading-snug text-primary-readable sm:text-lg">
            <Link
              href={`/diary/${entry.slug}`}
              className="outline-none after:absolute after:inset-0 after:content-['']"
            >
              {entry.title}
            </Link>
          </h3>
          <Badge className="shrink-0">
            {formatDiaryDate(entry.publishedAt)}
          </Badge>
        </div>
        <p className="text-sm leading-relaxed text-subtext">
          {entry.description}
        </p>
        {entry.tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 pt-1">
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
    <ul className="grid grid-cols-1 gap-5">
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
      listClassName="grid grid-cols-1 gap-5"
      items={entries.map((entry) => ({
        key: entry.slug,
        tags: entry.tags,
        node: <DiaryCard entry={entry} />,
      }))}
    />
  );
}
