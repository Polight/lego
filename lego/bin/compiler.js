const fs = require('fs')
const util = require('util')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

const [sourceFile, targetFile] = process.argv.slice(2)

function escapeLiteral(text) {
  return text.replace(/\${/g, '\\${')
}

const content = fs.readFileSync(sourceFile, 'utf8')

const dom = new JSDOM(content)
const document = dom.window.document

const template = document.querySelector('template')
const name = template.getAttribute('name')
           || s.toLowerCase().split('/').splice(-1)[0].split('.')[0] // File name without extension
const html = template.innerHTML
const style = document.querySelector('style').outerHTML
const script = document.querySelector('script').innerHTML

const output = `
import lego from '/lego/index.js'

lego('${name}', {
  template: \`${escapeLiteral(html)}\`,
  style: \`${escapeLiteral(style)}\`,
  context: {}
})
`

fs.writeFileSync(targetFile, output, 'utf8')
