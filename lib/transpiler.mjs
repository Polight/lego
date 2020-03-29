import jsdom from 'jsdom'
import parse from './parser.mjs'


function parseDom(html) {
  const root = jsdom.JSDOM.fragment(html).firstChild
  const templateNode = root.querySelector('template')
  const scriptNode = root.querySelector('script')
  const styleNode = root.querySelector('style')

  return {
    name: root.nodeName.toLowerCase(),
    template: templateNode ? templateNode.innerHTML : '',
    script: scriptNode ? scriptNode.innerHTML : '',
    style: styleNode ? styleNode.innerHTML : '',
  }
}

function transpile(html) {
  const dom = parseDom(html)
  const content = `
import { h, Component } from '../node_modules/@polight/lego/lib/index.js'

class _ extends Component {
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

export default customElements.define('${dom.name}', _)
`
  return { name: dom.name, content }
}

export { transpile }
