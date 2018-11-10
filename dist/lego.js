class Component extends HTMLElement {
  constructor(...args) {
    super(...args)
    this.shadow = this.attachShadow({mode: 'open'})
    this.properties = Object.assign({ template: '', style: '', context: {} }, this.properties)
    this.attributesToContext()
    this.render()
  }

  attributesToContext() {
    const attributes = {}
    Array.from(this.attributes).map(attr => attributes[attr.name] = attr.value)
    Object.assign(this.properties.context, attributes)
  }

  render(ctx = {}) {
    const context = Object.assign(this.properties.context, ctx)
    const templater = new Function(`return \`${this.properties.style}${this.properties.template}\``)
    this.shadow.innerHTML = templater.apply(context)
  }
}

export default function defineComponent(name, props) {
  class C extends Component {}
  C.prototype.properties = props

  customElements.define(name, C)
  return C
}
