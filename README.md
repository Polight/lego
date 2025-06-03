<p style="text-align:center">
 <img src="./assets/lego.svg" alt="" style="width:100%;max-width:600px">
</p>


# LEGO: Modern Buildless Web Components

LEGO (_Lightweight Embedded Gluten-free Objects_) is a library for writing fast ♻️ reactive, 📦 scoped and predictable 🏡 **native Web Components** in HTML/CSS/JS, that are easy to digest 🌱 for your browser.

## Native Web Components?

Yes, you write native HTML, CSS and JS and create a native [W3C](https://en.wikipedia.org/wiki/World_Wide_Web_Consortium)-compliant Web Components. It's stable and predictable.

If you have ever played with Web Component-like frameworks (not to name Vue, React, Svelte…), you may know how debugging gets tricky and requires extra tooling. Because LEGO is native, your browser developer toolbar is all you need.

- `debugger` works as expected,
- _step-by-step_ debugging,
- element inspector,
- the console with the live JS in the context…

It's all just normal!

## Buildless

Because [buildless](https://duckduckgo.com/?q=buildless) is becoming a thing, we can know give it a name that speaks to all.


#### What Does LEGO Actually Look Like?

_/bricks/lean-welcome.html_:

```html
<template>
  <h1>Welcome to LEGO</h1>
  <p>The lean way to make ${state.duration} Web Components <slot></slot></p>
</template>

<script>
  export default class extends Lego {
    state = { duration: 'Short-Term' }
  }
</script>

<style>
  p {
    color: chocolate;
  }
</style>
```

Later, when builded and loaded as a plain JS-file, you can use it anywhere in your HTML:

```html
<lean-welcome duration="Future-Proof">powerful and easy</lean-welcome>
```

Will read in your HTML:

```html
<h1>Welcome to LEGO</h1>
<p>The lean way to make Future-Proof Web Components powerful and easy</p>
```

Of course there's **so much** more you can do. The [documentation](https://lego.js.org/) is here to guide you. 📓

_Pretty neat!_ <!-- FIXME: What is it related to?  -->

## Getting Started in 3 Minutes

You can just hop in and experiment your first LEGO component. [Follow this "Getting Started" guide](https://lego.js.org/v2/getting-started/#quick-start) for installing and writing it. <!-- FIXME: Fix the documentation link -->

Once you're done with it you can write more components the same way and play with [daily usage guide](https://lego.js.org/v2/usage-web-components/) for passing advanced arguments, writing conditions and loops, dynamic styling, connecting to APIs… <!-- FIXME: Fix the documentation link -->

## What Can You **Actually** Do With It?

You can create a simple reusable Web Component for your HTML website or build a full fledge app with it. It's as light as powerful, fully driven by the web-browsers standards.

Various applications are running LEGO in production for years now. Because of the standards and the zero dependency you can rely on it for the long term. Your site/app will still run and remain editable in 10+ years, and as long as web browsers will exist.


## How Does LEGO Work?

LEGO is a base class that you can extend and provide you with useful methods for reactivity. A small CLI in NodeJS come along to build 🚀 your component.

There's no [Vite](https://vitejs.dev/) nor other 3rd parties, it's [just an interpreter of ±130 lines of readable code](https://github.com/Polight/lego/blob/master/src/compiler/transpiler.js).

It also works with [Bun](https://bun.sh) and probably other interpreters.


## What Is LEGO Behind?

LEGO is:

- 👙 Minimalist: 117 lines of readable code in its core (non-optimized, uncompressed, no cheating) ;
- 🌱 Low dependency: it uses [petit-dom](https://github.com/yelouafi/petit-dom) which is stable and embedded, and which itself has no dependency. So no bad surprise in the future ;
- ♻️ Reactive: updating the state recalculate the [Virtual DOM](https://en.wikipedia.org/wiki/Virtual_DOM) when needed ;
- 🚀 Fast: using Virtual DOM through a thin layer makes it close to bare-metal ;
- 💧 Simple: that's [VanillaJS](http://vanilla-js.com/)! There isn't much to know, it's a raw class to extend. No magic ✨ ;
- 🪶 3 directives to enhance HTML: `:if` for conditions, `:for` for loops, `@myfuncname` to call an action ; <!-- FIXME: Should we keep this line? Seems it has been removed in v2 doc. -->
- 🏡 Native: LEGO components are actual native Web Components. You benefit from all the today's and tomorrow's possibilities ([slot](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots), [encapsulation with Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM), …) ;
- 🦺 Safe: because it has no third-party dependency and is fully based on browser features, it's secured and upgraded via your browser.

LEGO is not (and will never be):

- 🏯 A fully-bloated front-end framework with built-in routing. [Others do it well](https://github.com/visionmedia/page.js) ;
- 🏗 A website builder with built-in SSR or similar complexities ;
- 🔐 An HTML replacement that locks you into a specific technology ;
- {{< emoji "🧓" >}} An old browsers or IE compatible library (you may try [Web Components polyfills](https://github.com/webcomponents/polyfills) if you feel wild). <!-- FIXME: Do we keep this one from v2 doc? -->

## Next Steps, Demo and Doc

🧪 View the [demo](https://polight.github.io/lego-demo/) and [their source](https://github.com/Polight/lego-demo/).

📕 Read the full [documentation](https://lego.js.org)

💭 LEGO is inspired from the [native Web Component specs](https://developer.mozilla.org/en-US/docs/Web/Web_Components) and [Riot](https://riot.js.org/).

🔧 Customizing and contributing is just **much lighter** with simplicity. Source are easy to read, to maintain and to hack.

🎈 You can [read the core code](https://github.com/Polight/lego/blob/master/src/lib/Component.js)! That is only 117 <abbr title="Lines Of Code">LOC</abbr> resulting that LEGO is **as light as 2.8KB** for the full bundle!

## Developing and Contributing to LEGO

LEGO codebase is small so navigating through its code should be pretty straightforward.

### Updating the Compiler

For any changes within the `src/compiler` folder, you can test it by running it from one of your LEGO project. From this project, simply run `[path-from-your-project-to-lego-folder]/bin/compile.js` and see the result on your compiled LEGO components.

### Updating the Library

For any changes within the `src/lib` folder, you can test it by building it with `npm run build` and using files from `dist` folder within one of your LEGO project.

### Contributing

Before opening a pull request with your changes, you don't need to build and commit the `dist` folder with the `npm run build` command. It is achieved when deploying a new version of LEGO.

## Latest News

- April 2025: [LEGO v1](https://lego.js.org/v1/) will remain in place and stable as it is still more flexible than ~~[the LEGO v2 proposal](https://lego.js.org/v2/)~~.
