import fs from "node:fs/promises";
import path from "node:path";
import type { MetadataRoute } from "next";
import { getPublishedDiaryEntries } from "@/lib/diary/entries";
import { SEO } from "@/lib/content/seo";
import { tagHref } from "@/lib/diary/tags";
import {
  dateStringToUtcDate,
  type PublishedDiaryEntrySummary,
} from "@/lib/diary/metadata";

type SitemapEntry = Pick<
  PublishedDiaryEntrySummary,
  "slug" | "updatedAt" | "tags"
>;

async function getCvLastModified() {
  const stats = await fs.stat(path.join(process.cwd(), "public", "cv.pdf"));

  return stats.mtime;
}

/** The tag index plus one page per tag, dated by its newest entry. */
function buildTagEntries(
  diaryEntries: readonly SitemapEntry[],
  latestDiaryUpdate: SitemapEntry["updatedAt"],
): MetadataRoute.Sitemap {
  const latestByTag = new Map<string, SitemapEntry["updatedAt"]>();
  for (const entry of diaryEntries) {
    for (const tag of entry.tags) {
      const current = latestByTag.get(tag);
      if (!current || entry.updatedAt > current) {
        latestByTag.set(tag, entry.updatedAt);
      }
    }
  }

  if (latestByTag.size === 0) {
    return [];
  }

  return [
    {
      url: `${SEO.url}/diary/tags`,
      lastModified: dateStringToUtcDate(latestDiaryUpdate),
    },
    ...[...latestByTag].sort().map(([tag, updatedAt]) => ({
      url: `${SEO.url}${tagHref(tag)}`,
      lastModified: dateStringToUtcDate(updatedAt),
    })),
  ];
}

export function buildSitemapEntries({
  diaryEntries,
  cvLastModified,
}: {
  diaryEntries: readonly SitemapEntry[];
  cvLastModified: Date;
}): MetadataRoute.Sitemap {
  const latestDiaryUpdate =
    diaryEntries
      .map((entry) => entry.updatedAt)
      .sort()
      .at(-1) ?? SEO.updatedAt;

  return [
    {
      url: SEO.url,
      lastModified: dateStringToUtcDate(SEO.updatedAt),
    },
    {
      url: `${SEO.url}/credits`,
      lastModified: dateStringToUtcDate(SEO.updatedAt),
    },
    {
      url: `${SEO.url}/now`,
      lastModified: dateStringToUtcDate(SEO.updatedAt),
    },
    {
      url: `${SEO.url}/uses`,
      lastModified: dateStringToUtcDate(SEO.updatedAt),
    },
    {
      url: `${SEO.url}/music`,
      lastModified: dateStringToUtcDate(SEO.updatedAt),
    },
    {
      url: `${SEO.url}/guestbook`,
      lastModified: dateStringToUtcDate(SEO.updatedAt),
    },
    {
      url: `${SEO.url}/cv.pdf`,
      lastModified: cvLastModified,
    },
    {
      url: `${SEO.url}/diary`,
      lastModified: dateStringToUtcDate(latestDiaryUpdate),
    },
    ...diaryEntries.map((entry) => ({
      url: `${SEO.url}/diary/${entry.slug}`,
      lastModified: dateStringToUtcDate(entry.updatedAt),
    })),
    ...buildTagEntries(diaryEntries, latestDiaryUpdate),
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [diaryEntries, cvLastModified] = await Promise.all([
    getPublishedDiaryEntries(),
    getCvLastModified(),
  ]);

  return buildSitemapEntries({
    diaryEntries,
    cvLastModified,
  });
}
