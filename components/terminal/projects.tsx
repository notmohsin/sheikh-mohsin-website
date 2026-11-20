import Link from "next/link";
import { PROJECTS } from "@/lib/content/site";
import type { ProjectItem } from "@/lib/content/types";

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <div className="mb-4 inline-block w-full break-inside-avoid rounded-lg border border-border bg-card p-4">
      <div className="text-md mb-2 text-primary">{project.title}</div>
      <div className="text-xs text-foreground">{project.description}</div>
      {project.highlights && project.highlights.length > 0 && (
        <ul className="ml-4 mt-2 list-disc list-outside space-y-1 text-xs text-foreground marker:text-accent">
          {project.highlights.map((highlight) => (
            <li key={`${project.title}-${highlight}`}>{highlight}</li>
          ))}
        </ul>
      )}
      {project.stack && project.stack.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <span
              key={`${project.title}-${item}`}
              className="rounded bg-input/20 px-1.5 py-0.5 text-[10px]"
            >
              {item}
            </span>
          ))}
        </div>
      )}
      <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold text-accent underline decoration-accent/40">
        {project.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="hover:decoration-accent"
          >
            {link.label}
          </Link>
        ))}
      </div>
      {project.confidentialityNote && (
        <div className="mt-2 text-xs text-muted-foreground">
          {project.confidentialityNote}
        </div>
      )}
    </div>
  );
}

function matchesProject(project: ProjectItem, filter: string) {
  const normalizedFilter = filter.toLowerCase();

  if (normalizedFilter === "featured") return project.featured;

  return [project.title, project.description, ...(project.stack ?? [])].some(
    (value) => value.toLowerCase().includes(normalizedFilter),
  );
}

export default function Projects({ filter }: { filter?: string }) {
  const entries =
    filter ?
      PROJECTS.filter((project) => matchesProject(project, filter))
    : PROJECTS;

  if (entries.length === 0) {
    return (
      <p className="mt-2 text-xs text-muted-foreground">
        No projects match <span className="text-secondary">{filter}</span>.
      </p>
    );
  }

  return (
    <div className="mt-2 columns-1 gap-4 md:columns-2">
      {entries.map((project) => (
        <ProjectCard
          key={project.title}
          project={project}
        />
      ))}
    </div>
  );
}
