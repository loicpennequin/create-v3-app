import { InjectionKey, ComputedRef } from 'vue';

export type TabsContext = ComputedRef<string>;

export const tabsInjectionKey = Symbol('tabs') as InjectionKey<TabsContext>;

export const useTabsProvider = (selectedTabId: Ref<string>) => {
  provide(tabsInjectionKey, selectedTabId);
};

export const useTabs = () => useSafeInject(tabsInjectionKey);
