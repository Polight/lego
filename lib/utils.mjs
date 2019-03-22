import { execFileSync } from 'child_process'


function isPrimitive(value) {
  const type = typeof value
  return value == null || (type != 'object' && type != 'function')
}

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


export { isPrimitive, walkDir, escapeLiteral, htmlToDom }
