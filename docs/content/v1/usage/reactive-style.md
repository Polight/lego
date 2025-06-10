---
title: Reactive CSS
weight: 10
---

CSS is much more fun when it's scoped. Here it comes with the Web Components, thanks to [Shadow DOM encapsulation](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)

Here again, no trick, just the full power of Web Components and scoping styles.

Writing CSS is as easy as:

```html
<template>
  <h1>Hello!</h1>
</template>

<script>
  export default class extends Lego {
    …
  }
</script>

<style>
  :host {
    font-size: 1rem;
  }
  h1 {
    padding: 1rem;
    text-align: center;
  }
</style>
```

## Host

[`:host` is a native selector](https://developer.mozilla.org/en-US/docs/Web/CSS/:host()) for Web Components.

It allows to select the current component itself.

## Variables

Well... You should know that the CSS is reactive too! {{< emoji "😲" >}}

You can use variables in your CSS just like in your templates.

### Example

```html
<template>
  <h1>Hello!<h1>
</template>

<script>
  export default class extends Lego {
    state = { color: '#357' }
  }
</script>

<style>
  h1 {
    color: ${ state.color };
  }
</style>
```

will apply the `#357` color onto `h1`.

## Using global styles with Shadow DOM

As CSS is scoped when using Shadow DOM in components, your global styles won't apply by default to the children of your component.

To do so, you can use the [configuration option `preStyle`]({{< relref "configuring" >}}) that will add any style you want to the `<style>` of your LEGO components.

### Example

If your **index.html** has a global stylesheet as follows:

```html
<link rel="stylesheet" type="text/css" href="./styles.css" />
```

Set your **lego.config.js** configuration file:

```js
export default {
  preStyle: '@import ./styles.css'
}
```

However, if you don't need CSS encapsulation, you can disable it with the [configuration option `useShadowDOM`]({{< relref "configuring" >}}).
