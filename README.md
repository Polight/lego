
<p style="text-align:center">
 <img src="./assets/lego.png" title="Fast Webcomponents" alt="Lego is a fast web-components library" style="width:100%;max-width:600px">
</p>


# LEGO: Modern Web-Components

LEGO (_Lightweight Embedded Gluten-free Objects_) is a NodeJS tool to build 🚀 fast, ♻️ reactive, 🏡 **native web-component** [bricks](https://github.com/polight/brick) that are easy to digest 🌱 for your browser.

Lego is inspired from the [native Web-Component spec](https://developer.mozilla.org/en-US/docs/Web/Web_Components) and some other libraries such as [Pureact](https://github.com/irony/pureact/) or [Riot](https://riot.js.org/).

It's just **much lighter** with simplicity, source that are easy to read, hack and maintain.

Lego uses [Brick](https://github.com/polight/brick) to generate web-components. In Brick you would write JS and virtual-dom by hand. With lego you write HTML and CSS components in HTML files.

It will transform your HTML in [Brick](https://github.com/polight/brick) classes run directly in your browser.


[View the demo page](demo.html)


## Quick start

## Hello World

__bricks/hello-world.html__

```html
<template>
  <p>Hello ${state.name}</p>
</template>

<script>
  init() { this.state = { name: "World!" } }
</script>
```

Compile with `npx lego bricks`

And use it in your app:

__index.html__

```html
<script src="./dist/index.js" type="module"></script>
<hello-world />
```

#### Explanation

`npx lego bricks` created _dist/hello-world.js_. Checkout that basic JS file, that's a simple [Brick](https://github.com/polight/brick) instance that looks like:

```js
class HelloWorld extends Component {
  init() { this.state = { name: "World!" } }
  get vdom() {
    return ({ state }) => h('p', {}, `Hello ${state.name}`)
  }
}
customElement.define('hello-world', HelloWorkd)
```

You don't need to understand this but if you want to know more, view [how Brick works](https://github.com/Polight/brick#getting-started).

### Reactive Advanced Web-Component Example

__bricks/user-profile.html__

```html
<template>
  <h1>${state.firstName} ${state.lastName}'s profile</h1>
  <p>Welcome ${state.firstName}!</p>
  <h3 :if="state.favorites.length">You favorite fruits:</h3>
  <p :for="fruit in state.favorites">${fruit.name} ${fruit.icon}</p>
  <button :if="!state.registered" @click="register">Register now</button>
</template>

<script>
  init() {
    this.state = {
      registered: false,
      firstName: 'John',
      lastName: 'Doe',
      favorites: [{ name: 'Apple', icon: '🍎' }, { name: 'Pineapple', icon: '🍍' }]
    }
  }

  register() {
    this.state.registered = confirm('Do you want to register?')
  }
</script>
```

Compile this component: `npx lego ./bricks ./dist`

### Then include it in your page:

_index.html_

```html
<user-profile></user-profile>
<script src="./dist/index.js" type="module"></script>
```

Run your page directly in your browser!


> When developing you may want to automatically watch files changes.
> In that case pass the `-w` flag: `npx lego -w ./bricks ./dist`

> Tip: you probably want to store this task with a shortcut like `npm run watch`.
> To do so just add `"watch": "lego -w ./bricks ./dist"` in you _package.json_ scripts.


## Understanding Webcomponents

A component can optionally have 3 parts: some HTML in a `<template>` tag, some JavaScript
in a `<script>` tag and some CSS in a `<style>` tag.

### Template tag

A template is written within a `<template>` tag.

It's just HTML with some empowerments for reactiveness.

These superpowers can be recognized with their `:` or `@` prefixes.

The possible directives are:

- `:if` to display a tag based on a condition
- `:for` to repeat a tag
- `:` to evaluate a string
- `@` to bind an event

> Note that `:if` and `:for` attributes, when used in the same tag should be used
> with an order in mind: `<a :if="user" :for="user in state.users">` won't work!
>
> `<a :for="user in users" :if="user">` will work as expected.
>
> You may want to use `:if` before `:for` when you want the loop to happen _if_
> a condition is met before.
>
> `<a :if="state.isAdmin" :for="user in state.users">` won't loop at all for non admin.

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
  getUrl(id) { return `/user/${id}` }
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
  sayHi(event) {
    alert(`${event.target.getAttribute('name')} says hi! 👋🏼`)
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

Whenever `registered`, `user`, or some `user` property will change, the component will be automagically updated!

Displaying a _state_ value is as simple as writing `${state.theValue}` in your HTML.

#### Component Attributes

Attributes declared on the components will be all be accessible through the `state`.
If the property is initialized in the `this.state`, the attribute will be reactive:

```html
<x-user status="thinking 🤔"><x-user>
```

`status` will therefore be reactive and the _thinking 🤔_ attribute value will overwrite the _Happy 😄_ default status.

A property that is not declared in the `state` won't be reactive.
It can be accessed through `this.getAttribute()`.
sAfter all, don't forget that these components are native! 🏡


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
  init() {
    this.state = { fontScale: 1 }
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
  this.state.color = '#357';
</script>
<style>
  h1 {
    color: ${ this.color };
  }
</style>
```

will apply the `#357` color onto `h1`.


## Compiling

```sh
npx lego <source_path> <target_file_path>
```

Would compile the _source_path_ file or folder (recursively) into _target_file_path_ js file.

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
