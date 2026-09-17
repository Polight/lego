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

function generateFileContent({ dom, config }) {
  const hasDefaultExport = /\bexport\s+default\b/.test(dom.script)
  const extendsComponent = /\bexport\s+default\s+class\s+extends\s+Component\b/.test(dom.script)

  const header = `// Lego version ${config.version}
import { h, Component } from '${config.importPath}'

${config.preScript || ''}
`

  // The brick extends `Component` itself: it owns everything, nothing to generate.
  if (extendsComponent) return `${header}\n${dom.script}\n`

  return `${header}
class ${config.baseClassName} extends Component {
  useShadowDOM = ${Boolean(config.useShadowDOM)}

  ${dom.template ? `get vdom() {
    return ({ state }) => ${parse(dom.template)}
  }` : ''}
  ${dom.style || config.preStyle ? `get vstyle() {
    return ({ state }) => h('style', {}, \`
    ${config.preStyle || ''}
    ${dom.style}
  \`)}` : ''}
}

${dom.script}

${hasDefaultExport ? '' : `export default class extends ${config.baseClassName} {}`}
`
}

function createComponent({ html, name, config }) {
  const dom = parseHtmlComponent(html)
  const content = generateFileContent({ dom, config })
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
