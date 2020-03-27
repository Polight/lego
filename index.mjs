const html = `
  <h1>Lego</h1>
  <p>The light webcomponent library</p>
  <ul class="list">
    <li>fast</li>
    <li>small<span>😁</span></li>
  </ul>
  <a :href="dothis" class="dothat" @click="go"></a>
`

import parse from './lib/parser.mjs'

console.debug(parse(html))
