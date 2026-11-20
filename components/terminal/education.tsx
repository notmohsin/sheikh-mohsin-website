import Link from "next/link";
import { OrgName } from "@/components/ui/org-mark";
import { COURSEWORK, EDUCATION, PRIOR_EDUCATION } from "@/lib/content/site";

function DegreeName({ degree }: { degree: string }) {
  return degree.split(" · ").map((part, index) => (
    <span key={`${part}-${index}`}>
      {index > 0 && <span className="text-accent"> · </span>}
      {part}
    </span>
  ));
}

export type EducationView = "all" | "degrees" | "coursework";

export default function Education({ view = "all" }: { view?: EducationView }) {
  const showDegrees = view !== "coursework";
  const showCoursework = view !== "degrees";

  return (
    <div className="flex flex-col gap-4 mt-2">
      {showDegrees &&
        EDUCATION.map((edu, idx) => (
          <div
            key={`${edu.institution}-${edu.period}`}
            className={idx > 0 ? "border-t border-input/50 pt-2" : ""}
          >
            <div className="flex justify-between items-baseline">
              <OrgName
                name={edu.institution}
                className="text-primary font-bold text-base"
              />
              <span className="text-xs text-muted-foreground bg-input/20 px-2 py-0.5 rounded w-fit">
                {edu.period}
              </span>
            </div>
            <div className="mb-1 text-sm text-secondary">
              <DegreeName degree={edu.degree} />
            </div>
            <div className="mb-1 text-xs text-muted-foreground">
              {edu.location}
            </div>
            <div className="mt-1 grid grid-cols-1 gap-2 text-xs text-foreground sm:grid-cols-2">
              {edu.details.map((detail) => {
                const [label, val] = detail.split(": ");
                return val ?
                    <div key={`${edu.institution}-${detail}`}>
                      <span className="text-accent">{label}:</span> {val}
                    </div>
                  : <div key={`${edu.institution}-${detail}`}>{detail}</div>;
              })}
            </div>
          </div>
        ))}

      {showDegrees && PRIOR_EDUCATION.length > 0 && (
        <div className="border-t border-input/50 pt-2">
          <span className="text-accent font-bold">Prior Education:</span>
          <ul className="text-xs text-foreground marker:text-accent list-disc list-inside mt-1 ml-1 space-y-1">
            {PRIOR_EDUCATION.map((edu) => (
              <li key={`${edu.institution}-${edu.period}`}>
                <OrgName
                  name={edu.institution}
                  className="text-primary"
                />{" "}
                <span className="text-secondary">
                  (<DegreeName degree={edu.degree} />)
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showCoursework && (
        <div className={showDegrees ? "border-t border-input/50 pt-2" : ""}>
          <span className="text-accent font-bold">Selected Coursework:</span>
          <ul className="mt-1 ml-1 space-y-1 text-xs text-foreground marker:text-accent list-disc list-inside">
            {COURSEWORK.map((course) => (
              <li key={course.code}>
                <Link
                  href={course.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-secondary underline decoration-secondary/40 hover:decoration-secondary"
                >
                  {course.code}
                </Link>{" "}
                {course.title} — {course.artifact}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
