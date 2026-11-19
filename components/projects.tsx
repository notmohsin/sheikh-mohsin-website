import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";

import { Card } from "./ui/card";
import { SectionHeading } from "./ui/section";
import TagFilter from "./ui/tag-filter";
import { buildProjectsSection } from "@/lib/site-content";
import type { ProjectEntryModel } from "@/lib/site-content";

function ProjectCard({ project }: { project: ProjectEntryModel }) {
  const [primaryLink, ...extraLinks] = project.links;

  return (
    <Card
      variant={primaryLink ? "interactive" : "content"}
      className="relative h-full gap-4 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring"
    >
      {project.cover && (
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          width={project.cover.width}
          height={project.cover.height}
          sizes="(min-width: 80rem) 24rem, (min-width: 48rem) 45vw, 100vw"
          className="-mx-5 -mt-5 mb-1 aspect-[16/9] w-[calc(100%+2.5rem)] max-w-none object-cover"
        />
      )}
      <h3 className="text-base font-bold leading-snug text-primary-readable sm:text-lg">
        {primaryLink ?
          <Link
            href={primaryLink.href}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-primary-readable/0 underline-offset-4 transition-colors outline-none group-hover:decoration-primary-readable/60 after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </Link>
        : project.title}
      </h3>

      {project.summary && (
        <p className="-mt-1 text-sm font-medium leading-snug text-foreground md:text-[0.9375rem]">
          {project.summary}
        </p>
      )}

      <p className="text-[0.8125rem] leading-relaxed text-subtext">
        {project.description}
      </p>

      {project.highlights && project.highlights.length > 0 && (
        <ul className="mt-auto flex flex-wrap gap-y-1 text-xs text-foreground">
          {project.highlights.map((highlight) => (
            <li
              key={`${project.title}-${highlight}`}
              className="whitespace-nowrap after:px-2 after:text-muted-foreground after:content-['·'] last:after:content-none"
            >
              {highlight}
            </li>
          ))}
        </ul>
      )}

      {project.confidentialityNote && (
        <p className="text-xs leading-relaxed text-muted-foreground">
          {project.confidentialityNote}
        </p>
      )}

      <div
        className={`${project.highlights?.length ? "" : "mt-auto "}flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-end sm:justify-between sm:gap-x-4`}
      >
        {project.stack && project.stack.length > 0 && (
          <ul
            aria-label="Built with"
            className="flex flex-wrap gap-1.5"
          >
            {project.stack.map((item) => (
              <li
                key={`${project.title}-${item}`}
                className="rounded-sm bg-input/25 px-1.5 text-[11px] leading-5 text-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
        {(primaryLink || extraLinks.length > 0) && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-accent-readable">
            {primaryLink && (
              <span
                aria-hidden="true"
                className="inline-flex items-center gap-1"
              >
                {primaryLink.label}
                <IconArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
              </span>
            )}
            {extraLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="relative z-10 inline-flex items-center gap-1 underline decoration-accent-readable/30 underline-offset-4 hover:decoration-accent-readable"
              >
                {link.label}
                <IconArrowUpRight
                  className="size-3.5"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

function ProjectGrid({ projects }: { projects: ProjectEntryModel[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {projects.map((project) => (
        <li key={project.title}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}

/**
 * `selected`: featured projects only, for the About tab, with a link to the
 * Projects tab. `all`: every project behind a filter on its stack.
 */
export default function Projects({
  variant = "all",
}: {
  variant?: "selected" | "all";
}) {
  const projects = buildProjectsSection();

  if (variant === "selected") {
    const featured = projects.entries.filter((project) => project.featured);

    return (
      <>
        <SectionHeading
          id="projects-heading"
          command="projects"
        />
        <ProjectGrid projects={featured} />
        <Link
          href="/projects"
          className="inline-block text-sm text-accent-readable underline decoration-accent-readable/40 underline-offset-4 hover:decoration-accent-readable"
        >
          all {projects.entries.length} projects →
        </Link>
      </>
    );
  }

  return (
    <>
      <SectionHeading
        id="projects-heading"
        command="projects"
      />
      <TagFilter
        listClassName="grid grid-cols-1 gap-4 md:grid-cols-2"
        items={projects.entries.map((project) => ({
          key: project.title,
          tags: project.stack ?? [],
          node: <ProjectCard project={project} />,
        }))}
      />
    </>
  );
}
