const ATTR_IF = ':if'
const ATTR_FOR = ':for'
const ATTR_EVENT_PREFIX = ':on-'
const ATTR_BOOLEAN_PREFIX = ':'

export default class HTMLParser {
  static htmlToDom(html) {
    const container = document.createElement('div')
    container.innerHTML = html
    return container
  }

  static parseAttributeIf(dom, context) {
    const tags = Array.from(dom.querySelectorAll('*')).filter(n => n.hasAttribute(ATTR_IF))
    tags.forEach(tag => {
      if(HTMLParser.evaluate(tag.getAttribute(ATTR_IF), context) === 'false') tag.remove()
      else tag.removeAttribute(ATTR_IF)
    })
    return dom
  }

  static parseAttributeFor(dom, context = {}) {
    const tags = Array.from(dom.querySelectorAll('*')).filter(n => n.hasAttribute(ATTR_FOR))
    const forInPattern = /\${\s*(.+)\s+in\s+(.[^\s]*)\s+}/
    tags.forEach(tag => {
      const value = tag.getAttribute(ATTR_FOR)
      const forIn = value.match(forInPattern)
      if(!forIn) throw new Error(`Can't loop 'for' attribute with value "${value}".`)
      tag.removeAttribute(ATTR_FOR)
      const fragment = tag.outerHTML
      const [_, itemName, propName] = forIn
      const list = (function() { return eval(propName) }).call(context)
      let tagHTML = ''
      if(!list || !list.length) tag.remove()
      else list.map(item => {
        const subState = { [itemName]: item }
        const subTemplate = HTMLParser.parse(fragment, subState)
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
        const name = attr.name
        if(name.startsWith(ATTR_BOOLEAN_PREFIX) && !name.startsWith(ATTR_EVENT_PREFIX)) {
          const name = attr.name.slice(ATTR_BOOLEAN_PREFIX.length)
          if (eval(HTMLParser.evaluate(attr.value, context))) node.setAttribute(name, name)
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

  static evaluate(html, context) {
    const templater = new Function('return `' + html + '`')
    return templater.apply(context)
  }

  static parseAttributes(dom, context) {
    dom = HTMLParser.parseAttributeIf(dom, context)
    dom = HTMLParser.parseAttributeFor(dom, context)
    return HTMLParser.parseAttributeBoolean(dom, context)
  }
}
