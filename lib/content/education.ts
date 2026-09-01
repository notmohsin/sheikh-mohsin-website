import type { EducationItem, PriorEducationItem } from "./types";

export const EDUCATION: EducationItem[] = [
  {
    institution: "FLAME University",
    period: "Aug 2024 — Present",
    location: "Pune, India",
    degree: "B.Sc. Computer Science & Business Analytics (Full Scholarship)",
    details: [
      "Cumulative GPA: 7.65/10",
      "Modeled concurrent and distributed systems with SAT solvers, temporal-logic model checking, and Alloy/TLA+ specifications",
      "Implemented and compared classification and clustering methods, using PCA to test how feature selection affected model behavior",
      "Joined Dot Slash Club and completed interdisciplinary projects connecting computer science with Philosophy and Public Policy",
    ],
  },
];

export const PRIOR_EDUCATION: PriorEducationItem[] = [
  {
    institution: "Jawahar Navodaya Vidyalaya, Ganderbal",
    period: "2017 — 2024",
    degree: "Senior Secondary Education (Merit Scholarship, Residential)",
    details: [
      "Grades 6–12",
      "Led extracurricular activities and coordinated Atal Tinkering Labs; taught junior students to turn ideas into 3D-printed prototypes",
    ],
  },
];
