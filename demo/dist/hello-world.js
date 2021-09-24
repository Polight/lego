
// Lego version 1.4.1
import { h, Component } from '../../dist/lego.min.js'

class _ extends Component {
  get vdom() {
    return ({ state }) => [
  h("p", {}, `Hello ${state.name}`)]
  }
  
}

export default class extends _ {
    init() {
      this.state = { name: 'world' }
    }
  }
