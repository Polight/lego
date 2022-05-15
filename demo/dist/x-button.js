
// Lego version 1.6.7
import { h, Component } from 'https://unpkg.com/@polight/lego/dist/lego.min.js'

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



export default class extends Lego {
    init() {
      this.state = { showText: false }
    }

    toggleText() {
      this.render({ showText: !this.state.showText })
    }
  }
