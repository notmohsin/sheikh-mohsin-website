import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  getSpotifyOverview,
  getSpotifyPlayback,
} from "@/server/spotify/playback";

export const spotifyRouter = createTRPCRouter({
  now: publicProcedure.query(async () => {
    const { playback } = await getSpotifyPlayback();
    return playback;
  }),
  overview: publicProcedure.query(async () => {
    return getSpotifyOverview();
  }),
});
