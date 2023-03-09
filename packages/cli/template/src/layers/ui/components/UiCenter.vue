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
  display: grid;
  place-content: center;
}
</style>
