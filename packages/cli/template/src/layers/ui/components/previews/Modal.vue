<script setup lang="ts">
const props = defineProps<{
  options: Record<string, string | boolean>;
}>();

const components = useNuxtApp().$componentsPreviews;
</script>

<template>
  <UiButton @click="components.modal.control.value = true">Open Modal</UiButton>
  <UiModal
    v-model:is-opened="components.modal.control.value"
    title="My Modal"
    v-bind="props.options"
  >
    <p>Wow! What a cool modal !</p>

    <template #footer="{ focusRef }">
      And what a cool modal footer !
      <template v-if="!options.isClosable">
        <p>This modal is not closable, so use the button below to get out :D</p>
        <UiButton
          :ref="focusRef"
          @click="components.modal.control.value = false"
        >
          Force close
        </UiButton>
      </template>
    </template>
  </UiModal>
</template>

<style scoped></style>
