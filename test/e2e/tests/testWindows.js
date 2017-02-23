const path = (p) => 'http://localhost:8080' + p

const checkWindowZIndex = (client, windowNumber, expected) => {
  return client
    .getCssProperty('.window' + windowNumber, 'z-index', r => {
      console.log(r.value)
      client.assert.equal(r.value, expected)
    })
}

const checkLoadWindowZIndex = (client, windowNumber) => {
  const loadWindow = client.url(path('/windows/' + windowNumber))
  return checkWindowZIndex(loadWindow, windowNumber, 3)
}

export default {
  'Check original default window z-index': (client) => {
    checkWindowZIndex(client.url(path('/tabs/1')), 1, 3).end()
  },

  'Back from /windows/1 should go to zero page': (client) => {
    client
      .url(path('/windows/1'))
      .back()
      .assert.urlEquals(path('/tabs/1'))
      .end()
  },

  'Check /windows/1 zIndex': (client) => checkLoadWindowZIndex(client, 1).end(),

  'Check /windows/2 zIndex': (client) => checkLoadWindowZIndex(client, 2).end(),
}