<script setup lang="ts">
const props = defineProps<{
  options: Record<string, string | boolean>;
}>();

const components = useNuxtApp().$componentsPreviews;
</script>

<template>
  <UiTabList v-model="components.tabList.control.value" v-bind="props.options">
    <template #list>
      <UiTab id="one">Tab one</UiTab>
      <UiTab id="two">Tab two</UiTab>
      <UiTab id="three" disabled>Tab three</UiTab>
      <UiTab id="four">Tab four</UiTab>
    </template>

    <UiTabPanel name="one">
      Tab one content. I will be removed from the DOM when you change tab, but I
      will keep my state
      <PreviewsCounter />
    </UiTabPanel>
    <UiTabPanel name="two">Tab two content</UiTabPanel>
    <UiTabPanel name="three">Tab three content</UiTabPanel>
    <UiTabPanel name="four">Tab four content</UiTabPanel>
  </UiTabList>
</template>

<style scoped></style>
