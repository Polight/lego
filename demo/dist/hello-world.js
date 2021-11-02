
// Lego version undefined
import { h, Component } from '../../dist/lego.min.js'

class Lego extends Component {
  get vdom() {
    return ({ state }) => [
  h("p", {}, `Hello ${state.name}`)]
  }
  get vstyle() {
    return ({ state }) => h('style', {}, `
    @import url('https://google.com.style.css');
    
  `)}
}

import {store} from 'store'

export default class extends Lego {
    init() {
      this.state = { name: 'world' }
    }
  }
