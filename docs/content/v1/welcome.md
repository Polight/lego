---
title: Welcome
weight: 1
---

LEGO (_Lightweight Embedded Gluten-free Objects_) is a library for writing fast {{< emoji "♻️" >}} reactive, {{< emoji "📦" >}} scoped and predictable {{< emoji "🏡" >}} **native Web Components** in HTML/CSS/JS, that are easy to digest {{< emoji "🌱" >}} for your browser.

Example (`bricks/my-example.html`):

```html
<template>
  <h1>Welcome to LEGO</h1>
  <p>The lean way to make ${state.duration} Web Components <slot></slot></p>
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

These are **native HTML elements** with Shadow DOM, slots and all native features from the official specs.

LEGO is:

- {{< emoji "👙" >}} Minimalist: ~74~ 61 lines of readable code in its core (non-optimized, uncompressed, no cheating).
- {{< emoji "🌱" >}} Low dependency: its single third-party is the minimalist [Petit-Dom](https://github.com/yelouafi/petit-dom) which itself has no dependency
- {{< emoji "♻️" >}} Reactive: updating the state recalculate the Virtual Dom when needed
- {{< emoji "🚀" >}} fast: using virtual dom through a thin layer makes it close to bare-metal
- {{< emoji "💧" >}} Simple: that's [Vanilla](http://vanilla-js.com/), there isn't much to know, it's a raw class to extend; no magic {{< emoji "✨" >}}
- {{< emoji "🏡" >}} Native: Web Components are actual native Web Components, you benefit from all the today's and tomorrow's possibilities (slot, encapsulation, …)
- {{< emoji "🦺" >}} Safe: because it has no third-party dependency and is
  fully based on browser features, it's secured and upgraded
  via your browser.

LEGO is not (and will never be):

- {{< emoji "🏯" >}} A full bloated frontend framework with built-in routing. [Others do it well](https://github.com/visionmedia/page.js).
- {{< emoji "🏗" >}} A website builder with built-in SSR or similar complexities.
- {{< emoji "🔐" >}} An HTML replacement that locks you into a specific technology.
- {{< emoji "🧓" >}} An old browsers or IE compatible library (you may try [Web Components polyfills](https://github.com/webcomponents/polyfills) if you feel wild).

View the [demo](https://polight.github.io/lego-demo/) and [their source](https://github.com/Polight/lego-demo) {{< emoji "🧪" >}}.

LEGO is inspired from the [native Web Component spec](https://developer.mozilla.org/en-US/docs/Web/Web_Components) and [Riot](https://riot.js.org/).

It's just **much lighter** with simplicity, a source code that is readable for a regular human which makes it accessible to hack, tweak and maintain in the loooong term.
The [core lib](https://github.com/Polight/lego/blob/master/src/lib/Component.js) is only 61 <abbr title="Lines Of Code">LOC</abbr>!
LEGO is as light as **3Kb** for the full bundle!

No Babel transpiler, no Parcel, no Webpack… it just works out of the box.

Demo: [view in action](https://polight.github.io/lego-demo/)
