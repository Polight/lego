---
title: Extending LEGO
weight: 8
---

LEGO is tiny and simple, however flexible. You can easily extend LEGO to add any logic you need to your components. Let's show you a proposed cooking recipe through an example! {{< emoji "🧑‍🍳" >}}

We propose to add an extra attribute to all your LEGO components so you can easily query them.

Create a file **dist/lego-with-attribute.js** where the LEGO component class is extended:

```js
import { Component, h, render } from 'path/to/lego/lego.min.js'

class ComponentWithAttribute extends Component {
  connectedCallback() {
    this.setAttribute('data-component', 'i-am-a-brick')

    super.connectedCallback()
  }
}

export { ComponentWithAttribute as Component, h, render }
```

It is necessary that this file has the same `export` API as the `lego.min.js` as it will replace the previous one.

Then, in you **lego.config.js** (see [Configuring section]({{< relref "configuring" >}})), add the following config:

```js
export default {
  …

  importPath: './lego-with-attribute.js'
}
```

**Note** that the import path is relative to the `dist` folder.

And you are done! {{< emoji "🚀" >}}
