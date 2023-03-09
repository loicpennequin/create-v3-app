<script setup lang="ts">
import { Nullable } from '~~/src/utils/types';
import { omit, pick } from 'lodash-es';

defineOptions({
  inheritAttrs: false
});

type Props = {
  modelValue: Nullable<string>;
  name?: string;
  type?: string;
  id: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  leftIcon?: string;
  rightIcon?: string;
  isError?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  leftIcon: undefined,
  rightIcon: undefined,
  name: undefined,
  size: 'md'
});
const slots = useSlots();

const attrs = useAttrs();
const wrapperAttrs = computed(() => pick(attrs, ['class', 'style']));
const inputAttrs = computed(() => omit(attrs, ['class', 'style']));

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const vModel = useVModel(props, 'modelValue', emit);
</script>

<template>
  <div
    class="ui-input-text"
    :class="[props.size, props, isError && 'error']"
    v-bind="wrapperAttrs"
  >
    <div v-if="slots.left || props.leftIcon" class="left">
      <slot name="left">
        <Icon v-if="props.leftIcon" :name="props.leftIcon" class="icon" />
      </slot>
    </div>
    <!--  eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
    <input
      :id="props.id"
      v-model="vModel"
      :name="props.name"
      :type="props.type"
      v-bind="inputAttrs"
    />

    <div v-if="slots.right || props.rightIcon" class="right">
      <slot name="right">
        <Icon v-if="props.rightIcon" :name="props.rightIcon" class="icon" />
      </slot>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.ui-input-text {
  display: flex;
  align-items: center;
  gap: 0;
  background-color: var(--surface-1);
  border: solid 1px var(--border-dimmed);
  border-radius: var(--radius-1);

  &:focus-within {
    transition: outline-offset 145ms var(--ease-2);
    outline-color: var(--brand, var(--link));
    outline-style: solid;
    outline-offset: 5px;
  }

  &.error {
    border-color: var(--error);
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

  & .left {
    margin-inline-start: var(--size-2);
  }

  & .right {
    margin-inline-end: var(--size-2);
  }

  & .icon {
    font-size: var(--font-size-2);
    color: hsl(var(--primary-hsl) / 0.3);
  }

  & input {
    flex-grow: 1;
    background-color: inherit;
    color: inherit;
    padding-inline: var(--size-3);
    padding-block: var(--size-2);
    min-width: 0;

    &:disabled {
      cursor: not-allowed;
    }

    &:focus-visible {
      outline: none;
    }
  }

  &:has(input:disabled) {
    background: var(--disabled);
    color: var(--text-disabled);
  }

  &:has(.left) input {
    padding-inline-start: 0;
  }

  &:has(.right) input {
    padding-inline-end: 0;
  }
}
</style>
