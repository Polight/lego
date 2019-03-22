import HTMLParser from './html-parser'
import intraHTML from './intrahtml'

class Component extends HTMLElement {
  constructor(properties) {
    super(properties)
    this.properties = this.getProperties(properties)
    this.useVDOM = this.properties.options.useVDOM
    this.useShadowDOM = this.properties.options.useShadowDOM
    if (this.properties.init) this.properties.init.apply(this)
    this.buildDOM()
  }

  getProperties(arg) {
    let properties = {}
    const defaults = { template: '', style: '', state: {}, init: null }
    // Hack for injecting properties statically (used in `defineComponent`) because we can't
    // inject object in contructor. @TODO: find a cleaner way.
    if(this._metaProperties) properties = this._metaProperties
    // end of hack
    properties = Object.assign(defaults, properties, arg)
    properties.options = Object.assign({ useVDOM: true, useShadowDOM: true }, properties.options)
    properties.state = Object.assign({}, this.getAttributes())
    return properties
  }

  buildDOM() {
    this.document = this.useShadowDOM ? this.attachShadow({mode: 'open'}) : this
    const root = document.createElement('root')
    this.document.appendChild(root) // dummy node as intraHTML can't work on multiple direct children
    this.root = this.document.firstChild
  }

  static get observedAttributes() {
    // TODO: Listen to some attributes and call `render()` on change (with some `this.autoUpdate = true`?)
    return this.watchAttributes
  }

  connectedCallback() {
    this.connected ? this.connected() : this.render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue && newValue.startsWith('${')) return // Hack: avoid unparsed '${ … }'. TODO: find why it's called too early.
    this.setState({ [name]: window._legoRegistry.get(newValue) || newValue })
  }

  disconnectedCallback() {
    this.disconnected && this.disconnected()
  }

  getAttributes() {
    const attributes = {}
    Array.from(this.attributes).map(attr => attributes[attr.name] = window._legoRegistry.get(attr.value) || attr.value)
    return attributes
  }

  setState(obj, autoRender = true) {
    const keys = Object.keys(obj)
    if(!keys.length || !keys.find(k => this.state[k] !== obj[k])) return
    Object.assign(this.properties.state, obj)
    if(this.changed) return this.changed(obj)
    if(autoRender) this.render()
  }

  get state() {
    return this.properties.state
  }

  render(state = {}) {
    Object.assign(this.state, state)
    if(!this.document) return
    const context = {}
    Object.keys(this.state).forEach(name => context[name] = this.state[name])
    const style = HTMLParser.evaluateLiteral(this.properties.style, context)
    let template = HTMLParser.parse(this.properties.template, context)
    this.useVDOM
      ? intraHTML(this.root, HTMLParser.parse(style + template, context))
      : this.root.innerHTML = HTMLParser.parse(style + template, context)
    HTMLParser.registerListeners(this.root, this)
  }
}

const component = (name, props) => {
  class C extends Component {}
  C.prototype._metaProperties = props
  C.watchAttributes = Object.keys(props.state)

  customElements.define(name, C)
  return C
}

export default component
