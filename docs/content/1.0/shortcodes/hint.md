---
title: Hint
description: Highlight different types of messages with styles based on the context.
---

Highlight different types of messages with styles based on the context.

## Syntax

```go
{{</* hint */>}}
...content
{{</* /hint */>}}
```

### Options

- **Get 0**: Alert style. Valid values:  \`info\`, \`success\`, \`danger\`, \`warning\` (optional)

## Example

```go
{{</* hint */>}}
Message with normal information, without styles
{{</* /hint */>}}
```

{{< hint >}}
Message with normal information, without styles
{{< /hint >}}


```go
{{</* hint "info" */>}}
Message with advice or data-style information
{{</* /hint */>}}
```

{{< hint "info" >}}
Message with advice or data-style information
{{< /hint >}}


```go
{{</* hint "success" */>}}
Message to indicate good actions or accomplishments
{{</* /hint */>}}
```

{{< hint "success" >}}
Message to indicate good actions or accomplishments
{{< /hint >}}


```go
{{</* hint "warning" */>}}
Warning message or attention required
{{</* /hint */>}}
```

{{< hint "warning" >}}
Warning message or attention required
{{< /hint >}}


```go
{{</* hint "danger" */>}}
Error message or actions that require caution
{{</* /hint */>}}
```

{{< hint "danger" >}}
Error message or actions that require caution
{{< /hint >}}
```