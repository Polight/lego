import { h, render } from './index.js'


function toCamelCase(name) {
  if(name.includes('-')) {
    const parts = name.split('-')
    name = parts[0] + parts.splice(1).map(s => s[0].toUpperCase() + s.substr(1)).join('')
  }
  return name
}


export default class extends HTMLElement {
  constructor() {
    super()
    this.useShadowDOM = true
    this.__isConnected = false
    this.__state = {}
    this.__vdom = this.vdom
    this.__vstyle = this.vstyle
    if(this.init) this.init()
    this.watchProps = Object.keys(this.__state)
    this.__attributesToState()
    this.document = this.useShadowDOM ? this.attachShadow({mode: 'open'}) : this
  }

  __attributesToState() {
    Object.assign(this.state, Array.from(this.attributes).reduce((obj, attr) => {
      return Object.assign(obj, { [toCamelCase(attr.name)]: attr.value })
    }, {}))
  }

  get vdom() { return ({ state }) => '' }

  get vstyle() { return ({ state }) => '' }

  setAttribute(name, value) {
    super.setAttribute(name, value)
    const prop = toCamelCase(name)
    if(this.watchProps.includes(prop)) this.render({ [prop]: value })
  }

  removeAttribute(name) {
    super.removeAttribute(name)
    const prop = toCamelCase(name)
    if(this.watchProps.includes(prop) && prop in this.state) {
      this.render({ [prop]: null })
      delete this.state[prop]
    }
  }

  connectedCallback() {
    this.__isConnected = true
    if(this.connected) this.connected()
    this.render()
  }

  disconnectedCallback() {
    this.__isConnected = false
    this.setState({})
    if(this.disconnected) this.disconnected()
  }

  async setState(props = {}) {
    Object.assign(this.__state, props)
    if(this.changed && this.__isConnected) await this.changed(props)
  }

  set state(value) {
    this.setState(value)
  }

  get state() {
    return this.__state
  }

  async render(state) {
    await this.setState(state)
    if(!this.__isConnected) return
    return render([
      this.__vdom({ state: this.__state }),
      this.__vstyle({ state: this.__state }),
    ], this.document)
  }
}
