import { USES } from "@/lib/content/uses";

export default function Uses({ compact = false }: { compact?: boolean }) {
  const headingClass =
    compact ?
      "text-sm font-bold text-primary"
    : "text-base font-bold text-primary";

  return (
    <div className={compact ? "mt-2 flex flex-col gap-4 text-xs" : "space-y-8"}>
      {USES.map((group) => (
        <section
          key={group.heading}
          className="space-y-2"
        >
          <h2 className={headingClass}>{group.heading}</h2>
          <ul className="space-y-2">
            {group.items.map((item) => (
              <li key={item.name}>
                <span className="font-semibold text-foreground">
                  {item.name}
                </span>
                <span className="text-muted-foreground"> — {item.note}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
