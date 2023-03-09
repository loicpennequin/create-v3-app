<script setup lang="ts">
const props = defineProps<{
  options: Record<string, string | boolean>;
}>();

const components = useNuxtApp().$componentsPreviews;
</script>

<template>
  <UiButton @click="components.drawer.control.value = true">
    Open Drawer
  </UiButton>
  <UiDrawer
    v-model:is-opened="components.drawer.control.value"
    title="My Drawer"
    v-bind="props.options"
  >
    <p>Wow! What a cool Drawer !</p>

    <template #footer="{ focusRef }">
      And what a cool drawer footer !
      <template v-if="!options.isClosable">
        <p>
          This drawer is not closable, so use the button below to get out :D
        </p>
        <UiButton
          :ref="focusRef"
          @click="components.drawer.control.value = false"
        >
          Force close
        </UiButton>
      </template>
    </template>
  </UiDrawer>
</template>

<style scoped></style>
