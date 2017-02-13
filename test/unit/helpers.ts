import Page from '../../src/model/Page'

export const waitFor = (condition:() => boolean):Promise<{}> => {
  return new Promise((resolve) => {
    setInterval(() => {
      if (condition()) {
        resolve()
      }
    }, 1)
  })
}

export const createPage = (url:string) => new Page({
  url,
  params: {},
  groupName: 'Group 1',
  containerName: 'Container 1',
  firstVisited: 1000
})