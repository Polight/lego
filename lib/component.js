import HTMLParser from './html-parser.js'


class Component extends HTMLElement {
  constructor(properties) {
    super(properties)
    // Hack for injecting properties statically (used in `defineComponent`) because we can't
    // inject object in contructor. @TODO: find a cleaner way.
    if(this._metaProperties) properties = this._metaProperties
    //
    this.shadow = this.attachShadow({mode: 'open'})
    this.document = this.shadow
    const defaults = { template: '', style: '', state: {}, init: null }
    this.properties = Object.assign({}, defaults, properties)
    Object.assign(this.properties.state, this.getAttributes())
    this.properties.init && this.properties.init.apply(this)
    this.render()
  }

  static get observedAttributes() {
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
    const template = HTMLParser.parse(this.properties.template, context)
    const style = HTMLParser.parse(this.properties.style, context)
    this.shadow.innerHTML = HTMLParser.parse(style + template, context)
    this.document = this.shadow
    this.listenEvents(this.document)
  }

  listenEvents(document) {
    document.querySelectorAll('[onclick]').forEach((node) => {
      node.addEventListener('click', (event) => {
        eval(node.getAttribute('onclick'))(event)
      })
    })
  }
}


export default function defineComponent(name, props) {
  class C extends Component {}
  C.prototype._metaProperties = props

  customElements.define(name, C)
  return C
}
