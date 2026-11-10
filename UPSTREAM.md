# Syncing with upstream (jeetsh4h-dev)

This site started from [Jeet Shah's jeetsh4h-dev](https://github.com/jeetsh4h/jeetsh4h-dev)
but was not forked in git terms: the two histories do not share a commit, so
`git merge upstream/main` is not possible. Upstream changes are ported by hand.

**Last synced to:** `jeetsh4h/jeetsh4h-dev@ccd0a7d` (2026-11-06,
"homepage cleanup, consistent project cards and Summer 2027 availability").

## Procedure

```bash
git fetch upstream                      # remote added: jeetsh4h/jeetsh4h-dev
git log --oneline ccd0a7d..upstream/main   # what is new since the last sync
git diff ccd0a7d upstream/main --stat      # which files it touches
```

For each file worth porting:

```bash
git diff ccd0a7d upstream/main -- components/foo.tsx | patch -p1   # if ours is close to his
git show upstream/main:components/foo.tsx                            # or copy and re-apply our deltas
```

Then `pnpm verify`, commit with the upstream SHA in the message, and update the
**Last synced to** line above.

## What to port and what to skip

- **Port:** layout and component changes under `components/`, `app/globals.css`,
  `lib/content/types.ts`, scripts and tooling, tests.
- **Skip:** anything under `lib/content/*.ts` other than `types.ts`, `cv/`,
  `diary/`, `AGENTS.md`, `README.md` prose, and his SEO/URLs. Those are his
  facts, not ours.
- **Re-apply after copying a component:** `externalLinkProps()` from
  `lib/utils.ts` on external links, the `featured` filter in `research.tsx`,
  the site-page nav and résumé/CV links in `profile.tsx`, and the empty-link
  guard on coursework cards in `education.tsx`.

## Our additions that upstream does not have

`app/{now,uses,music,guestbook,credits}`, the Spotify integration
(`app/api/spotify`, `components/terminal/spotify*.tsx`, `SPOTIFY.md`), tRPC
(`server/`, `trpc/`, `app/api/trpc`), `components/diary/*` (Figure, Footnotes),
`components/terminal/ganderbal.tsx`, `CONTENT.md`, `DEPLOY.md`.
