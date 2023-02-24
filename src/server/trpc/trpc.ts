import { TRPCError, initTRPC } from '@trpc/server';
import { Context } from '~/server/trpc/context';

const t = initTRPC.context<Context>().create();

const authMiddleware = t.middleware(({ ctx, meta, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next();
});

export const procedure = t.procedure.use(authMiddleware);
export const authenticatedProcedure = t.procedure.use(authMiddleware);
export const router = t.router;
