<script setup lang="ts">
import { omit } from 'lodash-es';

const props = defineProps<{
  options: Record<string, string | boolean>;
}>();

const isOpened = ref(false);
const tProps = computed(() => omit(props.options, ['customToast, timeout']));

const timeout = computed(() => {
  if (props.options.timeout === 'none') return 9999999999;
  if (props.options.timeout === 'default') return undefined;
  return Number(props.options.timeout);
});
</script>

<template>
  <UiToastBar />
  <section>
    <UiButton @click="isOpened = true">Send toast</UiButton>
    <UiToast
      v-model:is-opened="isOpened"
      icon="mdi:account"
      title="I am a toast"
      text="Toast description"
      v-bind="tProps"
      :timeout="timeout"
    >
      <template v-if="props.options.customToast" #default>
        <p class="custom">I am a custom toast</p>
      </template>
    </UiToast>
  </section>
</template>

<style scoped lang="postcss">
section {
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
}

.custom {
  padding: var(--size-4);
  background: var(--blue-4);
}
</style>
