import type { Metadata } from "next";
import Link from "next/link";

import TagChip from "@/components/diary/tag-chip";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
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
    <main
      id="main-content"
      className="flex-1 font-mono"
    >
      <div className="mx-auto flex w-full flex-none items-center justify-between px-4 pt-2 pb-2 md:p-4 md:pb-2">
        <Button
          nativeButton={false}
          render={<Link href="/diary" />}
          variant="link"
          className="flex text-xs"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          <span className="underline">../diary</span>
        </Button>
        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-12 pt-3 md:pb-16 md:pt-6">
        <div className="mb-10 space-y-3 border-l-2 border-accent pl-4">
          <h1 className="text-3xl font-bold tracking-normal text-primary md:text-4xl">
            tags
          </h1>
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
    </main>
  );
}
