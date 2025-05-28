---
title: Reactive properties
weight: 6
---

## Reactive properties

The `state` is where the reactivity takes place.

declare a `state` object in the `init()` function with default values:

```js
init() {
  this.state = {
    user: { firstname: 'John', lastname: 'Doe' },
    status: "Happy 😄"
  }
}
```

Displaying a _state_ value is as simple as writing `${state.theValue}` in your HTML.

When you need your component to react, call the `this.render()` method
with your updated state:

```js
updateStatus(event) {
  this.render({ status: "Laughing 😂" })
}
```

This will refresh your component where needed.

When `state` is just mutated, the `changed(changedProps)` is called.
This `changed()` method is called before (re-)rendering.
