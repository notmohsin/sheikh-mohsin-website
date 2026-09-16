import { NextResponse } from "next/server";

import type { SpotifyResponse } from "@/components/terminal/types";
import {
  getRateLimitCacheControl,
  getSpotifyPlayback,
  SPOTIFY_BROWSER_CACHE_CONTROL,
  SPOTIFY_CDN_CACHE_CONTROL,
} from "@/server/spotify/playback";

function spotifyJson(
  data: SpotifyResponse,
  init?: ResponseInit,
  cdnCacheControl = SPOTIFY_CDN_CACHE_CONTROL,
) {
  const headers = new Headers(init?.headers);
  headers.set("Cache-Control", SPOTIFY_BROWSER_CACHE_CONTROL);
  headers.set("CDN-Cache-Control", cdnCacheControl);
  headers.set("Vercel-CDN-Cache-Control", cdnCacheControl);

  return NextResponse.json(data, {
    ...init,
    headers,
  });
}

export async function GET() {
  const { playback, retryAfterSeconds } = await getSpotifyPlayback();
  const headers = new Headers();

  if (playback.status === "rate_limited" && retryAfterSeconds !== null) {
    headers.set("Retry-After", String(retryAfterSeconds));
    return spotifyJson(
      playback,
      { headers },
      getRateLimitCacheControl(retryAfterSeconds),
    );
  }

  return spotifyJson(playback, { headers });
}
