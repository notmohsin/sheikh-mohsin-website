import type { Metadata } from "next";
import Link from "next/link";

import { FilterableDiaryList } from "@/components/diary/entry-list";
import { wireHeadingClassName } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { getPublishedDiaryEntries } from "@/lib/diary/entries";
import { ABOUT, DIARY_DESCRIPTION } from "@/lib/content/site";

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
        <h1 className={cn(wireHeadingClassName, "text-2xl")}>diary</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          An SEO-friendly albeit random archive of my thoughts, learnings, and
          interests. Browse by{" "}
          <Link
            href="/diary/tags"
            className="underline decoration-muted-foreground/40 underline-offset-4 hover:text-foreground"
          >
            tag
          </Link>{" "}
          or follow along with{" "}
          <a
            href="/rss.xml"
            className="underline decoration-muted-foreground/40 underline-offset-4 hover:text-foreground"
          >
            RSS
          </a>
          .
        </p>
      </div>

      <FilterableDiaryList entries={entries} />
    </div>
  );
}
