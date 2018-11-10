class Component extends HTMLElement {
  constructor(...args) {
    super(...args)
    this.shadow = this.attachShadow({mode: 'open'})
    this.extended = Object.assign({ template: '', style: '', context: {} }, this.extended)
    this.render()
  }

  get context() {return {}}

  render(ctx = {}) {
    const context = Object.assign(this.extended.context, ctx)
    const templater = new Function(`return \`${this.extended.style}${this.extended.template}\``)
    this.shadow.innerHTML = templater.apply(context)
  }
}

export default function defineComponent(name, props) {
  class C extends Component {}
  C.prototype.extended = props

  customElements.define(name, C)
  return C
}
