function toCamelCase(name) {
  if (!name.includes('-')) return name
  return name.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
}

export { toCamelCase }
