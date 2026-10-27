import { LISTENING_SNAPSHOT } from "@/lib/content/listening";

export default function ListeningSnapshot({
  compact = false,
}: {
  compact?: boolean;
}) {
  if (LISTENING_SNAPSHOT.length === 0) {
    return null;
  }

  return (
    <section className={compact ? "mt-2 text-xs" : "space-y-3"}>
      <h2
        className={
          compact ?
            "mb-2 text-sm font-bold text-primary"
          : "text-base font-bold text-primary"
        }
      >
        Sound capsule
      </h2>
      <ul className="space-y-2">
        {LISTENING_SNAPSHOT.map((item) => (
          <li key={item.label}>
            <span className="font-semibold text-foreground">{item.label}</span>
            <span className="text-muted-foreground"> — {item.note}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
