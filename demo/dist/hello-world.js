
import { h, Component } from 'https://unpkg.com/@polight/brick/dist/index.js'

class HelloWorld extends Component {
  get vdom() {
    return ({ state }) => [
  h("p", {}, `Hello ${state.name}`)]
  }
  
  init() { this.state = { name: 'Gaia?' } }
}

export default customElements.define('hello-world', HelloWorld)
