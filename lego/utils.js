const { execFileSync } = require('child_process')


async function walkDir(dirname, extensions) {
  const stdout = await execFileSync('find', [`${dirname}`])
  const dirs = String(stdout).split('\n').filter(d => d)
  if(!extensions) return dirs
  return dirs.filter(d => extensions.includes(d.split('.').splice(-1)[0]))
}

function escapeLiteral(text) {
  return text.replace(/\${/g, '\\${')
}

module.exports = { walkDir, escapeLiteral }
