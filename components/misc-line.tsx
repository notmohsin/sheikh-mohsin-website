import Link from "next/link";
import type { ReactNode } from "react";

import { OrgMention } from "./ui/org-mark";
import { ABOUT } from "@/lib/content/about";
import { externalLinkProps } from "@/lib/utils";

const TOKEN = /\{([^}|]+)(?:\|([^}]+))?\}|\[([^\]]+)\]\(([^)]+)\)/g;

/** Expands `{Org}`, `{Org|label}` and `[text](href)` inside a plain string. */
export function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) {
      nodes.push(text.slice(last, index));
    }

    const [, orgName, orgLabel, linkText, href] = match;
    if (orgName) {
      nodes.push(
        <OrgMention
          key={index}
          name={orgName}
          label={orgLabel}
        />,
      );
    } else {
      nodes.push(
        <Link
          key={index}
          href={href}
          {...externalLinkProps(href)}
          className="text-accent-readable underline decoration-accent-readable/40 underline-offset-4 hover:decoration-accent-readable"
        >
          {linkText}
        </Link>,
      );
    }
    last = index + match[0].length;
  }

  if (last < text.length) {
    nodes.push(text.slice(last));
  }

  return nodes;
}

/** The closing line of the homepage, after every section. */
export default function MiscLine() {
  if (!ABOUT.misc) {
    return null;
  }

  return (
    <p className="max-w-[72ch] border-t border-border pt-8 text-sm leading-7 text-subtext">
      <span
        aria-hidden="true"
        className="mr-2 text-muted-foreground"
      >
        ~
      </span>
      {renderInline(ABOUT.misc)}
    </p>
  );
}
