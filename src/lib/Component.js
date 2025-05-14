import { h, render } from 'petit-dom'

function toCamelCase(name) {
  if (!name.includes("-")) return name
  return name.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
}

function sanitizeAttribute(attrType, attrValue) {
  if (attrType === 'object') return sanitizeJsonAttribute(attrValue)
  if (attrType === 'boolean') return attrValue === "" || !!attrValue
  if (attrType === 'number') return Number(attrValue)
  return attrValue
}

function sanitizeJsonAttribute(attrValue) {
  try {
    return JSON.parse(attrValue)
  } catch (_) {
    return attrValue
  }
}

class Component extends HTMLElement {
  state = {}
  useShadowDOM = true
  #watchProps = []
  #isConnected = false
  #isInitialized = false

  #ready() {
    this.init?.()
    this.#watchProps = Object.keys(this.state)
    this.#syncAttributesToState()
    this.document = this.useShadowDOM
      ? this.attachShadow({ mode: "open" })
      : this
    this.#isInitialized = true
  }

  #syncAttributesToState() {
    this.state = Array.from(this.attributes).reduce(
      (state, attr) => {
        const camelCaseName = toCamelCase(attr.name)
        const attrType = typeof this.state[camelCaseName]
        return {
          ...state,
          [camelCaseName]: sanitizeAttribute(attrType, attr.value),
        }
      },
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
    super.setAttribute(name, typeof value === 'object' ? JSON.stringify(value) : value)
    const prop = toCamelCase(name)
    const attrType = typeof this.state[prop]
    if (this.#watchProps.includes(prop)) this.render({ [prop]: sanitizeAttribute(attrType, value) })
  }

  removeAttribute(name) {
    super.removeAttribute(name)
    const prop = toCamelCase(name)
    const attrType = typeof this.state[prop]
    if (this.#watchProps.includes(prop) && prop in this.state) {
      this.render({ [prop]: sanitizeAttribute(attrType, null) })
    }
  }

  connectedCallback() {
    if (!this.#isInitialized) this.#ready()
    this.#isConnected = true
    // Load the DOM
    this.render()
  }

  disconnectedCallback() {
    this.#isConnected = false
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
