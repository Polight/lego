---
title: Binding events
weight: 5
---

## `@` Directive for binding events

```html
<template>
  <button @click="sayHi" name="the button">click</button>

  <script>
    export default class extends Lego {
      sayHi(event) {
        alert(`You clicked to says hi! 👋🏼`)
      }
    }
  </script></template
>
```
