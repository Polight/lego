import { parseFragment } from 'parse5' 

class Node {
  constructor(nodeName = "", sibling = new Node(), content = "", attributes = [], children = [], indentSize = 0) {
    this.nodeName = nodeName
    this.sibling = sibling
    this.content = content
    this.attributes = attributes
    this.children = children
    this.indentSize = indentSize
  }

  get childrenString() {
  }

  toString() {
    return `<${this.nodeName}>`
  }
}

class Directive {
  name = ""
  value = ""
}

function vnode(name, attributes = {}, children = '', indent = '') {
  const attrs = Object.keys(attributes).reduce((acc, name) => {
    acc.push(`"${name}": ${attributes[name]}`)
    return acc
  }, [])
  return `${indent}h("${name}", {${attrs.join(', ')}}, ${children})`
}

function cleanChildren(children = []) {
  return children.filter(c => {
    if(!c.nodeName.startsWith('#')) return true
    return c.value && c.value.trim()
  })
}

function extractDirectives(node) {
  const directives = []
  const sibling = node.nextElementSibling
  node.attrs = node.attrs.reduce((attrs, attr) => {
    let name = attr.name
    let value = attr.value
    if(name === ':for') directives.push({ name: 'for', value })
    else if(name === ':if') {
      directives.push({ name: 'if', value })
    }
    else if(name.startsWith(':')) {
      name = name.slice(1)
      attrs.push({ name, value })
    }
    else if(name.startsWith('@')) {
      name = `on${name.slice(1)}`
      value = `this.${value}.bind(this)`
      attrs.push({ name, value })
    }
    else attrs.push({ name, value: `\`${value}\`` })
    return attrs
  }, [])
  return [node, directives]
}

function wrapDirectives(directives, content, indent = '', sibling) {
  directives.reverse().forEach(directive => {
    if(directive.name === 'if') return content = `((${directive}) ? ${content} : ${sibling})`
    if(directive.name === 'for') {
      const [_, item, items] = directive.value.match(/\s*(.*)\s+in\s+(.*)\s*/)
      return content = `((${items}).map((${item}) => (${content})))`
    }
  })
  return indent + content
}

function getSibling(parentNode, index) {
  // console.debug({index})
  // console.debug(parentNode.childNodes[index].nodeName)
  // console.debug(parentNode.childNodes[index + 1]?.nodeName)
  // console.debug("\n=====\n")
  return parentNode.childNodes
  .slice(index + 1)
  .find(c => !c.nodeName.startsWith('#'))
}

function convert(node, indentSize = 0, sibling) {
  const indent = ' '.repeat(indentSize)
  if(node.nodeName === '#text') {
    return node.value.trim() ? `\`${node.value}\`` : ''
  }
  if(node.nodeName === '#document-fragment') {
    return `[${indent}\n${cleanChildren(node.childNodes).map((c, i) => convert(c, indentSize + 2, getSibling(node, i))).join(',\n')}]`
  }
  let directives
  [node, directives] = extractDirectives(node)
  const children = node.childNodes ? cleanChildren(node.childNodes).map((c, i) => convert(c, indent + 4, getSibling(node, i))).join(',\n') : ''
  let childrenIndent
  if(!node.childNodes || node.childNodes.length === 0) childrenIndent = JSON.stringify('')
  else if(node.childNodes.length === 1) childrenIndent = children
  else childrenIndent = `[\n${children}\n]`

  const nodeData = {
    nodeName: node.nodeName,
    attributes: node.attrs.reduce((attrs, attr) => Object.assign(attrs, {[attr.name]: attr.value }), {}),
    indent: childrenIndent
  }
  console.debug(nodeData)
  let siblingData
  if(sibling && nodeData.attributes) {
    siblingData = {
      nodeName: sibling.nodeName,
      attributes: sibling.attrs.reduce((attrs, attr) => Object.assign(attrs, {[attr.name]: attr.value }), {}),
      indent: childrenIndent
    }
  }

  return wrapDirectives(
    directives,
    vnode(nodeData.nodeName, nodeData.attributes, nodeData.childrenIndent), 
    indent, 
    sibling && vnode(sibling.nodeName, sibling.attributes, childrenIndent)
  )

}

function parse(html) {
  const document = parseFragment(html)
  return convert(document)
}

export default parse
