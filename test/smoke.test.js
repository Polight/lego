import test from 'node:test'
import assert from 'node:assert/strict'

import { createComponent, generateIndex } from '../src/compiler/transpiler.js'
import { toCamelCase } from '../src/utils.js'

test('createComponent compiles a basic HTML component shell', () => {
  const html = `
<template>
  <h1>Hello ${'${state.name}'}</h1>
</template>

<script>
  export default class extends Lego {
    state = { name: 'LEGO' }
  }
</script>

<style>
  h1 { color: chocolate; }
</style>
`

  const config = {
    importPath: './dist/lego.min.js',
    baseClassName: 'Lego',
    useShadowDOM: true,
    preStyle: '',
    version: 'test-version'
  }

  const result = createComponent({
    html,
    name: 'lean-welcome',
    config
  })

  assert.equal(result.name, 'lean-welcome')
  assert.match(result.content, /import \{ h, Component \} from '\.\/dist\/lego\.min\.js'/)
  assert.match(result.content, /export default class extends Lego/)
  assert.match(result.content, /state = \{ name: 'LEGO' \}/)
})

test('generateIndex creates custom element registration entries', () => {
  const index = generateIndex(['lean-welcome', 'user-card'])

  assert.match(index, /import leanWelcome from '\.\/lean-welcome\.js'/)
  assert.match(index, /customElements\.define\('lean-welcome', leanWelcome\)/)
  assert.match(index, /import userCard from '\.\/user-card\.js'/)
  assert.match(index, /customElements\.define\('user-card', userCard\)/)
})

test('toCamelCase converts kebab-case and keeps plain words as-is', () => {
  assert.equal(toCamelCase('duration'), 'duration')
  assert.equal(toCamelCase('custom-event-name'), 'customEventName')
  assert.equal(toCamelCase('x-foo'), 'xFoo')
})
