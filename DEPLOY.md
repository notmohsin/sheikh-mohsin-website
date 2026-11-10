# Deploy to Vercel

Repo: **https://github.com/notmohsin/sheikh-mohsin-website**

## One-time setup (recommended)

1. Open [Import on Vercel](https://vercel.com/new/import?s=https://github.com/notmohsin/sheikh-mohsin-website)
2. Sign in with GitHub if prompted
3. **Root directory:** leave as `.` (repo root)
4. **Framework:** Next.js (auto-detected)
5. **Build command:** `pnpm build` (default)
6. **Install command:** `pnpm install`
7. Deploy

Vercel reads [`vercel.json`](vercel.json) — region `bom1` (Mumbai).

## Custom domain

Production is served at **https://sheikhmohsin.vercel.app** (no hyphen), the
domain attached to the `sheikh-mohsin-website` Vercel project.

`sheikh-mohsin.vercel.app` (with a hyphen) belongs to an older, unrelated
project (`my-digital-showcase-237`) and does **not** serve this site. Don't
link to it.

If the domain ever changes, update every reference together:
[`lib/content/seo.ts`](lib/content/seo.ts) `url`, the canonical header in
[`next.config.ts`](next.config.ts), the header in
[`cv/resumes/resume-layout.tex`](cv/resumes/resume-layout.tex), and the links in
[`cv/cv.tex`](cv/cv.tex); then run `pnpm cv:build && pnpm resumes:build` and
commit the PDFs. `git grep vercel.app` finds them all.

## Spotify on production

After deploy, add in Vercel → **Settings** → **Environment Variables**:

| Name                    | Value                  |
| ----------------------- | ---------------------- |
| `SPOTIFY_CLIENT_ID`     | from Spotify Dashboard |
| `SPOTIFY_CLIENT_SECRET` | from Spotify Dashboard |
| `SPOTIFY_REFRESH_TOKEN` | from OAuth flow        |

See [`SPOTIFY.md`](SPOTIFY.md) for the full click-by-click flow, including `pnpm spotify:auth`. Redeploy after saving.

## CV on Vercel

`public/cv.pdf` is committed to git so `/pdf` works without LaTeX on Vercel. After editing [`cv/cv.tex`](cv/cv.tex):

```bash
pnpm cv:build
git add public/cv.pdf
git commit -m "Update CV"
git push
```

## CLI deploy (optional)

```bash
npx vercel login
npx vercel link
npx vercel --prod
```

## Future pushes

[`vercel.json`](vercel.json) leaves Git deploys enabled. A push to `master` ships production when this GitHub repo is still connected in the Vercel project (Settings → Git). Removing the repo there is a dashboard change; this file cannot reconnect it.
