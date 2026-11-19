import Link from "next/link";
import type { ReactNode } from "react";

import { OrgMention } from "./org-mark";
import { externalLinkProps } from "@/lib/utils";

/**
 * `{Org}` / `{Org|label}` → organization mention, `[text](href)` → link,
 * `**text**` → accent bold, `*text*` → italic with a soft accent underline.
 */
const TOKEN =
  /\{([^}|]+)(?:\|([^}]+))?\}|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;

/** Expands the small inline markup used in profile copy into React nodes. */
export function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) {
      nodes.push(text.slice(last, index));
    }

    const [, orgName, orgLabel, linkText, href, bold, italic] = match;
    if (orgName) {
      nodes.push(
        <OrgMention
          key={index}
          name={orgName}
          label={orgLabel}
        />,
      );
    } else if (linkText && href) {
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
    } else if (bold) {
      nodes.push(
        <strong
          key={index}
          className="font-semibold text-accent-readable"
        >
          {bold}
        </strong>,
      );
    } else if (italic) {
      nodes.push(
        <em
          key={index}
          className="italic underline decoration-accent-readable/40 decoration-[1.5px] underline-offset-2"
        >
          {italic}
        </em>,
      );
    }
    last = index + match[0].length;
  }

  if (last < text.length) {
    nodes.push(text.slice(last));
  }

  return nodes;
}
