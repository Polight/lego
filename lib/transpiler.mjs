import jsdom from 'jsdom'
import parse from './vdom-parser.mjs'


function parseHtmlComponent(html) {
  const root = jsdom.JSDOM.fragment(html)
  const templateNode = root.querySelector('template')
  const scriptNode = root.querySelector('script')
  const styleNode = root.querySelector('style')

  return {
    template: templateNode ? templateNode.innerHTML : '',
    script: scriptNode ? scriptNode.innerHTML : '',
    style: styleNode ? styleNode.innerHTML : '',
  }
}

function createComponent(html, name, libPath) {
  const dom = parseHtmlComponent(html)
  const className = name.split('-').map(c => c.slice(0,1).toUpperCase() + c.slice(1)).join('')
  const content = `
import { h, Component } from '${libPath}'

class ${className} extends Component {
  get vdom() {
    return ({ state }) => ${parse(dom.template)}
  }

  get vstyle() {
    return ({ state }) => h('style', {}, \`
      ${dom.style}
    \`)
  }

  ${dom.script}
}

export default customElements.define('${name}', ${className})
`
  return { name, content }
}

export { createComponent }
