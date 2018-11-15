export default class HTMLParser {

  static htmlToDom(html) {
    const container = document.createElement('div')
    container.innerHTML = html
    return container
  }

  static parseAttributeIf(dom, state) {
    const tags = Array.from(dom.querySelectorAll('*')).filter(n => n.hasAttribute('if'))
    tags.forEach(tag => {
      if(HTMLParser.evaluate(tag.getAttribute('if'), state) === 'false') tag.remove()
      else tag.removeAttribute('if')
    })
    return dom
  }

  static parseAttributeFor(dom, state) {
    const tags = Array.from(dom.querySelectorAll('*')).filter(n => n.hasAttribute('for'))
    const forInPattern = /\${\s*(.+)\s+in\s+(.[^\s]*)\s+}/
    tags.forEach(tag => {
      const value = tag.getAttribute('for')
      const result = value.match(forInPattern)
      if(!result) throw new Error(`Can't loop 'for' attribute with value "${value}".`)
      tag.removeAttribute('for')
      const fragment = tag.outerHTML
      const [_, itemName, propName] = result
      const list = (new Function(String.raw`return ${propName}`)).apply(state)
      let tagHTML = ''
      if(!list || !list.length) tag.remove()
      else list.map(item => {
        const subState = Object.assign({}, state)
        subState[itemName] = item
        const subTemplate = HTMLParser.parse(fragment, subState)
        tagHTML += subTemplate
      })
      tag.outerHTML = tagHTML
    })
    return dom
  }

  static evaluate(html, state) {
    const templater = new Function('return `' + html + '`')
    return templater.apply(state)
  }

  static parse(template, state) {
    let dom = HTMLParser.htmlToDom(template)
    dom = HTMLParser.parseAttributeIf(dom, state)
    dom = HTMLParser.parseAttributeFor(dom, state)
    return HTMLParser.evaluate(dom.innerHTML, state)
  }
}
