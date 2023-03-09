<template>
  <Teleport to="body">
    <div id="toast-bar-left" class="ui-toast-bar left"></div>
    <div id="toast-bar-right" class="ui-toast-bar right"></div>
    <div id="toast-bar-top" class="ui-toast-bar top"></div>
    <div id="toast-bar-bottom" class="ui-toast-bar bottom"></div>
  </Teleport>
</template>

<style scoped lang="postcss">
@import 'open-props/media';
.ui-toast-bar {
  position: fixed;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: var(--size-5);
  align-items: center;

  &.left {
    top: var(--size-10);
    left: var(--size-7);

    @media (--md-n-below) {
      left: 0;
      top: 0;
    }
  }
  &.right {
    top: var(--size-10);
    right: var(--size-7);

    @media (--md-n-below) {
      right: 0;
      top: 0;
    }
  }
  &.top {
    left: 50%;
    top: var(--size-7);
    transform: translateX(-50%);

    @media (--md-n-below) {
      top: 0;
    }
  }
  &.bottom {
    left: 50%;
    bottom: var(--size-7);
    transform: translateX(-50%);

    @media (--md-n-below) {
      bottom: 0;
    }
  }
}
</style>
