import { env } from "@/env";
import type {
  SpotifyNowPlayingResponse,
  SpotifyOverview,
  SpotifyPlaybackStatus,
  SpotifyRecentlyPlayedResponse,
  SpotifyResponse,
  SpotifyTokenResponse,
  SpotifyTopItem,
  SpotifyTrack,
} from "@/components/terminal/types";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played";
const TOP_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks";
const TOP_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists";

export const SPOTIFY_BROWSER_CACHE_CONTROL =
  "public, max-age=0, must-revalidate";
export const SPOTIFY_CDN_CACHE_CONTROL =
  "public, s-maxage=15, stale-while-revalidate=60, stale-if-error=300";
const DEFAULT_RATE_LIMIT_RETRY_AFTER_SECONDS = 60;

type SpotifyConfig = {
  basic: string;
  refreshToken: string;
};

type AccessTokenResult =
  | { status: "success"; accessToken: string }
  | { status: "rate-limited"; retryAfterSeconds: number | null }
  | { status: "error" };

const PLAYBACK_TITLES: Record<SpotifyPlaybackStatus, string> = {
  ok: "Not playing",
  empty: "Not playing",
  unconfigured: "Spotify unset",
  auth_failed: "Spotify auth failed",
  rate_limited: "Spotify rate limited",
};

export function emptyPlayback(
  status: SpotifyPlaybackStatus,
  extra?: Partial<SpotifyResponse>,
): SpotifyResponse {
  return {
    status,
    isPlaying: false,
    title: PLAYBACK_TITLES[status],
    artist: "",
    url: "",
    ...extra,
  };
}

function encodeBasicAuth(clientId: string, clientSecret: string) {
  return Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
}

export function getSpotifyConfig(): SpotifyConfig | null {
  const clientId = env.SPOTIFY_CLIENT_ID;
  const clientSecret = env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  return {
    basic: encodeBasicAuth(clientId, clientSecret),
    refreshToken,
  };
}

export function getRetryAfterSeconds(response: Response) {
  const retryAfter = response.headers.get("Retry-After");

  if (!retryAfter) {
    return null;
  }

  const seconds = Number(retryAfter);
  if (Number.isFinite(seconds) && seconds >= 0) {
    return Math.ceil(seconds);
  }

  const retryAfterDate = Date.parse(retryAfter);
  if (!Number.isNaN(retryAfterDate)) {
    return Math.max(0, Math.ceil((retryAfterDate - Date.now()) / 1000));
  }

  return null;
}

export function getRateLimitCacheControl(retryAfterSeconds: number | null) {
  const sMaxage = Math.max(
    1,
    retryAfterSeconds ?? DEFAULT_RATE_LIMIT_RETRY_AFTER_SECONDS,
  );

  return `public, s-maxage=${sMaxage}, stale-while-revalidate=300, stale-if-error=300`;
}

export function spotifyTrackToResponse({
  track,
  isPlaying,
  progressMs,
  playedAt,
}: {
  track: SpotifyTrack;
  isPlaying: boolean;
  progressMs?: number;
  playedAt?: string;
}): SpotifyResponse {
  return {
    status: "ok",
    isPlaying,
    title: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
    url: track.external_urls.spotify,
    albumImageUrl: track.album?.images?.[0]?.url || "",
    progressMs,
    playedAt,
    durationMs: track.duration_ms,
  };
}

function logSpotify(step: string, status: number) {
  console.warn("[spotify]", { step, status });
}

async function getAccessToken(
  config: SpotifyConfig,
): Promise<AccessTokenResult> {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${config.basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: config.refreshToken,
    }),
    cache: "no-store",
  });

  if (response.status === 429) {
    logSpotify("token", 429);
    return {
      status: "rate-limited",
      retryAfterSeconds: getRetryAfterSeconds(response),
    };
  }

  if (!response.ok) {
    logSpotify("token", response.status);
    return { status: "error" };
  }

  const token = (await response.json()) as Partial<SpotifyTokenResponse>;

  if (typeof token.access_token !== "string") {
    logSpotify("token", response.status);
    return { status: "error" };
  }

  return { status: "success", accessToken: token.access_token };
}

export async function getSpotifyPlayback(): Promise<{
  playback: SpotifyResponse;
  retryAfterSeconds: number | null;
}> {
  const config = getSpotifyConfig();

  if (!config) {
    return { playback: emptyPlayback("unconfigured"), retryAfterSeconds: null };
  }

  try {
    const tokenResult = await getAccessToken(config);

    if (tokenResult.status === "rate-limited") {
      return {
        playback: emptyPlayback("rate_limited"),
        retryAfterSeconds: tokenResult.retryAfterSeconds,
      };
    }

    if (tokenResult.status !== "success") {
      return {
        playback: emptyPlayback("auth_failed"),
        retryAfterSeconds: null,
      };
    }

    const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${tokenResult.accessToken}` },
      cache: "no-store",
    });

    if (nowPlayingRes.status === 429) {
      logSpotify("now-playing", 429);
      return {
        playback: emptyPlayback("rate_limited"),
        retryAfterSeconds: getRetryAfterSeconds(nowPlayingRes),
      };
    }

    if (nowPlayingRes.status === 401 || nowPlayingRes.status === 403) {
      logSpotify("now-playing", nowPlayingRes.status);
      return {
        playback: emptyPlayback("auth_failed"),
        retryAfterSeconds: null,
      };
    }

    if (nowPlayingRes.status === 200) {
      const song = (await nowPlayingRes.json()) as SpotifyNowPlayingResponse;

      if (song.item && song.item.name) {
        return {
          playback: spotifyTrackToResponse({
            track: song.item,
            isPlaying: song.is_playing,
            progressMs: song.progress_ms,
          }),
          retryAfterSeconds: null,
        };
      }
    } else if (nowPlayingRes.status !== 204) {
      logSpotify("now-playing", nowPlayingRes.status);
    }

    const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${tokenResult.accessToken}` },
      cache: "no-store",
    });

    if (recentRes.status === 429) {
      logSpotify("recently-played", 429);
      return {
        playback: emptyPlayback("rate_limited"),
        retryAfterSeconds: getRetryAfterSeconds(recentRes),
      };
    }

    if (recentRes.status === 401 || recentRes.status === 403) {
      logSpotify("recently-played", recentRes.status);
      return {
        playback: emptyPlayback("auth_failed"),
        retryAfterSeconds: null,
      };
    }

    if (recentRes.status === 200) {
      const recentData =
        (await recentRes.json()) as SpotifyRecentlyPlayedResponse;

      if (recentData.items && recentData.items.length > 0) {
        const lastSong = recentData.items[0].track;
        const playedAt = recentData.items[0].played_at;
        return {
          playback: spotifyTrackToResponse({
            track: lastSong,
            isPlaying: false,
            playedAt,
          }),
          retryAfterSeconds: null,
        };
      }
    } else {
      logSpotify("recently-played", recentRes.status);
    }

    return { playback: emptyPlayback("empty"), retryAfterSeconds: null };
  } catch (error) {
    console.error("Spotify API error:", error);
    return { playback: emptyPlayback("auth_failed"), retryAfterSeconds: null };
  }
}

type SpotifyTopTracksResponse = {
  items: SpotifyTrack[];
};

type SpotifyTopArtistsResponse = {
  items: {
    name: string;
    images: { url: string }[];
    external_urls: { spotify: string };
  }[];
};

async function fetchTopList(
  accessToken: string,
  endpoint: string,
): Promise<Response> {
  const url = new URL(endpoint);
  url.searchParams.set("limit", "5");
  url.searchParams.set("time_range", "medium_term");

  return fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
}

function tracksToTopItems(tracks: SpotifyTrack[]): SpotifyTopItem[] {
  return tracks.map((track) => ({
    name: track.name,
    subtitle: track.artists.map((artist) => artist.name).join(", "),
    url: track.external_urls.spotify,
    imageUrl: track.album?.images?.[0]?.url,
  }));
}

export async function getSpotifyOverview(): Promise<SpotifyOverview> {
  const { playback } = await getSpotifyPlayback();
  const emptyOverview: SpotifyOverview = {
    playback,
    topTracks: [],
    topArtists: [],
    topStatus: "unavailable",
  };

  const config = getSpotifyConfig();
  if (!config || playback.status === "unconfigured") {
    return emptyOverview;
  }

  if (playback.status === "auth_failed" || playback.status === "rate_limited") {
    return emptyOverview;
  }

  const tokenResult = await getAccessToken(config);
  if (tokenResult.status !== "success") {
    return emptyOverview;
  }

  try {
    const [tracksRes, artistsRes] = await Promise.all([
      fetchTopList(tokenResult.accessToken, TOP_TRACKS_ENDPOINT),
      fetchTopList(tokenResult.accessToken, TOP_ARTISTS_ENDPOINT),
    ]);

    if (!tracksRes.ok || !artistsRes.ok) {
      logSpotify("top-tracks", tracksRes.status);
      logSpotify("top-artists", artistsRes.status);
      return emptyOverview;
    }

    const tracks = (await tracksRes.json()) as SpotifyTopTracksResponse;
    const artists = (await artistsRes.json()) as SpotifyTopArtistsResponse;

    return {
      playback,
      topTracks: tracksToTopItems(tracks.items ?? []),
      topArtists: (artists.items ?? []).map((artist) => ({
        name: artist.name,
        url: artist.external_urls.spotify,
        imageUrl: artist.images?.[0]?.url,
      })),
      topStatus: "ok",
    };
  } catch (error) {
    console.error("Spotify top lists error:", error);
    return emptyOverview;
  }
}
