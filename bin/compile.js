#! /usr/bin/env node

import fs from 'fs'
import os from 'os'
import { execFileSync } from 'child_process'
import { createComponent, generateIndex } from '../src/compiler/transpiler.js'
import defaultConfig from '../src/compiler/config.js'

// Read the config from the args
const cliArgs = process.argv.slice(2)

if (cliArgs.includes('-h') || cliArgs.includes('--help')) {
  console.info(`LEGO compiler\n\nUsage:\n  lego [sourceDir] [targetDir] [options]\n\nArguments:\n  sourceDir      Source directory containing .html components (default: bricks)\n  targetDir      Output directory for compiled .js files (default: dist)\n\nOptions:\n  -w, --watch    Watch source files and recompile on changes\n  -h, --help     Show this help message\n\nExamples:\n  lego\n  lego bricks dist\n  lego bricks dist --watch`)
  process.exit(0)
}

const [sourceDir, targetDir] = cliArgs.filter(a => !a.startsWith('-'))
const argsConfig = {
  sourceDir,
  targetDir,
  watch: cliArgs.includes('-w') || cliArgs.includes('--watch')
}

/**
 * Merge 2 objects.
 * This is different from `Object.assign` as it will only overwrite
 * property that have a defined value.
 * @param {Object} native
 * @param {Object} override
 * @returns {Object} the graal you prayed for 🤲
 */
function mergeObjects(native, override) {
  return Object.keys(native).reduce((obj, key) => {
    obj[key] = (key in override && typeof override[key] !== 'undefined')
      ? override[key]
      : native[key]
    return obj
  }, {})
}

/**
 * Detect if the running system is a Microsoft Windows®
 * @returns boolean
 */
function isWindows() {
  return os.platform() === 'win32'
}

/**
 * Browse files in a directory considering some extensions.
 *
 * @param {string} dirname Name of the directory from where to list
 * @param {string} extensions list of extensions to read from
 * @returns {Array} list of file path
 */
async function walkDir(dirname, extensions) {
  const stdout = isWindows()
    ? execFileSync('cmd', ['/c', 'dir', '/s', '/b', fs.realpathSync(dirname)])
    : execFileSync('find', [dirname])
  const dirs = String(stdout).split(os.EOL).filter(d => d)
  if(!extensions) return dirs
  return dirs.filter(d => extensions.includes(d.split('.').splice(-1)[0]))
}

/**
 * Convert a series of HTML components into JS components.
 *
 * @param {string} sourceDir directory from where to read HTML components
 * @param {string} targetDir directory where to write JS components
 * @param {Object} config
 * @returns {Object} { component, filename } object
 */
async function compile(sourceDir, targetDir, config) {
  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Source directory "${sourceDir}" was not found. Check your path or create it first.`)
  }

  if (!fs.statSync(sourceDir).isDirectory()) {
    throw new Error(`Source path "${sourceDir}" is not a directory.`)
  }

  const filenames = await walkDir(sourceDir, ['html'])
  fs.mkdirSync(targetDir, { recursive: true })
  return filenames.map(f => {
    const pattern = isWindows() ? /.*\\(.+)\.html/ : /.*\/(.+)\.html/
    const filename = f.replace(pattern, '$1')
    const component = createComponent({
      html: fs.readFileSync(f, 'utf8'),
      name: filename,
      config
    })
    fs.writeFileSync(`${targetDir}/${filename}.js`, component.content, 'utf8')
    return { component, filename }
  })
}

/**
 * Create an index.js file in a directory
 * @param {string} targetDir Directory where to write the file
 * @param {string} filenames List of files name to interpret as components
 */
async function writeIndex(targetDir, filenames) {
  const content = generateIndex(filenames)
  fs.writeFileSync(`${targetDir}/index.js`, content, 'utf8')
}

/**
 * Build the whole stuff:
 * 1. calculate best configuration
 * 2. compile sourceDir to targetDir
 * 3. create the index.js and its content
 * 4. if `watch`ing for changes, run `compile` over again
 */
async function build() {
  let userConfig = {}
  try {
    const pathPrefix = isWindows() ? 'file://' : ''
    console.debug(`${pathPrefix + process.cwd()}/lego.config.js`)
    const content = await import(`${pathPrefix + process.cwd()}/lego.config.js`)
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
  console.info('⚙️  Current configuration:', config)
  console.info(`🏗  ${names.length} component${names.length > 1 ? 's were' : ' was'} compiled into "${config.targetDir}": ${names.join(', ')}.`)

  if (config.watch) {
    console.info(`\n👀 Watching changes in ${sourceDir}…`)
    fs.watch(sourceDir, async (event, filename) => {
      const compiled = await compile(sourceDir, targetDir, config)
      if (event === 'rename') {
        writeIndex(targetDir, compiled.map(c => c.filename))
      }
      console.info(`  ♻️  ${filename} was recompiled!`)
    })
  }
}

build().catch((error) => {
  console.error(`❌ ${error.message}`)
  process.exit(1)
})
