import { parseFragment } from 'parse5' 


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
  node.attrs = node.attrs.reduce((attrs, attr) => {
    let name = attr.name
    let value = attr.value
    if(name === ':for') directives.push({ name: 'for', value })
    else if(name === ':if') directives.push({ name: 'if', value })
    else if(name.startsWith(':')) {
      name = name.slice(1)
      attrs.push({ name, value })
    }
    else if(name.startsWith('@')) {
      name = `on${name.slice(1)}`
      // Complexity due to retro-compatibility (class version).
      // Short will be: const func = `${value}.bind(this)`
      const func = `(typeof ${value} !== 'undefined' ? ${value} : this.${value}).bind(this)`
      attrs.push({ name, value: func })
    }
    else attrs.push({ name, value: `\`${value}\`` })
    return attrs
  }, [])
  return [node, directives]
}

function wrapDirectives(directives, content, indent = '') {
  directives.reverse().forEach(directive => {
    if(directive.name === 'if') return content = `((${directive.value}) ? ${content} : '')`
    if(directive.name === 'for') {
      const [_, item, items] = directive.value.match(/\s*(.*)\s+in\s+(.*)\s*/)
      return content = `((${items}).map((${item}) => (${content})))`
    }
  })
  return indent + content
}

function convert(node, indentSize = 0) {
  const indent = ' '.repeat(indentSize)
  if(node.nodeName === '#text') {
    return node.value.trim() ? `\`${node.value}\`` : ''
  }
  if(node.nodeName === '#document-fragment') {
    return `[${indent}\n${cleanChildren(node.childNodes).map(c => convert(c, indentSize + 2)).join(',\n')}\n  ]`
  }
  let directives
  [node, directives] = extractDirectives(node)
  const attributes = node.attrs.reduce((attrs, attr) => Object.assign(attrs, {[attr.name]: attr.value }), {})
  const children = node.childNodes ? cleanChildren(node.childNodes).map(c => convert(c, indentSize + 2)).join(',\n') : ''
  let childrenIndent
  if(!node.childNodes || node.childNodes.length === 0) childrenIndent = JSON.stringify('')
  else if(node.childNodes.length === 1) childrenIndent = children
  else childrenIndent = `[\n${children}\n${indent}]`
  return wrapDirectives(directives, vnode(node.nodeName, attributes, childrenIndent), indent)
}

function parse(html, indentSize) {
  const document = parseFragment(html)
  return convert(document, indentSize)
}

export default parse
