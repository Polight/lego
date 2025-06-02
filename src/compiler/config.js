import packageJson from '../../package.json' with { type: "json" };
const version = packageJson.version

export default {
  // Path to the Lego Component class.
  // When relative, it should be referenced from within the dist folder
  // where the compiled bricks reside
  importPath: `https://cdn.jsdelivr.net/npm/@polight/lego@${version}/dist/lego.min.js`,

  // When building a Component, set the default name of the class to extend.
  // This is the name that you will use to extend your components with
  // `export default class extends Xxx {`
  baseClassName: 'Lego',

  // Folder where HTML bricks are stored
  sourceDir: 'bricks',

  // Folder where to store built js bricks
  targetDir: 'dist',

  // Boolean value to watch for file changes. `null` for using command line
  watch: false,

  // Inject this lines first in <script> tag when creating a component.
  // Ideal for importing modules in all components.
  preScript: '',

  // Inject this lines first in <style> tag when creating a component.
  // Ideal for importing stylesheets in all components.
  preStyle: '',

  // Boolean value to enable or disable use of ShadowDOM instead of LightDOM for
  // Lego components in the whole project. ShadowDOM ensures DOM and styles
  // isolation away from parents and other components.
  useShadowDOM: true,

  // Export the version for easy access
  version
}
