<script setup lang="ts">
import { omit } from 'lodash-es';

const props = defineProps<{
  options: Record<string, string | boolean>;
}>();

const components = useNuxtApp().$componentsPreviews;

const tProps = computed(() => omit(props.options, ['withSlots']));
</script>

<template>
  <UiInputSwitch
    id="switch-input"
    v-bind="tProps"
    v-model="components.switch.control.value"
  >
    <template v-if="options.withSlots" #on>On</template>
    <template v-if="options.withSlots" #off>Off</template>
  </UiInputSwitch>
</template>

<style scoped></style>
