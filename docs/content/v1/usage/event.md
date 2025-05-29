---
title: Binding Events
weight: 5
---

`@` directive allows to bind events.

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
