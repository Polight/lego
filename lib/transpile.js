const fs = require('fs')
const util = require('util')
const jsdom = require('jsdom')
const { execFileSync } = require('child_process')
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
  return { name, template, style, script }
}

function createJsComponent(name, template, style, script) {
  const initFunction = script ? `init: function() {${script}}` : ''
  const properties = [
    `template: \`${escapeLiteral(template)}\``,
    `style: \`${escapeLiteral(style)}\``
  ]
  if(script) properties.push(`init: function() {${script}}`)
  return `lego('${name}', {${properties.join(', ')}})`
}

function transpile(path) {
  const { name, template, style, script } = readHTMLComponent(path)
  return {
    name: name,
    content: createJsComponent(name, template, style, script)
  }
}

// Non ES7 module because of Node 11…
module.exports = { transpile, readHTMLComponent, createJsComponent }
