
// Lego version 1.3.0
import { h } from '/lego.min.js'

// declare `type="module"` and import `Component` from the Brick package
  import { Component } from 'https://unpkg.com/@polight/brick/dist/index.js'

  // Notice the name matches exactly the one of the component, in camelCase 🐫
  class XAdvancedModule extends Component {
    init() {
      this.state = {
        text: "JavaScript module"
      }
    }
  }

class SubXAdvancedModule extends XAdvancedModule {
  get vdom() {
    return ({ state }) => [
  h("p", {}, `This is a script using ${state.text} capabilities`)]
  }
  
}

export default customElements.define('x-advanced-module', SubXAdvancedModule)
    