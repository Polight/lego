import parse from './vdom-parser.js'
import { parseFragment, serialize } from 'parse5'


function parseHtmlComponent(html) {
  const scriptNodes = parseFragment(html).childNodes.filter(n => n.tagName === 'script')
  let extendScript = scriptNodes.find(s => s.attrs.find(a => a.name.startsWith('extend')))?.childNodes[0].value || ''
  let script = scriptNodes.find(s => s.attrs.length === 0)?.childNodes[0].value
  const template = serialize(parseFragment(html).childNodes.find(n => n.tagName === 'template')?.content)
  const style = parseFragment(html).childNodes.find(n => n.tagName === 'style')?.childNodes[0].value

  // Make it compatible with previous full class versions
  if(script && !extendScript && script.includes('export default class')) {
    extendScript = script
    script = ""
  }

  return { script, extendScript, template, style }
}

function indent(text = '', size = 0) {
  return text.split('\n').join('\n' + Array(size).join(' '))
}

function generateFileContent({ dom, importPath, baseClassName, version, preScript = '', preStyle = '' }) {
  return "" +
`// Lego version ${ version }
import { h, Component } from '${ importPath }'
${ preScript }

${ dom.script }

const __template = function({ state }) {
  return ${parse(dom.template, 2)}
}

const __style = function({ state }) {
  return h('style', {}, \`
    ${ indent(preStyle, 4) }
    ${ indent(dom.style, 4) }
  \`)
}

// -- Lego Core
let render = async (state) => {}

${ dom.extendScript ? '' : 'export default ' }class ${baseClassName} extends Component {
  constructor() {
    super()
    render = this.render.bind(this)
    try {
      this.__state = state
    } catch {}
  }
  get vdom() { return __template }
  get vstyle() { return __style }
}
// -- End Lego Core

${ dom.extendScript }
`
}

function camelCase(name) {
  return name.split('-').map(c => c.slice(0,1).toUpperCase() + c.slice(1)).join('')
}

function createComponent({ html, name, importPath, baseClassName, preScript, preStyle, version }) {
  const dom = parseHtmlComponent(html)
  const content = generateFileContent({ dom, importPath, baseClassName, preScript, preStyle, version })
  return { name, content }
}

function generateIndex(fileNames) {
  return fileNames.map((fileName) => {
    const className = camelCase(fileName)
    return [
      `import ${className} from './${fileName}.js'`,
      `customElements.define('${fileName}', ${className})`
    ].join('\n')
  })
  .join('\n\n')
}

export { createComponent, generateIndex }
