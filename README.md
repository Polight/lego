![Lego web-components JS lib](./assets/lego.svg)

[![CircleCI ](https://circleci.com/gh/vinyll/lego/tree/master.svg?style=shield)](https://circleci.com/gh/vinyll/lego/tree/master)

# LEGO: Modern Web-Components


LEGO (_Lightweight Embedded Gluten-free Objects_) is a thin layer to build web-component bricks that are easy to digest for your browser.

Lego is inspired from great libraries such as [Riot](https://riot.js.org/), [VueJS](https://vuejs.org) or [Polymer](https://www.polymer-project.org/). It's just much lighter with no complexity, easier to read code, maintain and interact with the source.


## Create a _naive_ element

```html
<my-component>Content of my component</my-component>

<script type=module>
  import component from './dist/lego.js'

  component('my-component', {
    template: '<h1>${this.user.name}</h1><p>Age: ${this.user.age}</p>',
    style: '<style>h1 {color: ${this.color}}</style>'
    context: { user: { name: 'John Doe', age: 42 }, color: 'green' },
  })
</script>
```

> Open the index.html with a recent web browser to view this example.

In 4 lines you created a full powered web-component!


## Create a real world component

For more complex applications you will need to separate concerns and write advanced components.
We could write the previous example this way:

_index.html_

```html
<my-component name="John Doe" age="42" color="green"></my-component>

<script src="./my-component.js" type="module"></script>
```

_components/my-component.html_

```html
<template>
 <h1>${ this.name }</h1>
 <p>Age: ${ this.age }</p>
</template>

<style>
 h1 {
   color: ${ this.color }
 }
 </style>
```

In this case you will need to compile _components/my-component.html_ into _./my-component.js_:

```sh
npm compile ./components/my-component.html ./my-component.js
```


## Just a thin layer

It is still fully compatible with native _custom elements_. No magic behind the scene,
no complexity, just a couple of useful methods to write native web components easier.

Because Lego is actual native web-components, all its native possibilities (like [slots](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots#Adding_flexibility_with_slots)) are on board.

You may add the [WebComponentsJS polyfill](https://github.com/webcomponents/webcomponentsjs) to increase browser compatibility.


## Available properties

**template**: The HTML content of the component. [Web-components slots](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots#Adding_flexibility_with_slots) and other native web-components properties are fully available. Variables are interpreted from the `context` property. Ex: `${this.myprop}` will read from `context.myprop`.
See the _Template properties_ for further details.

**style**: The CSS style you want to incorporate. Variables are interpreted from context just like in the _template_ property.

**context**: object that will be made available to the _template_ and the _style_ properties.


## Available methods

**render(context)**: Refresh the component, overriding the context.


## Template properties

The template can replace [native template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals),
so any variable between `${  }` will be interpreted. `this` representing the _context_.
ex: with a _context_ such as `{ name: 'John' }`, a _template_ `Hey ${ this.name }!` will output
`Hey John!`.

The template property also offers conditional templating through the `if` attribute.
`<p if="${ this.age > 100 }">Over a century old</p>` will outputed only if the `age` property
in the _context_ is above _100_.


## Running tests [![CircleCI](https://circleci.com/gh/vinyll/lego/tree/master.svg?style=svg)](https://circleci.com/gh/vinyll/lego/tree/master)

Just install node dev dependencies (`npm install`) and run the tests (`npm test`).
