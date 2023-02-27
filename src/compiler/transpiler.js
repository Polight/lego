import parse from './vdom-parser.js'


function parseHtmlComponent(html) {
  const templateMatch = html.match(/<template[^>]*>([\s\S]*)<\/template>/m)
  const scriptMatch = html.match(/<script([^>]*)>([\s\S]*)<\/script>/m)
  const scriptSetupMatch = html.match(/<script[^>]*setup[^>]*>([\s\S]*)<\/script>/m)
  const styleMatch = html.match(/<style[^>]*>([\s\S]*)<\/style>/m)
  const template = templateMatch ? templateMatch[1].trim() : ''
  const script = scriptMatch ? scriptMatch[1].trim() : ''
  const scriptSetup = scriptSetupMatch ? scriptSetupMatch[1].trim() : ''
  const style = styleMatch ? styleMatch[1].trim() : ''
  return { template, script, style, scriptSetup }
}

function generateFileContent({ dom, importPath, baseClassName, version, preScript = '', preStyle = '' }) {
    return `
// Lego version ${version}
import { h, Component } from '${importPath}'

class ${baseClassName} extends Component {
  ${dom.template.trim() ? `get vdom() {
    ${ dom.scriptSetup }
    return (${ dom.scriptSetup ? '' : '{ state }' }) => ${parse(dom.template.trim(), dom.isSetup)}
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
