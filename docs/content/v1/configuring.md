---
title: Configuring
weight: 6
---

[The compiler]({{< relref "compiling" >}}) can take several parameters: `sourceDir`, `targetDir`, `watch`…

These will allow you to fine grain your configuration when compiling.

The full list of parameters is available in the [compiler config](https://github.com/Polight/lego/blob/master/src/compiler/config.js#L1). You should check that file to know the exhaustive list of parameters and what they do.

You can either setup each of these values from a custom config file or directly from the command line arguments.

## Setup a Custom Configuration File

Create a **lego.config.js** file at the root of your project with the following:

```js
export default {
  // Your custom settings here
}
```

This file will override the default [**config.js**](https://github.com/Polight/lego/blob/master/src/compiler/config.js#L1) settings when declared.

> If your **lego.config.js** file is not found, please ensure to have `"type": "module"` in your **package.json** file in order to read `.js` files as modules.

If reading in the console `⚠️ Missing lego.config.js file, building with defaults`, it means the **lego.config.js** was not found in the root folder of the project from where the compiler is called.

It's very fine if you don't need to customize configuration and run with defaults.

## Configuring on Compile Time

[Passing parameters in the CLI]({{< relref "compiling" >}}) will override default parameters and custom configuration.
