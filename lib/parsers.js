function directives(template) {
  template = template.replace(/:(for|if)=/g, 'l--$1=')
  let dom = document.createElement('dom')
  dom.innerHTML = template
  dom = directiveFor(dom)
  dom = directiveIf(dom)
  return dom.innerHTML
}

function directiveFor(dom) {
  Array.from(dom.querySelectorAll('[l--for]')).forEach(node => {
    const attr = node.getAttribute('l--for')
    const [_, key, expr] = attr.match('(.+) in (.+)\s*')
    node.removeAttribute('l--for')
    node.insertAdjacentText('beforebegin', '${(' + expr + '.map(function (' + key + ') { return `')
    node.insertAdjacentText('afterend', '`})).join("")}')
  })
  return dom
}

function directiveIf(dom) {
  Array.from(dom.querySelectorAll('[l--if]')).forEach(node => {
    const expr = node.getAttribute('l--if')
    node.removeAttribute('l--if')
    node.insertAdjacentText('beforebegin', '${' + expr + ' ? `')
    node.insertAdjacentText('afterend', '` : ""}')
  })
  return dom
}

function literal(html, context = {}) {
  const templater = new Function(`
    const { ${Object.keys(context).join(', ')} } = this
    return \`${html}\`
  `)
  return templater.call(context) || ''
}

export { directives, literal }
