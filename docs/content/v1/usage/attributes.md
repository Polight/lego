---
title: Pass attributes
weight: 7
---

## Component attributes

Attributes declared on the components will be all be accessible through the `state`.
If the property is initialized in the `this.state`, the attribute will be reactive:

```html
<x-user status="thinking 🤔"><x-user></x-user></x-user>
```

`status` will therefore be reactive and the _thinking {{< emoji "🤔" >}}_ attribute value will overwrite the _Happy {{< emoji "😄" >}}_ default status.

{{< emoji "⚠️" >}} A property that is not declared in the `state` won't be reactive.

These properties can be accessed through `this.getAttribute()` from within the component.
After all, these components are just native! {{< emoji "🏡" >}}
