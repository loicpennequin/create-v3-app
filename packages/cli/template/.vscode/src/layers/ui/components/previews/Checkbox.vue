<script setup lang="ts">
const props = defineProps<{
  options: Record<string, string | boolean>;
}>();

const components = useNuxtApp().$componentsPreviews;
</script>

<template>
  <UiInputCheckbox
    v-model="components.checkbox.control.value"
    v-bind="props.options"
  >
    My checkbox
  </UiInputCheckbox>
</template>

<style scoped></style>
