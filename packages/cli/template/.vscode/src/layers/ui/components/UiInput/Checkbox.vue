<script setup lang="ts">
import { Nullable } from '@antfu/utils';
import { omit, pick } from 'lodash-es';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    modelValue: Nullable<string[] | string | boolean>;
    value?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    isError?: boolean;
  }>(),
  { size: 'md', value: undefined }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
const vModel = useVModel(props, 'modelValue', emit);

const attrs = useAttrs();
const labelAttrs = computed(() => pick(attrs, ['class', 'style']));
const inputAttrs = computed(() => omit(attrs, ['class', 'style']));
</script>

<template>
  <label
    class="ui-input-checkbox"
    :class="[props.size, props, isError && 'error']"
    v-bind="labelAttrs"
  >
    <input
      v-model="vModel"
      type="checkbox"
      v-bind="inputAttrs"
      :value="props.value"
    />

    <slot />
  </label>
</template>

<style scoped lang="postcss">
.ui-input-checkbox {
  display: flex;
  gap: var(--size-1);
  align-items: center;

  &:has(input:disabled) {
    color: var(--text-disabled);
  }

  &.sm {
    font-size: var(--font-size-0);
  }

  &.md {
    font-size: var(--font-size-1);
  }

  &.lg {
    font-size: var(--font-size-2);
  }

  &.xl {
    font-size: var(--font-size-3);
  }

  &.error input {
    border-color: var(--error);
    &::before {
      background-color: var(--error);
    }
  }

  & input {
    border: solid 1px var(--primary);
    appearance: none;
    background-color: var(--surface-1);
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 1.25em;
    height: 1.25em;
    min-height: 18px; /* min width og a checkbox set by the browser */
    aspect-ratio: 1;
    border: 1px solid currentColor;
    border-radius: 0;
    display: grid;
    place-content: center;

    &::before {
      content: '';
      width: var(--size-3);
      aspect-ratio: 1;
      transform: scale(0);
      opacity: 0;
      transition: all 0.1s ease-in-out;
      background-color: var(--primary);
      clip-path: polygon(8% 40%, 35% 66%, 90% 10%, 90% 40%, 35% 96%, 8% 70%);
    }

    &:checked::before {
      transform: scale(1);
      opacity: 1;
    }

    &:disabled {
      background-color: var(--disabled);
      border-color: var(--text-disabled);
    }
    &:disabled::before {
      background-color: var(--text-disabled);
    }
  }
}
</style>
