import type { Metadata } from "next";

import Projects from "@/components/projects";
import Research from "@/components/research";
import { ABOUT } from "@/lib/content/site";

const description = `Projects and research by ${ABOUT.name}, filterable by what they were built with.`;

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects | ${ABOUT.name}`,
    description,
    url: "/projects",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <div className="space-y-16 md:space-y-20">
      <section
        id="projects"
        className="scroll-mt-24 space-y-8"
        aria-labelledby="projects-heading"
      >
        <Projects />
      </section>

      <section
        id="research"
        className="scroll-mt-24 space-y-8"
        aria-labelledby="research-heading"
      >
        <Research />
      </section>
    </div>
  );
}
