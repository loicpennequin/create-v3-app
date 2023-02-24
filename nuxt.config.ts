import OpenProps from 'open-props';

const lib = process.env.npm_lifecycle_event;
const inlineMediaQueries = lib === 'lib:media' || lib === 'lib:supports';

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
      'postcss-preset-env': {
        stage: 0,
        autoprefixer: false,
        features: {
          'logical-properties-and-values': false,
          'prefers-color-scheme-query': false,
          'gap-properties': false,
          'custom-properties': false,
          'place-properties': false,
          'not-pseudo-class': false,
          'focus-visible-pseudo-class': false,
          'focus-within-pseudo-class': false,
          'color-functional-notation': false,
          'custom-media-queries': { preserve: inlineMediaQueries },
          'double-position-gradients': false
        }
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
