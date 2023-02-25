import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default"
declare module "C:/Users/Loïc/web/create-d3-app/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}