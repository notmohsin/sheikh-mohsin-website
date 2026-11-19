import { renderInline } from "./ui/inline-text";
import { ABOUT } from "@/lib/content/about";

/** The closing line of the homepage, after every section. */
export default function MiscLine() {
  if (!ABOUT.misc) {
    return null;
  }

  return (
    <p className="max-w-[72ch] border-t border-border pt-8 text-sm leading-7 text-subtext">
      <span
        aria-hidden="true"
        className="mr-2 text-muted-foreground"
      >
        ~
      </span>
      {renderInline(ABOUT.misc)}
    </p>
  );
}
