---
title: Badge
badge: test
description: Badges to highlight menu items and titles
---

A badge is an element that can be added to page titles. They are also part of the sidebar menu, allowing you to indicate to your readers that a page contains something special.

## Usage

To add a badge, simply add the `badge` attribute with your desired value to the page header. For example:

```markdown
---
title: My Page
badge: test
---

Page content
```

## Parameters

Additionally, you can add the following parameter to your goHugo configuration file under the custom parameters section:

{{< code >}}
{{< tab "toml" >}}
[params]
  badge_url = "https://www.zkreations.com"
{{< /tab >}}
{{< tab "yaml" >}}
params:
  badge_url: "https://www.zkreations.com"
{{< /tab >}}
{{< tab "json" >}}
"params": {
  "badge_url": "https://www.zkreations.com"
}
{{< /tab >}}
{{< /code >}}
