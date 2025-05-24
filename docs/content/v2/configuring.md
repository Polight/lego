---
title: Configuring
weight: 6
---

The compiler can take several parameters: `sourceDir`, `destDist`, `watch`…

These will allow you to fine grain your configuration when compiling.

The full list of parameters is available in the [compiler config](https://github.com/Polight/lego/blob/master/src/compiler/config.js).
You should see that file to know the exhaustive list of parameters and
what they do.

You can either setup each of these values from a custom config file or directly
from the command line arguments.

## Setup a Custom Configuration File

Create a _lego.config.js_ file at the root of your project with the following:

```
export default {
  // Your custom settings here
}
```

This file will override the default [config.js](https://github.com/Polight/lego/blob/master/src/compiler/config.js#L1) settings when declared.

> If your _/lego.config.js_ file is not found, please ensure to have `"type": "module"` in your package.json file in order to read `.js` files
> as modules.

### ⚠️ Missing lego.config.js file, building with defaults.

If reading in the console, it means the _/lego.config.js_ was not found
in the root folder of the project from where the compiler is called.

It's very fine if you don't need to customize configuration and
run with defaults.

## Configuring on compile time

Passing parameters in the CLI will override default parameters and custom configuration.

The command line accepts the following parameters: `npx lego <sourceDir> <destDir> <options>`.
The only option for now is `-w` (standing for the `watch` config property)
which is especially useful when developing.
