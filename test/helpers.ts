export const waitFor = (condition:() => boolean):Promise<{}> => {
  return new Promise((resolve) => {
    setInterval(() => {
      if (condition()) {
        resolve()
      }
    }, 1)
  })
}