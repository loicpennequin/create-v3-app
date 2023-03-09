<script setup lang="ts">
const props = defineProps<{ for: string }>();
</script>

<template>
  <label :for="props.for" class="ui-form-label"><slot /></label>
</template>

<style scoped>
.ui-form-label {
  font-weight: var(--font-weight-5);
}
</style>
