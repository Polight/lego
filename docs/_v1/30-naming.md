---
layout: page
title: Naming convention for Web-Components
label: Naming Conventions
permalink: /:collection/naming-components/
nav_order: 30
---

The name of the file will be the name of the component.

Example: _components/x-button.html_ will create `<x-button>` component.

However in some cases you may want to give your component a different name than the file.
To do so, you should give a `name` attribute in your `<template>` tag.

Example:

_components/x-button.html_:

```html
<template name="my-super-button"></template>
```

Will make `<my-super-button>` component available.

> Note that because it builds native web-components, the naming convention must respect
[the ones from the standards](http://w3c.github.io/webcomponents/spec/custom/#valid-custom-element-name) (lowercase, with a dash in the name, starting with a letter, …)
