import { buildIntroSection } from "@/lib/site-content";

export default function About() {
  const intro = buildIntroSection();

  return (
    <p className="max-w-[68ch] font-serif text-base leading-7 text-foreground sm:text-[1.0625rem]">
      {intro.bio}
    </p>
  );
}
