<script setup lang="ts">
import { componentMap } from '../layers/ui/plugins/previews';
import { Keys } from '../utils/types';

defineOptions({
  name: 'HomePage'
});

const { hash } = toRefs(useRoute());

const components = useNuxtApp().$componentsPreviews;

const sortedComponents = Object.entries(components)
  .map(([name, value]) => ({
    name,
    ...value
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const getComponent = (name: Keys<typeof componentMap>) => componentMap[name];
</script>

<template>
  <UiContainer size="xl" class="page" as="main">
    <nav>
      <ul>
        <li><h2>Components</h2></li>
        <li v-for="link in sortedComponents" :key="link.name">
          <NuxtLink
            :to="`#${link.name}`"
            :class="hash.slice(1) === link.name && 'active'"
          >
            {{ link.name }}
            <sup v-if="'wip' in link">WIP</sup>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <UiContainer>
      <UiSurface
        v-for="component in sortedComponents"
        :key="component.name"
        class="preview"
      >
        <h2 :id="component.name">
          {{ component.name }}
          <sup v-if="'wip' in component">WIP</sup>
        </h2>
        <p v-if="'wip' in component">
          This component is a work in progress. Its API may encounter breaking
          changes.
        </p>
        <ComponentPreview v-slot="{ options }" :options="component.options">
          <component
            :is="getComponent(component.name as any)"
            :options="options"
          />
        </ComponentPreview>
      </UiSurface>
    </UiContainer>
  </UiContainer>
</template>

<style scoped lang="postcss">
@import 'open-props/media';

.page {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  @media (--md-n-below) {
    display: block;
  }

  & > nav {
    padding: var(--size-4);
    position: sticky;
    top: 3.5rem;
    height: calc(100vh - 2.2rem);

    & > ul {
      list-style: none;
      padding: 0;
    }

    & a {
      color: inherit;
      text-transform: capitalize;

      &.active {
        font-weight: var(--font-weight-5);
      }
    }

    & a:hover {
      text-decoration: underline;
    }

    & a:visited {
      color: inherit;
    }

    @media (--md-n-below) {
      display: none;
    }
  }
}
.preview {
  & + .preview {
    margin-block-start: var(--size-8);
  }
  & > p {
    margin-block-end: var(--size-3);
    max-inline-size: 100%;
  }
}

h2 {
  margin-block-end: var(--size-3);
  scroll-margin-block-start: 5rem;
  text-transform: capitalize;
}
</style>
