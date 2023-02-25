import { NuxtModule } from 'nuxt/schema'
declare module 'nuxt/schema' {
  interface NuxtConfig {
    ["i18n"]?: typeof import("@nuxtjs/i18n").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["device"]?: typeof import("@nuxtjs/device").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["colorMode"]?: typeof import("@nuxtjs/color-mode").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["icon"]?: typeof import("nuxt-icon").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["nuxt-config-schema-compat"]?: typeof import("nuxt-config-schema").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["nuxtTypedRouter"]?: typeof import("nuxt-typed-router").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["image"]?: typeof import("@nuxt/image-edge").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["auth"]?: typeof import("@sidebase/nuxt-auth").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["nuxt-config-schema"]?: typeof import("nuxt-config-schema").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["@nuxtjs/i18n", NuxtConfig["i18n"]] | ["@nuxtjs/device", NuxtConfig["device"]] | ["@nuxtjs/color-mode", NuxtConfig["colorMode"]] | ["nuxt-icon", NuxtConfig["icon"]] | ["nuxt-config-schema", NuxtConfig["nuxt-config-schema-compat"]] | ["nuxt-typed-router", NuxtConfig["nuxtTypedRouter"]] | ["@nuxt/image-edge", NuxtConfig["image"]] | ["@sidebase/nuxt-auth", NuxtConfig["auth"]] | ["nuxt-config-schema", NuxtConfig["nuxt-config-schema"]] | ["@nuxt/telemetry", NuxtConfig["telemetry"]])[],
  }
  interface RuntimeConfig {
   app: {
      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   authSecret: string,

   discordClientId: string,

   discordClientSecret: string,

   githubClientId: string,

   githubClientSecret: string,

   auth: {
      isEnabled: boolean,

      origin: any,

      basePath: string,

      trustHost: boolean,

      enableSessionRefreshPeriodically: boolean,

      enableSessionRefreshOnWindowFocus: boolean,

      enableGlobalAppMiddleware: boolean,

      defaultProvider: any,

      globalMiddlewareOptions: {
         allow404WithoutAuth: boolean,
      },

      isOriginSet: boolean,
   },
  }
  interface PublicRuntimeConfig {
   device: {
      enabled: boolean,

      defaultUserAgent: string,

      refreshOnResize: boolean,
   },

   auth: {
      isEnabled: boolean,

      origin: any,

      basePath: string,

      trustHost: boolean,

      enableSessionRefreshPeriodically: boolean,

      enableSessionRefreshOnWindowFocus: boolean,

      enableGlobalAppMiddleware: boolean,

      defaultProvider: any,

      globalMiddlewareOptions: {
         allow404WithoutAuth: boolean,
      },
   },
  }
}