---
title: Custom Directives
weight: 6
---

A `:` custom directive will interpret in JS whatever you pass as value.

## Example

```html
<template>
  <a :href="this.getUrl('144')">Visit Profile</a>
</template>

<script>
  export default class extends Lego {
    getUrl(id) {
      return `/user/${id}`
    }
  }
</script>
```

Outputs:

```html
<a href="/user/144">Visit Profile</a>
```

## A Utility for Readability

This is particularly useful to lighten your `<template>` tag in order to keep it readable.

Instead of:

```html
<template>
  <p :if="state.count < 5 && (state.canDoThis || state.attendees.includes('Bob'))">
    My conditional paragraph
  </p>
</template>

<script>
  export default class extends Lego {
    state = { count: 6, canDoThis: true, attendees: ['John', 'Mary'] }
  }
</script>
```

You can use getters:

```html
<template>
  <p :if="this.canDisplayMessage">
    My conditional paragraph
  </p>
</template>

<script>
  export default class extends Lego {
    state = { count: 6, canDoThis: true, attendees: ['John', 'Mary'] }

    get isBobTakingPart() {
      return this.state.attendees.includes('Bob')
    }

    get canDisplayMessage() {
      return this.state.count < 5 && (this.state.canDoThis || this.isBobTakingPart)
    }
  }
</script>
```

## [Boolean attributes](https://www.w3.org/TR/html5/infrastructure.html#sec-boolean-attributes)

When a boolean value is evaluated to `true`, the attribute in set as empty. While when evaluated to `false`, the attribute is removed from the DOM.

### Example

```html
<template>
  <input type="checkbox" :checked="state.agreed" :required="state.mustAgree" />
</template>

<script>
  export default class extends Lego {
    state = { agreed: false, mustAgree: true }
  }
</script>
```

Outputs:

```html
<input type="checkbox" required="" />
```
