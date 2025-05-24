---
title: Advanced example
weight: 7
---

Let's write a web-component that:

- displays the full name of a user
- shows a welcome text and the user
- list all user's favorite fruit
- toggles user registration

**bricks/user-profile.html**

```html
<script>
  const state = {
    registered: false,
    firstName: 'John',
    lastName: 'Doe',
    fruits: [
      { name: 'Apple', icon: '🍎' },
      { name: 'Pineapple', icon: '🍍' }
    ]
  }

  const methods = {
    register() {
      this.render({ registered: confirm('You are about to register…') })
    }
  }
</script>

<template>
  <h1>${ state.firstName } ${ state.lastName }'s profile</h1>
  <p>Welcome ${ state.firstName }!</p>
  <section :if="state.fruits.length">
    <h3>The best ${ state.fruits.length } fruit you like:</h3>
    <ul>
      <li :for="fruit in state.fruits">${ fruit.name } ${ fruit.icon }</li>
    </ul>
  </section>

  <p :if="state.registered">You are registered!</p>

  <button @click="register">Register now</button>
</template>
```

Compile this component: `npx lego bricks`

### Then include it in your page:

_index.html_

```html
<user-profile></user-profile>
<script src="./dist/index.js" type="module"></script>
```

Run your web server and see your little app!

> When developing you may want to automatically watch files changes.
> In that case pass the `-w` flag: `npx lego -w bricks`

> Tip: you probably want to store this task with a shortcut like `npm run watch`.
> To do so just add `"watch": "lego -w bricks"` in you _package.json_ scripts.
