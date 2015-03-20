module.exports = {
  "Basic Nightwatch Walkthrough" : function (client) {
    client
      .url("http://localhost:3000")
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('div.container', 1000)
      .waitForElementVisible('.row', 1000)
      .waitForElementVisible('#locationForm', 1000)
      .waitForElementVisible('#map-canvas', 1000)

      .verify.containsText('div.container h1', 'GeoAlarm')

  }
};