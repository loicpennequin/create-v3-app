---
title: Folder Structure
description: Folder structure of a V3 App
layout: ../../layouts/withSidebars.astro
lang: en
---

## Folder Structure

`create-v3-app` follows the standards of a Nuxt application, and this is reflected in the folder structure.

### 📁.vscode

This folder contains VS Code specific settings

#### 📝extensions.json

This file contains recommended extensions to work with V3 apps. When opening the project, VS Code will ask you if you want to install them.

#### 📝launch.json

This file contain debugging configuration informations. See [VS Code page on debugging](https://code.visualstudio.com/docs/editor/debugging)

#### 📝settings.json

This file allows custom settings for your app workspaces. We use it to setup autocomplete for CSS variables with the [CSS Var Autocomplete extension](https://marketplace.visualstudio.com/items?itemName=phoenisx.cssvar). By default, it will scan the open props source file, as well as `/src/styles/theme.css`. You can add more under the `cssvar.files` if it suits your needs.

### 📁prisma

You will find the Prisma schema file in this folder at `/prisma/schema.prisma`. This is where you define your database schema and models, and is used when generating the Prisma Client usint `yarn prisma db push` or `yarn db:sync`.

### 📁scripts

This folder would contain external scripts you would need for tooling, like custom vite plugins for example. It comes with a `postcss-jit-fix` that is a fork of the [PostCSS-jit-props](https://github.com/GoogleChromeLabs/postcss-jit-props) plugin, to add supporte for Vue's `<style scoped >`.

### 📁src/components

See [the components folder in the Nuxt documentation](https://nuxt.com/docs/guide/directory-structure/components)

### 📁src/composables

See [the composables folder in the Nuxt documentation](https://nuxt.com/docs/guide/directory-structure/composables)

#### 📝useTrpc.ts

Exposes the tRPC client directly without having to call `useNuxtApp()` for ease of use.

#### 📝vue-query.ts

Exports vue-query's composable to make them auto importable, for ease of use.

### 📁src/layouts

See [the layouts folder in the Nuxt documentation](https://nuxt.com/docs/guide/directory-structure/layouts)

### 📁src/locales

This is where your global translations will live. It includes translations for all Zod's errors which can be useful to provide localized validation errors in your UI ⚠️ The zod errors have not been translated in french yet in the `src/locales/fr.json` file.

### 📁src/pages

See [the pages folder in the Nuxt documentation](https://nuxt.com/docs/guide/directory-structure/pages)

### 📁src/plugins

See [the plugins folder in the Nuxt documentation](https://nuxt.com/docs/guide/directory-structure/plugins)

#### 📝trpc.ts

This file is the front-end entrypoint to tRPC.
We provide our own fetch methodto leverage the use of Nuxt's $fetch, which directly calls your back end code during SSR, instead of making an additional HTTP request.
`trpc-nuxt` tries to do this as well, but it is unfortunately done incorrectly as we lose error information with some error types (go bother them !)

#### 📝vue-query.ts

This file provides the `vue-query` with a custom QueryClient so we can easily pass options to it. It also handles query client state serialization / deserialization.

#### 📝zod.ts

This file helps provide a custom error map to zod, so it can output translated messages.

### 📁src/public

See [the public folder in the Nuxt documentation](https://nuxt.com/docs/guide/directory-structure/public)

### 📁src/server

See [the server folder in the Nuxt documentation](https://nuxt.com/docs/guide/directory-structure/server)

#### 📝api/auth/[...auth.ts]

This file is the Auth.js authentication slug route. It is used to handle authentication requests. See [the sidebase nuxt auth module documentation](https://sidebase.io/nuxt-auth/getting-started/quick-start), as well as [Auth.js documentation](https://authjs.dev/) for more informations.

#### 📝api/auth/[trpc.ts]

This file defines your server side tRPC handler. It will catch all tRPC request and process them.

#### 📝trpc/router/index.ts

This file contains your tRPC router. You can merge al lof your sub routers into it. See the [tRPC documentation](https://trpc.io/) for how to create routers.

#### 📝trpc/context.ts

This file defines our tRPC context. It will be run for every request. See [tRPC documentation on context](https://trpc.io/docs/context).

#### 📝trpc/trpc.ts

The trpc.ts file is the main configuration file for your tRPC back-end. In here we:

- Define context used in tRPC requests.
- Export procedure helpers.

#### 📝db.ts

This file contains your Prisma database client.

### 📁src/styles

This is where you would put css files. Any CSS variable declared in the `styles/theme.css` will receive intellisense toprovide autocomplete in all of your css files / vue style blocks.

⚠️ If you add more files, and want them available globally, don't forget to add them to your nuxt config or import them manually in your app.vue

### 📝src/app.config.ts

See [the app.config.ts file in the Nuxt documentation](https://nuxt.com/docs/guide/directory-structure/app-config)

### 📝src/app.vue

See [the app.vue file in the Nuxt documentation](https://nuxt.com/docs/guide/directory-structure/app)

### 📝.env

The .env file is used to store environment variables. See Environment Variables for more information. This file should **not** be committed to git history.

### 📝.env.example

The .env.example file shows example environment variables based on the chosen libraries. This file should be committed to git history.

### 📝.eslintignore

List of tiles ignores by ESlint.

### 📝.eslintrc

This file is used to configure ESLint. See [ESLint documentation](https://eslint.org/docs/latest/use/configure/configuration-files) for more information.

### 📝.prettierrc

This file is used to configure Prettier to customize code formatting. [Prettier documentation](https://prettier.io/docs/en/options.html) for more information.

PS: People not using semicolons and double quotes, wth is wrong with you smh 💀

### 📝nuxt.config.ts

See [the nuxt.config.ts file in the Nuxt documentation](https://nuxt.com/docs/guide/directory-structure/nuxt.config)

### 📝ts.config.json

The tsconfig.json file is used to configure TypeScript. It extends thnuxt config generated in the `.nuxt` folder that is created whn you run `yarn dev`.
