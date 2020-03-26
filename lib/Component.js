import { h, render } from "../node_modules/petit-dom/src/index.js"
import { directives, literal, assignEvents, assignProperties } from './parsers.js'

export { h }

export class Component extends HTMLElement {
  constructor() {
    super()
    this.useShadowDOM = true
    this.document = this.useShadowDOM ? this.attachShadow({mode: 'open'}) : this
    this.state = this.getAttributeNames().reduce((acc, key) => Object.assign(acc, { [key]: this.getAttribute(key) }), this.state || {})
    if(this.init) this.init()
  }

  setAttribute(name, value) {
    super.setAttribute(name, value)
    this.state[name] = value
    if(this.isConnected) this.render()
  }

  removeAttribute(name) {
    super.removeAttribute(name)
    if(name in this.state) delete this.state[name]
    this.render()
  }

  connectedCallback() {
    if(this.connected) this.connected()
    this.render()
  }

  disconnectedCallback() {
    if(this.disconnected) this.disconnected()
  }

  get template() {
    return ''
  }

  get style() {
    return ''
  }

  get vdom() {
    return ({ state }) => ''
  }

  render(state = {}) {
    if(!this.document) return
    Object.assign(this.state, state)
    const context = { state: this.state }
    render(h('root', {}, this.vdom(context)), this.document)
    // emerj.merge(this.document, content, context)
    // assignProperties(this.document, context)
    // assignEvents(this.document, this)
  }
}
