<script setup lang="ts">
import { omit } from 'lodash-es';

const props = defineProps<{
  options: Record<string, string | boolean>;
}>();

const def = useNuxtApp().$componentsPreviews.input;

const tProps = computed(() =>
  omit(props.options, ['type', 'leftIcon', 'rightIcon'])
);
</script>

<template>
  <UiInputText
    v-if="props.options.type === 'text'"
    id="input-text"
    v-model="def.control.value"
    aria-label="my input"
    v-bind="tProps"
    :left-icon="props.options.leftIcon ? 'mdi:account' : undefined"
    :right-icon="props.options.rightIcon ? 'mdi:account' : undefined"
  />
  <UiInputPassword
    v-else-if="'password'"
    id="input-text"
    v-model="def.control.value"
    aria-label="my input"
    v-bind="tProps"
    :left-icon="options.leftIcon ? 'mdi:account' : undefined"
  />
</template>

<style scoped></style>
