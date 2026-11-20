# Editing site text

All the site's copy lives in **one file**, [`lib/content/site.ts`](lib/content/site.ts), in the order the site reads it. Edit it directly; components only render what it holds. The shapes (what fields each entry takes) are in [`lib/content/types.ts`](lib/content/types.ts).

| Section in `site.ts`                           | What it controls                                                       |
| ---------------------------------------------- | ---------------------------------------------------------------------- |
| `ABOUT`                                        | Name, byline, location, photo, bio, intro paragraphs, quote, misc line |
| `SEO`                                          | Site title, description, URL, keywords; `DIARY_DESCRIPTION` for RSS    |
| `SOCIALS`                                      | GitHub, LinkedIn, Substack, email                                      |
| `EXPERIENCE`                                   | Experience tab (newest first)                                          |
| `EDUCATION`, `PRIOR_EDUCATION`, `COURSEWORK`   | Education section                                                      |
| `PROJECTS`, `RESEARCH`                         | Projects tab                                                           |
| `SKILLS`, `LEADERSHIP`, `AWARDS`               | Experience tab and terminal                                            |
| `ORGANIZATIONS`                                | Logos, brand colours and links for every organization                  |
| `NOW`, `USES`, `LISTENING_SNAPSHOT`, `CREDITS` | Those pages                                                            |

The terminal commands read the same data, so one edit updates both views.

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

## Layout (profile card + tabs)

- The main pages live in `app/(main)/`: About (`/`), Experience, Projects,
  Diary. The left profile card is
  [`components/layout/profile-card.tsx`](components/layout/profile-card.tsx);
  the tab bar is [`components/layout/site-tabs.tsx`](components/layout/site-tabs.tsx).
- Profile photo: put a square image in `public/` and set `avatar: "/me.jpg"`
  in [`lib/content/site.ts`](lib/content/site.ts) (`ABOUT`). Until then the chinar
  icon stands in.
- `intro` (in the same file) holds the paragraphs under the bio on About.
  `*word*` = underlined italic, `**words**` = accent bold, `{FLAME University}`
  = organization mention.
- Diary cards show a cover when the entry has `cover: "/diary/photo.jpg"`;
  projects take `cover: { src, alt, width, height }` in `PROJECTS` in `lib/content/site.ts`.
  Both lists have a filter panel built from tags / stack.

## Organization logos, quote, closing line

- Logos, brand colours and links: `ORGANIZATIONS` in [`lib/content/site.ts`](lib/content/site.ts).
  The `name` must match the company/institution/organization text in the
  content files (a test checks this). Logos are SVGs in `public/logos/`;
  an organization without one shows a letter badge.
- Quote under the bio and the closing line at the bottom of the homepage:
  `quote` and `misc` in `ABOUT` in [`lib/content/site.ts`](lib/content/site.ts).
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
- `app/(main)/*/page.tsx` — wires sections together; content comes from `lib/content/site.ts`
- `lib/experience.ts`, `lib/organizations.ts` — small helpers (grouping roles, looking up logos)

## After editing

```bash
pnpm dev          # preview locally
pnpm verify       # optional: format, lint, test, build before deploy
```
