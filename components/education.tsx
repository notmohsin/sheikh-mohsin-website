import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";

import OrgMark from "./ui/org-mark";
import {
  SectionHeading,
  formatPeriod,
  sectionMetaClassName,
  sectionRowClassName,
  timelineBodyClassName,
  timelineCellClassName,
  timelineTailClassName,
} from "./ui/section";
import { buildEducationSection } from "@/lib/site-content";
import { cn, externalLinkProps } from "@/lib/utils";

function DegreeName({ degree }: { degree: string }) {
  return degree.split(" · ").map((part, index) => (
    <span
      key={`${part}-${index}`}
      className="block"
    >
      {part}
    </span>
  ));
}

function DetailList({ details }: { details: string[] }) {
  if (details.length === 0) {
    return null;
  }

  return (
    <ul
      className={cn(
        timelineBodyClassName,
        "mt-3 max-w-[72ch] list-outside list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-foreground marker:text-muted-foreground",
      )}
    >
      {details.map((detail) => (
        <li key={detail}>{detail}</li>
      ))}
    </ul>
  );
}

export default function Education() {
  const education = buildEducationSection();

  return (
    <>
      <SectionHeading
        id="education-heading"
        command="education"
      />

      <ol className="space-y-10">
        {education.higherEducation.map((edu) => (
          <li
            key={`${edu.institution}-${edu.period}`}
            className={cn(sectionRowClassName, "group/tl")}
          >
            <div
              className={cn(
                "min-w-0",
                timelineCellClassName,
                timelineTailClassName[10],
              )}
            >
              <div className="flex items-start gap-3">
                <OrgMark
                  name={edu.institution}
                  className="mt-0.5"
                />
                <div className="min-w-0">
                  <h3 className="text-base font-bold leading-snug text-primary-readable sm:text-lg">
                    {edu.institution}
                  </h3>
                  <p className="text-sm leading-6 text-foreground">
                    <DegreeName degree={edu.degree} />
                  </p>
                  <p className="text-xs leading-6 text-muted-foreground">
                    {edu.location}
                  </p>
                </div>
              </div>
              <DetailList details={edu.details} />
            </div>
            <p className={cn(sectionMetaClassName, "xl:pt-1")}>
              {formatPeriod(edu.period)}
            </p>
          </li>
        ))}

        {education.priorEducation.map((edu) => (
          <li
            key={`${edu.institution}-${edu.period}`}
            className={cn(sectionRowClassName, "group/tl")}
          >
            <div
              className={cn(
                "min-w-0",
                timelineCellClassName,
                timelineTailClassName[10],
              )}
            >
              <div className="flex items-start gap-3">
                <OrgMark
                  name={edu.institution}
                  className="mt-0.5"
                />
                <div className="min-w-0">
                  <h3 className="text-base font-bold leading-snug text-primary-readable">
                    {edu.institution}
                  </h3>
                  <p className="text-sm leading-6 text-foreground">
                    <DegreeName degree={edu.degree} />
                  </p>
                </div>
              </div>
              <DetailList details={edu.details} />
            </div>
            <p className={sectionMetaClassName}>{formatPeriod(edu.period)}</p>
          </li>
        ))}
      </ol>

      {education.coursework.length > 0 && (
        <div className={sectionRowClassName}>
          <h3
            className={cn(
              sectionMetaClassName,
              "text-sm font-bold text-primary-readable",
            )}
          >
            Selected coursework{" "}
            <span className="block text-xs font-normal text-muted-foreground">
              FLAME University
            </span>
          </h3>
          <ul className="grid min-w-0 grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
            {education.coursework.map((course) => (
              <li
                key={`${course.code}-${course.title}`}
                className="space-y-1"
              >
                <h4 className="text-sm font-bold leading-snug text-primary-readable">
                  {course.link ?
                    <Link
                      href={course.link}
                      {...externalLinkProps(course.link)}
                      className="inline-flex items-baseline gap-1 underline decoration-primary-readable/30 underline-offset-4 hover:decoration-primary-readable"
                    >
                      {course.title}
                      <IconArrowUpRight
                        className="size-3 self-center text-accent-readable"
                        aria-hidden="true"
                      />
                    </Link>
                  : course.title}
                </h4>
                <p className="text-xs leading-relaxed text-subtext">
                  <span className="text-muted-foreground">{course.code}</span>{" "}
                  {course.artifact}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
