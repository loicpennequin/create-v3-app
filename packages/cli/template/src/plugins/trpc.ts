import { createTRPCNuxtClient } from 'trpc-nuxt/client';
import { httpBatchLink } from '@trpc/client';
import { FetchError } from 'ofetch';

import type { AppRouter } from '~/server/trpc/router';

export default defineNuxtPlugin(() => {
  const client = createTRPCNuxtClient<AppRouter>({
    links: [
      httpBatchLink({
        url: '/api/trpc',
        async fetch(input: any, init?: any) {
          try {
            const response = await $fetch.raw(input.toString(), init);
            return {
              ...response,
              json: () => response._data
            };
          } catch (err: any) {
            if (err instanceof FetchError) {
              return { json: () => err.data } as Response;
            }
            throw err;
          }
        }
      })
    ]
  });

  return {
    provide: {
      client
    }
  };
});
