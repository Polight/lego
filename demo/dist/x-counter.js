
// Lego version 1.3.0
import { h, Component } from '/lego.min.js'

class XCounter extends Component {
  get vdom() {
    return ({ state }) => [
  h("button", {"class": `primary`, "onclick": this.decrement.bind(this)}, `-`),
  h("span", {}, `${ state.counter * 10 }%`),
  h("button", {"onclick": this.increment.bind(this)}, `+`),
  h("button", {"onclick": this.reset.bind(this), "class": `reset`}, `♻`),
  h("progress", {"value": state.counter * 10, "max": `100`, "title": `Represents the value of ${state.counter} in percentage`}, "")]
  }
  get vstyle() {
    return ({ state }) => h('style', {}, `
    @import url('index.css');
  `)}
  init() {
    this.state = { counter: 0 }
  }
  increment() { this.render({ counter: this.state.counter + 1 }) }
  decrement() { this.render({ counter: this.state.counter - 1 }) }
  reset() { this.render({ counter: 0 }) }
}

export default customElements.define('x-counter', XCounter)
