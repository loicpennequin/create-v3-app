import { MaybeRef } from '@vueuse/shared';
import { onUnmounted, watchEffect, unref } from 'vue';

export const useBodyScrollLock = (isLocked: MaybeRef<boolean>) => {
  const app = useNuxtApp();
  const device = useDevice();

  const cleanup = () => {
    document.body.style.removeProperty('overflow');
    document.body.style.paddingRight = '';
  };

  const getScrollbarWidth = () =>
    window.innerWidth - document.documentElement.clientWidth;

  watchEffect(() => {
    if (app.ssrContext) return;

    if (unref(isLocked)) {
      if (device.isDesktop) {
        document.body.style.paddingRight = `${getScrollbarWidth()}px`;
      }

      document.body.style.overflow = 'hidden';
    } else {
      cleanup();
    }
  });

  onUnmounted(cleanup);
};
