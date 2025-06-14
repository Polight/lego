---
title: Script Tag
weight: 1
---

The script tag has a special behavior.
You just need to create a class extending the `Lego` default class to build your full component with advanced script.

```html
<script>
  export default class extends Lego {
    …
  }
</script>
```

## Accessing the component's DOM

Even if it's not the most recommended way, it might occur that you need to access a DOM element inside the component from the script tag.

In which case, the shortcut `this.document` will gain you access to the component DOM, being whether the [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) if enabled (default) or the component element if you have toggled to Light DOM (overriding) (see [Configuring]({{< relref "configuring" >}})).

`this.document` has all the methods you may expect from a document such as `querySelector`, `getElementById`, `querySelectorAll`…

For example, you can query all the `<a>` tag inside the component with:

```js
this.document.querySelectorAll('a')
```
