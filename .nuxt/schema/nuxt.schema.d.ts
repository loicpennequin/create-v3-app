export interface NuxtCustomSchema {
 appConfig?: {
  /**
   * Nuxt Icon
   * 
   * Configure the defaults of Nuxt Icon
   * 
  */
  nuxtIcon?: {
   /**
    * Icon Size
    * 
    * Set the default icon size
    * 
    * @default ""
    * 
    * @studioIcon material-symbols:format-size-rounded
   */
   size?: string,

   /**
    * CSS Class
    * 
    * Set the default CSS class
    * 
    * @default ""
    * 
    * @studioIcon material-symbols:css
   */
   class?: string,

   /**
    * Icon aliases
    * 
    * Define Icon aliases to update them easily without code changes.
    * 
    * 
    * @studioIcon material-symbols:star-rounded
    * 
    * @studioInputObjectValueType icon
   */
   aliases?: { [alias: string]: string },
  },
 },
}
export type CustomAppConfig = Exclude<NuxtCustomSchema['appConfig'], undefined>

declare module 'nuxt/schema' {
  interface NuxtConfig extends NuxtCustomSchema {}
  interface NuxtOptions extends NuxtCustomSchema {}
  interface AppConfigInput extends CustomAppConfig {}
  interface AppConfig extends CustomAppConfig {}
}