---
layout: page
title: Using slots
weight: 8
---

#### Slots

[Slots](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) are part of the
native web-component.
Because Lego builds native web-components, you can use the standard _slots_ as documented.

Example:

**index.html**

```html
<user-profile>
  <span>This user is in Paris</span>
  <user-profile></user-profile
></user-profile>
```

**bricks/user-profile.html**

```html
<template>
  <h1>User profile</h1>
  <p>important information: <slot></slot></p>
</template>
```

Will write `…<p>important information: <span>This user is in Paris</span></p>`

[See more advanced examples](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots#Adding_flexibility_with_slots).
