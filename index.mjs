const html = `
  <h1>Lego</h1>
  <!-- welcome -->
  <p>The light webcomponent \${state.list.length} library</p>
  <ul class="list" :if="state.list.length">
    <li :for="item, i in state.list" :if="i > 1">fast \${item}</li>
  </ul>
  <a :href="dothis" class="dothat" @click="go"></a>
`

import parse from './lib/parser.mjs'

console.debug(parse(html))
