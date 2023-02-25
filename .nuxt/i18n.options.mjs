export const localeCodes = ["en","fr"]

export const localeMessages = {
  "en": [{ key: "../src/locales/en.json", load: () => import("../src/locales/en.json" /* webpackChunkName: "lang-en.json" */) }],
  "fr": [{ key: "../src/locales/fr.json", load: () => import("../src/locales/fr.json" /* webpackChunkName: "lang-fr.json" */) }],
}

export const additionalMessages = Object({"fr":[],})

export const resolveNuxtI18nOptions = async (context) => {
  const nuxtI18nOptions = Object({})
  const vueI18nOptionsLoader = async (context) => Object({"legacy":false,"messages": Object({"en":{
  
},}),})
  nuxtI18nOptions.vueI18n = await vueI18nOptionsLoader(context)
  nuxtI18nOptions.locales = [Object({"code":"en","file":"en.json","path":"C:/Users/Loïc/web/create-d3-app/src/locales/en.json"}),Object({"code":"fr","file":"fr.json","path":"C:/Users/Loïc/web/create-d3-app/src/locales/fr.json"})]
  nuxtI18nOptions.defaultLocale = "en"
  nuxtI18nOptions.defaultDirection = "ltr"
  nuxtI18nOptions.routesNameSeparator = "___"
  nuxtI18nOptions.trailingSlash = false
  nuxtI18nOptions.defaultLocaleRouteNameSuffix = "default"
  nuxtI18nOptions.strategy = "prefix"
  nuxtI18nOptions.lazy = Object({"skipNuxtState":true})
  nuxtI18nOptions.langDir = "locales/"
  nuxtI18nOptions.rootRedirect = null
  nuxtI18nOptions.detectBrowserLanguage = Object({"alwaysRedirect":false,"cookieCrossOrigin":false,"cookieDomain":null,"cookieKey":"i18n_redirected","cookieSecure":false,"fallbackLocale":"","redirectOn":"root","useCookie":true})
  nuxtI18nOptions.differentDomains = false
  nuxtI18nOptions.baseUrl = ""
  nuxtI18nOptions.dynamicRouteParams = false
  nuxtI18nOptions.customRoutes = "page"
  nuxtI18nOptions.pages = Object({})
  nuxtI18nOptions.skipSettingLocaleOnNavigate = false
  nuxtI18nOptions.onBeforeLanguageSwitch = (() => "")
  nuxtI18nOptions.onLanguageSwitched = (() => null)
  nuxtI18nOptions.types = undefined
  nuxtI18nOptions.debug = false
  return nuxtI18nOptions
}

export const nuxtI18nOptionsDefault = Object({vueI18n: undefined,locales: [],defaultLocale: "",defaultDirection: "ltr",routesNameSeparator: "___",trailingSlash: false,defaultLocaleRouteNameSuffix: "default",strategy: "prefix_except_default",lazy: false,langDir: null,rootRedirect: null,detectBrowserLanguage: Object({"alwaysRedirect":false,"cookieCrossOrigin":false,"cookieDomain":null,"cookieKey":"i18n_redirected","cookieSecure":false,"fallbackLocale":"","redirectOn":"root","useCookie":true}),differentDomains: false,baseUrl: "",dynamicRouteParams: false,customRoutes: "page",pages: Object({}),skipSettingLocaleOnNavigate: false,onBeforeLanguageSwitch: (() => ""),onLanguageSwitched: (() => null),types: undefined,debug: false})

export const nuxtI18nInternalOptions = Object({__normalizedLocales: [Object({"code":"en","file":"en.json","path":"C:/Users/Loïc/web/create-d3-app/src/locales/en.json"}),Object({"code":"fr","file":"fr.json","path":"C:/Users/Loïc/web/create-d3-app/src/locales/fr.json"})]})
export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const isSSG = false
export const isSSR = true
