# sheikhmohsin.vercel.app

## Project

- This is Sheikh Mohsin's personal website and diary. It is a recruiter-facing portfolio and a place for essays. Preserve its voice and design while keeping public claims accurate, accessible, performant, and discoverable.
- The site is a Next.js App Router application with local MDX diary entries, started from Jeet Shah's [jeetsh4h-dev](https://github.com/jeetsh4h/jeetsh4h-dev) template. Credit to Jeet stays in the footer, `/credits`, the terminal `credits` command, and `README.md`. `UPSTREAM.md` records how upstream changes are ported and the last synced commit.
- Before changing Next.js, React, or MDX behavior, inspect the installed versions in `package.json` and use the matching official documentation.
- `README.md` covers setup, commands, and build details; `CONTENT.md` says which file holds which copy; `DEPLOY.md` and `SPOTIFY.md` cover Vercel and the Spotify integration. Run `pnpm verify` before completing code, configuration, or MDX changes.

## Content and voice

- Site copy lives in `lib/content/*.ts`. Edit those, not the components, for text changes.
- Everything in `diary/*.mdx`, including titles and descriptions, is authored by Mohsin. Preserve his wording, tone, capitalization, and opinions. Do not rewrite diary content for style, consistency, recruiter appeal, or SEO unless explicitly asked.
- Only flag objective suspected typos; never silently fix them. Report the location and suggested correction.
- Entries first published on Substack ([feelingsandnumbers.substack.com](https://feelingsandnumbers.substack.com)) should match the Substack text and link back to it. Use `components/diary/figure.tsx` for photos and `components/diary/footnotes.tsx` for footnotes.
- Keep `publishedAt` as the original publication date. Change `updatedAt` only after a meaningful human-authored content change.

## CV and résumés

- `cv/cv.tex` is the source of truth for CV facts. `public/cv.pdf` and `public/resumes/*.pdf` are generated but **committed**, because Vercel has no LaTeX toolchain. Rebuild with `pnpm cv:build` and `pnpm resumes:build` after editing sources, and commit the PDFs with the change.
- `cv/resumes/<role>.tex` are one-page role-specific résumés; the build rejects a second page or overflowing content. Each declares `\resumemetadata{Title}{YYYY-MM-DD}{Description}` which `/resumes` reads. Update the date only when content changes.
- Never invent experience, skills, dates, or metrics. Keep experience, education, research, and dates consistent across `cv/cv.tex`, `cv/resumes/*.tex`, and `lib/content/*.ts`.

## SEO-sensitive edits

- The canonical production origin is `https://sheikhmohsin.vercel.app` (`lib/content/seo.ts`). When editing an indexable route, preserve accurate page-specific metadata, its self-canonical, crawlable HTML content, and structured data that matches visible content.
- Indexing policy: `/`, `/diary`, published diary entries, `/cv.pdf`, `/now`, `/uses`, `/music`, `/guestbook`, and `/credits` are indexable; `/pdf`, `/resumes`, `/resumes/*.pdf`, `/terminal`, drafts, and error or utility pages are not. Only canonical indexable URLs belong in `app/sitemap.ts`.
- When a route or published diary entry changes, keep its metadata, canonical URL, robots policy, sitemap entry, RSS entry, dates, structured data, and relevant tests consistent. Do not alter diary prose for SEO.
