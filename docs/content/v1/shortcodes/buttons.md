---
title: Buttons
description: Buttons with links. If the button contains an external link, it will open in a
  new tab.
---

Buttons with links. If the button contains an external link, it will open in a new tab. Also the rel attribute is added with the values noreferrer noopener and nofollow.


## Syntax

```go
{{</* button name="Repository" type="primary" icon="github" */>}}
```

### Options

- **href**: Url or destination route. (required)
- **name**: Button name. (required)
- **type**: Type that defines the colors. Valid values: `primary` (optional)
- **icon**: The name of a zkreations icon. (optional)

## Example

```go
{{</* button href="/1.0/starting" name="Home" type="primary" icon="book-open" */>}}
{{</* button href="https://github.com" name="Repository" icon="github" */>}}
```

{{< button href="/1.0/starting" name="Home" type="primary" icon="book-open" >}}
{{< button href="https://github.com" name="Repository" icon="github" >}}