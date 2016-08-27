
module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [ 'tests.js' ],
    reporters: ['progress', 'summary'],
    summaryReporter: {
      show: 'all'
    }
  })
}
