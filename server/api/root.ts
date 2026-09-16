import { createTRPCRouter } from "@/server/api/trpc";
import { spotifyRouter } from "@/server/api/routers/spotify";

export const appRouter = createTRPCRouter({
  spotify: spotifyRouter,
});

export type AppRouter = typeof appRouter;
