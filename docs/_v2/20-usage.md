---
layout: page
title: Using Native Web-Components
label: Usage
permalink: /:collection/usage-web-components/
nav_order: 20
toc: true
has_children: true
---

1. TOC
{:toc}

## Usage of Lego web-components

A web-component can optionally have 3 parts: some HTML in a `<template>` tag, some JavaScript
in a `<script>` tag and some CSS in a `<style>` tag.

You can make a web-component for muliple reasons.

If you just want to re-use a piece of HTML, the `<template>`
tag is all you need.

If you want to polish it's look  💅, `<style>` is your friend.
Bonus: it's fully scoped with no leaking out of context.

When some user interaction or reactiveness is demanded, `<script>`
is going to be the guy.
