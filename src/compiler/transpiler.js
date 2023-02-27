import parse from './vdom-parser.js'
import { parseFragment, serialize } from 'parse5'


function parseHtmlComponent(html) {
  const scriptNodes = parseFragment(html).childNodes.filter(n => n.tagName === 'script')
  const importScript = scriptNodes.find(s => s.attrs.find(a => a.name === 'import'))?.childNodes[0].value.trim()
  const setupScript = scriptNodes.find(s => s.attrs.find(a => a.name === 'setup'))?.childNodes[0].value.trim()
  const classScript = scriptNodes.find(s => s.attrs.length === 0)?.childNodes[0].value.trim()
  const template = serialize(parseFragment(html).childNodes.find(n => n.tagName === 'template')?.content).trim()
  const style = parseFragment(html).childNodes.find(n => n.tagName === 'style')?.childNodes[0].value
  return { importScript, setupScript, classScript, template, style }
}

function indent(text, size = 0) {
  return text.split('\n').join('\n' + Array(size).join(' '))
}

function generateFileContent({ dom, importPath, baseClassName, version, preScript = '', preStyle = '' }) {
  if(dom.setupScript) return generateFileContentWithSetup(arguments[0])
  else return `
// Lego version ${ version }
import { h, Component } from '${ importPath }'

class ${ baseClassName } extends Component {
  ${ dom.template ? `get vdom() {
    return ({ state }) => ${ parse(dom.template, 6, 'class') }
  }` : '' }
  ${ dom.style || preStyle ? `get vstyle() {
    return ({ state }) => h('style', {}, \`
    ${ preStyle }
    ${ dom.style }
  \`)}` : '' }
}

${ preScript }

${ dom.classScript || `export default class extends ${baseClassName} {}` }
`
}

function generateFileContentWithSetup({ dom, importPath, baseClassName, version, preScript = '', preStyle = '' }) {
  return `
// Lego version ${version}
import { h, Component } from '${ importPath }'
${ preScript }
${ dom.importScript }

export default class extends Component {
  get vdom() {
    ${ indent(dom.setupScript, 4) }
    if(state) this.__state = state
    return ({ state }) => {
      return ${parse(dom.template, 4, 'setup')}
    }
  }
  ${dom.style || preStyle ? `get vstyle() {
    return ({ state }) => h('style', {}, \`
      ${preStyle}
      ${indent(dom.style, 0)}
    \`)}`
    : ''
  }
}
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
