import Link from "next/link";

import { tagColorClassName, tagHref } from "@/lib/diary/tags";
import { cn } from "@/lib/utils";

/** A diary tag that links to every entry carrying it. */
export default function TagChip({
  tag,
  count,
  active = false,
  className,
}: {
  tag: string;
  count?: number;
  active?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={tagHref(tag)}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative z-10 inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] transition-[filter,box-shadow] hover:brightness-110 hover:ring-1 hover:ring-current/40",
        tagColorClassName(tag),
        active && "ring-1 ring-current",
        className,
      )}
    >
      <span aria-hidden="true">#</span>
      {tag}
      {count !== undefined && (
        <span className="text-muted-foreground">{count}</span>
      )}
    </Link>
  );
}
