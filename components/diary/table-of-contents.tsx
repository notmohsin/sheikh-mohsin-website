"use client";

import { useEffect, useState } from "react";

import type { DiaryHeading } from "@/lib/diary/headings";
import { cn } from "@/lib/utils";

/** Entries with fewer headings than this read fine without a contents list. */
const MIN_HEADINGS = 2;

function useActiveHeading(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) {
      return;
    }

    // The active section is the last heading that has scrolled past the top
    // quarter of the viewport.
    const observer = new IntersectionObserver(
      () => {
        const line = window.innerHeight * 0.25;
        let current: string | null = null;
        for (const element of elements) {
          if (element.getBoundingClientRect().top <= line) {
            current = element.id;
          }
        }
        setActive(current ?? elements[0].id);
      },
      { rootMargin: "0px 0px -75% 0px", threshold: [0, 1] },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function ContentsList({
  headings,
  active,
}: {
  headings: readonly DiaryHeading[];
  active: string | null;
}) {
  return (
    <ol className="space-y-1.5 text-xs leading-snug">
      {headings.map((heading) => (
        <li
          key={heading.id}
          className={cn(heading.depth === 3 && "pl-3")}
        >
          <a
            href={`#${heading.id}`}
            aria-current={active === heading.id ? "location" : undefined}
            className={cn(
              "block border-l-2 py-0.5 pl-2 transition-colors",
              active === heading.id ?
                "border-accent text-primary-readable"
              : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/**
 * Contents for a long diary entry: a collapsible block above the text on
 * small screens, and a sticky list in the left margin on wide ones, with the
 * section being read highlighted. Renders nothing for short entries.
 */
export default function TableOfContents({
  headings,
}: {
  headings: readonly DiaryHeading[];
}) {
  const [ids] = useState(() => headings.map((heading) => heading.id));
  const active = useActiveHeading(ids);

  if (headings.length < MIN_HEADINGS) {
    return null;
  }

  return (
    <>
      <details className="group/toc mb-10 border border-border bg-card/40 px-4 py-3 xl:hidden">
        <summary className="cursor-pointer list-none text-xs font-bold text-secondary-readable [&::-webkit-details-marker]:hidden">
          <span className="mr-1.5 inline-block transition-transform group-open/toc:rotate-90 motion-reduce:transition-none">
            ›
          </span>
          contents
        </summary>
        <nav
          aria-label="Contents"
          className="mt-3"
        >
          <ContentsList
            headings={headings}
            active={active}
          />
        </nav>
      </details>

      <nav
        aria-label="Contents"
        className="fixed top-28 hidden max-h-[calc(100dvh-10rem)] w-52 overflow-y-auto xl:left-[max(1rem,calc(50%-24rem-15rem))] xl:block"
      >
        <p className="mb-3 text-xs font-bold text-secondary-readable">
          contents
        </p>
        <ContentsList
          headings={headings}
          active={active}
        />
      </nav>
    </>
  );
}
