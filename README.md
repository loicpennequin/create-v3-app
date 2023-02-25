# Create V3 app

This is a Nuxt starter template inspired by the [T3 stack](https://create.t3.gg/), adapter to the Vue / Nuxt ecosystem.
Please note that this is note a 1:1 port, as I have my disagreements with some tech choice in this stack. Also, the rich Nuxt module ecosystem is taken advantage of, by adding some easy wins modules like [@nuxt/device](https://nuxt.com/modules/device) and [@nuxtjs/color-mode](https://nuxt.com/modules/color-mode).

I try to keep this project as simple as possible, so you can start with just the boilerplate code, while at the same time providing great value to developers.

⚠️ At the moment (25/02/2023), this template is using the [Edge release](https://nuxt.com/docs/guide/going-further/edge-channel) of the nuxt package, because of a bug that breaks HMR and SSR on windows in the latest published version. Once `nuxt@3.2.3` lands, ths fix will be officially published and the version in this project `package.json` will be rectified.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, well...I'm a random nobody and I don't have discord so sucks to be you lmao.

- [Nuxt 3](https://nuxt.com/docs)
- [Open Props](https://open-props.style)
- [Tanstack Query](https://tanstack.com/query/latest)
- [Prisma](https://prisma.io)
- [tRPC](https://trpc.io)
- [Nuxt Auth by sidebase](https://sidebase.io/nuxt-auth/getting-started)
- [Vue-i18n](https://vue-i18n.intlify.dev)

# I want more !

A more opinionated, "Enterprise Edition™ Ultra Deluxe++ POGCHAMP OMEGALUL" version of this stack is in the works, with a lot of other features out of the box and a more robust architecture. However, I want to keep this simpler scaffolding separate in order to be more accessible and suited for small side-projects.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

Create a `.env` file, following the model of the `.env.example` file at the project root.

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
