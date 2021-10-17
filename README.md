
<p style="text-align:center">
 <img src="./assets/lego.png" title="Fast Webcomponents" alt="Lego is a fast web-components library" style="width:100%;max-width:600px">
</p>


# LEGO: Modern Web-Components

LEGO (_Lightweight Embedded Gluten-free Objects_) is a NodeJS tool to build 🚀 fast, ♻️ reactive, 🏡 **native web-components** that are easy to digest 🌱 for your browser.

Lego is:

- 👙 Minimalist: ~74~ 61 lines of readable code in its core (non-optimised, uncompressed, no cheating).
- 🌱 Low dependency: its single third-party is the minimalist [Petit-Dom](https://github.com/yelouafi/petit-dom) which itself has no dependency
- ♻️ Reactive: updating the state recalculate the Virtual Dom when needed
- 🚀 fast: using virtual dom through a thin layer makes it close to bare-metal
- 💧 Simple: that's [Vanilla](http://vanilla-js.com/), there isn't much to know, it's a raw class to extend; no magic ✨
- 🏡 Native: webcomponents are actual native webcomponents, you benefit from all the today's and tomorrow's possibilites (slot, encapsulation, …).

Lego is not (and will never be):
- 🏯 A full bloated frontend framework with routing. [Others do it well](https://github.com/visionmedia/page.js).
- 🏗 A website builder with SSR or similar complexities.
- 🔐 An HTML replacement that locks you into a specific technology.

View the [demo](https://polight.github.io/brick/demo/) and [their source](https://github.com/Polight/lego/tree/master/demo) 🧪.


Lego is inspired from the [native Web-Component spec](https://developer.mozilla.org/en-US/docs/Web/Web_Components) and [Riot](https://riot.js.org/).

It's just **much lighter** with simplicity, source that are easy to read, to hack and to maintain.
The [core lib](https://github.com/Polight/lego/blob/master/src/lib/Component.js) is only 61 <abbr title="Lines Of Code">LOC</abbr>!
Lego is as light as 3Kb for the full bundle!

Demo: [view in action](https://lego.js.org/demo/)


## Installation

Lego is based on [npm](npmjs.com) and the latest [node](https://nodejs.org/).

You need to install the compiler with `npm i @polight/lego`


## Quick start

### Hello World

Create a file called __bricks/hello-world.html__:

```html
<template>
  <p>Hello ${state.name}</p>
</template>

<script>
  export default class extends _ {
    init() { this.state = { name: "World!" } }
  }
</script>
```

Compile with `npx lego bricks`

And use it in your __index.html__

```html
<script src="./dist/index.js" type="module"></script>
<hello-world />
```

Run a local web server (ie: `python3 -m http.server`) and display your index.html (ie: http://localhost:8000).


### More Advanced Web-Component Example

__bricks/user-profile.html__

```html
<template>
  <div :if="state.registered">
    <h1>${state.firstName} ${state.lastName}'s profile</h1>
    <p>Welcome ${state.firstName}!</p>
    <section :if="state.fruits.length">
      <h3>You favorite fruits:</h3>
      <ul>
        <li :for="fruit in state.fruits">${fruit.name} ${fruit.icon}</li>
      </ul>
    </section>
    <button :if="!state.registered" @click="register">Register now</button>
  </div>
</template>

<script>
  export default class extends _ {
    init() {
      this.state = {
        registered: false,
        firstName: 'John',
        lastName: 'Doe',
        fruits: [{ name: 'Apple', icon: '🍎' }, { name: 'Pineapple', icon: '🍍' }]
      }
    }

    register() {
      this.render({ registered: confirm('Do you want to register?') })
    }
  }
</script>
```

Compile this component: `npx lego bricks`

### Then include it in your page:

_index.html_

```html
<user-profile></user-profile>
<script src="./dist/index.js" type="module"></script>
```

Run your webserver and see your little app!


> When developing you may want to automatically watch files changes.
> In that case pass the `-w` flag: `npx lego -w bricks`

> Tip: you probably want to store this task with a shortcut like `npm run watch`.
> To do so just add `"watch": "lego -w bricks"` in you _package.json_ scripts.


## Understanding Webcomponents

A component can optionally have 3 parts: some HTML in a `<template>` tag, some JavaScript
in a `<script>` tag and some CSS in a `<style>` tag.

### Template tag

An HTML template is written within a `<template>` tag.

These superpowers can be recognized with their `:` or `@` prefixes.

The possible directives are:

- `:if` to display a tag based on a condition
- `:for` to repeat a tag
- `:` to evaluate a string
- `@` to bind an event

> Note that `:if` and `:for` attributes, when used in the same tag should be used
> with an order in mind: `<a :if="user" :for="user in state.users">` won't work,
> but `<a :if="state.users.length" :for="user in state.users">` will first evaluate if the `users` array has items,
> or `<a :for="user in users" :if="user">` will check that each individual user has a value.
>
> `<a :if="state.isAdmin" :for="user in state.users">` won't loop at all if `isAdmin` is false.

#### `:if` Directive

Conditionally display a tag and its descendants.

Example: `<p :if="state.count < 5">Less than 5</p>` will be displayed if the condition is met.

#### `:for` Directive

Repeat a tag based on a property.

The syntax is as follow: `:for="item in state.items"`.
The _item_ value will be available trough `${item}` within the loop.

If you need an incremental index `i`, use `:for="item, i in state.items"`.

Example: `<li :for="attendee in state.attendees">${attendee}</li>` with a state as
`this.state = { attendees: ['John', 'Mary'] }` will display `<li>John</li><li>Mary</li>`

#### `:` Custom Directive

A custom directive will interpret in JS whatever you pass as value.

```html
<template>
  <a :href="this.getUrl('144')">Visit Profile</a>
</template>
<script>
  export default class extends _ {
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

#### `@` Directive for binding Events

```html
<template>
  <button @click="sayHi" name="the button">click</button>

<script>
  export default class extends _ {
    sayHi(event) {
      alert(`${event.target.getAttribute('name')} says hi! 👋🏼`)
    }
  }
</script>
```

#### Reactive Properties

The `state` is where the reactiveness takes place.

declare a `state` object in the `init()` function with default values:

```js
init() {
  this.state = {
    user: { firstname: 'John', lastname: 'Doe' },
    status: "Happy 😄"
  }
}
```

Displaying a _state_ value is as simple as writing `${state.theValue}` in your HTML.

When you need your component to react, call the `this.render()` method
with your updated state:

```
itemSelected(event) {
  this.render({ selected: "apple", isAdmin: true })
}
```

This will refresh your component where needed.

When `state` is just mutated, the `changed(changedProps)` is called.
This `changed()` method is called before (re-)rendering.


#### Component Attributes

Attributes declared on the components will be all be accessible through the `state`.
If the property is initialized in the `this.state`, the attribute will be reactive:

```html
<x-user status="thinking 🤔"><x-user>
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

__index.html__
```html
<user-profile>
  <span>This user is in Paris</span>
<user-profile>
```

__bricks/user-profile.html__
```html
<template>
  <h1>User profile</h1>
  <p>important information: <slot></slot></p>
</template>
```

Will write `…<p>important information: <span>This user is in Paris</span></p>`

[See more advanced examples](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots#Adding_flexibility_with_slots).


### Reactive CSS Style

CSS is much more fun when it's scoped.
Here it come with the web-components.

Here again, no trick, just the full power of web-components and scoping styles.
Well, you should know that the css is reactive too! 😲

Writing CSS is as easy as

```html
<template>
  <h1>Bonjour!</h1>
</template>

<script>
  export default class extends _ {
    init() {
      this.state = { fontScale: 1 }
    }
  }
</script>

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

[`:host` is a native selector](https://developer.mozilla.org/en-US/docs/Web/CSS/:host())
for web-components.
It allows to select the current component itself.

#### Variables

You can use variables in your CSS just like in your templates.

Example:
```html
<template>
  <h1>Bonjour<h1>
</template>
<script>
  export default class extends _ {
    init() {
      this.state = { color: '#357' }
    }
  }
</script>
<style>
  h1 {
    color: ${ state.color };
  }
</style>
```

will apply the `#357` color onto `h1`.


## Script tag

The script tag is has a special behavior.
You will create a class extending the component, that's how you build your
full component with advanced script.

To do so extend the `_`, that's a naming convention:

```js
export default class extends _ {
  …
}
```


## Compiling

```sh
LEGO_URL=</url/to/lego.min.js> npx lego <source_path> <target_file_path>
```

Would compile the _source_path_ file or folder (recursively) into _target_file_path_ js file using lego.min.js from the declared url.

As mentioned before, when developing you probably want to watch for changes with the `-w`
option: `npx lego -w <source_path> <target_file_path>`


**source_path**: either a file or a directory (relative or absolute). If it's a directory, it will recursively read all the _.html_ files and compile them into the _target_file_.

**target_file_path**: (default: _components.js_) the path (relative or absolute) to a _.js_ file.
That file will be created and contain all the components.


## Naming a component

The name of the file will be the name of the component.

Example: _components/x-button.html_ will create `<x-button>` component.

However in some cases you may want to give your component a different name than the file.
To do so, you may give your template a name with the `name` attribute.

Example:

_components/x-button.html_:

```html
<template name="my-super-button"></template>
```

Will create a `<my-super-button>` component.

> Note that because it builds native web-components, the naming convention must respect
[the ones from the standards](http://w3c.github.io/webcomponents/spec/custom/#valid-custom-element-name) (lowercase, with a dash in the name, starting with a letter, …)


## Testing

## Running tests [![CircleCI](https://circleci.com/gh/Polight/lego.svg?style=svg)](https://circleci.com/gh/Polight/lego)

Just install node dev dependencies (`npm install`) and run the tests (`npm test`).


## Under the hood


### Native web-components

Because Lego is actual native web-components, all its native possibilities (like [slots](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots#Adding_flexibility_with_slots)),
[:host](https://developer.mozilla.org/en-US/docs/Web/CSS/:host)
and whatever exists or will exist are on board.


### Browser compatibility

Lego is based on native _customElements_.
[Support for customElement is spreading](https://caniuse.com/#feat=custom-elementsv1) and
shall increase in time.

When building a web-app you may have control of the browsers.
If you're building a more general website you may need to increase the overall browser
compatibility and install the [custom-element polyfill](https://github.com/webcomponents/custom-elements).


### Dependencies

It is still fully compatible with native _custom elements_. No magic behind the scene,
no complexity, just a couple of useful methods to write native web-components easier.

Using a compiled component has no dependency, nothing extra injected in the browser.
Compiling depends on [jsdom](https://www.npmjs.com/package/jsdom).

<div style="margin: 2rem auto; height: 2rem; text-align: center;">
  <a href="https://github.com/polight/lego">
    <img alt="Github logo" src="http://vectorlogofree.com/wp-content/uploads/2014/04/25657-github-sign-icon-vector-icon-vector-eps.png">
  </a>
</div>
