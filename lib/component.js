import HTMLParser from './html-parser.js'
import intraHTML from './intrahtml.js'

class Component extends HTMLElement {
  constructor() {
    super()
    this.state = {}
    this.useVDOM = true
    this.useShadowDOM = true
    this._init()
    this.buildDOM()
  }

  _init() {}

  buildDOM() {
    this.document = this.useShadowDOM ? this.attachShadow({mode: 'open'}) : this
    const root = document.createElement('root')
    this.document.appendChild(root) // dummy node as intraHTML can't work on multiple direct children
    this.root = this.document.firstChild
  }

  connectedCallback() {
    this.connected ? this.connected() : this.render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render({ [name]: window._legoRegistry.get(newValue) || newValue })
  }

  disconnectedCallback() {
    this.disconnected && this.disconnected()
  }

  getAttributes() {
    const attributes = {}
    Array.from(this.attributes).map(attr => attributes[attr.name] = window._legoRegistry.get(attr.value) || attr.value)
    return attributes
  }

  setState(obj) {
    const keys = Object.keys(obj)
    if (!keys.length || !keys.find(k => this.state[k] !== obj[k])) return
    Object.assign(this.state, obj)
  }

  get template() {
    return ''
  }

  get style() {
    return ''
  }

  render(state = {}) {
    Object.assign(this.state, state)
    if(!this.document) return
    const context = {}
    Object.keys(this.state).forEach(name => context[name] = this.state[name])
    const template = HTMLParser.parse(this.template, context)
    const style = HTMLParser.evaluateLiteral(this.style, context)
    this.useVDOM
      ? intraHTML(this.root, HTMLParser.parse(style + template, context))
      : this.root.innerHTML = HTMLParser.parse(style + template, context)
    HTMLParser.registerListeners(this.root, this)
  }
}

export default Component
