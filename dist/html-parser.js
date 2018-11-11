export default class HTMLParser {
    static htmlToDom(html) {
      const container = document.createElement('div')
      container.innerHTML = html
      return container
    }

    static parseAttributeIf(dom, ctx) {
      const tags = Array.from(dom.querySelectorAll('*')).filter(n => n.hasAttribute('if'))
      tags.forEach(tag => {
        const condition = tag.getAttribute('if')
        const container = document.createElement('div')
        container.innerHTML = HTMLParser.evaluate(tag.outerHTML, ctx)
        if(container.firstChild.getAttribute('if') === 'false') tag.remove()
      })
      return dom
    }

    static parseAttributeFor(dom, ctx) {
      const tags = Array.from(dom.querySelectorAll('*')).filter(n => n.hasAttribute('for'))
      tags.forEach(tag => tag.remove())
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
