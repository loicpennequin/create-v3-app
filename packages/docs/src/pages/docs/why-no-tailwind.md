---
title: Why not using Tailwind ?
description: Why not using Tailwind ?
layout: ../../layouts/withSidebars.astro
lang: en
---

## Why not using Tailwind ?

As you may have already noticed, `create-v3-app` doesn't use, nor recommends, Tailwind. This is a very deliberate decision motivated by multiple reasons

- Vue's SFCs (Single File Components) eliminate by design the (perceived) issue of having to switch files between your HTML and CSS.
- Vue's `<style scoped>` basically erases the issues with coming up with class names, as you have no need to be hyper specific to avoid collisions.
- I like to leverage browser standards and modern features. CSS Variables are amazing and a total game changer when it comes to author good, maintainable, and **very** flexible CSS.
- [**Open props**](https://open-props.style/) is an excellent set of building blocks in the form of good default colors, spacing, and other primitives, to make it super easy to create a good looking, responsive app, while writing actual CSS. They even provide a postcss plugin to only ship only the variable you use ! (`create-v3-app` uses a slightly modified version of this plugin to support the `<style scoped>` syntax). This whole website only ships about 7kb of CSS!

With all of the reasons above, it just feels awkward to ship tailwind, given it's pretty hefty drawbacks in terms of readability, maintainability, and separation of concerns.

I personally think CSS is a fascinating thing. I'd like to nudge people towards believing the same thing. For these reasons I chose not to add Tailwind to the project.

If despite all of this, you _still_ want to use tailwind, it's only one `npm install` and one line to your nuxt config away by using the [Tailwind Nuxt module](https://nuxt.com/modules/tailwindcss).
