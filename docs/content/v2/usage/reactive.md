---
title: Reactive properties
weight: 6
---

#### Reactive Properties

The `state` is where the reactiveness takes place.

declare a `state` object in the `init()` function with default values:

```js
const state = {
  user: { firstname: 'John', lastname: 'Doe' },
  status: 'Happy 😄'
}

const title = 'This title is non-reactive'
```

Displaying a _state_ value is as simple as writing `${state.theValue}` in your HTML.

When you need your component to react, call the `render()` method
with your updated state:

```
function updateStatus(event) {
  render({ status: "Laughing 😂" })
}
```

This will update your component only where needed.

When `state` is just mutated, the `changed(changedProps)` is called.
This `changed()` method is called before (re-)rendering.
