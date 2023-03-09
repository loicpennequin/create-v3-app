<script setup lang="ts">
import { omit } from 'lodash-es';

const props = defineProps<{
  options: Record<string, string | boolean>;
}>();

const components = useNuxtApp().$componentsPreviews;

const tProps = computed(() => omit(props.options, ['closeOnClick']));
</script>

<template>
  <UiDropdown
    v-model:is-opened="components.dropdown.control.value"
    v-bind="tProps"
  >
    <template #toggle="{ ref, props: toggleProps }">
      <UiButton :ref="ref" v-bind="toggleProps" right-icon="bi:caret-down-fill">
        Toggle dropdown
      </UiButton>
    </template>

    <template #menu>
      <UiDropdownItem
        v-for="i in [1, 2, 3]"
        :key="i"
        icon="mdi:account"
        :close-on-click="!!props.options.closeOnClick"
        @click.prevent
      >
        Item {{ i }}
      </UiDropdownItem>
    </template>
  </UiDropdown>
</template>

<style scoped></style>
