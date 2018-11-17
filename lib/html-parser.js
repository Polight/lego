export default class HTMLParser {

  static htmlToDom(html) {
    const container = document.createElement('div')
    container.innerHTML = html
    return container
  }

  static parseAttributeIf(dom, context) {
    const tags = Array.from(dom.querySelectorAll('*')).filter(n => n.hasAttribute('if'))
    tags.forEach(tag => {
      if(HTMLParser.evaluate(tag.getAttribute('if'), context) === 'false') tag.remove()
      else tag.removeAttribute('if')
    })
    return dom
  }

  static parseAttributeFor(dom, context = {}) {
    const tags = Array.from(dom.querySelectorAll('*')).filter(n => n.hasAttribute('for'))
    const forInPattern = /\${\s*(.+)\s+in\s+(.[^\s]*)\s+}/
    tags.forEach(tag => {
      const value = tag.getAttribute('for')
      const forIn = value.match(forInPattern)
      if(!forIn) throw new Error(`Can't loop 'for' attribute with value "${value}".`)
      tag.removeAttribute('for')
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
        if(attr.name.endsWith('?')) {
          const name = attr.name.slice(0, -1)
          if (HTMLParser.evaluate(attr.value, context) !== 'false') node.setAttribute(name, name)
          node.removeAttribute(attr.name)
        }
      })
    })
    return dom
  }

  static registerListeners(dom, context) {
    Array.from(dom.querySelectorAll('*')).forEach((node) => {
      Array.from(node.attributes).forEach((attr) => {
        if(attr.name.startsWith('on-')) {
          const name = attr.name.slice(3)
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

  static parse(template, context) {
    let dom = HTMLParser.htmlToDom(template)
    dom = HTMLParser.parseAttributeIf(dom, context)
    dom = HTMLParser.parseAttributeFor(dom, context)
    dom = HTMLParser.parseAttributeBoolean(dom, context)
    return HTMLParser.evaluate(dom.innerHTML, context)
  }
}
