---
title: Lifecycle callbacks
weight: 8
---

LEGO comes with 5 methods that allows you to hook some callbacks within the component lifecycle.

```js
export default class extends Lego {
  init() { … }

  connected() { … }

  rendered(state) { … }

  changed(changedState) { … }

  disconnected() { … }
}
```

## `init()`

This callback is triggered on the first time when the element is added to the DOM. At this point the element is still not rendered, so you can't access the [Shadow DOM]((https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)) and inner elements (see [Accessing the component's DOM]({{< relref "script#accessing-the-components-dom" >}})).

## `connected()`

This callback is triggered when the element is added to the DOM **and** rendered.

## `rendered(state)`

This callback is triggered **after** each time the element is rendered. It means at the initialization (after `init` and before `connected`), as well as each time [the state is mutated]({{< relref "reactive" >}}) (with `this.render()`) and the component is re-rendered.

The method comes with one param corresponding to the updated state.

## `changed(state)`

This callback is triggered when `state` is just mutated, **before** (re-)rendering.

The method comes with one param corresponding to the updated state.

## `disconnected()`

This callback is triggered when the element is removed from the DOM.

## You Said Native Web Components? Let's Hack!

As LEGO components are based on native Web Components, they provide native Web Component [lifecycle callbacks](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks).

This means you can hook these native callbacks as well, but keep in mind that this remains a **hacky** solution. Indeed, some of the LEGO lifecycle callbacks previously mentioned are directly related to these native Web Component lifecycle callbacks. In order to keep on LEGO working correctly, any hook to a native lifecycle callback needs a `super.*()` call.

So, yes, if needed, you can hack! But it means respecting the following syntax or you'll probably break things:

```js
export default class extends Lego {
  connectedCallback() {
    …

    super.connectedCallback()

    …
  }
}
```
