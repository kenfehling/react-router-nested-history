const path = (p) => 'http://localhost:8080' + p
const PAUSE = 1600

export default {
  'PopState': (client) => {
    client
      .url(path('/mobile'))
      .click('a[href="/foods/Fruit/Apple"]')
      .pause(PAUSE)
      .assert.containsText('.food-title', 'Fruit > Apple')
      .click('a[href="/foods/Fruit/Apple/Green"]')
      .pause(PAUSE)
      .assert.containsText('.food-title', 'Fruit > Apple > Green')
      .click('a[href="/foods/Fruit/Apple"]')
      .pause(PAUSE)
      .assert.containsText('.food-title', 'Fruit > Apple')
      .end()
  },

}