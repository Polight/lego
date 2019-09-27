const fs = require('fs')
const jsdom = require('jsdom')
const { escapeLiteral } = require('./utils.js')

const { JSDOM } = jsdom


function readHTMLComponent(path) {
  const content = fs.readFileSync(path, 'utf8')
  const dom = new JSDOM(content)
  const document = dom.window.document

  const templateNode = document.querySelector('template')
  const styleNode = document.querySelector('style')
  const scriptNode = document.querySelector('script')
  const name = (templateNode && templateNode.getAttribute('name'))
             || path.toLowerCase().split('/').splice(-1)[0].split('.')[0] // File name without extension
  const template = templateNode && templateNode.innerHTML
  const style = styleNode && styleNode.outerHTML
  const script = scriptNode && scriptNode.innerHTML
  const state = {}
  templateNode.getAttributeNames().forEach(attrName => {
    const value = templateNode.getAttributeNode(attrName).value
    try {state[attrName] = eval(value) || null}
    catch(e) {state[attrName] = value || ''}
  })
  return { name, template, style, script, state }
}

function createJsComponent(name, template, style, script, state = {}) {
  const className = name.split('-').map(n => n.charAt(0).toUpperCase() + n.slice(1)).join('')

  return `
class ${className} extends Component {
  static get observedAttributes() {
    return ${JSON.stringify(Object.keys(state))}
  }
  get template () {
    return \`${escapeLiteral(template.trim())}\`
  }
  get style () {
    return \`${escapeLiteral(style.trim())}\`
  }
  _init () {
    ${script}
  }
}
customElements.define('${name}', ${className})
`
}

function transpile(path) {
  const { name, template, style, script, state } = readHTMLComponent(path)
  return {
    name: name,
    content: createJsComponent(name, template, style, script, state)
  }
}

// Non ES7 module because of Node 11…
module.exports = { transpile, readHTMLComponent, createJsComponent }
