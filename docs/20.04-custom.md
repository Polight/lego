---
layout: page
title: Inserting Custom Attributes in Web-Components
label: Custom directives
permalink: /usage-web-components/custom-directive/
nav_order: 4
parent: Usage
---

#### `:` Custom Directive

A custom directive will interpret in JS whatever you pass as value.

```html
<template>
  <a :href="this.getUrl('144')">Visit Profile</a>
</template>
<script>
  export default class extends Lego {
    getUrl(id) { return `/user/${id}` }
  }
</script>
```

outputs

```
<a href="/user/144">Visit Profile</a>
```

[Boolean attributes](https://www.w3.org/TR/html5/infrastructure.html#sec-boolean-attributes)

Example: `<input type=checkbox :checked="state.agreed" :required="state.mustAgree">`.
With the following state: `this.state = { agreed: false, mustAgree: true }` would render
`<input type=checkbox required="required">`.
