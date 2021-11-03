---
layout: page
title: Build Native Web-Components
label: Getting Started
permalink: /getting-started/
nav_order: 10
---

Lego requires [npm](npmjs.com) and [node](https://nodejs.org/).


## Quick start

If you don't have a _package.json_ file yet, initialize first with `npm init`.

### Hello World

Create a file called __bricks/hello-world.html__:

```html
<template>
  <p>Hello ${state.name}</p>
</template>

<script>
  export default class extends Lego {
    init() { this.state = { name: "World!" } }
  }
</script>
```

Compile with `npx @polight/lego`

And use you component in your __index.html__:

```html
<script src="./dist/index.js" type="module"></script>
<hello-world />
```

Run a local web server, eg: `npx sirv-cli` and open http://localhost:5000.

You website is ready to be published on any _static_ host, even Github Pages.
