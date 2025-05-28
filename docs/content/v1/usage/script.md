---
title: Script tag
weight: 10
---

## `<script>` tag

The script tag is has a special behavior.
You will create a class extending the component, that's how you build your
full component with advanced script.

To do so extend the `Lego` default class:

```js
export default class extends Lego {
  …
}
```

### Accessing the component's DOM

Even if it's not the most recommended way it might occur that you need to access a DOM element from the script tag.

In which case the shortcut `this.document` will gain you access to the DOM,
wether it's the Shadow DOM (default) or you toggled to Light DOM (overriding).

`this.document` has all the methods you may expect from a document such as
`querySelector`, `getElementById`, `querySelectorAll`…

Ex: `this.document.querySelectorAll('a')`
