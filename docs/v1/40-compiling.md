---
layout: page
title: Compile Web-Components to JavaScript
label: Compiling
permalink: /compile-components/
nav_order: 40
---

Compiling Lego component is built-in with no extra installation; pretty straighforward.

```sh
npx lego [-w] [source_path] [target_path]
```

- **-w**: watching for changes in components and recreating
- **source_path**: (default: ./bricks) either a file or a directory (relative or absolute) where you write your HTML components. If it's a directory, it will recursively read all the _.html_ files and compile them into the _target_file_.
- **target_path**: (default: ./dist) the path (relative or absolute) where your JS components will be generated. That folder will be created and contain all the components.


Therefore `npx lego` would compile the _source_path_ files or folder (recursively) into _target_file_path_ js file using lego.min.js (from ./bricks to ./dist by default).

As mentioned before, when developing you probably want to watch for changes with the `-w`
option: `npx lego -w <source_path> <target_file_path>`

