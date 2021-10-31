import jsdom from 'jsdom'
import parse from './vdom-parser.js'


function parseHtmlComponent(html) {
  const root = jsdom.JSDOM.fragment(html)
  const templateNode = root.querySelector('template')
  const scriptNode = root.querySelector('script')
  const styleNode = root.querySelector('style')

  return {
    template: templateNode ? templateNode.innerHTML : '',
    script: scriptNode ? scriptNode.innerHTML : 'export default class _ {}',
    style: styleNode ? styleNode.innerHTML : '',
  }
}

function generateFileContent({ dom, importPath, baseClassName, version }) {
    return `
// Lego version ${version}
import { h, Component } from '${importPath}'

class ${baseClassName} extends Component {
  ${dom.template.trim() ? `get vdom() {
    return ({ state }) => ${parse(dom.template.trim())}
  }` : ''}
  ${dom.style.trim() ? `get vstyle() {
    return ({ state }) => h('style', {}, \`
    ${dom.style.trim()}
  \`)}` : ''}
}

${dom.script.trim()}
`
}

function camelCase(name) {
  return name.split('-').map(c => c.slice(0,1).toUpperCase() + c.slice(1)).join('')
}

function createComponent({ html, name, importPath, baseClassName, version }) {
  const dom = parseHtmlComponent(html)
  const content = generateFileContent({ dom, importPath, baseClassName, version })
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
