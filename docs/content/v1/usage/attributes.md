---
title: Pass Attributes to Components
weight: 8
---

Attributes declared on the components will be all be accessible through the [`state`]({{< relref "reactive" >}}). If the property is initialized in the `this.state`, the attribute will be reactive.

**bricks/x-user.html**:

```js
<script>
  export default class extends Lego {
    state = {
      user: { firstname: 'John', lastname: 'Doe' },
      status: "Happy 😄"
    }
  }
</script>
```

Elsewhere:

```html
<x-user status="Thinking 🤔"></x-user>
```

`status` will therefore be reactive and the "_Thinking {{< emoji "🤔" >}}_" attribute value will overwrite the "_Happy {{< emoji "😄" >}}_" default status.

{{< emoji "⚠️" >}} A property that is not declared in the `state` won't be reactive.

These properties can be accessed through `this.getAttribute()` from within the component. After all, these components are just native! {{< emoji "🏡" >}}

Also note that you can pass any type of value as a reactive attribute: strings, numbers, booleans, as well as objects, arrays, etc.
