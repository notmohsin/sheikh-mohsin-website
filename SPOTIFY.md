# Spotify integration

The terminal prompt and the `spotify` command show **now playing** (or **recently played**) and, once the extra scope is granted, **top tracks / artists**.

**Never commit Client ID, Client Secret, or Refresh Token.** They live in `.env.local` locally and in Vercel environment variables in production.

The old REST endpoint still works for debugging: `GET /api/spotify`. The site UI uses tRPC (`spotify.now`, `spotify.overview`).

---

## What you do, in order

### A. Create the Spotify app (once)

1. Open [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard) and sign in with **your** Spotify account (the one whose listening you want on the site).
2. **Create app**. Name it anything (`mohsin-website` is fine).
3. Open **Settings**.
4. Under **Redirect URIs**, click **Add** and paste **exactly** this, then save:

   `http://127.0.0.1:8888/callback`

   `localhost` is not the same as `127.0.0.1`. Use `127.0.0.1`.

5. Copy **Client ID**.
6. Click **View client secret** and copy **Client Secret**.

### B. Put the id and secret on disk

In `mohsin-working` (this app folder):

```bash
cp .env.local.example .env.local
```

Edit `.env.local` so the first two lines are filled. Leave the refresh token blank for now:

```env
SPOTIFY_CLIENT_ID=paste_id_here
SPOTIFY_CLIENT_SECRET=paste_secret_here
SPOTIFY_REFRESH_TOKEN=
```

### C. Get a refresh token (the step that usually fails)

A Client ID and secret are **not enough**. Spotify also needs a **refresh token** from an OAuth login. That token is long-lived until you revoke the app.

From `mohsin-working`:

```bash
pnpm spotify:auth
```

What happens:

1. A tiny server starts on `127.0.0.1:8888`.
2. Your browser opens the Spotify consent screen.
3. Approve **currently playing**, **recently played**, and **top items**.
4. Spotify redirects back to the local server. The script prints `SPOTIFY_REFRESH_TOKEN=...` in the terminal.
5. Paste that value into `.env.local` on the `SPOTIFY_REFRESH_TOKEN=` line. Save the file.

If the browser does not open, copy the URL the script printed and paste it into the browser yourself.

If Spotify says the redirect URI is invalid, go back to dashboard Settings and confirm the URI is **exactly** `http://127.0.0.1:8888/callback` (saved).

If there is no `refresh_token` in the response: open [spotify.com/account/apps](https://www.spotify.com/account/apps/), remove this app, and run `pnpm spotify:auth` again.

### D. Check it locally

```bash
pnpm dev
```

In another terminal:

```bash
curl -s http://127.0.0.1:3000/api/spotify
```

Read the JSON `status` field. It is no longer a silent “Not playing” for every failure:

| `status`       | Meaning                                             | What you do                                                                   |
| -------------- | --------------------------------------------------- | ----------------------------------------------------------------------------- |
| `ok`           | Now playing or recently played                      | Done. Open `/terminal`.                                                       |
| `empty`        | Auth worked, nothing to show                        | Play a song on Spotify, wait ~15s, curl again.                                |
| `unconfigured` | One of the three env vars is missing                | Fix `.env.local`, restart `pnpm dev`.                                         |
| `auth_failed`  | Refresh token or secret is wrong, or scopes missing | Repeat **C**. Confirm you copied the **refresh** token, not the access token. |
| `rate_limited` | Spotify asked us to slow down                       | Wait a minute and retry.                                                      |

Then open `http://127.0.0.1:3000/terminal`. The prompt bar should show a track. Type `spotify` for the card plus top lists.

Restart `pnpm dev` after every `.env.local` change. Next.js does not always pick up new env vars on a hot reload.

### E. Production (Vercel)

1. Vercel → the project that serves **sheikh-mohsin.vercel.app** (not an old unused project).
2. **Settings → Environment Variables**.
3. Add all three names, same values as `.env.local`, for **Production**. Add **Preview** too if you want preview deploys to work.
4. **Deployments → … on the latest deployment → Redeploy**. Saving env vars does nothing until a new deploy.

After deploy:

```bash
curl -s https://sheikh-mohsin.vercel.app/api/spotify
```

Use the same `status` table. If production is `unconfigured`, the vars are on the wrong Vercel project or were not available at build/runtime.

---

## Top tracks / artists

That data needs the `user-top-read` scope. `pnpm spotify:auth` requests it. If you generated a token **before** that scope existed, run **C** again and replace `SPOTIFY_REFRESH_TOKEN` locally and on Vercel.

---

## Security

- Do not paste tokens into git, issues, or this file.
- `.env.local` is gitignored.
- Server logs only HTTP status codes, never secrets.
