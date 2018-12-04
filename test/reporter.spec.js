'use strict';

var chai = require('chai');
//var sinon = require('sinon');

function fakeBaseReporterDecorator() {}

function resultSuccess(n) {
	return {
		suite: ["suite"+n],
		description: "test"+n,
		skipped: false,
		success: true
	};
}
function resultSkipped(n) {
	return {
		suite: ["suite"+n],
		description: "test"+n,
		skipped: true,
		success: true
	};
}
function resultFailed(n) {
	return {
		suite: ["suite"+n],
		description: "test"+n,
		skipped: false,
		success: false
	};
}

describe('Summary reporter', function () {
	var reporter;

	var writeOutput;

	var b1 = { id: 'b1' };
	var b2 = { id: 'b2' };
	var b3 = { id: 'b3' };

	function setupReporter(fakeConfig) {
		writeOutput = '';
		var reporterModule = require('..');
		reporter = new reporterModule['reporter:summary'][1](fakeBaseReporterDecorator, fakeConfig);
		reporter.writeCommonMsg = function(s) { writeOutput += s; };
		reporter.renderBrowser = function(b) { return b.id; };
	}

	function runFakeTests() {
		reporter.onRunStart([b1, b2]);

		reporter.specSuccess(b1, resultSuccess(1));
		reporter.specSuccess(b2, resultSuccess(1));

		reporter.specFailure(b1, resultFailed(2));
		reporter.specFailure(b2, resultFailed(2));

		reporter.specSkipped(b1, resultSkipped(3));
		reporter.specSkipped(b2, resultSkipped(3));

		reporter.specSuccess(b1, resultSuccess(4));
		reporter.specFailure(b2, resultFailed(4));

		reporter.specSuccess(b1, resultSuccess(5));
		reporter.specSkipped(b2, resultSkipped(5));

		reporter.specFailure(b1, resultFailed(6));
		reporter.specSkipped(b2, resultSkipped(6));

		reporter.onRunComplete([b1, b2])

		reporter.onRunStart([b1, b2, b3]);
		reporter.specSuccess(b1, resultSuccess(7));
		reporter.specFailure(b2, resultFailed(7));
		reporter.specSkipped(b3, resultFailed(7));
		reporter.onRunComplete([b1, b2, b3])
	}

	describe("`show` config option", function() {
		it("displays correctly for show=failed", function() {
			setupReporter({
				summaryReporter: {
					show: 'failed'
				}
			});
			runFakeTests();

			chai.assert.isFalse(writeOutput.includes("test1"),
					"doesn't show successful tests");
			chai.assert.isTrue(writeOutput.includes("test2"),
					"shows failed tests");
			chai.assert.isFalse(writeOutput.includes("test3"),
					"doesn't show skipped tests");
			chai.assert.isTrue(writeOutput.includes("test4"),
					"shows failed tests if some browsers were successful");
			chai.assert.isFalse(writeOutput.includes("test5"),
					"doesn't show skipped tests if some browsers were successful");
			chai.assert.isTrue(writeOutput.includes("test6"),
					"shows failed tests if some browsers were skipped");
			chai.assert.isTrue(writeOutput.includes("test7"),
					"shows failed tests if some browsers were successful and skipped");
		});

		it("displays correctly for show=skipped", function() {
			setupReporter({
				summaryReporter: {
					show: 'skipped'
				}
			});
			runFakeTests();

			chai.assert.isFalse(writeOutput.includes("test1"),
					"doesn't show successful tests");
			chai.assert.isTrue(writeOutput.includes("test2"),
					"shows failed tests");
			chai.assert.isTrue(writeOutput.includes("test3"),
					"shows skipped tests");
			chai.assert.isTrue(writeOutput.includes("test4"),
					"shows failed tests if some browsers were successful");
			chai.assert.isTrue(writeOutput.includes("test5"),
					"shows skipped tests if some browsers were successful");
			chai.assert.isTrue(writeOutput.includes("test6"),
					"shows failed tests if some browsers were skipped");
			chai.assert.isTrue(writeOutput.includes("test7"),
					"shows failed tests if some browsers were successful and skipped");
		});

		it("displays correctly for show=all", function() {
			setupReporter({
				summaryReporter: {
					show: 'all'
				}
			});
			runFakeTests();

			chai.assert.isTrue(writeOutput.includes("test1"),
					"shows successful tests");
			chai.assert.isTrue(writeOutput.includes("test2"),
					"shows failed tests");
			chai.assert.isTrue(writeOutput.includes("test3"),
					"shows skipped tests");
			chai.assert.isTrue(writeOutput.includes("test4"),
					"shows failed tests if some browsers were successful");
			chai.assert.isTrue(writeOutput.includes("test5"),
					"shows skipped tests if some browsers were successful");
			chai.assert.isTrue(writeOutput.includes("test6"),
					"shows failed tests if some browsers were skipped");
			chai.assert.isTrue(writeOutput.includes("test7"),
					"shows failed tests if some browsers were successful and skipped");
		});
	});

	describe("unexpected input", function() {
		beforeEach(function() {
			setupReporter({});
		});

		it('should safely handle missing suite browser entries when specSuccess fires', function () {
			reporter.onRunStart([b1])
			chai.assert.doesNotThrow(function() { reporter.specSuccess(b1, {}); });
		});
	});

	describe("many browsers", function() {
		beforeEach(function() {
			setupReporter({});
		});

		it ('should format >10 browsers correctly', function() {
			reporter.printTableHeader(new Array(20).fill(undefined));
			chai.assert.isTrue(
				writeOutput.includes(
				' 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19'),
				'formats the header correctly');
		});
	});

});
