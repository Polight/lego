const fs = require('fs')
const { walkDir } = require('../utils.js')
const { transpile } = require('../transpile.js')


const [source, target] = process.argv.slice(2)

if(!source) throw new Error("first argument 'source' is required.")
if(!target) target = './components.js'

async function compile(source, target) {
  const filenames = await walkDir(source, ['html'])
  const components = filenames.map(f => transpile(f))
  const output = `import lego from '/lego/index.js'
                  ${components.map(c => c.content).join('\n')}
                  `.replace(/\s{2,}/g, ' ')
  fs.writeFileSync(target, output, 'utf8')
  return components.map(c => c.name)
}

async function build() {
  await compile(source, target)
  const names = await build()
  return console.info(`${names.length} components were compiled into "${target}": ${names.join(', ')}.`)
}
build()

module.exports = { compile, build }
