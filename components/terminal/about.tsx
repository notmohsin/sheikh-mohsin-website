import { stripInlineMarkup } from "@/lib/inline-markup";
import { ABOUT } from "@/lib/content/site";

export default function About() {
  return (
    <div className="text-foreground leading-relaxed">
      <p>
        My name is <span className="text-primary">{ABOUT.name}</span> and I am a{" "}
        <span className="text-subtext">{ABOUT.role}</span>. I am from{" "}
        <span className="text-subtext">{ABOUT.location}</span>.
      </p>
      <br />
      <p>{stripInlineMarkup(ABOUT.bio)}</p>
    </div>
  );
}
