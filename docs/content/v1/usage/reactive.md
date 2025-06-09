---
title: Reactivity
weight: 6
---

The `state` is where the reactivity takes place.

Declare a `state` property in the component class with default values:

```html
<script>
  export default class extends Lego {
    state = {
      user: { firstname: 'John', lastname: 'Doe' },
      status: "Happy 😄"
    }
  }
</script>
```

Displaying a _state_ value is as simple as writing `${state.theValue}` in your HTML. **Note** that `.this` keyword is not required when referencing the `state` in your HTML as it is already provided by the rendering method.

When you need your component to react, call the `this.render()` method with your updated state:

```js
updateStatus(event) {
  this.render({ status: "Laughing 😂" })
}
```

This will refresh your component where needed.
