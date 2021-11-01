#! /usr/bin/env node

import fs from 'fs'
import os from 'os'
import { execFileSync } from 'child_process'
import { createComponent, generateIndex } from '../src/compiler/transpiler.js'
import defaultConfig from '../src/compiler/config.js'

const packagePath = fs.existsSync('./node_modules/@polight/lego/package.json')
  ? './node_modules/@polight/lego/package.json'
  : './package.json'
const { version } = JSON.parse(fs.readFileSync(packagePath))
const args = process.argv
const [sourceDir, targetDir] = args.slice(2).filter(a => !a.startsWith('-'))
const argsConfig = {
  sourceDir,
  targetDir,
  watch: args.indexOf('-w') >= 0
}

function mergeObjects(native, override) {
  return Object.keys(native).reduce((obj, key) => {
    obj[key] = (key in override && override[key])
      ? override[key]
      : native[key]
    return obj
  }, {})
}

async function walkDir(dirname, extensions) {
  let stdout
  if(os.platform() === 'win32') stdout =  execFileSync('cmd', ['/c', 'dir', '/s', '/b', dirname])
  else stdout =  execFileSync('find', [dirname])
  const dirs = String(stdout).split(os.EOL).filter(d => d)
  if(!extensions) return dirs
  return dirs.filter(d => extensions.includes(d.split('.').splice(-1)[0]))
}

async function compile(sourceDir, targetDir, config) {
  const filenames = await walkDir(sourceDir, ['html'])
  fs.mkdirSync(targetDir, { recursive: true })
  return filenames.map(f => {
    const filename = os.platform() === 'win32'
      ? f.replace(/.*\\(.+)\.html/, '$1')
      : f.replace(/.*\/(.+)\.html/, '$1')
    const component = createComponent({
      html: fs.readFileSync(f, 'utf8'),
      name: filename,
      ...config
    })
    fs.writeFileSync(`${targetDir}/${filename}.js`, component.content, 'utf8')
    return { component, filename }
  })
}

async function writeIndex(targetDir, filenames) {
  const content = generateIndex(filenames)
  fs.writeFileSync(`${targetDir}/index.js`, content, 'utf8')
}

async function build() {
  let userConfig = {}
  try {
    const content = await import(`${process.cwd()}/lego.config.js`)
    userConfig = content.default
  }
  catch {
    console.warn('⚠️  Missing lego.config.js file, building with defaults.')
  }
  const config = mergeObjects(mergeObjects(defaultConfig, userConfig), argsConfig)
  const { sourceDir, targetDir } = config
  const compiled = await compile(sourceDir, targetDir, config)
  writeIndex(targetDir, compiled.map(c => c.filename))
  const names = compiled.map(c => c.component.name)
  console.info(`⚙️  Current configuration:`, config)
  console.info(`🏗  ${names.length} component${names.length > 1 ? 's were' : ' was'} compiled into "${config.targetDir}": ${names.join(', ')}.`)

  if (config.watch) {
    console.info(`\n👀 Watching changes in ${sourceDir}…`)
    fs.watch(sourceDir, async (event, filename) => {
      await compile(sourceDir, targetDir)
      console.info(`  ♻️  ${filename} was recompiled!`)
    })
  }
}

build()
