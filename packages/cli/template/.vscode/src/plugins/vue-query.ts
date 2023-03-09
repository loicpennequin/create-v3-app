/**
 * this files sets up the vue-query client, and takes care of the cache serialization / deserialization between SSR and CSR
 */

import type {
  DehydratedState,
  VueQueryPluginOptions
} from '@tanstack/vue-query';
import {
  VueQueryPlugin,
  QueryClient,
  hydrate,
  dehydrate
} from '@tanstack/vue-query';
import { useState } from '#app';

export default defineNuxtPlugin(nuxt => {
  const vueQueryState = useState<DehydratedState | null>('vue-query');

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Add your query client options here
      }
    }
  });
  const options: VueQueryPluginOptions = { queryClient };

  nuxt.vueApp.use(VueQueryPlugin, options);

  if (process.server) {
    nuxt.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(queryClient);
    });
  }

  if (process.client) {
    nuxt.hooks.hook('app:created', () => {
      hydrate(queryClient, vueQueryState.value);
    });
  }
});
