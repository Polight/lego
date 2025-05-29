---
title: Binding Events
weight: 5
---

`@` directive allows to bind events.

```html
<template>
  <button @click="sayHi" name="the button">Click</button>
</template>

<script>
  export default class extends Lego {
    sayHi(event) {
      alert('You clicked to says hi! 👋🏼')
    }
  }
</script>
```

#### Binding Custom Events

Lego can bind custom events. However, the custom event type should **not** be defined in `camelCase`, because of case-sensitivity issues. It is recommended to use `kebab-case`.

Example:

**bricks/my-child.html**

```html
<template>
  <button @click="sayHi">Click</button>
</template>

<script>
  export default class extends Lego {
    sayHi() {
      dispatchEvent(new CustomEvent('say-hi'))
    }
  }
</script>
```

**bricks/my-parent.html**

```html
<template>
  <my-child @say-hi="sayHi"></my-child>
</template>

<script>
  export default class extends Lego {
    sayHi() {
      alert('You clicked to says hi! 👋🏼')
    }
  }
</script>
```
