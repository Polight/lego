function directives(template, context = {}) {
  template = template.replace(/ :(for|if)="/g, ' l--$1="')
  template = template.replace(/ @([a-z]+)="/g, ' l--event l--event--$1="')
  template = template.replace(/ :([a-z]+)="/g, ' l--prop l--prop--$1="')
  let dom = document.createElement('dom')
  dom.innerHTML = template
  dom = directiveFor(dom, context)
  dom = directiveIf(dom)
  return dom.innerHTML
}

function directiveFor(dom, context = {}) {
  Array.from(dom.querySelectorAll('[l--for]')).forEach(node => {
    const attr = node.getAttribute('l--for')
    const [_, keys, expr] = attr.match('(.+) in (.+)\s*')
    node.removeAttribute('l--for')
    const list = eval(`context.${expr}`)
    node.state = { list }
    node.insertAdjacentText('beforebegin', `\${${expr}.map(function (${keys}) { return \``)
    node.insertAdjacentText('afterend', '`}).join("")}')
    // console.debug('loop on ', node, expr)
    // const letters = [{ type: 'vowel', unit: 'a' }, { type: 'consonant', unit: 'b' }]
    // const loopy = (letters.map(function(letter, i) {
    //   return literal(`<p>element: \${letter.type}</p>`, { letter })
    // }).join(''))

    // const tmp = document.createElement('dom')
    // tmp.innerHTML = loopy
    // console.debug(tmp.innerHTML)
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

function assignEvents(dom) {
  Array.from(dom.querySelectorAll('[l--event]')).forEach(node => {
    node.removeAttribute('l--event')
    Array.from(node.attributes).filter(attr => attr.name.startsWith('l--event--')).forEach(attr => {
      node.addEventListener(attr.name.replace('l--event--', ''), context[attr.value])
      node.removeAttribute(attr.name)
    })
  })
  return dom
}

function assignProperties(dom, context = {}) {
  Array.from(dom.querySelectorAll('[l--prop]')).forEach(node => {
    node.removeAttribute('l--prop')
    Array.from(node.attributes).filter(attr => attr.name.startsWith('l--prop--')).forEach(attr => {
      const name = attr.name.replace('l--prop--', '')
      const value = eval(`context.${attr.value}`)
      if(!node.state) node.state = {}
      node.state[name] = value
      node.removeAttribute(attr.name)
    })
  })
  return dom

}

function literal(html, context = {}) {
  const templater = new Function(`
    const { ${Object.keys(context).join(', ')} } = this
    console.debug('literal', { ${Object.keys(context).join(', ')} })
    return \`${html}\`
  `)
  return templater.call(context) || ''
}

export { directives, literal, assignEvents, assignProperties }
