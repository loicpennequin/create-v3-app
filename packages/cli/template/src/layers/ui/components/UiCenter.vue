<script setup lang="ts">
const props = withDefaults(defineProps<{ as?: string }>(), { as: 'div' });
</script>

<template>
  <component :is="props.as" class="ui-center">
    <slot />
  </component>
</template>

<style scoped>
.ui-center {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
