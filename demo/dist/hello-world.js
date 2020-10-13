
import { h, Component } from '/dist/lego.min.js'

class HelloWorld extends Component {
  get vdom() {
    return ({ state }) => [
  h("p", {}, `Hello ${state.name}`)]
  }
  
  init() { this.state = { name: 'Gaia?' } }
}

export default customElements.define('hello-world', HelloWorld)
