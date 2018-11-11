import HTMLParser from './html-parser.js'


class Component extends HTMLElement {
  constructor(...args) {
    super(...args)
    this.shadow = this.attachShadow({mode: 'open'})
    this.properties = Object.assign({ template: '', style: '', context: {} }, this.properties)
    Object.assign(this.properties.context, this.readAttributes())
    this.render()
  }

  readAttributes() {
    const attributes = {}
    Array.from(this.attributes).map(attr => attributes[attr.name] = attr.value)
    return attributes
  }

  get context() {
    return this.properties.context
  }

  render(ctx = {}) {
    const context = Object.assign(this.properties.context, ctx)
    const template = HTMLParser.parse(this.properties.template, context)
    this.shadow.innerHTML = HTMLParser.parse(this.properties.style + template, context)
  }
}


export default function defineComponent(name, props) {
  class C extends Component {}
  C.prototype.properties = props

  customElements.define(name, C)
  return C
}
