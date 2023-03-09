<script setup lang="ts">
const props = defineProps<{
  id: string;
}>();

const selectedTab = useTabs();
</script>

<template>
  <UiButton
    :id="props.id"
    class="ui-tab"
    type="button"
    role="tab"
    variant="ghost"
    :aria-selected="selectedTab === props.id"
    aria-controls="tabpanel-1"
    :tabindex="selectedTab === props.id ? 0 : -1"
    @click="selectedTab = props.id"
  >
    <slot />
  </UiButton>
</template>

<style scoped lang="postcss">
.ui-tab {
  border: solid 1px transparent;
  border-bottom-color: var(--border);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  &:disabled {
    background-color: var(--disabled);
    color: var(--text-disabled);
  }

  &[aria-selected='false']:not(:disabled) {
    background-color: var(--surface-2);
  }

  &[aria-selected='true']:not(:disabled) {
    border-color: var(--border);
    border-bottom-color: transparent;
    background-color: var(--surface-1);
  }
}
</style>
