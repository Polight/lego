---
title: Compiling
weight: 5
---

Compiling LEGO component is built-in with no extra installation; pretty straightforward.

```sh
LEGO_URL=</url/to/lego.min.js> npm exec lego <sourceDir> <targetDir> <options>
```

Would compile the LEGO components in `sourceDir` folder (recursively) into JS file in `targetDir` using **lego.min.js** from the declared URL and provided options.

* `sourceDir` *(default: **bricks**)*: either a LEGO component file or a directory (relative or absolute). If it's a directory, it will recursively read all the **.html** files and compile them into the `targetDir`.

* `targetDir` *(default: **dist**)*: the path (relative or absolute) to a folder where all _.js_ files are compiled.

* `options`: The only option for now is `-w`. It relates to the `watch` config property and will rebuild your components when they change: `npm exec lego -w <sourceDir> <targetDir>`.
