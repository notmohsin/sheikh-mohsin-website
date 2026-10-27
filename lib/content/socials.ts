import type { SocialLink } from "./types";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandSubstack,
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
    label: "Substack",
    href: "https://feelingsandnumbers.substack.com",
    icon: IconBrandSubstack,
  },
  {
    label: "Email",
    href: "mailto:sheikh.mohsin@flame.edu.in",
    icon: IconMail,
  },
];
