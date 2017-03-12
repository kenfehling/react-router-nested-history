const path = (p) => 'http://localhost:8080' + p
const PAUSE = 1600

export default {
  'PopState': (client) => {
    client
      .url(path('/mobile'))
      .end()
  },

}