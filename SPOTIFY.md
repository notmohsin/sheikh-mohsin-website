# Spotify integration

The terminal shows **now playing** (with progress bar) or **recently played** in the prompt bar and via the `spotify` command. Implementation: [`app/api/spotify/route.ts`](app/api/spotify/route.ts).

## 1. Create a Spotify app

1. Open [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. **Create app** → name it (e.g. `mohsin-website`)
3. Under **Settings** → **Redirect URIs**, add:
   - `http://127.0.0.1:8888/callback` (for token generation below)
4. Save **Client ID** and **Client Secret**

## 2. Get a refresh token (one-time)

Spotify uses OAuth. You need a **refresh token** that never expires (until you revoke it).

### Option A — Authorization Code flow (recommended)

1. Set variables (replace with your client id):

```bash
export SPOTIFY_CLIENT_ID="your_client_id"
export SPOTIFY_CLIENT_SECRET="your_client_secret"
```

2. Open this URL in a browser (scopes for now-playing + recently-played):

```
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://127.0.0.1:8888/callback&scope=user-read-currently-playing%20user-read-recently-played
```

3. After approving, you are redirected to `http://127.0.0.1:8888/callback?code=...` — copy the `code` query parameter.

4. Exchange the code for tokens:

```bash
curl -s -X POST https://accounts.spotify.com/api/token \
  -H "Authorization: Basic $(printf '%s:%s' "$SPOTIFY_CLIENT_ID" "$SPOTIFY_CLIENT_SECRET" | base64 -w0)" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code" \
  -d "code=PASTE_CODE_HERE" \
  -d "redirect_uri=http://127.0.0.1:8888/callback"
```

5. From the JSON response, save `refresh_token` (not `access_token`).

### Option B — Spotify’s Web API console

Some developers use [spotify-token](https://github.com/spotify/web-api-auth-examples) examples or third-party one-off token tools. Prefer Option A so you control scopes.

## 3. Local env

```bash
cp .env.local.example .env.local
```

```env
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
SPOTIFY_REFRESH_TOKEN=...
```

```bash
pnpm dev
```

Visit `/terminal` — the prompt bar should show your track after a few seconds.

## 4. Vercel (production)

In [Vercel](https://vercel.com) → your project → **Settings** → **Environment Variables**, add the same three variables for **Production** (and Preview if you want). Redeploy after saving.

**Note:** Spotify playback must be active on an account you control. “Recently played” appears when nothing is playing now.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Always “Not playing” | Check env vars on Vercel; redeploy; confirm scopes include both read scopes |
| 401 from API | Refresh token revoked — repeat step 2 |
| 429 rate limit | Site caches ~15s; wait and retry |

---

## Future: Sound Capsule

Spotify’s **Sound Capsule** is not exposed as a public API like now-playing. When you want it on the site, realistic options:

1. **Link/embed** — If Spotify gives you a share URL for your capsule, add a link in [`lib/content/socials.ts`](lib/content/socials.ts) or a new terminal command that opens it.
2. **Listening profile** — Extend [`app/api/spotify/route.ts`](app/api/spotify/route.ts) with `user-top-read` scope and show top artists/tracks for a capsule-style overview (closest API equivalent).
3. **Static snapshot** — Curate a JSON file in `lib/content/` with your capsule highlights and style it like the existing `spotify` command card.

Say which approach you prefer when you’re ready; the current integration is designed so new API routes/commands can be added without changing the rest of the terminal.
