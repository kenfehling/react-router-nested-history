const path = (p) => 'http://localhost:8080' + p

export default {
  'Try': (client) => {
    client
      .url(path('/tabs/1'))
      .click('a[href="/foods/Fruits/Apple"]')
      .pause(1500)
      .assert.containsText('.food-title', 'Fruits > Apple')
      .click('a[href="/foods/Fruits/Apple/Green"]')
      .pause(1500)
      .assert.containsText('.food-title', 'Fruits > Apple > Green')
      .click('a[href="/foods/Fruits/Apple"]')
      .pause(1500)
      .assert.containsText('.food-title', 'Fruits > Apple')
      .end()
  },

}