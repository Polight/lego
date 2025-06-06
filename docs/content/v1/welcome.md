---
title: Welcome
weight: 1
---

LEGO (_Lightweight Embedded Gluten-free Objects_) is a library for writing fast {{< emoji "♻️" >}} reactive, {{< emoji "📦" >}} scoped and predictable {{< emoji "🏡" >}} **native Web Components** in HTML/CSS/JS, that are easy to digest {{< emoji "🌱" >}} for your browser.

Example (`bricks/my-example.html`):

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

These are **native HTML elements** with Shadow DOM, slots and all native features from the official specs.

LEGO is:

- {{< emoji "👙" >}} Minimalist: 117 lines of readable code in its core (non-optimized, uncompressed, no cheating) ;
- {{< emoji "🌱" >}} Low dependency: its single third-party is the **minimalist** [petit-dom](https://github.com/yelouafi/petit-dom) which is stable and embedded, and which itself has no dependency. So no bad surprise in the future ;
- {{< emoji "♻️" >}} Reactive: updating the state recalculate the [Virtual DOM](https://en.wikipedia.org/wiki/Virtual_DOM) when needed ;
- {{< emoji "🚀" >}} Fast: using Virtual DOM through a thin layer makes it close to bare-metal ;
- {{< emoji "💧" >}} Simple: that's [VanillaJS](http://vanilla-js.com/)! There isn't much to know, it's a raw class to extend. No magic {{< emoji "✨" >}} ;
- {{< emoji "🪶" >}} 3 directives to enhance HTML: `:if` for conditions, `:for` for loops, `@myfuncname` to call an action ;
- {{< emoji "🏡" >}} Native: LEGO components are actual native Web Components. You benefit from all the today's and tomorrow's possibilities ([slot](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots), [encapsulation with Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM), …) ;
- {{< emoji "🦺" >}} Safe: because it has no third-party dependency and is fully based on browser features, it's secured and upgraded via your browser.

LEGO is not (and will never be):

- {{< emoji "🏯" >}} A fully-bloated front-end framework with built-in routing. [Others do it well](https://github.com/visionmedia/page.js) ;
- {{< emoji "🏗" >}} A website builder with built-in SSR or similar complexities ;
- {{< emoji "🔐" >}} An HTML replacement that locks you into a specific technology ;
- {{< emoji "🧓" >}} An old browsers or IE compatible library (you may try [Web Components polyfills](https://github.com/webcomponents/polyfills) if you feel wild).

## Next Steps, Demo and Doc

{{< emoji "🧪" >}} View the [demo](https://polight.github.io/lego-demo/) and [their source](https://github.com/Polight/lego-demo).

{{< emoji "💭" >}} LEGO is inspired from the [native Web Component specs](https://developer.mozilla.org/en-US/docs/Web/Web_Components) and [Riot](https://riot.js.org/).

{{< emoji "🔧" >}} Customizing and contributing is just **much lighter** with simplicity. Source are easy to read for a regular developer which makes it accessible to maintain, to tweak and to hack in the *loooong* term.

{{< emoji "🎈" >}} You can [read the core code](https://github.com/Polight/lego/blob/master/src/lib/Component.js)! That is only 117 <abbr title="Lines Of Code">LOC</abbr> resulting that LEGO is **as light as 2.8KB** for the full bundle! No Babel transpiler, no Parcel, no Webpack… It just works out of the box.

{{< emoji "📖">}} Keep on reading this documentation and start writing your first LEGO component...
