import type { SocialLink } from "./types";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";

export const SOCIALS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/notmohsin",
    icon: IconBrandGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sheikh-mohsin-213653254",
    icon: IconBrandLinkedin,
  },
  {
    label: "Email",
    href: "mailto:sheikh.mohsin@flame.edu.in",
    icon: IconMail,
  },
];
