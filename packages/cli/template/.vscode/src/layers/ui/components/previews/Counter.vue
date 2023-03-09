<script setup lang="ts">
const count = ref(0);
</script>

<template>
  <UiButton @click="count++">Counter: {{ count }}</UiButton>
</template>

<style scoped></style>
