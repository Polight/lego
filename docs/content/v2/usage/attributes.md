---
title: Pass attributes
weight: 7
---

#### Component Attributes

Attributes declared on the components will be all be accessible through the `state`.
If the property is initialized in the `this.state`, the attribute will be reactive:

```html
<x-user status="thinking 🤔"><x-user></x-user></x-user>
```

`status` will therefore be reactive and the _thinking 🤔_ attribute value will overwrite the _Happy 😄_ default status.

⚠️ A property that is not declared in the `state` won't be reactive.

These properties can be accessed through `this.getAttribute()` from within the component.
After all, these components are just native! 🏡

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

### Reactive CSS Within `<style>`

CSS is much more fun when it's scoped.
Here it come with the web-components.

Here again, no trick, just the full power of web-components and scoping styles.
Well, you should know that the css is reactive too! 😲

Writing CSS is as easy as

```html
<script>
  const state = { fontScale: 1 }
</script>

<template>
  <h1>Bonjour!</h1>
</template>

<style>
  :host {
    font-size: ${state.fontScale}rem;
  }
  h1 {
    padding: 1rem;
    text-align: center;
  }
</style>
```

#### Host

[`:host` is a native selector](<https://developer.mozilla.org/en-US/docs/Web/CSS/:host()>)
for web-components.
It allows to select the current component itself.

#### Variables

You can use variables in your CSS just like in your templates.

Example:

```html
<script>
  const state = { color: '#357' }
</script>

<template>
  <h1>Bonjour<h1>
</template>

<style>
  h1 {
    color: ${ state.color };
  }
</style>
```

will apply the `#357` color onto `h1`.
