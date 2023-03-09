<script setup lang="ts">
import { NuxtLink } from '#components';
import { type TypedNuxtLinkProps } from '~~/.nuxt/typed-router/typed-router';

defineOptions({
  name: 'UiDropdownItem'
});

const props = withDefaults(
  defineProps<{
    closeOnClick?: boolean;
    icon?: string;
    to?: TypedNuxtLinkProps['to'];
  }>(),
  {
    closeOnClick: true,
    icon: '',
    to: null as any
  }
);

const onClick = (e: MouseEvent) => {
  if (!props.closeOnClick) e.stopPropagation();
};

const attrs = useAttrs();
const is = computed(() => {
  if (props.to) return NuxtLink;
  if (attrs.onClick) return 'button';

  return 'div';
});
</script>
<template>
  <component
    :is="is"
    :to="props.to"
    class="ui-dropdown-item"
    role="menuitem"
    tabindex="-1"
    @click="onClick"
  >
    <Icon :name="props.icon" />
    <div>
      <slot />
    </div>
  </component>
</template>

<style scoped lang="postcss">
.ui-dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--size-3);
  padding: var(--size-1) var(--size-3);
  user-select: none;
  text-decoration: none;
  color: inherit;
  background-color: inherit;
  width: 100%;

  &:hover {
    background-color: var(--surface-2);
  }

  & > :not([hidden]) ~ :not([hidden]) {
    border-left: solid 1px var(--border-dimmed);
  }

  & > div {
    padding-inline-start: var(--size-3);
    display: flex;
    align-items: center;
    gap: var(--size-2);
    flex: 1;
  }
}
</style>
