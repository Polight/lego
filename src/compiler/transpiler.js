import parse from './vdom-parser.js'
import { toCamelCase } from '../utils.js'

function parseHtmlComponent(html) {
  const templateMatch = html.match(/<template[^>]*>([\s\S]*)<\/template>/m)
  const scriptMatch = html.match(/<script[^>]*>([\s\S]*)<\/script>/m)
  const styleMatch = html.match(/<style[^>]*>([\s\S]*)<\/style>/m)
  const template = templateMatch ? templateMatch[1].trim() : ''
  const script = scriptMatch ? scriptMatch[1].trim() : ''
  const style = styleMatch ? styleMatch[1].trim() : ''
  return { template, script, style }
}

function generateFileContent({ dom, importPath, baseClassName, version, preScript = '', preStyle = '' }) {
    return `
// Lego version ${version}
import { h, Component } from '${importPath}'

class ${baseClassName} extends Component {
  ${dom.template ? `get vdom() {
    return ({ state }) => ${parse(dom.template)}
  }` : ''}
  ${dom.style || preStyle ? `get vstyle() {
    return ({ state }) => h('style', {}, \`
    ${preStyle}
    ${dom.style}
  \`)}` : ''}
}

${preScript}

${dom.script || `export default class extends ${baseClassName} {}`}
`
}

function createComponent({ html, name, importPath, baseClassName, preScript, preStyle, version }) {
  const dom = parseHtmlComponent(html)
  const content = generateFileContent({ dom, importPath, baseClassName, preScript, preStyle, version })
  return { name, content }
}

function generateIndex(fileNames) {
  return fileNames.map((fileName) => {
    const className = toCamelCase(fileName)
    return [
      `import ${className} from './${fileName}.js'`,
      `customElements.define('${fileName}', ${className})`
    ].join('\n')
  })
  .join('\n\n')
}

export { createComponent, generateIndex }
