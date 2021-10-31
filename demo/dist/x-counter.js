
// Lego version undefined
import { h, Component } from '../../dist/lego.min.js'

class Lego extends Component {
  get vdom() {
    return ({ state }) => [
  h("button", {"class": `primary`, "onclick": this.decrement.bind(this)}, `-`),
  h("span", {}, `${ state.counter * 10 }%`),
  h("button", {"onclick": this.increment.bind(this)}, `+`),
  h("button", {"onclick": this.reset.bind(this), "class": `reset`}, `♻`),
  h("progress", {"value": `50`, "max": `100`, "title": `Represents the value of ${state.counter} in percentage`}, "")]
  }
  get vstyle() {
    return ({ state }) => h('style', {}, `
    @import url('index.css');
  `)}
}

export default class extends _ {
    init() {
      this.state = {
        counter: 0
      }
    }

    increment() { this.render({ counter: this.state.counter + 1 }) }
    decrement() { this.render({ counter: this.state.counter - 1 }) }
    reset() { this.render({ counter: 0 }) }
  }
