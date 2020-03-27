import { h, Component } from './lib/index.js'

class XApp extends Component {
  init() {
    this.letters = [
      { unit: 'a', space: 2 },
      { unit: 'b', space: 4 },
    ]
     this.state = {
       choice: 1,
       extra: ''
     }
    setInterval(() => {
      this.state.choice = Number(!Boolean(this.state.choice))
      this.render()
    }, 500)
  }

  over(target) {
    this.state.extra = 'over!'
  }

  get vdom() {
    return ({ state }) => ([
      h('x-letter', { 'choice': state.choice, extra: state.extra, letter: this.letters[state.choice] }),
      [...this.letters.map((letter, i) => h('x-letter', { choice: i, letter: letter }))],
      ((state.choice === 1) ? h('x-letter', { choice: 1, letter: this.letters[1] }) : ''),
      h('footer', {}, 'end!')
    ])
  }
}

class XLetter extends Component {
  init() {
    this.state = {
      letter: {},
      extra: '…',
    }
    this._props = Object.assign({}, this.state)
  }

  click(event) {
    this.state.extra = 'clicked!'
    this.render()
  }

  get vdom() {
    return ({ state }) => ([
      h('p', { 'onclick': this.click.bind(this) }, [
        h('span', {}, `Hey ${this.getAttribute('choice')}`),
        `${state.letter.unit} - ${state.extra}`,
      ]),
      (state.choice === 1 ? h('aside', {}, '1 is good') : ''),
    ])
  }

  get vstyle() {
    return ({ state }) => h('style', {}, `@import url('https://cdn.jsdelivr.net/gh/polight/decor@master/decor.css');`)
  }
}


export default [
  customElements.define('x-letter', XLetter),
  customElements.define('x-app', XApp),
]
