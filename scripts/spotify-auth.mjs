import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { URL } from "node:url";

const REDIRECT_URI = "http://127.0.0.1:8888/callback";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-top-read",
].join(" ");

function loadDotEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) {
    return;
  }

  const contents = fs.readFileSync(envPath, "utf8");
  for (const line of contents.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const separator = trimmed.indexOf("=");
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function openBrowser(url) {
  const command =
    process.platform === "darwin" ? "open"
    : process.platform === "win32" ? "cmd"
    : "xdg-open";
  const args = process.platform === "win32" ? ["/c", "start", url] : [url];
  spawn(command, args, { stdio: "ignore", detached: true }).unref();
}

function html(body) {
  return `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>Spotify auth</title></head>
  <body style="font-family: ui-monospace, monospace; padding: 2rem; max-width: 40rem;">
    ${body}
  </body>
</html>`;
}

async function exchangeCode({ clientId, clientSecret, code }) {
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(
      payload.error_description || payload.error || `HTTP ${response.status}`,
    );
  }

  if (typeof payload.refresh_token !== "string") {
    throw new Error(
      "Spotify did not return a refresh_token. Remove the app from https://www.spotify.com/account/apps/ and try again.",
    );
  }

  return payload.refresh_token;
}

function printToken(refreshToken) {
  console.log("\nSave this as SPOTIFY_REFRESH_TOKEN (never commit it):\n");
  console.log(refreshToken);
  console.log("\nThen put all three values in .env.local:\n");
  console.log("SPOTIFY_CLIENT_ID=...");
  console.log("SPOTIFY_CLIENT_SECRET=...");
  console.log(`SPOTIFY_REFRESH_TOKEN=${refreshToken}`);
  console.log(
    "\nFor production: Vercel → Project → Settings → Environment Variables",
  );
  console.log(
    "Add the same three names for Production (and Preview if you want).",
  );
  console.log(
    "Redeploy after saving. Then visit /terminal and run `spotify`.\n",
  );
}

loadDotEnvLocal();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error(
    [
      "Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET.",
      "",
      "1. Open https://developer.spotify.com/dashboard",
      "2. Create an app (or open yours).",
      "3. Settings → Redirect URIs → add exactly:",
      `   ${REDIRECT_URI}`,
      "4. Copy Client ID and Client Secret.",
      "5. Create .env.local in this folder:",
      "",
      "   SPOTIFY_CLIENT_ID=paste_id",
      "   SPOTIFY_CLIENT_SECRET=paste_secret",
      "",
      "6. Run: pnpm spotify:auth",
    ].join("\n"),
  );
  process.exit(1);
}

const authorizeUrl = new URL("https://accounts.spotify.com/authorize");
authorizeUrl.searchParams.set("client_id", clientId);
authorizeUrl.searchParams.set("response_type", "code");
authorizeUrl.searchParams.set("redirect_uri", REDIRECT_URI);
authorizeUrl.searchParams.set("scope", SCOPES);
authorizeUrl.searchParams.set("show_dialog", "true");

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url ?? "/", REDIRECT_URI);

  if (requestUrl.pathname !== "/callback") {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("Not found");
    return;
  }

  const error = requestUrl.searchParams.get("error");
  const code = requestUrl.searchParams.get("code");

  if (error || !code) {
    response.writeHead(400, { "Content-Type": "text/html" });
    response.end(
      html(
        `<p>Spotify returned an error: <code>${error ?? "missing code"}</code></p>`,
      ),
    );
    server.close();
    process.exit(1);
    return;
  }

  try {
    const refreshToken = await exchangeCode({
      clientId,
      clientSecret,
      code,
    });
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(
      html(
        "<p>Refresh token received. You can close this tab and return to the terminal.</p>",
      ),
    );
    printToken(refreshToken);
    server.close();
    process.exit(0);
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : String(cause);
    response.writeHead(500, { "Content-Type": "text/html" });
    response.end(html(`<p>Token exchange failed: ${message}</p>`));
    console.error(message);
    server.close();
    process.exit(1);
  }
});

server.listen(8888, "127.0.0.1", () => {
  console.log("Listening on", REDIRECT_URI);
  console.log("Opening Spotify login. If it does not open, visit:\n");
  console.log(authorizeUrl.toString());
  console.log("");
  openBrowser(authorizeUrl.toString());
});
