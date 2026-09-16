import { describe, expect, it } from "vitest";

import { emptyPlayback, spotifyTrackToResponse } from "../playback";

describe("spotify playback mapping", () => {
  it("labels silent failures instead of always saying not playing", () => {
    expect(emptyPlayback("unconfigured").title).toBe("Spotify unset");
    expect(emptyPlayback("auth_failed").title).toBe("Spotify auth failed");
    expect(emptyPlayback("rate_limited").title).toBe("Spotify rate limited");
    expect(emptyPlayback("empty").title).toBe("Not playing");
    expect(emptyPlayback("empty").status).toBe("empty");
  });

  it("maps a Spotify track to the terminal payload", () => {
    const payload = spotifyTrackToResponse({
      track: {
        name: "Track",
        artists: [{ name: "A" }, { name: "B" }],
        duration_ms: 180000,
        album: { images: [{ url: "https://i.scdn.co/image/x" }] },
        external_urls: { spotify: "https://open.spotify.com/track/1" },
      },
      isPlaying: true,
      progressMs: 1000,
    });

    expect(payload).toEqual({
      status: "ok",
      isPlaying: true,
      title: "Track",
      artist: "A, B",
      url: "https://open.spotify.com/track/1",
      albumImageUrl: "https://i.scdn.co/image/x",
      progressMs: 1000,
      playedAt: undefined,
      durationMs: 180000,
    });
  });
});
