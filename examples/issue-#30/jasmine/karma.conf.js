
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [ 'test.js' ],
    reporters: ['progress', 'summary'],
    summaryReporter: {
      show: 'all',
    },
  })
}
