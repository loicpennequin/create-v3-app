<script setup lang="ts">
const props = defineProps<{
  options: Record<string, string | boolean>;
}>();

const components = useNuxtApp().$componentsPreviews;
</script>

<template>
  <UiInputRadio
    v-model="components.radio.control.value"
    v-bind="props.options"
    value="apple"
  >
    Apple
  </UiInputRadio>
  <UiInputRadio
    v-model="components.radio.control.value"
    v-bind="props.options"
    value="banana"
  >
    Banana
  </UiInputRadio>
  <UiInputRadio
    v-model="components.radio.control.value"
    v-bind="props.options"
    value="strawberry"
  >
    Strawberry
  </UiInputRadio>
</template>

<style scoped></style>
