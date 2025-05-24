---
title: Logo
description: Documentation logo
---

The logo can be composed of text, an icon from the [Meteor Icons](https://meteoricons.com/) package along with text, or an image. Keep in mind that if you use an image, it is recommended to use the appropriate size or utilize the SVG format.

## Parameters

In this case, you have two custom parameters available. If you want an icon alongside the text, define `logo_icon` with the name of the icon you can obtain from [Meteor Icons](https://meteoricons.com/). If you want an image, define `logo_img`. If you don't define either of them, only the text will be displayed.

{{< code >}}
{{< tab "toml" >}}
[params]
  main_icon = "book-open"
  main_logo = "your-logo.svg"
{{< /tab >}}
{{< tab "yaml" >}}
params:
  main_icon: "book-open"
  main_logo: "your-logo.svg"
{{< /tab >}}
{{< tab "json" >}}
"params": {
  "main_icon": "book-open",
  "main_logo": "your-logo.svg"
}
{{< /tab >}}
{{< /code >}}
