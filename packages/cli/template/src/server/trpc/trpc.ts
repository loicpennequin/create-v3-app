import { TRPCError, initTRPC } from '@trpc/server';
import { Context } from '~/server/trpc/context';
import superjson from 'superjson';

const t = initTRPC.context<Context>().create({
  transformer: superjson
});

const authMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next();
});

export const procedure = t.procedure;
export const authenticatedProcedure = t.procedure.use(authMiddleware);
export const router = t.router;
