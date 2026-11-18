import Link from "next/link";

import TagChip from "./tag-chip";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
 * Diary entries as cards. The title link stretches over the whole card, and
 * the tag chips sit above it as their own links, so there are no nested
 * anchors.
 */
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
          <Card
            variant="interactive"
            className="relative has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring"
          >
            <CardHeader className="px-0">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <CardTitle className="text-lg text-primary">
                  <Link
                    href={`/diary/${entry.slug}`}
                    className="outline-none after:absolute after:inset-0 after:content-['']"
                  >
                    {entry.title}
                  </Link>
                </CardTitle>
                <Badge>{formatDiaryDate(entry.publishedAt)}</Badge>
              </div>
              <CardDescription className="text-sm">
                {entry.description}
              </CardDescription>
            </CardHeader>
            {entry.tags.length > 0 && (
              <CardContent className="px-0">
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <TagChip
                      key={tag}
                      tag={tag}
                      active={tag === activeTag}
                    />
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        </li>
      ))}
    </ul>
  );
}
