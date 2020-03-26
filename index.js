import { h, Component } from "./lib/Component.js";
import { literal } from "./lib/parsers.js"

class XApp extends Component {
  init() {
    this.state = {
      letters: [
        { unit: 'a' },
        { unit: 'b' },
      ],
      choice: 1,
    }
    setInterval(() => {
      this.state.choice = Number(!Boolean(this.state.choice))
      this.render()
    }, 500)
  }

  get vdom() {
    return ({ state }) => (
      h('x-letter', { 'choice': state.choice, letter: state.letters[state.choice] })
    )
  }
}

class XLetter extends Component {
  get vdom() {
    return ({ state }) => ([
      h('p', {}, `Hey ${state.choice} ${state.letter.unit}`)
    ])
  }
}


export default [
  customElements.define('x-letter', XLetter),
  customElements.define('x-app', XApp),
]
