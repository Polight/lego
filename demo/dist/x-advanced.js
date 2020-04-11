
import { h } from 'https://unpkg.com/@polight/brick/lib'

import { Component } from 'https://unpkg.com/@polight/brick/lib'

  class XAdvanced extends Component {
    init() {
      this.state = {
        name = "advanced module"
      }
    }
  }

class SubXAdvanced extends XAdvanced {
  get vdom() {
    return ({ state }) => [
`Hey button`]
  }
  
}

export default customElements.define('x-advanced', SubXAdvanced)
    