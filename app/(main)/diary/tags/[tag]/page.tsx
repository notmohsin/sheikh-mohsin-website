import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import DiaryEntryList from "@/components/diary/entry-list";
import { getPublishedDiaryEntries } from "@/lib/diary/entries";
import { countDiaryTags, tagHref } from "@/lib/diary/tags";

type DiaryTagPageProps = {
  params: Promise<{ tag: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const tags = countDiaryTags(await getPublishedDiaryEntries());

  return tags.map(({ tag }) => ({ tag }));
}

export async function generateMetadata({
  params,
}: DiaryTagPageProps): Promise<Metadata> {
  const tag = decodeURIComponent((await params).tag);

  return {
    title: `#${tag} | Diary`,
    description: `Diary entries tagged ${tag}.`,
    alternates: { canonical: tagHref(tag) },
  };
}

export default async function DiaryTagPage({ params }: DiaryTagPageProps) {
  const tag = decodeURIComponent((await params).tag);
  const entries = (await getPublishedDiaryEntries()).filter((entry) =>
    entry.tags.includes(tag),
  );

  if (entries.length === 0) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Link
        href="/diary/tags"
        className="inline-block text-xs text-muted-foreground underline decoration-muted-foreground/40 underline-offset-4 hover:text-foreground"
      >
        ← all tags
      </Link>
      <div className="space-y-3">
        <h1 className="inline-block border-b-2 border-accent pb-1.5 text-2xl font-bold tracking-tight text-foreground">
          #{tag}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {entries.length} {entries.length === 1 ? "entry" : "entries"}.{" "}
          <Link
            href="/diary"
            className="underline decoration-muted-foreground/40 underline-offset-4 hover:text-foreground"
          >
            all entries
          </Link>
        </p>
      </div>

      <DiaryEntryList
        entries={entries}
        activeTag={tag}
      />
    </div>
  );
}
