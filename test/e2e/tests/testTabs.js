const path = (p) => 'http://localhost:8080' + p

export default {
  'Check content when other group loaded': (client) => {
    client
      .url(path('/windows/1'))
      .assert.containsText('.tab-title', 'Tab 1')
      .end()
  },

  'Back from /tabs/1 should go to zero page': (client) => {
    client
      .url(path('/tabs/1'))
      .back()
      .assert.urlEquals(path('/tabs/1'))
      .end()
  },

  'Push, back, forward': (client) => {
    client
      .url(path('/tabs/1'))
      .click('#react-tabs-1 a')
      .assert.urlEquals(path('/tabs/1/balloon'))
      .back()
      .assert.urlEquals(path('/tabs/1'))
      .forward()
      .assert.urlEquals(path('/tabs/1/balloon'))
      .end()
  },

  'Push, back, switch, back, forward': (client) => {
    client
      .url(path('/tabs/1'))
      .click('#react-tabs-1 a')
      .back()
      .click('li[id=react-tabs-2]')
      .back()
      .assert.containsText('.tab-title', 'Tab 1')
      .forward()
      .assert.containsText('.tab-content .page-content', 'Page: balloon')
      .end()
  },

  'Back': (client) => {
    client
      .url(path('/tabs/1'))
      .click('li[id=react-tabs-2]')
      .pause(1)
      .assert.containsText('.tab-title', 'Tab 2')
      .assert.urlEquals(path('/tabs/2'))
      .back()
      .assert.containsText('.tab-title', 'Tab 1')
      .assert.urlEquals(path('/tabs/1'))
      .forward()
      .assert.containsText('.tab-title', 'Tab 1')  // Can't go forward
      .assert.urlEquals(path('/tabs/1'))
      .end()
  },

  'Push, switch, back': (client) => {
    client
      .url(path('/tabs/1'))
      .click('#react-tabs-1 a')
      .click('li[id=react-tabs-2]')
      .back()
      .assert.containsText('.tab-content .page-content', 'Page: balloon')
      .end()
  },

  'Load inner page': (client) => {
    client
      .url(path('/tabs/1/balloon'))
      .assert.containsText('.tab-content .page-content', 'Page: balloon')
      .assert.urlEquals(path('/tabs/1/balloon'))
      .end()
  },

  'Reload to inner page': (client) => {
    client
      .url(path('/tabs/1'))
      .url(path('/tabs/1/balloon'))
      .assert.containsText('.tab-content .page-content', 'Page: balloon')
      .assert.urlEquals(path('/tabs/1/balloon'))
      .end()
  }
}