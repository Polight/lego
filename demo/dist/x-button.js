
// Lego version 1.4.1
import { h, Component } from '../../dist/lego.min.js'

class _ extends Component {
  get vdom() {
    return ({ state }) => [
  h("button", {"onclick": this.toggleText.bind(this)}, [
    ((state.showText) ? h("span", {}, `text displayed! 🎪`) : ''),
    ((!state.showText) ? h("span", {}, `text hidden 🕵️‍♀️`) : '')
])]
  }
  
}

export default class extends _ {
    init() {
      this.state = { showText: false }
    }

    toggleText() {
      this.render({ showText: !this.state.showText })
    }
  }
