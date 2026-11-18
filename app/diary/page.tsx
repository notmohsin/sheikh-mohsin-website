import type { Metadata } from "next";
import Link from "next/link";

import DiaryEntryList from "@/components/diary/entry-list";
import TagChip from "@/components/diary/tag-chip";
import { Button } from "@/components/ui/button";
import { getPublishedDiaryEntries } from "@/lib/diary/entries";
import { countDiaryTags } from "@/lib/diary/tags";
import { ABOUT } from "@/lib/content/about";
import { DIARY_DESCRIPTION } from "@/lib/content/seo";
import ThemeToggle from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Diary",
  description: DIARY_DESCRIPTION,
  alternates: {
    canonical: "/diary",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    title: `Diary | ${ABOUT.name}`,
    description: DIARY_DESCRIPTION,
    url: "/diary",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Diary | ${ABOUT.name}`,
    description: DIARY_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function DiaryPage() {
  const entries = await getPublishedDiaryEntries();
  const tags = countDiaryTags(entries);

  return (
    <main
      id="main-content"
      className="flex-1 font-mono"
    >
      {/* TODO: add cmd-k search bar and theme toggle */}
      <div className="mx-auto flex w-full flex-none items-center justify-between px-4 pt-2 pb-2 md:p-4 md:pb-2">
        <Button
          nativeButton={false}
          render={<Link href="/" />}
          variant="link"
          className="flex text-xs"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          <span className="underline">../home</span>
        </Button>
        <ThemeToggle />
      </div>

      {/* TODO: add rss feed viewer icon so that people know it is present */}
      <div className="mx-auto max-w-3xl px-6 pb-12 pt-3 md:pb-16 md:pt-6">
        <div className="mb-10 space-y-3 border-l-2 border-accent pl-4">
          <h1 className="text-3xl font-bold tracking-normal text-primary md:text-4xl">
            diary
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            An SEO-friendly albeit random archive of my thoughts, learnings, and
            interests.
          </p>
        </div>

        {tags.length > 0 && (
          <nav
            aria-label="Diary tags"
            className="mb-8 flex flex-wrap items-center gap-2"
          >
            <Link
              href="/diary/tags"
              className="mr-1 text-xs text-muted-foreground underline decoration-muted-foreground/40 underline-offset-4 hover:text-foreground"
            >
              tags:
            </Link>
            {tags.map(({ tag, count }) => (
              <TagChip
                key={tag}
                tag={tag}
                count={count}
              />
            ))}
          </nav>
        )}

        <DiaryEntryList entries={entries} />
      </div>
    </main>
  );
}
