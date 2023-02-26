<script setup lang="ts">
useI18n();

const trpc = useTrpc();
const { data: title, suspense } = useQuery(['title'], () => trpc.title.query());
onServerPrefetch(suspense);

const switchLocalePath = useSwitchLocalePath();
</script>

<template>
  <div class="layout">
    <header>
      <h1>{{ title }}</h1>

      <nav class="actions">
        <DarkModeToggle />
        <NuxtLink :to="switchLocalePath('en')">
          <Icon name="circle-flags:uk" />
        </NuxtLink>
        <NuxtLink :to="switchLocalePath('fr')">
          <Icon name="circle-flags:fr" />
        </NuxtLink>
      </nav>
    </header>
    <main><slot /></main>

    <footer>
      <i18n-t keypath="footer">
        <template #link>
          <a
            href="https://github.com/loicpennequin"
            target="_blank"
            rel="noopener noreferrer"
          >
            Daria aka "CEO of Based"
          </a>
        </template>
      </i18n-t>
    </footer>
  </div>
</template>

<style lang="postcss" scoped>
@import 'open-props/media';

.layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

header {
  display: grid;
  grid-template-columns: 1fr max-content 1fr;
  align-items: center;
  margin-block-end: var(--size-3);
  padding-block-start: var(--size-2);

  @media (--md-n-below) {
    display: flex;
    justify-content: space-between;
  }
}

h1 {
  color: transparent;
  -webkit-text-stroke: 2px var(--text-1);
  letter-spacing: 0.125em;
  grid-column: 2;
  background-clip: text;

  @media (--md-n-below) {
    font-size: var(--font-size-3);
    color: var(--text-1);
    -webkit-text-stroke: 0;
    grid-column: 1;
  }
}

footer {
  text-align: center;
  padding-block: var(--size-4);

  & a {
    color: inherit;
    text-decoration: underline;
  }
}

header,
main {
  padding-inline: var(--size-4);
}

nav {
  grid-column: 3;
  display: flex;
  gap: var(--size-2);
  align-items: center;
  justify-self: flex-end;

  @media (--md-n-below) {
    font-size: var(--font-size-3);
  }

  & :where(button, a) {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;

    &:not(:first-of-type) {
      aspect-ratio: 1;
    }

    &.router-link-active {
      border-radius: var(--radius-round);
      border: solid 2px var(--text-1);
    }
  }

  & .auth-button {
    background-color: var(--surface-1);
    border-radius: var(--radius-pill);
    padding: var(--size-2) var(--size-3);
    width: max-content;

    &:hover {
      background: var(--surface-2);
    }
  }
}
</style>

<i18n lang="json">
{
  "en": {
    "footer": "Made with 💀 by {link}"
  },
  "fr": {
    "footer": "Fait avec 💀 par {link}"
  }
}
</i18n>
