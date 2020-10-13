
import { h, Component } from '/dist/lego.min.js'

class XButton extends Component {
  get vdom() {
    return ({ state }) => [
  h("button", {"onclick": this.toggleText.bind(this)}, [
    ((state.showText) ? h("span", {}, `text displayed! 🎪`) : ''),
    ((!state.showText) ? h("span", {}, `text hidden 🕵️‍♀️`) : '')
])]
  }
  
  init () { this.state = { showText: false } }

  toggleText() {
    this.render({ showText: !this.state.showText })
  }
}

export default customElements.define('x-button', XButton)
