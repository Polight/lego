
// Lego version 1.6.7
import { h, Component } from 'https://unpkg.com/@polight/lego/dist/lego.min.js'

class Lego extends Component {
  get vdom() {
    return ({ state }) => [
  h("p", {}, `Hello ${state.name}`)]
  }
  
}



export default class extends Lego {
    init() {
      this.state = { name: 'world' }
    }
  }
