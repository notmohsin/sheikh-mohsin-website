import Link from "next/link";

import { CREDITS } from "@/lib/content/credits";

export default function Credits({ compact = false }: { compact?: boolean }) {
  const headingClass =
    compact ?
      "text-sm font-bold text-primary"
    : "text-base font-bold text-primary";

  return (
    <div className={compact ? "mt-2 flex flex-col gap-3 text-xs" : "space-y-6"}>
      <section className="space-y-2">
        <h2 className={headingClass}>Site template</h2>
        <p className="leading-relaxed text-foreground">
          This site is a fork of{" "}
          <Link
            href={CREDITS.siteTemplate.siteHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline decoration-primary/40 hover:decoration-primary"
          >
            {CREDITS.siteTemplate.siteLabel}
          </Link>{" "}
          by{" "}
          <Link
            href={CREDITS.siteTemplate.siteHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline decoration-primary/40 hover:decoration-primary"
          >
            {CREDITS.siteTemplate.author}
          </Link>
          . Implementation lives in{" "}
          <Link
            href={CREDITS.siteTemplate.repoHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline decoration-primary/40 hover:decoration-primary"
          >
            {CREDITS.siteTemplate.repoLabel}
          </Link>
          . Content, copy, and later changes are mine.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className={headingClass}>Source</h2>
        <p>
          <Link
            href={CREDITS.thisRepoHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline decoration-primary/40 hover:decoration-primary"
          >
            sheikh-mohsin-website
          </Link>
        </p>
      </section>

      <section className="space-y-2">
        <h2 className={headingClass}>Cat ASCII</h2>
        <ul className="list-disc space-y-1 pl-4 marker:text-accent">
          {CREDITS.catAscii.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline decoration-primary/40 hover:decoration-primary"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className={headingClass}>Cat sprites</h2>
        <p>
          <Link
            href={CREDITS.catSprites.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline decoration-primary/40 hover:decoration-primary"
          >
            {CREDITS.catSprites.label}
          </Link>
        </p>
      </section>

      <section className="space-y-2">
        <h2 className={headingClass}>Color scheme</h2>
        <p>
          <Link
            href={CREDITS.colors.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline decoration-primary/40 hover:decoration-primary"
          >
            {CREDITS.colors.label}
          </Link>
        </p>
      </section>
    </div>
  );
}
