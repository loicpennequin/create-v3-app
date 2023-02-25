<script setup lang="ts">
const { t, locale } = useI18n();
</script>

<template>
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

<style lang="postcss">
body {
  background: var(--gradient-4);
  color: var(--text-1);
}

.dark body {
  background: var(--gradient-23);
}
</style>

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
