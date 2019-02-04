function isPrimitive(value) {
  const type = typeof value
  return value == null || (type != 'object' && type != 'function')
}

export { isPrimitive }
