
describe("addPrefix()", function() {
	it("should combine both strings", function() {
		assert.equal(addPrefix("ab", "cd"), "abcd");
		assert.equal(addPrefix("ab", ""), "ab");
		assert.equal(addPrefix("", ""), "");
	});
});

describe("stripPrefix()", function() {
	it("should remove the prefix if present", function() {
		assert.equal(stripPrefix("ab", "abc"), "c");
		assert.equal(stripPrefix("", "abc"), "abc");
		assert.equal(stripPrefix("abc", "abc"), "");
		assert.equal(stripPrefix("", ""), "");
	});

	it("should do nothing if the prefix isn't present", function() {
		assert.equal(stripPrefix("x", "abc"), "abc");
		assert.equal(stripPrefix("abcd", "abc"), "abc");
		assert.equal(stripPrefix("a", ""), "");
	});
});

