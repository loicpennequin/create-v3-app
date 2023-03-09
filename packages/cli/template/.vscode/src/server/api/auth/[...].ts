import { NuxtAuthHandler } from '#auth';
import { User as PrismaUser } from '@prisma/client';
import GithubProvider from 'next-auth/providers/github';
import DiscordProvider from 'next-auth/providers/discord';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from '~/server/db';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface User extends PrismaUser {}
  interface Session {
    user: User;
  }
}

/**
 * Options for nuxt-auth used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 * @see https://sidebase.io/nuxt-auth/server-side
 */
export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  adapter: PrismaAdapter(db),
  providers: [
    // @ts-expect-error  You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: useRuntimeConfig().githubClientId,
      clientSecret: useRuntimeConfig().githubClientSecret
    }),
    // @ts-expect-error  You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    DiscordProvider.default({
      clientId: useRuntimeConfig().discordClientId,
      clientSecret: useRuntimeConfig().discordClientSecret
    })
  ]
});
