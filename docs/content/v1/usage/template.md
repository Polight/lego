---
title: Template tag
weight: 1
---

### `<template>` tag

An HTML content is written within a `<template>` tag.
It's just basic HTML augmented with a little of superpowers {{< emoji "🦸" >}}.

Let's call these superpowers "directives".

You may easily detect them as they are prefixed with `:` or `@`.

Only 4 directives to know:

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
