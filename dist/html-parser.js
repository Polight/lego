class HTMLParser {

  static htmlToDom(html) {
    const container = document.createElement('div')
    container.innerHTML = html
    return container
  }

  static parseAttributeIf(dom, ctx) {
    const tags = Array.from(dom.querySelectorAll('*')).filter(n => n.hasAttribute('if'))
    tags.forEach(tag => {
      if(HTMLParser.evaluate(tag.getAttribute('if'), ctx) === 'false') tag.remove()
      else tag.removeAttribute('if')
    })
    return dom
  }

  static parseAttributeFor(dom, ctx) {
    const tags = Array.from(dom.querySelectorAll('*')).filter(n => n.hasAttribute('for'))
    const forInPattern = /\${\s*(.+)\s+in\s+(.[^\s]*)\s+}/
    tags.forEach(tag => {
      const value = tag.getAttribute('for')
      const result = value.match(forInPattern)
      if(!result) throw new Error(`Can't loop 'for' attribute with value "${value}".`)
      tag.removeAttribute('for')
      const fragment = tag.outerHTML
      const [_, itemName, propName] = result
      const list = (new Function('return ' + propName)).apply(ctx)
      let tagHTML = ''
      if(!list || !list.length) tag.remove()
      else list.map(item => {
        const subContext = Object.assign({}, ctx)
        subContext[itemName] = item
        const subTemplate = HTMLParser.parse(fragment, subContext)
        tagHTML += subTemplate
      })
      tag.outerHTML = tagHTML
    })
    return dom
  }

  static evaluate(html, ctx) {
    const templater = new Function('return `' + html + '`')
    return templater.apply(ctx)
  }

  static parse(template, ctx) {
    let dom = HTMLParser.htmlToDom(template)
    dom = HTMLParser.parseAttributeIf(dom, ctx)
    dom = HTMLParser.parseAttributeFor(dom, ctx)
    return HTMLParser.evaluate(dom.innerHTML, ctx)
  }
}

try {
  eval('export default HTMLParser')
}
catch {
  module.exports = HTMLParser
}
