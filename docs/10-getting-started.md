---
layout: page
title: Build Native Web-Components
label: Getting Started
permalink: /getting-started/
nav_order: 10
---

Lego requires [npm](npmjs.com) and [node](https://nodejs.org/).

Then install the compiler with `npm i @polight/lego`

## Quick start

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

Compile with `npx lego bricks`

And use it in your __index.html__

```html
<script src="./dist/index.js" type="module"></script>
<hello-world />
```

Run a local web server (ie: `python3 -m http.server`) and display your index.html (ie: http://localhost:8000).

What did just happen?

Here's what you just did with this simple code:

1. you created a native HTML element called `hello-world`
2. you made it react with a `name` state property
3. you imported all components from `./dist/index.js` (only 1 for now)
4. you instanciated the HTML element `<hello-world />`
