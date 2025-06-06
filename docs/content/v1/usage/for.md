---
title: Loop :for
weight: 3
---

`:for` directive allows to repeat a tag based on a property.

The syntax is as follow: `:for="item in state.items"`.

The `item` value will be available trough `${item}` within the loop.

If you need an incremental index `i`, use `:for="item, i in state.items"`.

## Example

```html
<template>
  <li :for="attendee in state.attendees">${attendee}</li>
</template>

<script>
  export default class extends Lego {
    state = { attendees: ['John', 'Mary'] }
  }
</script>
```

Outputs:

```html
<li>John</li><li>Mary</li>
```
