import { TRPCError, initTRPC } from '@trpc/server';
import { Context } from '~/server/trpc/context';
import superjson from 'superjson';
import chalk from 'chalk';

export const logger = (...messages: string[]) =>
  console.log(chalk.blue('[ TRPC ]'), ' - ', ...messages);

const t = initTRPC.context<Context>().create({
  transformer: superjson
});

const authMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user }
    }
  });
});

const loggerMiddleware = t.middleware(async ({ path, next }) => {
  logger(`${path}`);

  const start = Date.now();
  const result = await next();
  const durationMs = Date.now() - start;
  logger(`${path} - END : ${durationMs}ms`);

  return result;
});

export const procedure = t.procedure.use(loggerMiddleware);
export const authenticatedProcedure = t.procedure
  .use(loggerMiddleware)
  .use(authMiddleware);
export const router = t.router;
