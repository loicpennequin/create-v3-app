import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

export const useModal = (
  props: { isOpened: boolean; isClosable?: boolean },
  emit: SE<{
    'update:isOpened'(val: string): void;
  }>
) => {
  const vModel = useVModel(props, 'isOpened', emit);
  const containerEl = ref<HTMLElement>();
  const isBodyLocked = ref(false);
  const initialFocusEl = ref<HTMLElement>();
  const { activate, deactivate } = useFocusTrap(containerEl, {
    initialFocus: () => initialFocusEl.value as HTMLElement
  });

  const close = () => {
    if (!props.isClosable) return;
    vModel.value = false;
  };

  useBodyScrollLock(isBodyLocked);
  onClickOutside(containerEl, close);
  onKeyStroke('Escape', close);
  watchEffect(() => {
    nextTick(props.isOpened ? activate : deactivate);
    nextTick(() => {
      isBodyLocked.value = props.isOpened;
    });
  });

  return { containerEl, initialFocusEl, vModel };
};
