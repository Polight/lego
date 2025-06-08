# 🚀 LEGO Web Components, the Native and Future-Proof Web Components Library

LEGO (_Lightweight Embedded Gluten-free Objects_) is a library for writing fast ♻️ reactive, 📦 scoped and predictable 🏡 **native Web Components** in HTML/CSS/JS, that are easy to digest 🌱 for your browser.

Here is an example of LEGO component:

```html
<template>
  <h1>Welcome to LEGO</h1>
  <p>The lean way to make ${state.duration} Web Components powerful and easy</p>
</template>

<script>
  export default class extends Lego {
    state = { duration: 'Future-Proof' }
  }
</script>

<style>
  p {
    color: chocolate;
  }
</style>
```

To know more, go to [the documentation](https://lego.js.org/) to install and create native Web Components using LEGO.

---

Following instructions describes how to update the documentation.

## Requirements

This documentation is generated using Hugo and [zkreations/docs](https://github.com/zkreations/docs) theme.

It requires Hugo 0.138.0 or higher (**extended version** - it has its importance to transpile SCSS files). See [installation instructions](https://gohugo.io/installation/).

## Getting started

Go to this folder (`docs`) and run the following command to install the theme:

```bash
git submodule update --init
```

Start the local Hugo server running:

```bash
hugo -D server
```

*The `-D` option allows to generate also pages marked as draft.*

🚀 The documentation is now accessible on [localhost:1313](http://localhost:1313).
