---
title: Usage
weight: 3
---

A Web Component can optionally have 3 parts:

* some HTML in a [`<template>` tag]({{< relref "template" >}}),
* some JavaScript in a [`<script>` tag]({{< relref "script" >}}),
* and some CSS in a [`<style>` tag]({{< relref "reactive-style" >}}).

You can make a Web Component for multiple reasons:

* If you just want to re-use a piece of HTML, the `<template>` tag is all you need.
* If you want to polish it's look {{< emoji "💅" >}}, `<style>` is your friend.
  Bonus: it's fully scoped with no leaking out of context.
* When some user interaction or reactivity is demanded, `<script>` is going to be the guy.
