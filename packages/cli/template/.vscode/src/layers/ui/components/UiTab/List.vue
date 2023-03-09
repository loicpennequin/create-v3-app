<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const vModel = useVModel(props, 'modelValue', emit);
const rootEl = ref<HTMLElement>();
const { focused } = useFocusWithin(rootEl);

const tabs = shallowRef<HTMLElement[]>([]);

const updateChildren = () => {
  tabs.value = getFocusableChildren(rootEl.value).filter(
    (el) => el.role === 'tab' && !el.hasAttribute('disabled')
  );
};
useMutationObserver(rootEl, updateChildren, { childList: true });

useEventListener('keydown', (e) => {
  if (!focused.value) return;

  const index = tabs.value.findIndex((el) => el.id === props.modelValue);
  let newIndex = -1;

  switch (e.code) {
    case KEYBOARD.ArrowRight:
      newIndex = index === tabs.value.length - 1 ? 0 : index + 1;
      break;
    case KEYBOARD.ArrowLeft:
      newIndex = index === 0 ? tabs.value.length - 1 : index - 1;
      break;
  }
  if (index === -1) return;
  vModel.value = tabs.value[newIndex].id as string;
});

watch(vModel, () => {
  tabs.value.find((tab) => tab.id === props.modelValue)?.focus();
});

useTabsProvider(vModel);
onMounted(updateChildren);
</script>

<template>
  <nav ref="rootEl" role="tablist" class="ui-tablist">
    <slot name="list" />
  </nav>

  <div class="ui-tablist-panels">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.ui-tablist {
  display: flex;
  transform: translateY(2px);
}

.ui-tablist-panels {
  border: solid 1px var(--border);
  padding: var(--size-2);
}
</style>
