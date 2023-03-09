<script setup lang="ts">
import { VNodeRef } from 'vue';
import { vStableId } from '../directives/stableId';

const props = withDefaults(
  defineProps<{
    isOpened: boolean;
    title: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    placement?: 'left' | 'right' | 'top' | 'bottom';
    isClosable?: boolean;
  }>(),
  {
    size: undefined,
    isClosable: true,
    placement: 'left'
  }
);
const emit = defineEmits<
  SE<{
    'update:isOpened'(val: string): void;
  }>
>();

const slots = useSlots();
const titleId = useNanoId();

const slotProps: { focusRef: VNodeRef } = {
  focusRef: (el) => {
    initialFocusEl.value = unrefElement(el as any);
  }
};

const { containerEl, initialFocusEl, vModel } = useModal(props, emit);
</script>

<template>
  <Teleport to="body">
    <Transition :duration="500">
      <div v-if="props.isOpened" class="ui-drawer">
        <div class="backdrop" />

        <div
          ref="containerEl"
          class="container"
          :class="[props.placement, props.size]"
          :size="props.size"
        >
          <UiSurface
            class="content"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="titleId"
          >
            <header>
              <h2 v-stable-id="titleId">{{ props.title }}</h2>

              <UiIconButton
                v-if="props.isClosable"
                icon="mdi:close"
                title="close dialog"
                type="button"
                @click="vModel = false"
              />
            </header>

            <section>
              <slot v-bind="slotProps" />
            </section>

            <footer v-if="slots.footer">
              <slot name="footer" v-bind="slotProps" />
            </footer>
          </UiSurface>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="postcss">
@import 'open-props/media';
.ui-drawer {
  position: fixed;
  inset: 0;
  overflow-y: auto;
  overflow-x: hidden;
  max-width: 100vw;
  display: grid;
  z-index: 10;

  & > * {
    grid-column: 1;
    grid-row: 1;
  }

  &.v-leave-active .backdrop {
    transition-delay: 0.2s;
  }
  &.v-enter-active .container {
    transition-delay: 0.2s;
  }

  &.v-leave-active,
  &.v-enter-active {
    & .backdrop {
      transition-property: opacity;
      transition-duration: 0.3s;
      transition-timing-function: ease;
    }
    & .container {
      transition-property: all;
      transition-duration: 0.3s;
      transition-timing-function: ease;
    }
  }

  &.v-enter-from,
  &.v-leave-to {
    & .backdrop {
      opacity: 0;
    }
    & .container {
      opacity: 0;
      position: relative;
      z-index: 1;
      transform: var(--_transform);
    }
  }
  & .backdrop {
    background-color: hsl(var(--gray-12-hsl) / 0.7);
    height: 100%;
    width: 100%;
  }

  & .container {
    overflow-y: auto;
    margin-block-start: var(--_offset-y);
    height: 100%;

    &.left {
      justify-self: start;
      width: 100%;
      max-width: var(--_size);
      --_transform: translateX(calc(-1 * var(--size-8)));
    }
    &.right {
      justify-self: end;
      width: var(--_size);
      --_transform: translateX(calc(var(--size-8)));
    }
    &.top {
      align-self: start;
      height: var(--_size);
      --_transform: translateY(calc(-1 * var(--size-8)));
    }
    &.bottom {
      align-self: end;
      height: var(--_size);
      --_transform: translateY(calc(var(--size-8)));
    }

    &.xxs {
      --_size: var(--size-xxs);
    }
    &.xs {
      --_size: var(--size-xs);
    }
    &.sm {
      --_size: var(--size-sm);
    }
    &.md {
      --_size: var(--size-md);
    }
    &.lg {
      --_size: var(--size-lg);
    }
    &.xl {
      --_size: var(--size-xl);
    }
    &.xxl {
      --_size: var(--size-xxl);
    }
  }

  & .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0;

    & > * {
      padding: var(--size-3) var(--size-6);
    }
    & > header {
      position: sticky;
      top: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: solid 1px var(--border-dimmed);
      & > h2 {
        font-size: var(--font-size-5);
      }
    }

    & > section {
      flex-grow: 1;
    }

    & > footer {
      position: sticky;
      bottom: 0;
      border-top: solid 1px var(--border-dimmed);
    }

    & > header,
    & > footer {
      background-color: inherit;
    }
  }
}
</style>
