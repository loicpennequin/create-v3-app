---
title: Folder Structure
description: Folder structure of a V3 App
layout: ../../layouts/withSidebars.astro
lang: en
---

## Folder Structure

`create-v3-app` follows the standards of a Nuxt application, and this is reflected in the folder structure.

### .vscode

This folder contains VS Code specific settings

#### extensions.json

This file contains recommended extensions to work with V3 apps. When opening the project, VS Code will ask you if you want to install them.

#### launch.json

This file contain debugging configuration informations. See [**VS Code page on debugging**](https://code.visualstudio.com/docs/editor/debugging)

### settings.json

This file allows custom settings for your app workspaces. We use it to setup autocomplete for CSS variables with the [**CSS Var Autocomplete extension**](https://marketplace.visualstudio.com/items?itemName=phoenisx.cssvar). By default, it will scan the open props source file, as well as `/src/styles/theme.css`. You can add more under the `cssvar.files` if it suits your needs.

### prisma

You will find the Prisma schema file in this folder at `/prisma/schema.prisma`. This is where you define your database schema and models, and is used when generating the Prisma Client usint `yarn prisma db push` or `yarn db:sync`.

### scripts

This folder would contain external scripts you would need for tooling, like custom vite plugins for example. It comes with a `postcss-jit-fix` that is a fork of the [\*\*PostCSS-jit-props](https://github.com/GoogleChromeLabs/postcss-jit-props) plugin, to add supporte for Vue's `<style scoped >`.

### src

This is where your application code lives.
