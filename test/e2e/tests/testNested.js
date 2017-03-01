const path = (p) => 'http://localhost:8080' + p
const PAUSE = 1500

export default {
  'Nested': (client) => {
    client
      .url(path('/tabs/1'))
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