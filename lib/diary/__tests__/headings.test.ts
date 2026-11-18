import { describe, expect, it } from "vitest";

import { extractHeadings } from "../headings";
import { slugifyHeading } from "../slug";

describe("extractHeadings", () => {
  it("lists h2 and h3 headings with plain text and stable ids", () => {
    const source = [
      "# Title is skipped",
      "## What does *home* mean?",
      "Some text.",
      "```md",
      "## not a heading inside code",
      "```",
      "### Return, and [leaving](https://example.com)",
    ].join("\n");

    expect(extractHeadings(source)).toEqual([
      { depth: 2, text: "What does home mean?", id: "what-does-home-mean" },
      { depth: 3, text: "Return, and leaving", id: "return-and-leaving" },
    ]);
  });

  it("strips accents and punctuation from ids", () => {
    expect(slugifyHeading("Café — “Home”")).toBe("cafe-home");
  });
});
