<script setup lang="ts">
import { ViewportBreakpoint } from '../utils/types';

const props = withDefaults(
  defineProps<{ as?: string; size?: ViewportBreakpoint }>(),
  { as: 'div', size: 'md' }
);
</script>

<template>
  <component :is="props.as" class="ui-container" :class="props.size">
    <slot />
  </component>
</template>

<style scoped lang="postcss">
.ui-container {
  width: 100%;
  margin-inline: auto;

  &.xxs {
    max-width: var(--size-xxs);
  }
  &.xs {
    max-width: var(--size-xs);
  }
  &.sm {
    max-width: var(--size-sm);
  }
  &.md {
    max-width: var(--size-md);
  }
  &.lg {
    max-width: var(--size-lg);
  }
  &.xl {
    max-width: var(--size-xl);
  }
  &.xxl {
    max-width: var(--size-xxl);
  }
}
</style>
