<script setup lang="ts">
import { NuxtLink } from '#components';
import type { TypedNuxtLinkProps } from '~~/.nuxt/typed-router/typed-router';

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(
  defineProps<{
    isOpened: boolean;
    icon: string;
    to?: TypedNuxtLinkProps['to'];
    title?: string;
    text?: string;
    placement?: 'left' | 'right' | 'top' | 'bottom';
    timeout?: number;
    hasProgressBar?: boolean;
  }>(),
  {
    to: undefined,
    title: undefined,
    text: undefined,
    placement: 'bottom',
    timeout: 5000,
    hasProgressBar: true
  }
);

const emit = defineEmits<{
  (e: 'update:isOpened', value: boolean): void;
}>();

const vModel = useVModel(props, 'isOpened', emit);
const toastEl = ref<HTMLElement>();
const { direction, isSwiping } = usePointerSwipe(toastEl, {
  threshold: 50
});

watchEffect(() => {
  if (!isSwiping.value) return;
  nextTick(() => {
    const isSwipeX = ['LEFT', 'RIGHT'].includes(direction.value as any);
    const isSwipeY = ['UP', 'DOWN'].includes(direction.value as any);
    if (
      (isSwipeX && ['left', 'right'].includes(props.placement)) ||
      (isSwipeY && ['top', 'bottom'].includes(props.placement))
    ) {
      vModel.value = false;
    }
  });
});

const { start, stop } = useTimeoutFn(
  () => {
    vModel.value = false;
  },
  computed(() => props.timeout)
);

watchEffect(() => {
  if (props.isOpened) {
    start();
  } else {
    stop();
  }
});

const portalTarget = computed(() => `#toast-bar-${props.placement}`);
const progressBarAnimDuration = computed(() => `${props.timeout}ms`);
</script>

<template>
  <ClientOnly>
    <Teleport :to="portalTarget">
      <Transition appear>
        <div
          v-if="props.isOpened"
          ref="toastEl"
          class="ui-toast-wrapper"
          :class="props.placement"
          :style="{ '--progress-bar-anim-duration': progressBarAnimDuration }"
          @pointerdown.stop
          @pointermove.stop
          @pointerup.stop
        >
          <slot>
            <UiSurface class="ui-toast" role="status" v-bind="$attrs">
              <Icon :name="props.icon" class="icon" />

              <component
                :is="props.to ? NuxtLink : 'div'"
                :to="props.to"
                class="content"
                @click="vModel = false"
              >
                <strong>{{ props.title }}</strong>
                <div>
                  {{ props.text }}
                </div>
              </component>

              <UiIconButton
                title="dismiss toast"
                icon="mdi:close"
                class="close-button"
                @click="vModel = false"
              />

              <div v-if="props.hasProgressBar" class="progress" />
            </UiSurface>
          </slot>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<style scoped lang="postcss">
@import 'open-props/media';

.ui-toast-wrapper {
  &.v-enter-active,
  &.v-leave-active {
    transition: all 0.3s;
  }

  &.v-enter-from,
  &.v-leave-to {
    opacity: 0;
    transform: var(--_transform);
  }

  &.left {
    --_transform: translateX(-50%);
  }

  &.right {
    --_transform: translateX(50%);
  }

  &.top {
    --_transform: translateY(-50%);
  }

  &.bottom {
    --_transform: translateY(50%);
  }

  @media (--md-n-below) {
    width: 100vw;
  }
}
.ui-toast {
  padding: var(--size-2) var(--size-3);
  border-radius: var(--radius-2);
  outline: solid 1px var(--border-dimmed);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: var(--size-4);
  user-select: none;
  cursor: grab;
  --_color: var(--primary);

  .ui-toast-wrapper.bottom & {
    border-top: solid 8px var(--_color);
  }
  .ui-toast-wrapper.top & {
    border-bottom: solid 8px var(--_color);
  }
  .ui-toast-wrapper.left & {
    border-right: solid 8px var(--_color);
  }
  .ui-toast-wrapper.right & {
    border-left: solid 8px var(--_color);
  }

  & .content {
    color: inherit;
    text-decoration: none;
  }

  & .close-button {
    margin-inline-start: auto;
    margin-block-start: calc(-1 * var(--size-2));
    align-self: start;
  }

  & .icon {
    padding: var(--size-2);
    border-radius: var(--radius-round);
    aspect-ratio: 1;
    width: var(--size-8);
    display: grid;
    place-content: center;
    color: var(--gray-0);
    color: var(--surface-1);
    background-color: var(--_color);
  }

  & .progress {
    grid-column: 1 / -1;
    height: 5px;
    background: hsl(var(--red-6-hsl) / 0.6);
    transform-origin: left;
    transform: scaleX(0);
    animation: toast-progress-bar var(--progress-bar-anim-duration) linear;
  }
}
@keyframes toast-progress-bar {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}
</style>
