
module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [ 'test.js' ],
    reporters: ['progress', 'summary'],
    summaryReporter: {
      show: 'all',
    },
  })
}
