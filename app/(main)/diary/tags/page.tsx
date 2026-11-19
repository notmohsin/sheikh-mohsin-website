import type { Metadata } from "next";
import Link from "next/link";

import { wireHeadingClassName } from "@/components/ui/section";
import { cn } from "@/lib/utils";

import TagChip from "@/components/diary/tag-chip";
import { getPublishedDiaryEntries } from "@/lib/diary/entries";
import { countDiaryTags } from "@/lib/diary/tags";

export const metadata: Metadata = {
  title: "Diary tags",
  description: "Every tag used in the diary, with how many entries carry it.",
  alternates: { canonical: "/diary/tags" },
};

export default async function DiaryTagsPage() {
  const tags = countDiaryTags(await getPublishedDiaryEntries());

  return (
    <div className="space-y-8">
      <Link
        href="/diary"
        className="inline-block text-xs text-muted-foreground underline decoration-muted-foreground/40 underline-offset-4 hover:text-foreground"
      >
        ← diary
      </Link>
      <div className="space-y-3">
        <h1 className={cn(wireHeadingClassName, "text-2xl")}>tags</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {tags.length} {tags.length === 1 ? "tag" : "tags"} across the diary.
          Pick one to see its entries.
        </p>
      </div>

      <ul className="flex flex-wrap gap-3">
        {tags.map(({ tag, count }) => (
          <li key={tag}>
            <TagChip
              tag={tag}
              count={count}
              className="px-3 py-1 text-sm"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
