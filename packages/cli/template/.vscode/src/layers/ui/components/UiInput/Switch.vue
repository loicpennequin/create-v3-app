<script lang="ts" setup>
import { omit, pick } from 'lodash-es';

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    id: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    isError?: boolean;
  }>(),
  { size: 'md' }
);
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const vModel = useVModel(props, 'modelValue', emit);
const attrs = useAttrs();
const wrapperAttrs = computed(() => pick(attrs, ['class', 'style']));
const inputAttrs = computed(() => omit(attrs, ['class', 'style']));
</script>

<template>
  <div
    class="ui-input-switch"
    :class="[wrapperAttrs, props.size, props.isError && 'error']"
  >
    <input
      :id="props.id"
      v-model="vModel"
      v-bind="inputAttrs"
      class="sr-only"
      type="checkbox"
      role="switch"
      :aria-checked="vModel"
    />
    <slot name="off" />
    <label :for="props.id" />
    <slot name="on" />
  </div>
</template>

<style scoped lang="postcss">
.ui-input-switch {
  display: flex;
  gap: var(--size-2);
  align-items: center;
  padding: var(--size-1);
  border-radius: var(--radius-pill);
  font-size: var(--font-size-0);

  &.error label {
    border-color: var(--error);
  }

  &.sm label {
    --_height: var(--size-3);
  }

  &.md label {
    --_height: var(--size-4);
  }
  &.lg label {
    --_height: var(--size-5);
  }
  &.xl label {
    --_height: var(--size-6);
  }
}

input {
  &:disabled ~ label {
    background-color: var(--disabled);

    &::after {
      background-color: var(--text-disabled);
    }
  }

  &:checked ~ label:after {
    left: calc(100% - var(--_height));
  }
}

label {
  border: solid 1px var(--border);
  cursor: pointer;
  height: var(--_height);
  width: calc(var(--_height) * 2);
  padding-inline: var(--size-1);
  position: relative;
  border-radius: var(--radius-pill);
  background: var(--surface-1);

  &::after {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    height: var(--_height);
    aspect-ratio: 1;
    border-radius: var(--radius-pill);
    background-color: var(--primary);
    transition: left 200ms, background-color 200ms;
  }
}
</style>
