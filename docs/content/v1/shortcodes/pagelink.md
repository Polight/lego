---
title: Page Link
description: Buttons with links. If the button contains an external link, it will open in a new tab.
---

Page links. If the link is external, it will open in a new window. It also includes the `rel` attribute with the values "noreferrer" and "noopener".

## Syntax

```go
{{</* pagelink title="Search Page" name="Google" href="https://google.com" */>}}
```

### Options

- **href**: Absolute or explicit path of the link. If the path belongs to an external link, the `rel` and `target` attributes will be added automatically. (required)
- **title**: Title of the link. Default value: "undefined" (required)
- **icon**: The name of a zkreations icon. (optional)
- **name**: Name of the page where the link comes from. (optional)

## Example

```go
{{</* pagelink title="Documentation Start" href="/1.0/starting" */>}}
{{</* pagelink title="Search Page" name="Google" href="https://google.com" */>}}
```

{{< pagelink title="Documentation Start" href="/1.0/starting" >}}

{{< pagelink title="Search Page" name="Google" href="https://google.com" >}}
