---
title: Tables
description: Responsive tables using markdown syntax.
---

By default, tables generated with markdown syntax are not responsive. To partially solve this problem, enclose your tables with this shortcode.

## Syntax

```go
{{</* table */>}}
...table
{{</* /table */>}}
```

### Options

- **Get 0**: Additional CSS classes. (optional)

## Example

```go
{{</* table */>}}
| Syntax | Description |
| --- | ----------- |
| Header | Title |
| Paragraph | Text |
{{</* /table */>}}
```

{{< table >}}
| Syntax | Description |
| --- | ----------- |
| Header | Title |
| Paragraph | Text |
{{< /table >}}
