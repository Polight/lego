
// Lego version undefined
import { h, Component } from '../../dist/lego.min.js'

class Lego extends Component {
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
