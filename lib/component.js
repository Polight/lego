import HTMLParser from './html-parser.js'
import intraHTML from './intrahtml.js'

class Component extends HTMLElement {
  constructor(properties) {
    super(properties)
    // Hack for injecting properties statically (used in `defineComponent`) because we can't
    // inject object in contructor. @TODO: find a cleaner way.
    if(this._metaProperties) properties = this._metaProperties
    //
    this.useVDOM = true
    this.document = this.attachShadow({mode: 'open'})
    this.document.appendChild(document.createElement('div')) // intraHTML can't work on root
    const defaults = { template: '', style: '', state: {}, init: null }
    this.properties = Object.assign({}, defaults, properties)
    Object.assign(this.properties.state, this.getAttributes())
    this.properties.init && this.properties.init.apply(this)
    this.render()
  }

  static get observedAttributes() {
    // TODO: Listen to some attributes and call `render()` on change (with some `this.autoUpdate = true`?)
    return []
  }

  connectedCallback() {
    this.connected ? this.connected() : this.render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.properties.state[name] = newValue
    this.changed ? this.changed(name, oldValue) : this.render()
  }

  disconnectedCallback() {
    this.disconnected && this.disconnected()
  }

  getAttributes() {
    const attributes = {}
    Array.from(this.attributes).map(attr => attributes[attr.name] = attr.value)
    return attributes
  }

  setState(obj) {
    Object.assign(this.properties.state, obj)
  }

  get state() {
    return this.properties.state
  }

  render(state = {}) {
    this.setState(state)
    const context = { state: this.state }
    const style = HTMLParser.evaluateLiteral(this.properties.style, context)
    let template = HTMLParser.parse(this.properties.template, context)
    this.useVDOM
      ? intraHTML(this.document.firstChild, HTMLParser.parse(style + template, context))
      : this.document.firstChild.innerHTML = HTMLParser.parse(style + template, context)
    HTMLParser.registerListeners(this.document, this)
  }
}


export default function defineComponent(name, props) {
  class C extends Component {}
  C.prototype._metaProperties = props

  customElements.define(name, C)
  return C
}
