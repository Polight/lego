
<p style="text-align:center">
 <img src="./assets/lego.svg" title="Native Web-components" alt="Lego is a fast & native web-components library" style="width:100%;max-width:600px">
</p>


# LEGO: Modern Buildless Web Components

Lego is a fast & native-Web Components library.

## Native Web Components?

Yes, you write native HTML, CSS and JS and create a native [W3C](https://en.wikipedia.org/wiki/World_Wide_Web_Consortium)-compliant Web Components.

It's stable and predictable.

If you have ever played with Web Component-like frameworks (not to name Vue, React, Svelte…), you may know how debugging gets tricky and requires extra tooling.

Because LEGO is native, your browser developper toobar is all you need.
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
  <p>The lean way to make Web Components <slot></slot></p>
</template>
```

Later you can use it anywhere in your HTML:

```html
<lean-welcome>powerful and easy</lean-welcome>
```

Will read in your HTML:

```
Welcome to LEGO
The lean way to make Web Components powerful and easy
```

Of course there's **so much** more you can do.
The [documentation](https://lego.js.org/) will guide you 📓

_Pretty neat!_


## Getting Started in 3 Minutes

You can just hop in and experiment your first HTML Element.

[Follow this Getting Started guide](https://lego.js.org/v2/getting-started/#quick-start) for installing and writing your first component.

Once you're done with it you can write more components the same way and play with [daily usage guide](https://lego.js.org/v2/usage-web-components/) for passing advanced arguments, writing conditions and loops, dynamic styling, connecting to APIs…


## What Can You **Actually** Do With It?

You can create a simple reusable Web Components for your HTML website or build a full fledge app with it.
It's as light as powerful, fully driven by the web-browsers standards.

Various applications are running Lego in production for years now.

Because of the standards and the zero dependency you can rely on it for the long term.

Your site/app will still running and remain editable in 10+ years, and as long as web browsers will exist.


## How Does LEGO Work?

LEGO (_Lightweight Embedded Gluten-free Objects_) is a base class that you extend and provide you with methods to use ♻️ reactive and 🏡 **native Web Components** that are easy to digest 🌱 for your browser.

A small CLI in NodeJS come along to build 🚀 your component.
There's no [Vite](https://vitejs.dev/) nor other 3rd parties, it's [just an interpreter of ±180 lines of readable code](https://github.com/Polight/lego/blob/master/src/compiler/transpiler.js).
I also works with [https://bun.sh](Bun) and probably other interpreters.


## What Is LEGO Behind?

- 👙 Minimalist: ~74~ 61 lines of readable code in its core (non-optimised, uncompressed, no cheating)
- 🌱 Zero dependency: it uses [Petit-Dom](https://github.com/yelouafi/petit-dom) which is stable and embedded, so no bad suprise in the future
- ♻️ Reactive: updating the state recalculate the Virtual Dom when needed
- 🚀 fast: using virtual dom through a thin layer makes it close to bare-metal
- 💧 Simple: that's [Vanilla](http://vanilla-js.com/), there isn't much to know, it's a raw class to extend; no magic ✨
- 🪶 3 directives to enhance HTML: `:if` for conditions, `:for` for loops, `@myfuncname` to call an action
- 🏡 Native: LEGO components are actual native Web Components, you benefit from all the today's and tomorrow's possibilities ([slot](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots), [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM), …).

Lego is not (and will never be):
- 🏯 A full bloated frontend framework with routing. [Others do it well](https://github.com/visionmedia/page.js).
- 🏗 A website builder with SSR or similar complexities.
- 🔐 An HTML replacement that locks you into a specific technology.

## Next Steps, Demo and Doc

 🧪 View the [demo](https://polight.github.io/lego-demo/) and [their source](https://github.com/Polight/lego-demo/).

📕 [Read the full documentation at https://lego.js.org](https://lego.js.org)

💭 Lego is inspired from the [native Web Component spec](https://developer.mozilla.org/en-US/docs/Web/Web_Components) and [Riot](https://riot.js.org/).

🔧 Customizing and contributing is just **much lighter** with simplicity, source that are easy to read, to hack and to maintain.

🎈 You can [read the core code](https://github.com/Polight/lego/blob/master/src/lib/Component.js) that is only 61 <abbr title="Lines Of Code">LOC</abbr> resulting that Lego is **as light as 3Kb** for the full bundle!

## Developing and Contributing to Lego

Lego codebase is small so navigating through its code should be pretty straightforward.

### Updating the Compiler

For any changes within the `src/compiler` folder, you can test it by running it from one of your Lego project. From this project, simply run `[path-from-your-project-to-lego-folder]/bin/compile.js` and see the result on your compiled Lego components.

### Updating the Library

For any changes within the `src/lib` folder, you can test it by building it with `npm run build` and using files from `dist` folder within one of your Lego project.

### Contributing

Before opening a pull request with your changes, you don't need to build and commit the `dist` folder with the `npm run build` command. It is achieved when deploying a new version of Lego.

## Latest News

- April 2025: [Lego v1](https://lego.js.org/v1/) will remain in place and stable as it remains more flexible than ~~[the Lego v2 proposal](https://lego.js.org/v2/)~~.
