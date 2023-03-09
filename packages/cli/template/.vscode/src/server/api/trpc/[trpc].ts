import { createNuxtApiHandler } from 'trpc-nuxt';
import { appRouter } from '~/server/trpc/router';
import { createContext } from '~/server/trpc/context';
import chalk from 'chalk';

export default createNuxtApiHandler({
  router: appRouter,
  createContext,
  onError({ error, path }) {
    console.log(chalk.red('[ ERROR ]'), `- ${path} - ${error.message}`);
  }
});
