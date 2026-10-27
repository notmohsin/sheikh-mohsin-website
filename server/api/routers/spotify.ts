import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  getSpotifyOverview,
  getSpotifyPlayback,
} from "@/server/spotify/playback";

const timeRangeSchema = z.enum(["short_term", "medium_term", "long_term"]);

export const spotifyRouter = createTRPCRouter({
  now: publicProcedure.query(async () => {
    const { playback } = await getSpotifyPlayback();
    return playback;
  }),
  overview: publicProcedure
    .input(
      z
        .object({
          timeRange: timeRangeSchema.default("medium_term"),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      return getSpotifyOverview(input?.timeRange ?? "medium_term");
    }),
});
