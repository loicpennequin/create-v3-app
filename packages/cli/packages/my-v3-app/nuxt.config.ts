import OpenProps from 'open-props';

export default defineNuxtConfig({
  srcDir: 'src',

  runtimeConfig: {
    authSecret: '',
    discordClientId: '',
    discordClientSecret: '',
    githubClientId: '',
    githubClientSecret: ''
  },

  experimental: {
    inlineSSRStyles: false
  },

  build: {
    transpile: ['trpc-nuxt']
  },

  typescript: {
    typeCheck: 'build'
  },

  css: ['open-props/postcss/normalize', '~/assets/styles/theme.css'],

  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/device',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    'nuxt-typed-router',
    '@nuxt/image-edge',
    '@sidebase/nuxt-auth'
  ],

  postcss: {
    plugins: {
      './scripts/postcss-jit-fix.js': OpenProps,
      'postcss-custom-media': {
        preserve: false
      },
      'postcss-nesting': { noIsPseudoSelector: false }
    }
  },

  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.json'
      },
      {
        code: 'fr',
        file: 'fr.json'
      }
    ],
    lazy: {
      skipNuxtState: true
    },
    langDir: 'locales/',
    defaultLocale: 'en',
    strategy: 'prefix',
    vueI18n: {
      legacy: false
    }
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: '',
    classSuffix: ''
  },

  auth: {
    basePath: '/api/auth',
    enableSessionRefreshOnWindowFocus: true
  }
});
