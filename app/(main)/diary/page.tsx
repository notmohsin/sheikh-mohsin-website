import type { Metadata } from "next";
import Link from "next/link";

import { FilterableDiaryList } from "@/components/diary/entry-list";
import { getPublishedDiaryEntries } from "@/lib/diary/entries";
import { ABOUT } from "@/lib/content/about";
import { DIARY_DESCRIPTION } from "@/lib/content/seo";

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

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="inline-flex items-center gap-2 border-b-2 border-accent pb-1.5 text-2xl font-bold tracking-tight text-foreground">
          <span
            aria-hidden="true"
            className="text-xl"
          >
            📝
          </span>
          diary
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          An SEO-friendly albeit random archive of my thoughts, learnings, and
          interests.{" "}
          <Link
            href="/diary/tags"
            className="underline decoration-muted-foreground/40 underline-offset-4 hover:text-foreground"
          >
            browse by tag
          </Link>{" "}
          ·{" "}
          <a
            href="/rss.xml"
            className="underline decoration-muted-foreground/40 underline-offset-4 hover:text-foreground"
          >
            rss
          </a>
        </p>
      </div>

      <FilterableDiaryList entries={entries} />
    </div>
  );
}
