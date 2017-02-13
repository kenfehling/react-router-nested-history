const path = (p) => 'http://localhost:8080' + p
const className = '.state-tree'

export default {
  'Shows HistoryTree': (client) => {
    client
      .url(path('/tabs/2'))
      .getText(className, function(result) {
        client.assert.ok(result.value.length > 1)

      })
      .end()
  },

  'Shows HistoryTree after refresh on non-default page': (client) => {
    client
      .url(path('/tabs/2'))
      .refresh()
      .getText(className, function(result) {
        client.assert.ok(result.value.length > 1)

      })
      .end()
  }
}