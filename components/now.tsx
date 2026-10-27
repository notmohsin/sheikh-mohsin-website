import Link from "next/link";

import { NOW } from "@/lib/content/now";

export default function Now({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "mt-2 flex flex-col gap-3 text-xs" : "space-y-4"}>
      <p className="text-sm text-secondary">
        {NOW.location} · as of {NOW.asOf}
      </p>
      {NOW.lines.map((line) => (
        <p
          key={line}
          className="leading-relaxed text-foreground"
        >
          {line}
        </p>
      ))}
      <p className="text-sm leading-relaxed text-muted-foreground">
        If that date is old, treat the rest as old too. The series lives on{" "}
        <Link
          href="https://feelingsandnumbers.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline decoration-primary/40 hover:decoration-primary"
        >
          Substack
        </Link>{" "}
        and in the{" "}
        <Link
          href="/diary/on-home-belonging-and-kashmir"
          className="text-primary underline decoration-primary/40 hover:decoration-primary"
        >
          diary
        </Link>
        .
      </p>
    </div>
  );
}
