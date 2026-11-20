import Link from "next/link";
import Image from "next/image";
import {
  IconFileCv,
  IconMail,
  IconMapPin,
  IconTerminal2,
} from "@tabler/icons-react";

import { ABOUT, SOCIALS } from "@/lib/content/site";
import { PRIMARY_RESUME_PATH } from "@/lib/cv";
import { externalLinkProps } from "@/lib/utils";

const MORE_PAGES = [
  ["/now", "now"],
  ["/uses", "uses"],
  ["/music", "music"],
  ["/guestbook", "guestbook"],
  ["/resumes", "résumés"],
] as const;

function Avatar() {
  if (ABOUT.avatar) {
    return (
      <Image
        src={ABOUT.avatar}
        alt={ABOUT.name}
        width={288}
        height={288}
        priority
        className="size-28 rounded-[2rem] object-cover ring-1 ring-border lg:size-40 lg:rounded-[2.5rem]"
      />
    );
  }

  // Until a photo is added, the chinar leaf from the favicon stands in.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/icon.svg"
      alt=""
      width={160}
      height={160}
      className="size-28 rounded-[2rem] ring-1 ring-border lg:size-40 lg:rounded-[2.5rem]"
    />
  );
}

/**
 * The profile column: photo, name, socials, contact and quote. Sticky beside
 * the tab pages on wide screens, stacked above them on phones.
 */
export default function ProfileCard() {
  const [firstName, ...rest] = ABOUT.name.split(" ");
  const lastName = rest.join(" ");
  const email = SOCIALS.find((link) => link.href.startsWith("mailto:"));
  const socials = SOCIALS.filter((link) => !link.href.startsWith("mailto:"));

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <Avatar />

      <div className="space-y-3">
        <p className="text-2xl text-primary lg:text-[1.65rem]">
          <span className="font-extralight tracking-[0.12em]">{firstName}</span>{" "}
          <span className="font-bold">{lastName}</span>
        </p>
        <p className="mx-auto w-fit rounded-full bg-input/30 px-3.5 py-1.5 text-xs leading-snug text-foreground">
          CS &amp; Business Analytics
        </p>
      </div>

      <ul
        aria-label="Profiles"
        className="flex items-center justify-center gap-0.5"
      >
        {socials.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                {...externalLinkProps(link.href)}
                aria-label={link.label}
                title={link.label}
                className="inline-flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-input/30 hover:text-accent-readable"
              >
                <Icon
                  className="size-5"
                  stroke={1.6}
                  aria-hidden="true"
                />
              </Link>
            </li>
          );
        })}
      </ul>

      <ul className="w-full max-w-60 space-y-2 text-left text-[0.8125rem] text-subtext">
        <li className="flex items-center gap-2.5">
          <IconMapPin
            className="size-4 shrink-0"
            aria-hidden="true"
          />
          <span>{ABOUT.location}</span>
        </li>
        {email && (
          <li className="flex items-center gap-2.5">
            <IconMail
              className="size-4 shrink-0"
              aria-hidden="true"
            />
            <a
              href={email.href}
              className="min-w-0 text-xs transition-colors hover:text-primary-readable"
            >
              {/* Let long addresses wrap at the @, never mid-word. */}
              {email.href.slice("mailto:".length).split("@")[0]}
              <wbr />@{email.href.split("@")[1]}
            </a>
          </li>
        )}
      </ul>

      {ABOUT.quote && (
        <figure className="max-w-60 text-[0.8125rem] text-muted-foreground">
          <blockquote className="italic">
            <span
              aria-hidden="true"
              className="mr-0.5 text-lg leading-none text-accent-readable/70"
            >
              “
            </span>
            {ABOUT.quote.text}
            <span
              aria-hidden="true"
              className="ml-0.5 text-lg leading-none text-accent-readable/70"
            >
              ”
            </span>
          </blockquote>
          {ABOUT.quote.href && (
            <figcaption className="mt-1 text-[11px]">
              <Link
                href={ABOUT.quote.href}
                className="underline decoration-muted-foreground/40 underline-offset-4 hover:text-secondary-readable"
              >
                {ABOUT.quote.source}
              </Link>
            </figcaption>
          )}
        </figure>
      )}

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Link
          href={PRIMARY_RESUME_PATH}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <IconFileCv
            className="size-3.5"
            aria-hidden="true"
          />
          Résumé
        </Link>
        <Link
          href="/terminal"
          className="inline-flex items-center gap-1.5 rounded-full border border-secondary-readable px-3.5 py-1.5 text-xs font-semibold text-secondary-readable transition-colors hover:bg-secondary-readable/10"
        >
          <IconTerminal2
            className="size-3.5"
            aria-hidden="true"
          />
          Terminal
        </Link>
      </div>

      <nav
        aria-label="More pages"
        className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-muted-foreground"
      >
        <Link
          href="/pdf"
          className="underline decoration-muted-foreground/30 underline-offset-4 hover:text-primary-readable"
        >
          full CV
        </Link>
        {MORE_PAGES.map(([href, label]) => (
          <Link
            key={href}
            href={href}
            className="underline decoration-muted-foreground/30 underline-offset-4 hover:text-primary-readable"
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
