export function command(callback) {
  return this.execute(
    () => Object.assign({}, localStorage),
    [],
    result => callback(result.value)
  )
}