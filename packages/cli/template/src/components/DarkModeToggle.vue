<script setup lang="ts">
const colorMode = useColorMode();
const colorModeIcon = computed(() =>
  colorMode.preference === 'dark' ? 'ph:sun-fill' : 'ph:moon-fill'
);
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

const { t } = useI18n();
</script>

<template>
  <button @click="toggleColorMode" :aria-label="t('label')">
    <Icon :name="colorModeIcon" />
  </button>
</template>

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
