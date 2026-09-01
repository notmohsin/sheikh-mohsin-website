# Deploy to Vercel

Repo: **https://github.com/SheikhMohsin9311/sheikh-mohsin-website**

## One-time setup (recommended)

1. Open [Import on Vercel](https://vercel.com/new/import?s=https://github.com/SheikhMohsin9311/sheikh-mohsin-website)
2. Sign in with GitHub if prompted
3. **Root directory:** leave as `.` (repo root)
4. **Framework:** Next.js (auto-detected)
5. **Build command:** `pnpm build` (default)
6. **Install command:** `pnpm install`
7. Deploy

Vercel reads [`vercel.json`](vercel.json) — region `bom1` (Mumbai).

## Custom domain

If you already use **sheikh-mohsin.vercel.app** on another project:

- Vercel → old project → Settings → Domains → remove the domain, **or**
- This project → Settings → Domains → add `sheikh-mohsin.vercel.app`

Then update [`lib/content/seo.ts`](lib/content/seo.ts) `url` if the canonical URL changes.

## Spotify on production

After deploy, add in Vercel → **Settings** → **Environment Variables**:

| Name | Value |
|------|--------|
| `SPOTIFY_CLIENT_ID` | from Spotify Dashboard |
| `SPOTIFY_CLIENT_SECRET` | from Spotify Dashboard |
| `SPOTIFY_REFRESH_TOKEN` | from OAuth flow |

See [`SPOTIFY.md`](SPOTIFY.md) for how to get the refresh token. Redeploy after saving.

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

Connect the GitHub repo in Vercel → every `git push` to `master` can auto-deploy (enable in project Settings → Git).
