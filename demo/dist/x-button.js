
// Lego version undefined
import { h, Component } from '../../dist/lego.min.js'

class Lego extends Component {
  get vdom() {
    return ({ state }) => [
  h("button", {"onclick": this.toggleText.bind(this)}, [
    ((state.showText) ? h("span", {}, `text displayed! 🎪`) : ''),
    ((!state.showText) ? h("span", {}, `text hidden 🕵️‍♀️`) : '')
])]
  }
  get vstyle() {
    return ({ state }) => h('style', {}, `
    button {
    cursor: pointer;
  }
  `)}
}

export default class extends _ {
    init() {
      this.state = { showText: false }
    }

    toggleText() {
      this.render({ showText: !this.state.showText })
    }
  }
