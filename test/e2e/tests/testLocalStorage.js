const storedActions = (storage) => JSON.parse(storage['actions'])
const path = (p) => 'http://localhost:8080' + p
const N = 17  // initial number of actions

export default {
  'localStorage': (client) => {
    client
      .url(path('/tabs/1'))
      .localStorage((ls) => client.assert.equal(storedActions(ls).length, N))
      .end()
  },

  'Remove old actions': (client) => {
    client
      .url(path('/tabs/1'))
      .url(path('/tabs/1'))
      .localStorage((ls) => client.assert.equal(storedActions(ls).length, N))
      .end()
  }
}