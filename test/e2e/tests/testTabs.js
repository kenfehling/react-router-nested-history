const path = (p) => 'http://localhost:8080' + p
const PAUSE = 1500

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

  'Push': (client) => {
    client
      .url(path('/tabs/1'))
      .click('.tabs .tab1 a')
      .pause(PAUSE)
      .assert.containsText('.tabs .page-content', 'Page: balloon')
      .assert.urlEquals(path('/tabs/1/balloon'))
      .end()
  },

  'Push, back': (client) => {
    client
      .url(path('/tabs/1'))
      .click('.tabs .tab1 a')
      .pause(PAUSE)
      .back()
      .pause(PAUSE)
      .assert.containsText('.tabs .tab-title', 'Tab 1')
      .assert.urlEquals(path('/tabs/1'))
      .end()
  },

  'Push, back, forward': (client) => {
    client
      .url(path('/tabs/1'))
      .click('.tabs .tab1 a')
      .back()
      .forward()
      .pause(PAUSE)
      .assert.urlEquals(path('/tabs/1/balloon'))
      .end()
  },

  'Push, back, switch, back, forward': (client) => {
    client
      .url(path('/tabs/1'))
      .click('.tabs .tab1 a')
      .back()
      .click('.tabs li:nth-of-type(2)')
      .back()
      .assert.containsText('.tabs .tab-title', 'Tab 1')
      .forward()
      .assert.containsText('.tabs .page-content', 'Page: balloon')
      .end()
  },

  'Push, switch, back': (client) => {
    client
      .url(path('/tabs/1'))
      .click('.tabs .tab1 a')
      .click('.tabs li:nth-of-type(2)')
      .back()
      .assert.containsText('.tabs .page-content', 'Page: balloon')
      .end()
  },

  'Load inner page': (client) => {
    client
      .url(path('/tabs/1/balloon'))
      .assert.containsText('.tabs .page-content', 'Page: balloon')
      .assert.urlEquals(path('/tabs/1/balloon'))
      .end()
  },

  'Reload to inner page': (client) => {
    client
      .url(path('/tabs/1'))
      .url(path('/tabs/1/balloon'))
      .assert.containsText('.tabs .page-content', 'Page: balloon')
      .assert.urlEquals(path('/tabs/1/balloon'))
      .end()
  }
}