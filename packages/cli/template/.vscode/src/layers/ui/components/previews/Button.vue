<script setup lang="ts">
const props = defineProps<{
  options: Record<string, string | boolean>;
}>();
</script>

<template>
  <UiIconButton
    v-if="props.options.iconButton"
    v-bind="props.options"
    icon="mdi:user"
    title="an icon button"
  >
    Click Me
  </UiIconButton>
  <UiButton
    v-else
    v-bind="props.options"
    :left-icon="props.options.leftIcon ? 'mdi:account' : undefined"
    :right-icon="props.options.rightIcon ? 'mdi:account' : undefined"
  >
    Click Me
  </UiButton>
</template>

<style scoped></style>
