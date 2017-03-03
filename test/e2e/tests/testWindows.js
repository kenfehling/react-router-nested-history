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
    checkWindowZIndex(client.url(path('/foods/Fruit')), 1, 3).end()
  },

  'Check /windows/1 zIndex': (client) => checkLoadWindowZIndex(client, 1).end(),

  'Check /windows/2 zIndex': (client) => checkLoadWindowZIndex(client, 2).end(),
}