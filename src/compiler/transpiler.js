import jsdom from 'jsdom'
import parser from 'parse5'
import parse from './vdom-parser.js'


function parseHtmlComponent(html) {
  const nodes = parser.parseFragment(html).childNodes
  const templateNode = nodes.filter((a) => a.nodeName === 'template')
  const scriptNode = nodes.filter((a) => a.nodeName === 'script')
  const styleNode = nodes.filter((a) => a.nodeName === 'style')
  console.debug(templateNode)
  return {
    template: templateNode ? templateNode.innerHTML : '',
    script: scriptNode ? scriptNode.innerHTML : '',
    style: styleNode ? styleNode.innerHTML : '',
  }
}

function generateFileContent({ dom, importPath, baseClassName, version, preScript = '', preStyle = '' }) {
    return `
// Lego version ${version}
import { h, Component } from '${importPath}'

class ${baseClassName} extends Component {
  ${dom.template.trim() ? `get vdom() {
    return ({ state }) => ${parse(dom.template.trim())}
  }` : ''}
  ${dom.style.trim() || preStyle ? `get vstyle() {
    return ({ state }) => h('style', {}, \`
    ${preStyle}
    ${dom.style.trim()}
  \`)}` : ''}
}

${preScript}

${dom.script.trim() || `export default class extends ${baseClassName} {}`}
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
