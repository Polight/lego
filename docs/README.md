```html
<template>
  <p>Welcome to LEGO, the Native and ${duration} Web Components Library.</p>
</template>

<script>
  export default class extends Lego {
    init() {
      this.state = { duration: 'Future-Proof' }
    }
  }
</script>
```

🚀 LEGO Web Components, the Native and Future-Proof Web Components Library.

LEGO is a Web Component library that allows you to build HTML elements easily and compile them to native HTML elements.

The whole library runs within the browser.

To know more, go to [the documentation](https://lego.js.org/) to install and create native Web Components.

--

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

🚀 The documentation is now accessible on [localhost:1313](http://localhost:1313).
