<script setup lang="ts">
const props = defineProps<{ error?: string; isVisible: boolean }>();

const isHidden = computed(() => !props.error || !props.isVisible);
</script>

<template>
  <div class="ui-form-error" :aria-hidden="isHidden">
    <Icon name="mdi-alert" />
    <span>{{ props.error }}</span>
  </div>
</template>

<style scoped lang="postcss">
.ui-form-error {
  color: var(--error);
  gap: var(--size-2);
  transition: opacity 0.2s;
  min-height: 1.5em;

  & > svg {
    float: left;
    margin-inline-end: var(--size-2);
    padding-top: var(--size-1);
  }

  &[aria-hidden='true'] {
    opacity: 0;
  }
}
</style>
