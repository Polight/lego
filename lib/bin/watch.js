const fs = require('fs')
const { compile, build } = require('./compile.js')


const [source, target] = process.argv.slice(2)

console.log(`Watching for changes in ${source}`)
fs.watch(source, async (event, filename) => {
  console.info(`${filename} has changed, recompiling…`)
  await compile(source, target)
})

compile(source, target)
