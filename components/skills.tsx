import {
  SectionHeading,
  sectionMetaClassName,
  sectionRowClassName,
} from "./ui/section";
import { cn } from "@/lib/utils";
import { SKILLS } from "@/lib/content/site";

export default function Skills() {
  const categories = Object.entries(SKILLS).map(([name, items]) => ({
    name,
    items,
  }));

  return (
    <>
      <SectionHeading
        id="skills-heading"
        command="skills"
      />

      <dl className="-mt-4 divide-y divide-border">
        {categories.map((category) => (
          <div
            key={category.name}
            className={cn(sectionRowClassName, "gap-y-2 py-4")}
          >
            <dt
              className={cn(
                sectionMetaClassName,
                "text-sm font-bold text-primary-readable",
              )}
            >
              {category.name}
            </dt>
            <dd className="min-w-0">
              <ul className="flex flex-wrap gap-1.5">
                {category.items.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-sm border border-border bg-card/70 px-2 py-0.5 text-xs leading-5 text-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
