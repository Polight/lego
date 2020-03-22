import emerj from 'https://cdn.jsdelivr.net/gh/bryhoyt/emerj@master/src/emerj.js'
import { directives, literal, assignEvents } from './parsers.js'

export default class _ extends HTMLElement {
  constructor() {
    super()
    this.state = {}
    this.useShadowDOM = true
    this.document = this.useShadowDOM ? this.attachShadow({mode: 'open'}) : this
    Object.keys(this.attributes).forEach(key => this.state[key] = this.getAttribute(key))
    if(this.init) this.init()
  }

  static get observedAttributes() {
    return []
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render({ [name]: newValue })
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

  getState() {
    return this.state
  }

  render(state = {}) {
    Object.assign(this.state, state)
    if(!this.document) return
    const content = literal(directives(this.template), { state: this.state }) + this.style
    emerj.merge(this.document, content)
    assignEvents(this.document, this)
  }
}
