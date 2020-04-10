
import { h, Component } from 'https://unpkg.com/@polight/brick/lib'

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
  increment() { this.state.counter++ }
  decrement() { this.state.counter-- }
  reset() { this.state.counter = 0 }
}

export default customElements.define('x-counter', XCounter)
