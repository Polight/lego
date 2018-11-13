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

  const template = document.querySelector('template')
  const name = template.getAttribute('name')
             || path.toLowerCase().split('/').splice(-1)[0].split('.')[0] // File name without extension
  const html = template.innerHTML
  const style = document.querySelector('style').outerHTML
  const script = document.querySelector('script').innerHTML
  return { name, html, style, script }
}

function createJsComponent(name, html, style, script) {
  const initFunction = script ? `init: function() {${script}}` : ''
  return `lego('${name}', {template: \`${escapeLiteral(html)}\`, style: \`${escapeLiteral(style)}\`, context: {}, ${initFunction}})`
}

function transpile(path) {
  const { name, html, style, script } = readHTMLComponent(path)
  return {
    name: name,
    content: createJsComponent(name, html, style, script)
  }
}

// Non ES7 module because of Node 11…
module.exports = { transpile, readHTMLComponent, createJsComponent }
