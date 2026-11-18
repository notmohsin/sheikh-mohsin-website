import Link from "next/link";

import { ABOUT } from "@/lib/content/about";
import { buildIntroSection } from "@/lib/site-content";

export default function About() {
  const intro = buildIntroSection();
  const quote = ABOUT.quote;

  return (
    <div className="space-y-4">
      <p className="max-w-[68ch] text-sm leading-7 text-foreground sm:text-[0.9375rem]">
        {intro.bio}
      </p>
      {quote && (
        <figure className="max-w-[68ch] border-l-2 border-secondary-readable/60 pl-4 text-sm">
          <blockquote className="italic text-subtext">
            “{quote.text}”
          </blockquote>
          <figcaption className="mt-1 text-xs text-muted-foreground">
            —{" "}
            {quote.href ?
              <Link
                href={quote.href}
                className="underline decoration-muted-foreground/40 underline-offset-4 hover:text-secondary-readable hover:decoration-secondary-readable"
              >
                {quote.source}
              </Link>
            : quote.source}
          </figcaption>
        </figure>
      )}
    </div>
  );
}
