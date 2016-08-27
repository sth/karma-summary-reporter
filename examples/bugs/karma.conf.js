
module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [ 'source.js', 'tests.js' ],
    reporters: ['progress', 'summary'],
  })
}
