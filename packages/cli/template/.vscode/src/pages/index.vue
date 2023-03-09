<script setup lang="ts">
const { t } = useI18n();
const { data: session, signIn, signOut } = useSession();
</script>

<template>
  <section>
    <p>
      {{ t('greeting', { name: session?.user.name ?? t('anon') }) }}
      <button class="auth-button" @click="session?.user ? signOut() : signIn()">
        {{ t(session?.user ? 'signout' : 'signin') }}
      </button>
    </p>
    <div class="card-grid">
      <article>
        <h2>Nuxt</h2>
        <p class="emote huh">{{ t('nuxt.description') }}</p>
        <footer>
          <a
            href="https://nuxt.com/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
          </a>
        </footer>
      </article>

      <article>
        <h2>TypeScript</h2>
        <p>{{ t('typescript.description') }}</p>
        <footer>
          <a
            href="https://www.typescriptlang.org/docs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
          </a>
        </footer>
      </article>

      <article>
        <h2>Open Props</h2>
        <p>
          {{ t('openprops.description') }}
        </p>
        <footer>
          <a
            href="https://open-props.style/#getting-started"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
          </a>
        </footer>
      </article>

      <article>
        <h2>Prisma</h2>
        <p>{{ t('prisma.description') }}</p>
        <small class="emote weirdchamp">
          {{ t('prisma.note') }}
        </small>
        <footer>
          <a
            href="https://www.prisma.io/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
          </a>
        </footer>
      </article>

      <article>
        <h2>tRPC</h2>
        <p>
          {{ t('trpc.description') }}
        </p>
        <i18n-t tag="small" class="emote weirdchamp" keypath="trpc.note">
          <template #link>
            <a
              href="https://twitter.com/trpcio"
              target="_blank"
              rel="noopener noreferrer"
            >
              @trpcio
            </a>
          </template>
        </i18n-t>
        <footer>
          <a
            href="https://trpc.io/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
          </a>
        </footer>
      </article>

      <article>
        <h2>Nuxt-auth</h2>
        <p>
          {{ t('nuxtauth.description') }}
        </p>
        <footer>
          <a
            href="https://sidebase.io/nuxt-auth/getting-started"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
          </a>
        </footer>
      </article>

      <article>
        <h2>Vue-i18n</h2>
        <p class="emote omegalul">
          {{ t('vuei18n.description') }}
        </p>
        <small>
          {{ t('vuei18n.note') }}
        </small>
        <footer>
          <a
            href="https://vue-i18n.intlify.dev/guide/introduction.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
          </a>
        </footer>
      </article>

      <article>
        <h2>{{ t('misc.title') }}</h2>
        <ul>
          <li>Nuxt-icons !</li>
          <li>Nuxt-typed-router !</li>
          <li>Nuxt-color-mode !</li>
          <li>Nuxt-device !</li>
          <li>Nuxt-image !</li>
        </ul>

        <small class="emote omegalul">
          {{ t('misc.note') }}
        </small>
      </article>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
@import 'open-props/media';

section {
  width: 100%;
  max-width: var(--size-lg);
  margin-inline: auto;
}

section > p {
  margin-inline: auto;
  text-align: center;
  margin-block-end: var(--size-4);

  & button {
    padding: var(--size-1) var(--size-3);
    border-radius: var(--radius-pill);
    background: var(--surface-1);
  }
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: var(--size-6);
}

article {
  background-color: var(--surface-1);
  padding: var(--size-6);
  display: flex;
  flex-direction: column;
  gap: var(--size-2);
  border-radius: var(--radius-2);

  & > h2 {
    font-size: var(--font-size-5);
  }

  & > ul {
    padding-inline-start: var(--size-3);
  }

  & > small {
    margin-block-start: auto;
    max-inline-size: 100%;
  }

  & > :not(small) + footer {
    margin-block-start: auto;
  }

  & > footer > a {
    padding-block: 0;
  }
}

.emote::after {
  content: '';
  width: 4ch;
  margin-inline-start: var(--size-1);
  display: inline-block;
  aspect-ratio: 1;
  background: var(--emote-bg);
  background-size: cover;
  transform: translateY(0.25rem);
}
.omegalul {
  --emote-bg: url('https://cdn.betterttv.net/emote/583089f4737a8e61abb0186b/1x.webp');
}

.huh {
  --emote-bg: url('https://cdn.betterttv.net/emote/62850a253c6f14b68848212a/2x.webp');
}
.weirdchamp {
  --emote-bg: url('https://cdn.betterttv.net/emote/5d20a55de1cfde376e532972/1x.webp');
}
</style>

<i18n lang="json">
{
  "en": {
    "greeting": "Hello {name} !",
    "anon": "there",
    "signin": "Sign in",
    "signout": "Sign off",
    "nuxt": {
      "description": "Peak DX fr fr but I'm sure you know that already"
    },
    "typescript": {
      "description": "Because tech twitter says types gud."
    },
    "openprops": {
      "description": "Because tech twitter says tailwind gud, but this time they're wrong. Tailwind bad."
    },
    "prisma": {
      "description": "Based ORM for based people.",
      "note": "Nvm they don't have entity subscribers and return POJOs"
    },
    "trpc": {
      "description": " I could do without, but it's not bad and y'all are getting head over heels with it",
      "note": "  PS: {link} vue-query adapter when tho"
    },
    "nuxtauth": {
      "description": "Using the Next-auth port by Sidebase. waiting for the official nuxt-auth package for Nuxt 3."
    },
    "vuei18n": {
      "description": "I mean I gotta add at least one thing so it doesn't look like I ripped off Theo right",
      "note": "Bonus: I added a zod error map so you can translate validation error messages. I know, I know, based."
    },
    "misc": {
      "title": "...And many more !",
      "note": "I can't take much credits, it's just all those amazing nuxt modules."
    }
  },
  "fr": {
    "greeting": "Salut {name} !",
    "anon": "toi",
    "footer": "Fait avec 💀 par {link}",
    "signin": "Connexion",
    "signout": "Deconnexion",
    "nuxt": {
      "description": "Meilleure DX tkt frr mais on toi meme tu sais déjà"
    },
    "typescript": {
      "description": "Parce que tech twitter dis que c bi1"
    },
    "openprops": {
      "description": "Parce que tech twitter dis que c bi1, mais ils ont tort. C pa bi1."
    },
    "prisma": {
      "description": "ORM basé pour les gens basés.",
      "note": "Ah non, ils ont pas d'entity subscribers et renvoient des POJOs."
    },
    "trpc": {
      "description": "Je pourrais faire sans, mais en vrai c'est pas mal et vous vous roulez tous par terre devant.",
      "note": "  PS: {link} à quand l'adapteur vue-query"
    },
    "nuxtauth": {
      "description": "Utilise le port de Next-auth par Sidebase. En attente de la version vue 3 package nuxtèauth officiel."
    },
    "vuei18n": {
      "description": "Faut bien que j'ajoute un truc pour faire semblant que c'est pas pompé sur Theo",
      "note": "Bonus: J'ai ajouté une error map zod pour pouvoir traduire les erreurs de validation. Oui, oui, je sais, basé."
    },
    "misc": {
      "title": "...Et bien d'autres !",
      "note": "On va pas se mentir, j'ai juste installé des modules nuxt."
    }
  }
}
</i18n>
