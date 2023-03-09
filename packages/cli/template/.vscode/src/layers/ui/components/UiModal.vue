<script setup lang="ts">
import { VNodeRef } from 'vue';
import { vStableId } from '../directives/stableId';
import { ViewportBreakpoint } from '../utils/types';

const props = withDefaults(
  defineProps<{
    isOpened: boolean;
    title: string;
    size?: ViewportBreakpoint;
    isClosable?: boolean;
  }>(),
  {
    size: 'md',
    isClosable: true
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
    <Transition :duration="300">
      <div v-if="props.isOpened" class="ui-modal">
        <div class="backdrop" />

        <UiContainer ref="containerEl" class="container" :size="props.size">
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
        </UiContainer>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="postcss">
@import 'open-props/media';
.ui-modal {
  position: fixed;
  inset: 0;
  overflow-y: auto;
  display: grid;
  justify-items: center;
  z-index: 10;

  & > * {
    grid-column: 1;
    grid-row: 1;
  }

  &.v-leave-active,
  &.v-enter-active {
    & .backdrop {
      transition: opacity 0.3s ease;
    }
    & .container {
      transition: all 0.3s ease;
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
      transform: translateY(calc(-1 * var(--size-8)));
    }
  }
}

.backdrop {
  background-color: hsl(var(--gray-12-hsl) / 0.7);
  height: 100%;
  width: 100%;
}

.container {
  --_offset-y: var(--size-10);
  align-self: start;
  overflow-y: auto;
  margin-block-start: var(--_offset-y);
  max-height: calc(100vh - (2 * var(--_offset-y)));

  @media (--md-n-below) {
    --_offset-y: 0;
    margin-block-start: 0;
    align-self: center;
  }
}

.content {
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
</style>
