import { TRPCError, initTRPC } from '@trpc/server';
import { Context } from '~/server/trpc/context';

type Meta = {
  needsAuth?: boolean;
};

const t = initTRPC.context<Context>().meta<Meta>().create();

const authMiddleware = t.middleware(({ ctx, meta, next }) => {
  if (meta?.needsAuth && !ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next();
});

export const procedure = t.procedure.use(authMiddleware);
export const router = t.router;
