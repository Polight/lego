const html = `
<root id="__root__">
  <h1>Lego</h1>
  <p>The light webcomponent library</p>
  <ul class="list">
    <li>fast</li>
    <li>small<span>😁</span></li>
  </ul>
  <a :click=clicked></a>
</root>
`

import DomParser from 'dom-parser'

const parser = new DomParser()
const dom = parser.parseFromString(html)
const root = dom.getElementById('__root__')

function nodeToVDom(node) {
  return `h("${node.nodeName}", {}, "${node.textContent}")`
}

console.debug(root.childNodes)

console.log(dom.childNodes)
