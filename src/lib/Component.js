import { h, render } from 'petit-dom'
import { toCamelCase } from '../utils'

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
  #_state = {}
  useShadowDOM = true
  #watchProps = []
  #isConnected = false
  #isInitialized = false
  #customEvents = []

  #ready() {
    this.init?.()
    this.#_state = { ...this.state }
    this.#watchProps = Object.keys(this.state)
    this.#syncAttributesToState()
    this.document = this.useShadowDOM
      ? this.attachShadow({ mode: "open" })
      : this
    this.#isInitialized = true
  }

  #syncAttributesToState() {
    this.#_state = Array.from(this.attributes).reduce(
      (state, attr) => {
        const camelCaseName = toCamelCase(attr.name)
        const attrType = typeof this.#_state[camelCaseName]
        return {
          ...state,
          [camelCaseName]: sanitizeAttribute(attrType, attr.value),
        }
      },
      this.#_state
    )
  }

  get vdom() {
    return ({ state }) => ""
  }

  get vstyle() {
    return ({ state }) => ""
  }

  setAttribute(name, value) {
    if (name.match(/@[a-z]+(?:-[a-z]+)*/)) return this.#customEvents.push([name.slice(1), value])
    super.setAttribute(name, typeof value === 'object' ? JSON.stringify(value) : value)
    const prop = toCamelCase(name)
    const attrType = typeof this.#_state[prop]
    if (this.#watchProps.includes(prop)) this.render({ [prop]: sanitizeAttribute(attrType, value) })
  }

  removeAttribute(name) {
    super.removeAttribute(name)
    const prop = toCamelCase(name)
    const attrType = typeof this.#_state[prop]
    if (this.#watchProps.includes(prop) && prop in this.#_state) {
      this.render({ [prop]: sanitizeAttribute(attrType, null) })
    }
  }

  connectedCallback() {
    if (!this.#isInitialized) this.#ready()
    this.#isConnected = true
    // Load the DOM
    this.render()
    this.#customEvents.forEach(([customEvent, listener]) => this.addEventListener(customEvent, listener))
    this.connected?.()
  }

  disconnectedCallback() {
    this.#isConnected = false
    this.#customEvents.forEach(([customEvent, listener]) => this.removeEventListener(customEvent, listener))
    this.disconnected?.()
  }

  setState(props = {}) {
    Object.assign(this.#_state, props)
    if (this.changed && this.#isConnected) this.changed(props)
  }

  set state(value) {
    this.#_state = { ...value }
  }

  get state() {
    return this.#_state
  }

  render(state) {
    if (state) {
      const hasChanges = this.#hasStateChanged(state)
      if (!hasChanges) return
      this.setState(state)
    }
    if (!this.#isConnected) return

    render(
      [this.vdom({ state: this.state }), this.vstyle({ state: this.state })],
      this.document
    )

    this.rendered?.(state)
  }

  #hasStateChanged(newState) {
    return Object.keys(newState).some(key => this.#_state[key] !== newState[key])
  }
}

export { h, render, Component }
