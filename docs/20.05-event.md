---
layout: page
title: Bind an Event to a Web-Component
label: Binding events
permalink: /usage-web-components/events/
nav_order: 5
parent: Usage
---

#### `@` Directive for binding Events

```html
<template>
  <button @click="sayHi" name="the button">click</button>

<script>
  export default class extends Lego {
    sayHi(event) {
      alert(`You clicked to says hi! 👋🏼`)
    }
  }
</script>
```
