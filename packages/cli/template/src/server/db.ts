import { PrismaClient } from '@prisma/client';
import chalk from 'chalk';

const prismaLogger = (...args: any[]) => {
  // eslint-disable-next-line no-console
  console.log(chalk.magenta('[PRISMA]'), ' - ', ...args);
};

export const db = new PrismaClient({
  log:
    process.env.DEBUG === 'development' ? ['query', 'error', 'warn'] : ['error']
});

db.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();

  prismaLogger(`${params.model}.${params.action} - ${after - before}ms`);
  return result;
});

export type Db = PrismaClient;
