# Editing site text

All copy on the homepage and in the terminal comes from a small set of files. Edit these directly — no need to touch React components for normal content updates.

## Profile (name, byline, location, bio)

[`lib/content/about.ts`](lib/content/about.ts)

```ts
export const ABOUT = {
  name: "...",
  role: "...", // byline under your name on the homepage
  location: "...",
  bio: "...", // short paragraph on the homepage
};
```

## SEO (title, description, site URL, keywords)

[`lib/content/seo.ts`](lib/content/seo.ts) — also controls diary RSS description via `DIARY_DESCRIPTION`.

## Social links

[`lib/content/socials.ts`](lib/content/socials.ts)

## Sections (homepage + matching terminal commands)

| Section            | File                                                     |
| ------------------ | -------------------------------------------------------- |
| Experience         | [`lib/content/experience.ts`](lib/content/experience.ts) |
| Research & writing | [`lib/content/research.ts`](lib/content/research.ts)     |
| Projects           | [`lib/content/projects.ts`](lib/content/projects.ts)     |
| Education          | [`lib/content/education.ts`](lib/content/education.ts)   |
| Skills             | [`lib/content/skills.ts`](lib/content/skills.ts)         |
| Awards             | [`lib/content/awards.ts`](lib/content/awards.ts)         |
| Leadership         | [`lib/content/leadership.ts`](lib/content/leadership.ts) |
| Coursework         | [`lib/content/coursework.ts`](lib/content/coursework.ts) |
| Credits            | [`lib/content/credits.ts`](lib/content/credits.ts)       |
| Now                | [`lib/content/now.ts`](lib/content/now.ts)               |
| Uses               | [`lib/content/uses.ts`](lib/content/uses.ts)             |
| Listening snapshot | [`lib/content/listening.ts`](lib/content/listening.ts)   |

Each file exports a typed array or object. Types live in [`lib/content/types.ts`](lib/content/types.ts) if you need the shape.

## Diary / blog posts

[`diary/*.mdx`](diary/) — one file per post. Each file exports `metadata` at the top:

```ts
export const metadata = defineDiaryEntry({
  title: "...",
  description: "...",
  publishedAt: "YYYY-MM-DD",
  tags: ["..."],
  draft: true, // remove or set false to publish
});
```

Scaffold a new post:

```bash
pnpm diary:new
```

## Diary photos and footnotes

```mdx
import Figure from "@/components/diary/figure";
import { Footnote, FootnoteRef, Footnotes } from "@/components/diary/footnotes";

<Figure
  src="/diary/slug-photo.jpg"
  alt="..."
  width={1456}
  height={1092}
  caption="..."
/>

Some sentence.<FootnoteRef id="1" />

<Footnotes>
  <Footnote id="1">Footnote text.</Footnote>
</Footnotes>
```

Put the image file in `public/diary/`; `width`/`height` are its pixel size.

More figure options:

```mdx
import Figure, { FigureRow } from "@/components/diary/figure";

<Figure
  hero
  src="..."
  alt="..."
  width={1600}
  height={900}
  caption="**Bold** and _italic_ work"
/>

<FigureRow
  images={[
    { src: "/diary/a.jpg", alt: "...", width: 1200, height: 900 },
    { src: "/diary/b.jpg", alt: "...", width: 900, height: 1200 },
  ]}
  caption="One caption for both"
/>
```

`hero` makes the image wider than the text column; use it once, near the top.

## Diary tags, contents list, featured entries

- `tags: [...]` in an entry's metadata: each tag gets a page at
  `/diary/tags/<tag>` and a coloured chip (same colour everywhere).
- `featured: true` puts the entry on the homepage under **diary**.
- Write `## Section` / `### Subsection` headings and a contents list appears
  automatically (from two headings up): a sidebar on wide screens, a
  collapsible block on phones.
- To name an organization in colour with its logo inside an entry:
  `import { OrgMention as Org } from "@/components/ui/org-mark";` then
  `<Org name="FLAME University" />`.

## Organization logos, quote, closing line

- Logos and brand colours: [`lib/content/organizations.ts`](lib/content/organizations.ts).
  The `name` must match the company/institution/organization text in the
  content files (a test checks this). Logos are SVGs in `public/logos/`;
  an organization without one shows a letter badge.
- Quote under the bio and the closing line at the bottom of the homepage:
  `quote` and `misc` in [`lib/content/about.ts`](lib/content/about.ts).
  In `misc`, `{FLAME University}` becomes an organization mention and
  `[text](https://...)` a link.

## CV (PDF on `/pdf` and terminal `cv`)

- LaTeX source: [`cv/cv.tex`](cv/cv.tex) (copy of [`SheikhMohsinResume.tex`](SheikhMohsinResume.tex))
- Rebuild after edits: `pnpm cv:build` → updates `public/cv.pdf` (commit it)

## Résumés (`/resumes`, one page each)

- Sources: [`cv/resumes/*.tex`](cv/resumes/); shared layout in `resume-layout.tex`
- Edit the `\resumemetadata{Title}{YYYY-MM-DD}{Description}` line when content changes
- Rebuild: `pnpm resumes:build` → updates `public/resumes/*.pdf` (commit them)
- The homepage **Résumé** button points at `PRIMARY_RESUME_PATH` in [`lib/cv.ts`](lib/cv.ts)

## What you usually do _not_ need to edit

- `components/` — layout and terminal UI (only if you want design changes)
- `app/page.tsx` — wires sections together; content comes from `lib/content/`
- `lib/site-content.ts` — builders only; edit the `lib/content/*.ts` files instead

## After editing

```bash
pnpm dev          # preview locally
pnpm verify       # optional: format, lint, test, build before deploy
```
