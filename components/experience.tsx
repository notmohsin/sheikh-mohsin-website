import ExperienceDescription from "./experience-description";
import OrgMark, { OrgName } from "./ui/org-mark";
import {
  SectionDisclosure,
  SectionHeading,
  formatPeriod,
  sectionMetaClassName,
  sectionRowClassName,
  timelineBodyClassName,
  timelineCellClassName,
  timelineTailClassName,
} from "./ui/section";
import {
  buildExperienceSection,
  groupExperienceByCompany,
} from "@/lib/site-content";
import type {
  ExperienceEntryModel,
  ExperienceGroupModel,
} from "@/lib/site-content";
import { cn } from "@/lib/utils";

function ExperienceEntry({
  job,
  compact = false,
}: {
  job: ExperienceEntryModel;
  compact?: boolean;
}) {
  return (
    <li className={cn(sectionRowClassName, "group/tl")}>
      <div
        className={cn(
          "min-w-0",
          timelineCellClassName,
          timelineTailClassName[compact ? 8 : 10],
        )}
      >
        <div className="flex items-start gap-3">
          <OrgMark
            name={job.company}
            className="mt-0.5"
          />
          <div className="min-w-0">
            <h3
              className={cn(
                "font-bold leading-snug text-primary-readable",
                compact ? "text-base" : "text-base sm:text-lg",
              )}
            >
              <OrgName name={job.company} />
            </h3>
            <p className="text-sm leading-6 text-subtext">{job.role}</p>
          </div>
        </div>

        {job.description.length > 0 && (
          <ul
            className={cn(
              "mt-3 max-w-[72ch] list-outside list-disc space-y-2 pl-4 text-sm leading-relaxed text-foreground marker:text-muted-foreground",
              timelineBodyClassName,
              !compact && "md:text-[0.9375rem]",
            )}
          >
            {job.description.map((item) => (
              <li key={`${job.company}-${item}`}>
                <ExperienceDescription
                  text={item}
                  links={job.textLinks}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className={cn(sectionMetaClassName, !compact && "xl:pt-1")}>
        {formatPeriod(job.period)}
      </p>
    </li>
  );
}

function RoleDescription({ job }: { job: ExperienceEntryModel }) {
  if (job.description.length === 0) {
    return null;
  }

  return (
    <ul className="mt-2 max-w-[72ch] list-outside list-disc space-y-2 pl-4 text-sm leading-relaxed text-foreground marker:text-muted-foreground md:text-[0.9375rem]">
      {job.description.map((item) => (
        <li key={`${job.role}-${item}`}>
          <ExperienceDescription
            text={item}
            links={job.textLinks}
          />
        </li>
      ))}
    </ul>
  );
}

/**
 * Several roles at one organization, LinkedIn style: one header with the
 * logo and the overall span, then each role as a node on the timeline wire
 * with its own title, dates and bullets.
 */
function ExperienceGroup({ group }: { group: ExperienceGroupModel }) {
  return (
    <li className={cn(sectionRowClassName, "group/tl")}>
      <div
        className={cn(
          "min-w-0",
          timelineCellClassName,
          timelineTailClassName[10],
        )}
      >
        <div className="flex items-start gap-3">
          <OrgMark
            name={group.company}
            className="mt-0.5"
          />
          <div className="min-w-0">
            <h3 className="text-base font-bold leading-snug text-primary-readable sm:text-lg">
              <OrgName name={group.company} />
            </h3>
            <p className="text-sm leading-6 text-subtext">
              {group.roles.length} roles
            </p>
          </div>
        </div>

        <ol className={cn("mt-5 space-y-7", timelineBodyClassName)}>
          {group.roles.map((job) => (
            <li
              key={`${job.role}-${job.period}`}
              className="relative"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[31px] top-1.5 size-2.5 rounded-full border-2 border-accent bg-card"
              />
              <h4 className="text-[0.9375rem] font-semibold leading-snug text-foreground">
                {job.role}
              </h4>
              <p className="text-xs leading-6 text-muted-foreground">
                {formatPeriod(job.period)}
              </p>
              <RoleDescription job={job} />
            </li>
          ))}
        </ol>
      </div>
      <p className={cn(sectionMetaClassName, "xl:pt-1")}>
        {formatPeriod(group.period)}
      </p>
    </li>
  );
}

export default function Experience() {
  const experience = buildExperienceSection();
  const earlierCount = experience.compactEntries.length;

  return (
    <>
      <SectionHeading
        id="experience-heading"
        command="experience"
      />

      <ol className="space-y-10">
        {groupExperienceByCompany(experience.featuredEntries).map((group) =>
          group.roles.length === 1 ?
            <ExperienceEntry
              key={`${group.company}-${group.period}`}
              job={group.roles[0]}
            />
          : <ExperienceGroup
              key={`${group.company}-${group.period}`}
              group={group}
            />,
        )}
      </ol>

      {earlierCount > 0 && (
        <SectionDisclosure
          className="xl:pl-[13.5rem]"
          closedLabel={`${earlierCount} earlier roles`}
          openLabel="hide earlier roles"
        >
          <ol className="space-y-8 xl:-ml-[13.5rem]">
            {experience.compactEntries.map((job) => (
              <ExperienceEntry
                key={`${job.company}-${job.role}-${job.period}`}
                job={job}
                compact
              />
            ))}
          </ol>
        </SectionDisclosure>
      )}
    </>
  );
}
