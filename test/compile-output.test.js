import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

import { createComponent } from '../src/compiler/transpiler.js'

const stubUrl = pathToFileURL(resolve('test/fixtures/lego-stub.js')).href
const { Component } = await import(stubUrl)

function baseConfig(overrides = {}) {
  return {
    importPath: stubUrl,
    baseClassName: 'Lego',
    useShadowDOM: true,
    preScript: '',
    preStyle: '',
    version: 'test-version',
    ...overrides
  }
}

// Compile `html`, write it to disk and import it like a browser would.
async function load(html, config) {
  const { content } = createComponent({ html, name: 'x-test', config: baseConfig(config) })
  const dir = await mkdtemp(join(tmpdir(), 'lego-test-'))
  const file = join(dir, 'x-test.js')
  await writeFile(file, content)
  try {
    const module = await import(pathToFileURL(file).href)
    return { Brick: module.default, content }
  } finally {
    await rm(dir, { recursive: true })
  }
}

test('compiled brick without <script> is a valid Component subclass', async () => {
  const { Brick } = await load('<template><p>hi</p></template>')

  assert.ok(Brick.prototype instanceof Component)
  assert.ok('vdom' in Brick.prototype)
})

test('compiled brick with `export default class extends Lego` keeps user members', async () => {
  const { Brick } = await load(`
<template><p>hi</p></template>
<script>
  export default class extends Lego {
    answer = 42
  }
</script>`)

  assert.ok(Brick.prototype instanceof Component)
  assert.ok('vdom' in Brick.prototype)
  assert.equal(new Brick().answer, 42)
})

test('compiled brick honours useShadowDOM from the config', async () => {
  const shadow = await load('<template><p>hi</p></template>', { useShadowDOM: true })
  const light = await load('<template><p>hi</p></template>', { useShadowDOM: false })

  assert.equal(new shadow.Brick().useShadowDOM, true)
  assert.equal(new light.Brick().useShadowDOM, false)
})

test('compiled brick has no vstyle when there is no style at all', async () => {
  const { Brick } = await load('<template><p>hi</p></template>')

  assert.equal('vstyle' in Brick.prototype, false)
})

test('compiled brick has a vstyle when the brick or the config has styles', async () => {
  const own = await load('<template><p>hi</p></template><style>p { color: red }</style>')
  const pre = await load('<template><p>hi</p></template>', { preStyle: 'p { color: red }' })

  assert.equal('vstyle' in own.Brick.prototype, true)
  assert.equal('vstyle' in pre.Brick.prototype, true)
})

test('compiled brick injects config.preScript before the brick code', async () => {
  const { content } = await load(
    '<template><p>hi</p></template>',
    { preScript: 'const injected = 1' }
  )

  assert.match(content, /const injected = 1/)
})
