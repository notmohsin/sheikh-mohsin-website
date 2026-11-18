import * as React from "react";
import Link from "next/link";
import { IconChevronRight, IconTerminal2 } from "@tabler/icons-react";

import type { TerminalCommandLinkCommand } from "@/components/terminal-command-link";
import { cn } from "@/lib/utils";

/**
 * Two-column row used by every homepage section: a narrow meta gutter
 * (dates, years, category names) beside the content column. The gutter
 * collapses above the content below `lg`.
 */
const sectionRowClassName =
  "grid gap-x-10 gap-y-1 lg:grid-cols-[11rem_minmax(0,1fr)]";

/** Gutter cell. Rendered after the content in the DOM, shown first. */
const sectionMetaClassName =
  "order-first text-xs leading-6 text-muted-foreground lg:pt-0.5";

/**
 * Content cell of a row on a logo timeline: a thin rule runs from under the
 * row's OrgMark down to the next row's mark, like a `git log --graph` line.
 * The parent <li> carries `group/tl`, so the last row draws no tail. Pick the
 * tail length that matches the list's vertical spacing (space-y-10 or -8);
 * below `lg` the next row's date sits above its mark, hence the longer tail.
 */
const timelineCellClassName =
  "relative before:absolute before:left-[13px] before:top-9 before:w-px before:bg-border group-last/tl:before:hidden";
const timelineTailClassName = {
  10: "before:-bottom-16 lg:before:-bottom-9",
  8: "before:-bottom-14 lg:before:-bottom-7",
} as const;

/** Indent for anything under a timeline row's heading, clear of the rule. */
const timelineBodyClassName = "ml-10";

/** Typesets "Oct 2024 - Aug 2026" ranges with an en dash. */
function formatPeriod(period: string) {
  return period.replace(/ - /g, " – ");
}

function SectionHeading({
  id,
  command,
  className,
}: {
  id: string;
  command: TerminalCommandLinkCommand;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-4 border-b border-border pb-3",
        className,
      )}
    >
      <h2
        id={id}
        className="text-xl font-bold tracking-tight text-foreground sm:text-2xl"
      >
        {command}
      </h2>
      <Link
        href={`/terminal?cmd=${command}`}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-sm text-xs text-muted-foreground transition-colors hover:text-accent-readable"
      >
        <IconTerminal2
          className="size-3.5"
          aria-hidden="true"
        />
        <span>view in terminal</span>
        <span className="sr-only">: {command}</span>
      </Link>
    </div>
  );
}

function SectionDisclosure({
  closedLabel,
  openLabel,
  className,
  children,
}: {
  closedLabel: string;
  openLabel: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <details className={cn("group/more", className)}>
      <summary className="inline-flex w-fit cursor-pointer list-none items-center gap-1.5 rounded-sm text-sm text-accent-readable underline decoration-accent-readable/40 underline-offset-4 transition-colors hover:decoration-accent-readable [&::-webkit-details-marker]:hidden">
        <IconChevronRight
          aria-hidden="true"
          className="size-4 transition-transform group-open/more:rotate-90 motion-reduce:transition-none"
        />
        <span className="group-open/more:hidden">{closedLabel}</span>
        <span className="hidden group-open/more:inline">{openLabel}</span>
      </summary>
      <div className="mt-8">{children}</div>
    </details>
  );
}

export {
  SectionHeading,
  SectionDisclosure,
  formatPeriod,
  sectionRowClassName,
  sectionMetaClassName,
  timelineBodyClassName,
  timelineCellClassName,
  timelineTailClassName,
};
