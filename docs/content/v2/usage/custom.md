---
title: Custom directives
weight: 4
---

#### `:` Custom Directive

A custom directive will interpret in JS whatever you pass as value.

```html
<script>
  function getUrl(id) {
    return `/user/${id}`
  }
</script>

<template>
  <a :href="getUrl('144')">Visit Profile</a>
</template>
```

outputs

```
<a href="/user/144">Visit Profile</a>
```

[Boolean attributes](https://www.w3.org/TR/html5/infrastructure.html#sec-boolean-attributes)

Example: `<input type=checkbox :checked="state.agreed" :required="state.mustAgree">`.
With the following state: `const state = { agreed: false, mustAgree: true }` would render
`<input type=checkbox required="required">`.
