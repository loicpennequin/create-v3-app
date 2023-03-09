<script setup lang="ts">
import { BaseButtonProps } from '@ui/utils/types';
import { NuxtLink } from '#components';
import type { TypedNuxtLinkProps } from '~~/.nuxt/typed-router/typed-router';

type Props = {
  size?: BaseButtonProps['size'];
  leftIcon?: BaseButtonProps['leftIcon'];
  rightIcon?: BaseButtonProps['rightIcon'];
  isLoading?: BaseButtonProps['isLoading'];
  variant?: 'full' | 'outlined' | 'ghost' | 'light';
  to?: TypedNuxtLinkProps['to'];
};

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  leftIcon: undefined,
  rightIcon: undefined,
  isLoading: false,
  variant: 'full',
  to: undefined
});

const attrs = useAttrs();

const tag = computed(() => {
  if (attrs.to) return NuxtLink;
  if (attrs.href) return 'a';

  return 'button';
});
</script>

<template>
  <component
    :is="tag"
    class="ui-button-base"
    :class="[props.size, props.variant]"
  >
    <Icon
      v-if="props.leftIcon && !props.isLoading"
      :name="props.leftIcon"
      aria-hidden="true"
      class="icon"
    />

    <!-- <UiSpinner text-2xl v-if="isLoading" /> -->
    <slot />

    <Icon
      v-if="props.rightIcon && !props.isLoading"
      :name="props.rightIcon"
      aria-hidden="true"
      class="icon"
    />
  </component>
</template>

<style scoped lang="postcss">
.ui-button-base {
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  vertical-align: middle;
  padding: 0.5em 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--size-2);
  font-weight: var(--font-weight-6);
  border-radius: var(--radius-2);
  border: solid 2px transparent;

  &:disabled {
    cursor: not-allowed;
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

  &.full {
    color: var(--text-on-primary);
    background-color: var(--primary);

    &:hover:not(:disabled) {
      background-color: var(--primary-hover);
    }

    &:disabled {
      background-color: var(--disabled);
      color: var(--text-disabled);
    }
  }

  &.outlined {
    background-color: transparent;
    color: var(--primary);
    border-color: currentColor;

    &:hover:not(:disabled) {
      border-color: transparent;
      color: var(--text-on-primary);
      background-color: var(--primary);
    }

    &:disabled {
      color: var(--text-disabled);
    }
  }

  &.ghost {
    background-color: transparent;
    color: var(--primary);

    &:hover:not(:disabled) {
      background-color: hsl(var(--primary-hsl) / 0.08);
    }

    &:disabled {
      color: var(--text-disabled);
    }
  }

  &.light {
    color: var(--primary);
    background-color: hsl(var(--primary-hsl) / 0.2);

    &:hover:not(:disabled) {
      background-color: hsl(var(--primary-hsl) / 0.3);
    }

    &:disabled {
      background-color: hsl(var(--disabled-hsl) / 0.3);
      color: var(--text-disabled);
    }
  }

  & > .icon {
    font-size: var(--font-size-1);
    aspect-ratio: 1;
    display: block;
  }
}
</style>
