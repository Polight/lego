---
title: Starting
icon: coffee
weight: 1
---

Hello! This is a markup example of your new documentation. I made this project to easily document my own projects, but I thought it would be great to share it, so you will save the time it took me to learn everything that finally, resulted in this documentation. I hope you do a lot of work!

## Features

- Optimized compatible with [Core Web Vitals](https://pagespeed.web.dev/report?url=https://hudocs.com)
- Security level A+ in [Mozilla Observatory](https://observatory.mozilla.org/analyze/hudocs.com)
- Support for multiple languages
- No dependencies
- Automated advanced search engine
- Light and dark theme
- Shortcodes for alerts, notes, tables, etc.
- Advanced code blocks
- Fully customizable


## Requirements

- Hugo 0.138.0 or higher (extended version)
- Git - [Install Git](https://git-scm.com/downloads)
- Desire to document

## Install

Go to the root of your Hugo project and run the following command:

```bash
git submodule add https://github.com/zkreations/docs themes/docs
```

## Recommended structure

I made this documentation thinking that you could generate multiple versions of the same project, that's why the recommended structure should contain a version number first, for example:

```text
content
└── 1.0
    └── index.md
```

If you want to start quickly, use the example I left in the **demo** folder, which is the same one you are reading right now. Run the following command:

```text
cp -R themes/docs/demo/content .
```

## Configure

The theme contains some useful options that can help you customize your documents even more. Copy the **demo/config.toml** file and replace the information with your data. Finally, start the local server by running:

```text
hugo serve
```

## Contributions

All contributions are welcome, I will take time to review any request as long as you keep the following in mind when making them:

- Do not add more options that may increase complexity.
- Avoid JavasScript as much as possible if you can do it with CSS.
- Do not intervene with the custom options of the users.

## Final note

If you like this project, consider rating me with a [star on github](https://github.com/zkreations/docs/stargazers), it costs nothing and means a lot to me. You can also [buy me a coffee](https://ko-fi.com/zkreations) so I can keep creating things like this.

Start documenting!

