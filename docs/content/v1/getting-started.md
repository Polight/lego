---
title: Getting Started
weight: 2
---

Lego requires [npm](https://npmjs.com) or [yarn](https://yarnpkg.com) and [node](https://nodejs.org/).

By default Lego compiles HTML components from the HTML files within the _/bricks_ folder.
Create the folder to host your future components: `mkdir bricks`.

## Quick Start

### Installation

If you don't have a _package.json_ file yet, initialize first with `npm init` (or `yarn init`).

Install the compiler with `npm i @polight/lego` (or `yarn add @polight/lego`).

### Basic Example

This is the file tree we will need for this example:

```
index.html
|- bricks/
  |- hello-world.html  → The HTML you typed
```

### Hello World

Create a file called **bricks/hello-world.html**:

```html
<template>
  <p>Hello ${state.name}</p>
</template>

<script>
  export default class extends Lego {
    init() {
      this.state = { name: 'World!' }
    }
  }
</script>
```

Compile with `npx lego` (or `yarn lego`)

And use you component in your _/index.html_:

```html
<script src="./dist/index.js" type="module"></script>
<hello-world></hello-world>
```

Run a local web server, eg: `npx sirv-cli` and open http://localhost:5000.

## Let's Get a Step Back

What did just happen?

Here's what you just did with this simple code:

1. you created a native HTML element called `hello-world` by creating _bricks/hello-world.html_
2. you made it react with a `name` state property
3. you imported all components from `./dist/index.js` (well, only 1 for now)
4. you used the HTML element `<hello-world></hello-world>`

No magic {{< emoji "🪄" >}} here, just a couple of [default configuration that you can override](/configuring-components/).

You website is ready to be published on any _static_ host, even Github Pages.
