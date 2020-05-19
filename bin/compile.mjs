#! /usr/bin/env node

import fs from 'fs'
import { env } from 'process'
import { execFileSync } from 'child_process'
import { createComponent } from '../lib/transpiler.mjs'


const args = process.argv
const watchIndex = args.indexOf('-w')
const watch = watchIndex >= 0 && args.splice(watchIndex, 1)
let [sourceDir, targetDir] = args.slice(2)
const libPath = env.BRICK_URL || 'https://unpkg.com/@polight/brick/lib'


if(!sourceDir) throw new Error("first argument 'source' is required.")
if(!targetDir) targetDir = './dist'

async function walkDir(dirname, extensions) {
  let stdout
  if(os.platform() === 'win32') stdout =  execFileSync('cmd', ['/c', 'dir', '/s', '/b', dirname])
  else stdout =  execFileSync('find', [dirname])
  const dirs = String(stdout).split(os.EOL).filter(d => d)
  if(!extensions) return dirs
  return dirs.filter(d => extensions.includes(d.split('.').splice(-1)[0]))
}

async function compile(sourceDir, targetDir) {
  const filenames = await walkDir(sourceDir, ['html'])
  fs.mkdirSync(targetDir, { recursive: true })
  return filenames.map(f => {
    const filename = os.platform() === 'win32' ? f.replace(/.*\\(.+)\.html/, '$1') : f.replace(/.*\/(.+)\.html/, '$1')
    const component = createComponent(fs.readFileSync(f, 'utf8'), filename, libPath)
    fs.writeFileSync(`${targetDir}/${filename}.js`, component.content, 'utf8')
    return { component, filename }
  })
}

async function generateIndex(targetDir, filenames) {
  const content = filenames.map((f, i) => `import c${i + 1} from './${f}.js'`).join('\n')
  fs.writeFileSync(`${targetDir}/index.js`, content, 'utf8')
}

async function build() {
  const compiled = await compile(sourceDir, targetDir)
  generateIndex(targetDir, compiled.map(c => c.filename))
  const names = compiled.map(c => c.component.name)
  return console.info(`🏗  ${names.length} component${names.length > 1 ? 's were' : ' was'} compiled into "${targetDir}": ${names.join(', ')}.`)
}

build()

if (watch) {
  console.info(`\n👀 Watching changes in ${sourceDir}…`)
  fs.watch(sourceDir, async (event, filename) => {
    await compile(sourceDir, targetDir)
    console.info(`  ♻️  ${filename} was recompiled!`)
  })
}
