import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import DiaryEntryList from "@/components/diary/entry-list";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
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
    <main
      id="main-content"
      className="flex-1 font-mono"
    >
      <div className="mx-auto flex w-full flex-none items-center justify-between px-4 pt-2 pb-2 md:p-4 md:pb-2">
        <Button
          nativeButton={false}
          render={<Link href="/diary/tags" />}
          variant="link"
          className="flex text-xs"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          <span className="underline">../tags</span>
        </Button>
        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-12 pt-3 md:pb-16 md:pt-6">
        <div className="mb-10 space-y-3 border-l-2 border-accent pl-4">
          <h1 className="text-3xl font-bold tracking-normal text-primary md:text-4xl">
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
    </main>
  );
}
