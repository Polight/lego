---
title: Advanced Example
weight: 7
---

Let's write a Web Component that:

- displays the full name of a user,
- shows a welcome text and the user,
- list all user's favorite fruit,
- toggles user registration.

**bricks/user-profile.html**

```html
<template>
  <div>
    <h1>${state.firstName} ${state.lastName}'s profile</h1>
    <p>Welcome ${state.firstName}!</p>
    <section :if="state.fruits.length">
      <h3>You favorite fruits:</h3>
      <ul>
        <li :for="fruit in state.fruits">${fruit.name} ${fruit.icon}</li>
      </ul>
    </section>

    <p :if="state.registered">You are registered!</p>

    <button @click="edit">Edit my profile</button>
  </div>
</template>

<script>
  export default class extends Lego {
    init() {
      this.state = {
        registered: false,
        firstName: 'John',
        lastName: 'Doe',
        fruits: [
          { name: 'Apple', icon: '🍎' },
          { name: 'Pineapple', icon: '🍍' }
        ]
      }
    }

    edit() {
      this.render({
        firstName: prompt('First name', this.state.firstName),
        lastName: prompt('Last name', this.state.lastName)
      })
    }
  }
</script>
```

Compile this component: `npm exec lego`.

Then include it in your page:

**index.html**

```html
<user-profile></user-profile>
<script src="./dist/index.js" type="module"></script>
```

Run your webserver and see your little app!
