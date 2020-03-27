import { h, render } from './index.js'

function createState(cb) {
  return new Proxy({}, {
    set(target, property, value) {
      const p = Reflect.set(target, property, value)
      cb && cb()
      return p
    },
    deleteProperty(target, property) {
      const p = Reflect.deleteProperty(target, property)
      cb && cb()
      return p
    }
  })
}

export default class extends HTMLElement {
  constructor() {
    super()
    this.useShadowDOM = true
    this.__state = createState(this.__update.bind(this))
    if(this.init) this.init()
    this.watchProps = Object.keys(this.__state)
    this.document = this.useShadowDOM ? this.attachShadow({mode: 'open'}) : this
  }

  __update() {
    if(this.isConnected && this.document) this.render()
  }

  get style() {
    return ''
  }

  get vdom() {
    return ({ state }) => ''
  }

  get vstyle() {
    return ({ state }) => ''
  }

  setAttribute(name, value) {
    super.setAttribute(name, value)
    if(this.watchProps.includes(name)) this.state[name] = value
  }

  removeAttribute(name) {
    super.removeAttribute(name)
    if(this.watchProps.includes(name) && name in this.state) delete this.state[name]
  }

  connectedCallback() {
    if(this.connected) this.connected()
    this.render()
  }

  disconnectedCallback() {
    if(this.disconnected) this.disconnected()
  }

  set state(value) {
    Object.assign(this.__state, value)
  }

  get state() {
    return this.__state
  }

  render() {
    return render(h('root', {}, [
      this.vdom({ state: this.__state }),
      this.vstyle({ state: this.__state }),
    ]), this.document)
  }
}
