import OrgMark, { OrgName } from "./ui/org-mark";
import { SectionHeading, sectionRowClassName } from "./ui/section";
import { LEADERSHIP } from "@/lib/content/site";
import type { LeadershipItem } from "@/lib/content/types";

// Multi-role periods already name each role ("President 2023-2024 ·
// Treasurer 2024-2025"), so they replace the separate role line.
function periodNamesRoles(entry: LeadershipItem) {
  return entry.roles.some((role) => entry.period.includes(role));
}

export default function Leadership() {
  return (
    <>
      <SectionHeading
        id="leadership-heading"
        command="leadership"
      />

      <div className={sectionRowClassName}>
        <ul className="grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-2 xl:col-start-2">
          {LEADERSHIP.map((entry) => (
            <li
              key={`${entry.organization}-${entry.period}`}
              className="space-y-1"
            >
              <div className="flex items-start gap-3">
                <OrgMark name={entry.organization} />
                <div className="min-w-0">
                  <h3 className="text-[0.9375rem] font-bold leading-snug text-primary-readable">
                    <OrgName name={entry.organization} />
                  </h3>
                  <p className="text-xs leading-5 text-subtext">
                    {periodNamesRoles(entry) ?
                      entry.period
                    : `${entry.roles.join(", ")}, ${entry.period}`}
                  </p>
                </div>
              </div>
              {entry.description && (
                <p className="pt-1 text-sm leading-relaxed text-foreground">
                  {entry.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
