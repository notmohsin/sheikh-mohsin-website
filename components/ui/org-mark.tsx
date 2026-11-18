import type { CSSProperties } from "react";

import { getOrganization } from "@/lib/content/organizations";
import { cn } from "@/lib/utils";

/**
 * Small mark for an organization: its logo on a light tile (logos are drawn
 * for white backgrounds, so the tile stays light in dark mode too), or a
 * monogram badge when no logo is on file. Decorative: the name is always
 * printed next to it.
 */
export default function OrgMark({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const org = getOrganization(name);
  const base =
    "flex h-7 min-w-7 shrink-0 items-center justify-center rounded-md ring-1 ring-border";

  if (org?.logo) {
    const aspect = org.logoAspect ?? 1;

    return (
      <span
        aria-hidden="true"
        className={cn(base, "bg-white p-0.5 dark:bg-[#e6e9ef]", className)}
        style={{ width: `${1.5 * aspect + 0.25}rem` }}
      >
        {/* Plain <img>: tiny static SVGs gain nothing from next/image. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={org.logo}
          alt=""
          width={Math.round(24 * aspect)}
          height={24}
          loading="lazy"
          decoding="async"
          className="h-6 w-auto object-contain"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        base,
        "w-7 bg-card text-[0.625rem] font-bold tracking-tight text-primary-readable",
        className,
      )}
    >
      {org?.monogram ?? name.charAt(0)}
    </span>
  );
}

/**
 * An organization named inside running text, in its brand colour with a
 * small inline logo. Usable from MDX as `<Org name="FLAME University" />`.
 * Unknown names render as plain text.
 */
export function OrgMention({
  name,
  label,
}: {
  name: string;
  /** Text to show, when it differs from the registry name. */
  label?: string;
}) {
  const org = getOrganization(name);
  const text = label ?? name;

  if (!org) {
    return <>{text}</>;
  }

  const style = {
    "--org": org.color ?? "var(--primary)",
    "--org-dark": org.colorDark ?? org.color ?? "var(--primary)",
  } as CSSProperties;

  return (
    <span
      style={style}
      className="whitespace-nowrap font-semibold text-(--org) dark:text-(--org-dark)"
    >
      {org.logo && !org.logoAspect && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={org.logo}
          alt=""
          aria-hidden="true"
          width={16}
          height={16}
          className="mr-1 inline-block size-[1.1em] rounded-[3px] bg-white p-px align-[-0.2em] dark:bg-[#e6e9ef]"
        />
      )}
      {text}
    </span>
  );
}
