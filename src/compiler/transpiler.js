import jsdom from 'jsdom'
import parse from './vdom-parser.js'


function parseHtmlComponent(html) {
  const root = jsdom.JSDOM.fragment(html)
  const templateNode = root.querySelector('template')
  const scriptNode = root.querySelector('script')
  const styleNode = root.querySelector('style')

  return {
    template: templateNode ? templateNode.innerHTML : '',
    script: scriptNode ? scriptNode.innerHTML : '',
    style: styleNode ? styleNode.innerHTML : '',
    scriptType: scriptNode ? scriptNode.getAttribute('type') : '',
  }
}

const scriptContents = {
  shorthand({ className, name, dom, libPath, version }) {
    return `
// Lego version ${version}
import { h, Component } from '${libPath}'

class ${className} extends Component {
  ${dom.template.trim() ? `get vdom() {
    return ({ state }) => ${parse(dom.template.trim())}
  }` : ''}
  ${dom.style.trim() ? `get vstyle() {
    return ({ state }) => h('style', {}, \`
    ${dom.style.trim()}
  \`)}` : ''}
  ${dom.script.trim()}
}

export default customElements.define('${name}', ${className})
`
  },

  module({ className, name, dom, libPath, version }) {
    return `
// Lego version ${version}
import { h } from '${libPath}'

${dom.script.trim()}

class Sub${className} extends ${className} {
  ${dom.template.trim() ? `get vdom() {
    return ({ state }) => ${parse(dom.template.trim())}
  }` : ''}
  ${dom.style.trim() ? `get vstyle() {
    return ({ state }) => h('style', {}, \`
    ${dom.style.trim()}
  \`)}` : ''}
}

export default customElements.define('${name}', Sub${className})
    `
  }
}

function createComponent({ html, name, libPath, version }) {
  const dom = parseHtmlComponent(html)
  const className = name.split('-').map(c => c.slice(0,1).toUpperCase() + c.slice(1)).join('')
  const scriptType = dom.scriptType || 'shorthand'
  const content = scriptContents[scriptType]({ className, name, dom, libPath, version })
  return { name, content }
}

export { createComponent }
