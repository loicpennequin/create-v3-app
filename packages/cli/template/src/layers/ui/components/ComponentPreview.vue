<script setup lang="ts">
type Options = {
  [key: string]: string[] | boolean;
};
const props = defineProps<{ options: Options }>();

const _options = reactive(
  Object.fromEntries(
    Object.entries(props.options).map(([key, value]) => {
      return [key, Array.isArray(value) ? value[0] : value];
    })
  )
);

const optionsKeys = computed(() => Object.keys(props.options));

const getOptionType = (key: string) => {
  if (Array.isArray(props.options[key])) return 'choices';
  return 'boolean';
};
</script>

<template>
  <article class="ui-component-preview">
    <div class="content">
      <slot :options="_options">
        <pre>{{ _options }}</pre>
      </slot>
    </div>
    <aside aria-label="preview options">
      <p v-if="!optionsKeys.length">This component has no options</p>
      <form @submit.prevent>
        <template v-for="key in optionsKeys" :key="key">
          <template v-if="getOptionType(key) === 'choices'">
            <fieldset>
              <legend>{{ key }}</legend>
              <UiInputRadio
                v-for="value in Object.values(props.options[key])"
                :key="value"
                v-model="_options[key]"
                type="radio"
                :value="value"
              >
                {{ value }}
              </UiInputRadio>
            </fieldset>
          </template>

          <UiInputCheckbox
            v-else-if="getOptionType(key) === 'boolean'"
            v-model="_options[key]"
          >
            {{ key }}
          </UiInputCheckbox>
        </template>
      </form>
    </aside>
  </article>
</template>

<style scoped lang="postcss">
@import 'open-props/media';
.ui-component-preview {
  display: grid;
  grid-template-columns: 1fr var(--size-13);
  border: solid 1px var(--border-dimmed);

  @media (--md-n-below) {
    grid-template-columns: 1fr;
  }
}

.content {
  display: grid;
  place-content: center;
  min-height: var(--size-13);
}

aside {
  padding: var(--size-2);
  border-left: solid 1px var(--border-dimmed);

  @media (--md-n-below) {
    border-left: none;
    border-top: solid 1px var(--border-dimmed);
  }

  & > fieldset {
    margin-block-end: var(--size-3);
  }
}

label {
  display: block;
  &:not(:last-of-type) {
    margin-block-end: var(--size-1);
  }
}
</style>
