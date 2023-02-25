import { NuxtAuthHandler } from '#auth';
import GithubProvider from 'next-auth/providers/github';
import DiscordProvider from 'next-auth/providers/discord';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from '~/server/db';

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  adapter: PrismaAdapter(db),

  callbacks: {
    async session({ session }) {
      if (!session.user || !session.user.email) return session;

      const user = await db.user.findUnique({
        where: { email: session.user.email }
      });

      return {
        ...session,
        user: user!
      };
    }
  },

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
