import { renderInline } from "./ui/inline-text";
import { ABOUT } from "@/lib/content/about";

/** The closing line of the homepage, after every section. */
export default function MiscLine() {
  if (!ABOUT.misc) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div
        aria-hidden="true"
        className="h-2 w-32 bg-muted-foreground/40 wire-x"
      />
      <p className="max-w-[72ch] text-sm leading-7 text-subtext">
        {renderInline(ABOUT.misc)}
      </p>
    </div>
  );
}
