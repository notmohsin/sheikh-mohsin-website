"use client";

import { useMemo, useState, type ReactNode } from "react";

import { tagColorClassName } from "@/lib/diary/tags";
import { cn } from "@/lib/utils";

export type FilterItem = {
  key: string;
  tags: readonly string[];
  node: ReactNode;
};

/**
 * pbb.sh-style filter panel: clickable tag chips above a list. With nothing
 * selected every item shows; otherwise items carrying any selected tag show.
 * The items are rendered on the server and passed in as nodes.
 */
export default function TagFilter({
  items,
  listClassName,
  itemClassName,
}: {
  items: readonly FilterItem[];
  listClassName?: string;
  itemClassName?: string;
}) {
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of items) {
      for (const tag of item.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [items]);

  const visible =
    selected.size === 0 ?
      items
    : items.filter((item) => item.tags.some((tag) => selected.has(tag)));

  function toggle(tag: string) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  }

  return (
    <div className="space-y-6">
      {tags.length > 1 && (
        <fieldset className="relative rounded-xl border border-input/70 px-4 pt-4 pb-3">
          <legend className="px-2 text-xs text-muted-foreground">
            filters
          </legend>
          <div className="flex flex-wrap items-center gap-2">
            {tags.map(([tag, count]) => {
              const on = selected.has(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(tag)}
                  className={cn(
                    "inline-flex cursor-pointer items-center gap-1 rounded px-2 py-0.5 text-[11px] transition-[opacity,box-shadow]",
                    tagColorClassName(tag),
                    on ?
                      "ring-1 ring-current"
                    : selected.size > 0 && "opacity-60 hover:opacity-100",
                  )}
                >
                  {tag}
                  <span className="text-muted-foreground">{count}</span>
                </button>
              );
            })}
            {selected.size > 0 && (
              <button
                type="button"
                onClick={() => setSelected(new Set())}
                className="ml-1 cursor-pointer text-xs text-muted-foreground underline decoration-muted-foreground/40 underline-offset-4 hover:text-foreground"
              >
                clear
              </button>
            )}
          </div>
          <p
            aria-live="polite"
            className="mt-2 text-[11px] text-muted-foreground"
          >
            {selected.size > 0 ?
              `showing ${visible.length} of ${items.length}`
            : `${items.length} in total`}
          </p>
        </fieldset>
      )}

      <ul className={listClassName}>
        {visible.map((item) => (
          <li
            key={item.key}
            className={itemClassName}
          >
            {item.node}
          </li>
        ))}
      </ul>
    </div>
  );
}
