import type { Metadata } from "next";

import Education from "@/components/education";
import Experience from "@/components/experience";
import Leadership from "@/components/leadership";
import Skills from "@/components/skills";
import { ABOUT } from "@/lib/content/about";

const description = `Research, internships, education and leadership: ${ABOUT.name}'s experience at a glance.`;

export const metadata: Metadata = {
  title: "Experience",
  description,
  alternates: { canonical: "/experience" },
  openGraph: {
    title: `Experience | ${ABOUT.name}`,
    description,
    url: "/experience",
    type: "website",
  },
};

export default function ExperiencePage() {
  return (
    <div className="space-y-16 md:space-y-20">
      <section
        id="experience"
        className="scroll-mt-24 space-y-8"
        aria-labelledby="experience-heading"
      >
        <Experience />
      </section>

      <section
        id="education"
        className="scroll-mt-24 space-y-8"
        aria-labelledby="education-heading"
      >
        <Education />
      </section>

      <section
        id="leadership"
        className="scroll-mt-24 space-y-8"
        aria-labelledby="leadership-heading"
      >
        <Leadership />
      </section>

      <section
        id="skills"
        className="scroll-mt-24 space-y-8"
        aria-labelledby="skills-heading"
      >
        <Skills />
      </section>
    </div>
  );
}
