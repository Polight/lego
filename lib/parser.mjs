import parser from 'parse5'


function convertAttribute(attr) {
  return attr
}

function vnode(name, attributes = {}, children = '', indent = 0) {
  return `${indent}h("${name}", ${JSON.stringify(attributes)}, ${children})`
}

function cleanChildren(children = []) {
  return children.filter(c => {
    if(!c.nodeName.startsWith('#')) return true
    return c.value && c.value.trim()
  })
}

function convert(node, indentSize = 0) {
  const indent = ' '.repeat(indentSize)
  if(node.nodeName === '#text') {
    return node.value.trim() ? JSON.stringify(node.value) : ''
  }
  if(node.nodeName === '#document-fragment') {
    return `[${indent}\n${cleanChildren(node.childNodes).map(c => convert(c, indentSize + 2)).join(',\n')}]`
  }

  const name = JSON.stringify(node.nodeName)
  const attributes = node.attrs ? node.attrs.reduce((attrs, attr) => Object.assign(attrs, {[attr.name]: attr.value }), {}) : {}
  const children = node.childNodes ? cleanChildren(node.childNodes).map(c => convert(c, indent + 4)).join(',\n') : ''
  let childrenIndent
  if(!node.childNodes || node.childNodes.length === 0) childrenIndent = JSON.stringify('')
  else if(node.childNodes.length === 1) childrenIndent = children
  else childrenIndent = `[\n$${children}\n]`
  return vnode(node.nodeName, attributes, childrenIndent, indent)
}

function parse(html) {
  const document = parser.parseFragment(html)
  return convert(document)
}

export default parse
