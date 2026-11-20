import { OrgName } from "@/components/ui/org-mark";
import { LEADERSHIP } from "@/lib/content/site";

export default function Leadership() {
  return (
    <div className="mt-2 flex flex-col gap-4">
      {LEADERSHIP.map((entry) => (
        <div key={`${entry.organization}-${entry.period}`}>
          <div className="font-bold text-primary">
            <OrgName name={entry.organization} />
          </div>
          <div className="text-xs text-secondary">
            {entry.roles.join(" · ")}
          </div>
          <div className="text-xs text-muted-foreground">{entry.period}</div>
          {entry.description && (
            <p className="mt-1 text-xs text-foreground">{entry.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}
