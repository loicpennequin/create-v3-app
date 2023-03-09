import { procedure, router } from '../trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = router({
  title: procedure.query(() => 'Create V3 App')
});

export type AppRouter = typeof appRouter;
