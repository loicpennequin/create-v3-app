<script setup lang="ts">
const colorMode = useColorMode();
const colorModeIcon = computed(() =>
  colorMode.preference === 'dark' ? 'ph:sun-fill' : 'ph:moon-fill'
);
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

useDarkMode();

const { t } = useI18n();
</script>

<template>
  <UiIconButton
    :title="t('label')"
    :icon="colorModeIcon"
    @click="toggleColorMode"
  />
</template>

<style scoped>
button {
  padding: 0;
  background-color: transparent;
}
</style>
<i18n lang="json">
{
  "en": {
    "label": "Toggle dark mode"
  },
  "fr": {
    "label": "Activer le thème sombre"
  }
}
</i18n>
