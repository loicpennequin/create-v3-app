---
title: Getting started
description: Getting started with the V3 Stack
layout: ../../layouts/withSidebars.astro
lang: en
---

## Getting Started

To scaffold an app using `create-v3-app`, run any of the following three commands and answer the command prompt questions:

Using npm

```bash
npm create v3-app@latest
```

Using yarn

```bash
yarn create v3-app
```

Using pnpm

```bash
pnpm create v3-app@latest
```

At this moment, the CLI tool doesn't offer any customization for your template. This will be changed in the future, as you will be able to opt in every piece of the stack, with the exception of Nuxt and TypeScript.

## Advanced usage

| Option/Flag   | Description                                                             |
| ------------- | ----------------------------------------------------------------------- |
| `[dir]`       | Include a directory argument with a name for the project                |
| `--noGit`     | Explicitly tell the CLI to not initialize a new git repo in the project |
| `--noInstall` | Generate project without installing dependencies                        |
