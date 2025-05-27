---
title: Welcome
weight: 1
---

LEGO (_Lightweight Embedded Gluten-free Objects_) is a library for writing fast ♻️ reactive, 📦 scoped and predictable 🏡 **native web-components** in HTML/CSS/JS, that are easy to digest 🌱 for your browser.

Example (`my-example.html`):

```html
<template>
  <p>Hey Joe</p>
</template>

<style>
  p {
    color: chocolate;
  }
</style>
```

These are **native HTML elements** with Shadow DOM, slots and all native features from the official specs.

Lego is:

- 👙 Minimalist: ~74~ 61 lines of readable code in its core (non-optimized, uncompressed, no cheating).
- 🌱 Low dependency: its single third-party is the minimalist [Petit-Dom](https://github.com/yelouafi/petit-dom) which itself has no dependency
- ♻️ Reactive: updating the state recalculate the Virtual Dom when needed
- 🚀 fast: using virtual dom through a thin layer makes it close to bare-metal
- 💧 Simple: that's [Vanilla](http://vanilla-js.com/), there isn't much to know, it's a raw class to extend; no magic ✨
- 🏡 Native: Web Components are actual native Web Components, you benefit from all the today's and tomorrow's possibilities (slot, encapsulation, …)
- 🦺 Safe: because it has no third-party dependency and is
  fully based on browser features, it's secured and upgraded
  via your browser.

Lego is not (and will never be):

- 🏯 A full bloated frontend framework with built-in routing. [Others do it well](https://github.com/visionmedia/page.js).
- 🏗 A website builder with built-in SSR or similar complexities.
- 🔐 An HTML replacement that locks you into a specific technology.
- 🧓 An old browsers or IE compatible library (you may try [Web Components polyfills](https://github.com/webcomponents/polyfills) if you feel wild).

View the [demo](https://polight.github.io/lego-demo/) and [their source](https://github.com/Polight/lego-demo) 🧪.

Lego is inspired from the [native Web-Component spec](https://developer.mozilla.org/en-US/docs/Web/Web_Components) and [Riot](https://riot.js.org/).

It's just **much lighter** with simplicity, a source code that is readable for a regular human which makes it accessible to hack, tweak and maintain in the loooong term.
The [core lib](https://github.com/Polight/lego/blob/master/src/lib/Component.js) is only 61 <abbr title="Lines Of Code">LOC</abbr>!
Lego is as light as **3Kb** for the full bundle!

No Babel transpiler, no Parcel, no Webpack… it just works out of the box.

Demo: [view in action](https://polight.github.io/lego-demo/)
