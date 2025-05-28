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

#### Binding custom events

Lego can bind custom events that follow the following conventions:
- The custom event type should be defined in `camelCase` ;
- The `@`  directive should be defined in `kebab-case`.

Example:

**bricks/my-child.html**

```html
<template>
  <button @click="sayHi">Click</button>
</template>

<script>
  export default class extends Lego {
    sayHi() {
      dispatchEvent(new CustomEvent('sayHi'))
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
