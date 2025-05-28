---
title: Loop :for
weight: 3
---

## `:for` directive

Repeat a tag based on a property.

The syntax is as follow: `:for="item in state.items"`.
The _item_ value will be available trough `${item}` within the loop.

If you need an incremental index `i`, use `:for="item, i in state.items"`.

Example: `<li :for="attendee in state.attendees">${attendee}</li>` with a state as
`this.state = { attendees: ['John', 'Mary'] }` will display `<li>John</li><li>Mary</li>`
