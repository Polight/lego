import { h, render } from 'petit-dom'

function toCamelCase(name) {
  if (!name.includes("-")) return name
  return name.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
}
class Component extends HTMLElement {
  state = {}
  useShadowDOM = true
  watchProps = []
  #isConnected = false
  #isInitialized = false

  #ready() {
    this.init?.()
    this.watchProps = Object.keys(this.state)
    this.#syncAttributesToState()
    this.document = this.useShadowDOM
      ? this.attachShadow({ mode: "open" })
      : this
    this.#isInitialized = true
  }

  #syncAttributesToState() {
    this.state = Array.from(this.attributes).reduce(
      (state, attr) => ({
        ...state,
        [toCamelCase(attr.name)]: attr.value,
      }),
      this.state
    )
  }

  get vdom() {
    return ({ state }) => ""
  }

  get vstyle() {
    return ({ state }) => ""
  }

  setAttribute(name, value) {
    super.setAttribute(name, value)
    const prop = toCamelCase(name)
    if (this.watchProps.includes(prop)) this.render({ [prop]: value })
  }

  removeAttribute(name) {
    super.removeAttribute(name)
    const prop = toCamelCase(name)
    if (this.watchProps.includes(prop) && prop in this.state) {
      this.render({ [prop]: null })
      delete this.state[prop]
    }
  }

  connectedCallback() {
    if (!this.#isInitialized) this.#ready()
    this.#isConnected = true
    // Load the DOM
    this.render()
    this.connected?.()
  }

  disconnectedCallback() {
    this.#isConnected = false
    this.disconnected?.()
  }

  setState(props = {}) {
    Object.assign(this.state, props)
    if (this.changed && this.#isConnected) this.changed(props)
  }

  set state(value) {
    this.setState(value)
  }

  get state() {
    return this.state
  }

  render(state) {
    this.setState(state)
    if (!this.#isConnected) return

    return render(
      [this.vdom({ state: this.state }), this.vstyle({ state: this.state })],
      this.document
    )
  }
}

export { h, render, Component }
