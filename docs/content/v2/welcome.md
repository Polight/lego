---
title: Welcome
weight: 1
---

LEGO (_Lightweight Embedded Gluten-free Objects_) is a library for writing fast ♻️ reactive, 📦 scoped and predictable 🏡 **native web-components** in HTML/CSS/JS, that are easy to digest 🌱 for your browser.

## Native Web-Components?

Yes, you write native HTML, CSS and JS and create a native web-components [W3C](https://en.wikipedia.org/wiki/World_Wide_Web_Consortium) compliant.

It's stable and predictable.

If you have ever played with Web-Component-like frameworks (not to name Vue, React, Svelte…), you may know how debugging gets tricky and requires extra tooling.

Because LEGO is native, your browser developer toolbar is all you need.

- `debugger` works as expected,
- _step-by-step_ debugging,
- element inspector,
- the console with the live JS in the context…

It's all just normal!

#### What does LEGO actually look like?

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

## What is LEGO Behind?

- 👙 Minimalist: ~74~ 61 lines of readable code in its core (non-optimised, uncompressed, no cheating)
- 🌱 Zero dependency: it uses [Petit-Dom](https://github.com/yelouafi/petit-dom) which is stable and embedded, so no bad surprise in the future
- ♻️ Reactive: updating the state recalculate the Virtual Dom when needed
- 🚀 fast: using virtual dom through a thin layer makes it close to bare-metal
- 💧 Simple: that's [Vanilla](http://vanilla-js.com/), there isn't much to know, it's a raw class to extend; no magic ✨
- 🪶 3 directives to enhance HTML: `:if` for conditions, `:for` for loops, `@myfuncname` to call an action
- 🏡 Native: LEGO components are actual native web-components, you benefit from all the today's and tomorrow's possibilities ([slot](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots), [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM), …).

Lego is not (and will never be):

- 🏯 A full bloated frontend framework with routing. [Others do it well](https://github.com/visionmedia/page.js).
- 🏗 A website builder with SSR or similar complexities.
- 🔐 An HTML replacement that locks you into a specific technology.

## Next Steps, Demo and Doc

🧪 View the [demo](https://polight.github.io/lego-demo/) and [their source](https://github.com/Polight/lego-demo/).

💭 Lego is inspired from the [native Web-Component spec](https://developer.mozilla.org/en-US/docs/Web/Web_Components) and [Riot](https://riot.js.org/).

🔧 Customizing and contributing is just **much lighter** with simplicity, source that are easy to read, to hack and to maintain.

🎈 You can [read the core code](https://github.com/Polight/lego/blob/master/src/lib/Component.js) that is only 61 <abbr title="Lines Of Code">LOC</abbr> resulting that Lego is **as light as 3kb** for the full bundle!

## Why a version 2?

From March 2023, we have started to work on a new version to simplify the `<script>` block by removing the `class` syntax.
It has finally added too much magic 🪄 and we have decided to drop this version on April 2025 and keep on developing the version 1.

The current documentation you are reading relates to this version. This documentation is no longer maintained. However, as underlying Lego working is pretty close between version 1 and 2, most of the missing documentation in version 2 can be found within the version 1 documentation.
