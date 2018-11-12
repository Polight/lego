const fs = require('fs')
const { walkDir } = require('../utils.js')
const { transpile } = require('../transpile.js')


let [source, target] = process.argv.slice(2)

if(!source) throw new Error("first argument 'source' is required.")
if(!target) target = './components.js'

async function compile(source, target) {
  const filenames = await walkDir(source, ['html'])
  const components = filenames.map(f => transpile(f))
  const output = `
import lego from '/lego/index.js'
${components.map(c => c.content).join('\n')}
`
  fs.writeFileSync(target, output, 'utf8')
  return components.map(c => c.name)

}

(async () => {
  const names = await compile(source, target)
  console.info(`The following components were compiled into "${target}": ${names.join(', ')}.`)
})()
