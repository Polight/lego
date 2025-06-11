---
title: Compiling
weight: 5
---

Compiling LEGO component is built-in with no extra installation; pretty straightforward.

```sh
LEGO_URL=</url/to/lego.min.js> npm exec lego <source_dir> <target_dir>
```

Would compile the LEGO components in `source_dir` folder (recursively) into JS file in `target_dir` using **lego.min.js** from the declared URL.

When developing you probably want to watch for changes with the `-w` option: `npm exec lego -w <source_dir> <target_dir>`

`source_dir` *(default: **bricks**)*: a directory (relative or absolute). If it's a directory, it will recursively read all the **.html** files and compile them into the `target_dir`.

`target_dir` *(default: **dist**)*: the path (relative or absolute) to a folder where all _.js_ files are compiled.
