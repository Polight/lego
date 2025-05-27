---
title: Binding events
weight: 5
---

#### `@` Directive for binding Events

The `@` directive will call a method declared in the `methods` const:

```html
<script>
  const methods = {
    sayHi(event) {
      const buttonName = event.target.name
      alert(`You clicked ${buttonName} to says hi! 👋🏼`)
    }
  }
</script>
<template>
  <button @click="sayHi" name="the-button">click</button>
</template>
```

Any method in that `methods` declaration can be invoked as a method of the component
with the context of the component itself. Meaning that `this` refers to the component.
These methods can therefore access `this.state` for the current state,
`this.render()` for re-rendering…
