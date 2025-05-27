---
title: Compiling
weight: 5
---

Compiling Lego component is built-in with no extra installation; pretty straighforward.

```sh
LEGO_URL=</url/to/lego.min.js> npx lego <source_path> <target_file_path>
```

Would compile the _source_path_ file or folder (recursively) into _target_file_path_ js file using lego.min.js from the declared url.

As mentioned before, when developing you probably want to watch for changes with the `-w`
option: `npx lego -w <source_path> <target_file_path>`

**source_path**: either a file or a directory (relative or absolute). If it's a directory, it will recursively read all the _.html_ files and compile them into the _target_file_.

**target_file_path**: (default: _components.js_) the path (relative or absolute) to a _.js_ file.
That file will be created and contain all the components.
