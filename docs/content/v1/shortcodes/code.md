---
title: Code
description: Create explanatory code blocks, more powerful than normal code blocks.
---

Create explanatory code blocks, more powerful than normal code blocks.

## Syntax

```go
{{</* code */>}}
...content
{{</* /code */>}}
```

### Options

- **id**: Unique identifier. (optional)
- **class**: Additional CSS classes. (optional)
- **hl**: Highlighted lines. (optional)
- **lang**: Language type. By default: `html`. (optional)
- **example**: Interpret example code, only valid for html (mandatory in all cases), css and javascript: `true`, `false`. By default: `false` (optional)

### Tab options

- **Get 0**: Language type. By default: `html`. (optional)
- **Get 1**: File name. (optional)


## Example

```go
{{</* code */>}}
...content
{{</* /code */>}}
```

{{< code >}}
...content
{{< /code >}}


## Code with example

```go
{{</* code example=true */>}}
A paragraph with a <strong>Bold</strong> and an <em>Italic</em>
{{</* /code */>}}
```

{{< code example=true >}}
A paragraph with a <strong>Bold</strong> and an <em>Italic</em>
{{< /code >}}


## Code explained

```go
{{</* code lang="js" */>}}
document.querySelector("body");
<---->
This code is selecting the body of the document.
{{</* /code */>}}
```

{{< code lang="js" >}}
document.querySelector("body");
<---->
This code is selecting the body of the document.
{{< /code >}}


## Code with tabs

```go
{{</* code */>}}
{{</* tab "html" */>}}
...content
{{</* /tab */>}}
{{</* tab "css" */>}}
...content
{{</* /tab */>}}
{{</* tab "js" "main.js" */>}}
...content
{{</* /tab */>}}
{{</* /code */>}}
```

{{< code >}}
{{< tab "html" >}}
...content
{{< /tab >}}
{{< tab "css" >}}
...content
{{< /tab >}}
{{< tab "js" "main.js" >}}
...content
{{< /tab >}}
{{< /code >}}
