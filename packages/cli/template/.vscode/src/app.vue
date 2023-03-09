<script setup lang="ts">
const { t, locale } = useI18n();
</script>

<template>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <Html :lang="locale">
    <Head>
      <Title>Create V3 App</Title>
      <Meta name="description" :content="t('description')" />
    </Head>
  </Html>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "en": {
    "description": "Generated with Create V3 App"
  },
  "fr": {
    "description": "Generé avec Create V3 App"
  }
}
</i18n>
