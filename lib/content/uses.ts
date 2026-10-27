export type UsesGroup = {
  heading: string;
  items: { name: string; note: string }[];
};

export const USES: UsesGroup[] = [
  {
    heading: "Editor",
    items: [
      {
        name: "Cursor",
        note: "Where I write code, notes that have to become code, and most of this site.",
      },
    ],
  },
  {
    heading: "System",
    items: [
      {
        name: "Omarchy",
        note: "Hyprland on Linux. The machine I actually sit at.",
      },
    ],
  },
  {
    heading: "Languages",
    items: [
      {
        name: "Python, C++, JavaScript",
        note: "The ones I reach for when the work is a program.",
      },
      {
        name: "English, Hindi, Urdu, Kashmiri",
        note: "The ones I reach for when the work is a sentence.",
      },
    ],
  },
  {
    heading: "Research",
    items: [
      {
        name: "Obsidian",
        note: "Drafts, course notes, and the writing that is not ready to be public.",
      },
      {
        name: "SimpleSSD-Standalone 2.0",
        note: "The simulator for the SSD cache work at IIT Ropar.",
      },
      {
        name: "LaTeX",
        note: "The CV, and anything that has to stay still on a page.",
      },
    ],
  },
];
