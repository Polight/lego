import { h, render } from './index.js'


export default class extends HTMLElement {
  constructor() {
    super()
    this.useShadowDOM = true
    this.__isConnected = false
    this.__state = {}
    if(this.init) this.init()
    this.watchProps = Object.keys(this.__state)
    this.__attributesToState()
    this.document = this.useShadowDOM ? this.attachShadow({mode: 'open'}) : this
  }

  __attributesToState() {
    Object.assign(this.state, Array.from(this.attributes).reduce((obj, attr) => Object.assign(obj, {[attr.name]: attr.value}), {}))
  }

  get vdom() { return ({ state }) => '' }

  get vstyle() { return ({ state }) => '' }

  setAttribute(name, value) {
    super.setAttribute(name, value)
    if(this.watchProps.includes(name)) this.render({ [name]: value })
  }

  removeAttribute(name) {
    super.removeAttribute(name)
    if(this.watchProps.includes(name) && name in this.state) {
      this.render({ [name]: null })
      delete this.state[name]
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
    return render(h('root', {}, [
      this.vdom({ state: this.__state }),
      this.vstyle({ state: this.__state }),
    ]), this.document)
  }
}
