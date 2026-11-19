import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";

import {
  SectionHeading,
  sectionMetaClassName,
  sectionRowClassName,
} from "./ui/section";
import TagFilter from "./ui/tag-filter";
import { buildProjectsSection } from "@/lib/site-content";
import type { ProjectEntryModel } from "@/lib/site-content";
import { externalLinkProps } from "@/lib/utils";

/**
 * One project as an open entry, not a boxed card: the title links to the
 * project, then its one-line summary, description, stack and other links.
 * Entries share the meta gutter used by experience, holding any highlights.
 */
function ProjectEntry({ project }: { project: ProjectEntryModel }) {
  const [primaryLink, ...extraLinks] = project.links;

  return (
    <article className={sectionRowClassName}>
      <div className="min-w-0 max-w-[72ch] space-y-2.5 xl:col-start-2">
        {project.cover && (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(min-width: 48rem) 36rem, 100vw"
            className="mb-2 aspect-[16/9] w-full rounded-md object-cover ring-1 ring-border"
          />
        )}
        <h3 className="text-base font-bold leading-snug text-primary-readable sm:text-lg">
          {primaryLink ?
            <Link
              href={primaryLink.href}
              {...externalLinkProps(primaryLink.href)}
              className="inline-flex items-baseline gap-1 underline decoration-primary-readable/30 underline-offset-4 transition-colors hover:decoration-primary-readable"
            >
              {project.title}
              <IconArrowUpRight
                className="size-4 self-center"
                aria-hidden="true"
              />
            </Link>
          : project.title}
        </h3>

        {project.summary && (
          <p className="text-sm font-medium leading-snug text-foreground md:text-[0.9375rem]">
            {project.summary}
          </p>
        )}

        <p className="text-[0.8125rem] leading-relaxed text-subtext">
          {project.description}
        </p>

        {project.confidentialityNote && (
          <p className="text-xs leading-relaxed text-muted-foreground">
            {project.confidentialityNote}
          </p>
        )}

        {project.stack && project.stack.length > 0 && (
          <ul
            aria-label="Built with"
            className="flex flex-wrap gap-1.5 pt-1"
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

        {extraLinks.length > 0 && (
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-accent-readable">
            {extraLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  {...externalLinkProps(link.href)}
                  className="inline-flex items-center gap-1 underline decoration-accent-readable/30 underline-offset-4 hover:decoration-accent-readable"
                >
                  {link.label}
                  <IconArrowUpRight
                    className="size-3.5"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      {project.highlights && project.highlights.length > 0 && (
        <p className={sectionMetaClassName}>{project.highlights.join(", ")}</p>
      )}
    </article>
  );
}

function ProjectList({ projects }: { projects: ProjectEntryModel[] }) {
  return (
    <ul className="space-y-10">
      {projects.map((project) => (
        <li key={project.title}>
          <ProjectEntry project={project} />
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
        <ProjectList projects={featured} />
        <Link
          href="/projects"
          className="inline-block text-sm text-accent-readable underline decoration-accent-readable/40 underline-offset-4 hover:decoration-accent-readable"
        >
          See all {projects.entries.length} projects and research
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
        listClassName="space-y-10"
        items={projects.entries.map((project) => ({
          key: project.title,
          tags: project.stack ?? [],
          node: <ProjectEntry project={project} />,
        }))}
      />
    </>
  );
}
