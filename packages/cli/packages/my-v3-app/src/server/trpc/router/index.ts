import { procedure, router } from '../trpc';

export const appRouter = router({
  title: procedure.query(() => 'Create V3 App')
});

export type AppRouter = typeof appRouter;
