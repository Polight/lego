
<p style="text-align:center">
 <img src="./assets/lego.png" title="Fast Webcomponents" alt="Lego is a fast web-components library" style="width:100%;max-width:600px">
</p>


# LEGO: Modern Web-Components

LEGO (_Lightweight Embedded Gluten-free Objects_) is a NodeJS tool to build 🚀 fast, ♻️ reactive, 🏡 **native web-components** that are easy to digest 🌱 for your browser.

Lego is:

- 👙 Minimalist: ~74~ 61 lines of readable code in its core (non-optimised, uncompressed, no cheating).
- 🌱 Low dependency: its single third-party is the minimalist [Petit-Dom](https://github.com/yelouafi/petit-dom) which itself has no dependency
- ♻️ Reactive: updating the state recalculate the Virtual Dom when needed
- 🚀 fast: using virtual dom through a thin layer makes it close to bare-metal
- 💧 Simple: that's [Vanilla](http://vanilla-js.com/), there isn't much to know, it's a raw class to extend; no magic ✨
- 🏡 Native: webcomponents are actual native webcomponents, you benefit from all the today's and tomorrow's possibilites (slot, encapsulation, …).

Lego is not (and will never be):
- 🏯 A full bloated frontend framework with routing. [Others do it well](https://github.com/visionmedia/page.js).
- 🏗 A website builder with SSR or similar complexities.
- 🔐 An HTML replacement that locks you into a specific technology.

View the [demo](https://polight.github.io/lego-demo/) and [their source](https://github.com/Polight/lego-demo/) 🧪.


Lego is inspired from the [native Web-Component spec](https://developer.mozilla.org/en-US/docs/Web/Web_Components) and [Riot](https://riot.js.org/).

It's just **much lighter** with simplicity, source that are easy to read, to hack and to maintain.
The [core lib](https://github.com/Polight/lego/blob/master/src/lib/Component.js) is only 61 <abbr title="Lines Of Code">LOC</abbr>!
Lego is as light as 3Kb for the full bundle!

Demo: [view in action](https://polight.github.io/lego-demo/)

[Read the full documentation at https://lego.js.org](https://lego.js.org)
