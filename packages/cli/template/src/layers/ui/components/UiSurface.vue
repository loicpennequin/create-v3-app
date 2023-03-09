<script setup lang="ts">
const props = withDefaults(defineProps<{ as?: string }>(), { as: 'div' });
</script>

<template>
  <component :is="props.as" class="ui-surface">
    <slot />
  </component>
</template>

<style scoped>
.ui-surface {
  background-color: var(--surface-1);
  color: var(--text-1);
  padding: var(--size-6);
}
</style>
