// Mocha/Chai doesn't supply `result.id`

describe('truthy-tests', () => {
  it('should be truthy', () => { assert.equal(true, true); });
  it('should be truthy', () => { assert.equal(1, true); });
});
