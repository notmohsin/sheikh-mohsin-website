import Link from "next/link";

import { formatDiaryDate } from "./diary/entry-list";
import TagChip from "./diary/tag-chip";
import {
  SectionHeading,
  sectionMetaClassName,
  sectionRowClassName,
} from "./ui/section";
import { getPublishedDiaryEntries } from "@/lib/diary/entries";

/**
 * Diary entries marked `featured: true`, newest first, with a link to the
 * full diary. Renders nothing until at least one entry is featured.
 */
export default async function Writing() {
  const entries = await getPublishedDiaryEntries();
  const featured = entries.filter((entry) => entry.featured);

  if (featured.length === 0) {
    return null;
  }

  return (
    <>
      <SectionHeading
        id="writing-heading"
        command="diary"
      />

      <ol className="space-y-8">
        {featured.map((entry) => (
          <li
            key={entry.slug}
            className={sectionRowClassName}
          >
            <div className="min-w-0 max-w-[72ch] space-y-2">
              <h3 className="text-base font-bold leading-snug text-primary-readable sm:text-lg">
                <Link
                  href={`/diary/${entry.slug}`}
                  className="underline decoration-primary-readable/30 underline-offset-4 hover:decoration-primary-readable"
                >
                  {entry.title}
                </Link>
              </h3>
              <p className="text-sm leading-relaxed text-foreground">
                {entry.description}
              </p>
              {entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {entry.tags.map((tag) => (
                    <TagChip
                      key={tag}
                      tag={tag}
                    />
                  ))}
                </div>
              )}
            </div>
            <p className={sectionMetaClassName}>
              {formatDiaryDate(entry.publishedAt)}
            </p>
          </li>
        ))}
      </ol>

      <div className={sectionRowClassName}>
        <Link
          href="/diary"
          className="w-fit text-sm text-accent-readable underline decoration-accent-readable/40 underline-offset-4 hover:decoration-accent-readable xl:col-start-2"
        >
          Read all {entries.length} diary entries
        </Link>
      </div>
    </>
  );
}
