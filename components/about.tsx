import { renderInline } from "./ui/inline-text";
import { ABOUT } from "@/lib/content/site";

/** Bio and intro paragraphs at the top of the About tab. */
export default function About() {
  return (
    <div className="max-w-[70ch] space-y-4 text-sm leading-7 text-foreground sm:text-[0.9375rem]">
      <p>{renderInline(ABOUT.bio)}</p>
      {ABOUT.intro?.map((paragraph) => (
        <p key={paragraph}>{renderInline(paragraph)}</p>
      ))}
    </div>
  );
}
