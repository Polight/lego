class Component extends HTMLElement {
  constructor(...args) {
    super(...args)
    this.shadow = this.attachShadow({mode: 'open'})
    this.properties = Object.assign({ template: '', style: '', context: {} }, this.properties)
    this.attributesToContext()
    this.render()
  }

  createVirtualDom(html) {
    const container = document.createElement('div')
    container.innerHTML = html
    return container
  }

  attributesToContext() {
    const attributes = {}
    Array.from(this.attributes).map(attr => attributes[attr.name] = attr.value)
    Object.assign(this.properties.context, attributes)
  }

  cleanConditionalTags(dom, ctx) {
    console.log(ctx)
    const tags = Array.from(dom.childNodes).filter(n => n.hasAttribute('if'))
    tags.forEach(tag => {
      const condition = tag.getAttribute('if')
      const container = document.createElement('div')
      container.innerHTML = this.templatify(tag.outerHTML, ctx)
      console.debug(container.firstChild.getAttribute('if'), container.firstChild.getAttribute('if') === 'false')
      if(container.firstChild.getAttribute('if') === 'false') tag.remove()
    })
    return dom
  }

  templatify(template, context) {
    const templater = new Function(`return \`${template}\``)
    return templater.apply(context)
  }

  get context() {
    return this.properties.context
  }

  render(ctx = {}) {
    const context = Object.assign(this.properties.context, ctx)
    let vdom = this.createVirtualDom(this.properties.template)
    vdom = this.cleanConditionalTags(vdom, context)
    this.shadow.innerHTML = this.templatify(this.properties.style + vdom.innerHTML, context)
  }
}

export default function defineComponent(name, props) {
  class C extends Component {}
  C.prototype.properties = props

  customElements.define(name, C)
  return C
}
