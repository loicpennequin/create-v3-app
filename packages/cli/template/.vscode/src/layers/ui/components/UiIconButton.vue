<script setup lang="ts">
import type { ButtonVariant, BaseButtonProps } from '@ui/utils/types';
import type { TypedNuxtLinkProps } from '~~/.nuxt/typed-router/typed-router';

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    to?: TypedNuxtLinkProps['to'];
    icon: string;
    title: string;
    size?: BaseButtonProps['size'];
    isLoading?: BaseButtonProps['isLoading'];
  }>(),
  {
    variant: 'ghost'
  }
);

const buttonProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { icon, ...rest } = props;
  return rest;
});
</script>

<template>
  <UiButton
    class="ui-button-icon"
    v-bind="buttonProps"
    :title="props.title"
    :aria-label="props.title"
  >
    <Icon :name="props.icon" />
  </UiButton>
</template>

<style scoped lang="postcss">
.ui-button-icon {
  border-radius: var(--radius-round) !important;
  padding: var(--size-1) !important;

  & > * {
    width: 1.5em;
    aspect-ratio: 1;
  }
}
</style>
