const ATTR_IF = ':if'
const ATTR_FOR = ':for'
const ATTR_BOOL_PREFIX = ':'
const ATTR_EVENT_PREFIX = 'on--'  // 'on:' is converted to 'on--' when parsing as it's not html allowed

const ATTR_REGEX = new RegExp(/^\${(.*)}$/)

export default class HTMLParser {
  static htmlToDom(html) {
    const container = document.createElement('div')
    container.innerHTML = html
    return container
  }

  static parseAttributeIf(dom, context) {
    const tags = Array.from(dom.querySelectorAll('*')).filter(n => n.hasAttribute(ATTR_IF))
    tags.forEach(tag => {
      if(this.evaluateString(tag.getAttribute(ATTR_IF), context)) tag.removeAttribute(ATTR_IF)
      else tag.remove()
    })
    return dom
  }

  /**
  Temporarly store a local context and the template inside a `:for` tag.
  */
  static deflateAttributesFor(dom, context = {}) {
    const tags = Array.from(dom.querySelectorAll('*')).filter(n => n.hasAttribute(ATTR_FOR))
    const forInPattern = /^\s*(.+)\s+in\s+(.[^\s]*)$/
    tags.forEach(tag => {
      const value = tag.getAttribute(ATTR_FOR)
      const forIn = value.match(forInPattern)
      if(!forIn) throw new Error(`Can't loop 'for' attribute with value "${value}".`)
      tag.removeAttribute(ATTR_FOR)
      const [_, itemName, propName] = forIn
      tag._legoPostEvaluate = {
        localContext: { itemName, propName },
        template: tag.outerHTML,
      }
      Array.from(tag.children).forEach(child => child.remove())
    })
    return dom
  }

  static parseDeflatedFors(dom, context = {}) {
    const tags = Array.from(dom.querySelectorAll('*')).filter(n => n._legoPostEvaluate)
    tags.forEach(tag => {
      const localContext = tag._legoPostEvaluate.localContext
      const fragment = tag._legoPostEvaluate.template
      const list = this.evaluateString(localContext.propName, context)
      let tagHTML = ''
      if(!list || !list.length) tag.remove()
      else list.map(item => {
        const subState = Object.assign({}, context, { [localContext.itemName]: item })
        const subTemplate = this.parse(fragment, subState)
        tagHTML += subTemplate
      })
      if(tagHTML) tag.outerHTML = tagHTML
      else tag.remove()
    })
    return dom
  }

  static parseAttributeBoolean(dom, context = {}) {
    Array.from(dom.querySelectorAll('*')).forEach((node) => {
      Array.from(node.attributes).forEach((attr) => {
        if(attr.name.startsWith(ATTR_BOOL_PREFIX) && !attr.name.startsWith(ATTR_EVENT_PREFIX)) {
          const name = attr.name.slice(ATTR_BOOL_PREFIX.length)
          if (this.evaluateString(attr.value, context)) node.setAttribute(name, name)
          node.removeAttribute(attr.name)
        }
      })
    })
    return dom
  }

  static parseAttributeJSON(dom, context = {}) {
    Array.from(dom.querySelectorAll('*')).forEach((node) => {
      Array.from(node.attributes).forEach((attr) => {
        if(ATTR_REGEX.test(attr.value)) {
          const value = this.evaluateString(attr.value, context)
          node.setAttribute(attr.name, this.valueToJson(value))
        }
      })
    })
    return dom
  }

  static allowAttributeSemiColumn(dom) {
    Array.from(dom.querySelectorAll('*')).forEach((node) => {
      Array.from(node.attributes).forEach((attr) => {
        if(attr.name.includes(':')) {
          node.setAttribute(attr.name.replace(':', '--'), attr.value)
          node.removeAttribute(attr.name)
        }
      })
    })
    return dom
  }

  static registerListeners(dom, context) {
    Array.from(dom.querySelectorAll('*')).forEach((node) => {
      Array.from(node.attributes).forEach((attr) => {
        if(attr.name.startsWith(ATTR_EVENT_PREFIX)) {
          const name = attr.name.slice(ATTR_EVENT_PREFIX.length)
          node.addEventListener(name, (function () {return eval(attr.value)}).call(context))
          node.removeAttribute(attr.name)
        }
      })
    })
    return dom
  }

  static valueToJson(value) {
    if (value === undefined) return
    if (value.charAt) return value
    return JSON.stringify(value)
  }

  static parseValue(str) {
    if (!str || !str.charAt) return str
    try {
      return JSON.parse(str)
    } catch {
      return str
    }
  }

  static evaluateLiteral(html, context) {
    const templater = new Function('return `' + html + '`')
    return templater.call(context) || ''
  }

  static evaluateString(html, context) {
    html = html.trim()
    // Treat `attr="${ this.value }"` as `attr="this.value"`
    if(ATTR_REGEX.test(html)) html = html.match(ATTR_REGEX)[1]
    const templater = new Function(`return eval(\`${html}\`)`)
    return templater.call(context) || ''
  }

  static parse(template, context) {
    let dom = this.htmlToDom(template)
    dom = this.deflateAttributesFor(dom, context)
    dom = this.parseAttributeIf(dom, context)
    dom = this.parseDeflatedFors(dom, context)
    dom = this.parseAttributeBoolean(dom, context)
    dom = this.parseAttributeJSON(dom, context)
    dom = this.allowAttributeSemiColumn(dom, context)
    return this.evaluateLiteral(dom.innerHTML, context)
  }
}
