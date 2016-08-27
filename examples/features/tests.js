
describe("ES2015 String", function() {
	it("has fromCodePoint()", function() {
		assert.isOk(String.fromCodePoint);
	});
});

describe("ES2015 String.prototype", function() {
	it("has codePointAt()", function() {
		assert.isOk("".codePointAt);
	});
	it("has endsWith()", function() {
		assert.isOk("".endsWith);
	});
	it("has includes()", function() {
		assert.isOk("".includes);
	});
	it("has repeat()", function() {
		assert.isOk("".repeat);
	});
	it("has startsWith()", function() {
		assert.isOk("".startsWith);
	});
	it("has trim()", function() {
		assert.isOk("".trim);
	});
});

