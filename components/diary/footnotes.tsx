import type { ReactNode } from "react";

/**
 * Inline footnote marker. Pair each `<FootnoteRef id="1" />` in the prose
 * with a matching `<Footnote id="1">` inside `<Footnotes>` at the end.
 */
export function FootnoteRef({ id }: { id: string }) {
  return (
    <sup
      id={`fnref-${id}`}
      className="ml-0.5 text-[0.7em] leading-none"
    >
      <a
        href={`#fn-${id}`}
        aria-describedby="footnotes-heading"
        className="text-accent-readable no-underline hover:underline"
      >
        {id}
      </a>
    </sup>
  );
}

export function Footnote({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <li
      id={`fn-${id}`}
      className="scroll-mt-24 pl-1 text-sm leading-relaxed text-muted-foreground"
    >
      {children}{" "}
      <a
        href={`#fnref-${id}`}
        aria-label={`Back to reference ${id}`}
        className="text-accent-readable no-underline hover:underline"
      >
        ↩
      </a>
    </li>
  );
}

export function Footnotes({ children }: { children: ReactNode }) {
  return (
    <section
      aria-labelledby="footnotes-heading"
      className="mt-12 border-t border-border pt-6"
    >
      <h2
        id="footnotes-heading"
        className="sr-only"
      >
        Footnotes
      </h2>
      <ol className="ml-5 list-decimal space-y-2 marker:text-muted-foreground">
        {children}
      </ol>
    </section>
  );
}
