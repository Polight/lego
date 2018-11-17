const { execFileSync } = require('child_process')

function htmlToDom(html) {
  const container = document.createElement('div')
  container.innerHTML = html
  return container
}

function escapeLiteral(text) {
  return text && text.replace(/\${/g, '\\${') || ''
}

async function walkDir(dirname, extensions) {
  const stdout = await execFileSync('find', [`${dirname}`])
  const dirs = String(stdout).split('\n').filter(d => d)
  if(!extensions) return dirs
  return dirs.filter(d => extensions.includes(d.split('.').splice(-1)[0]))
}

module.exports = { walkDir, escapeLiteral, htmlToDom }
