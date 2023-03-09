<script setup lang="ts">
import KeepableSlot from '../KeepableSlot.vue';
const props = defineProps<{ name: string }>();

const selectedTab = useTabs();
</script>

<template>
  <ClientOnly>
    <KeepAlive>
      <component :is="selectedTab === props.name && KeepableSlot">
        <slot />
      </component>
    </KeepAlive>

    <template #fallback>
      <slot v-if="selectedTab === props.name" />
    </template>
  </ClientOnly>
</template>
