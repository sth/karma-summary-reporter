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

	var b1 = { id: 'browser1' };
	var b2 = { id: 'browser2' };
	var b3 = { id: 'browser3' };

	function setupReporter(fakeConfig) {
		writeOutput = '';
		var reporterModule = require('..');
		reporter = new reporterModule['reporter:summary'][1](fakeBaseReporterDecorator, fakeConfig);
		reporter.writeCommonMsg = function(s) { writeOutput += s; };
		reporter.renderBrowser = function(b) { return b.id; };
	}

	function runFakeTests() {
		reporter.onRunStart([b1, b2]);

		reporter.onSpecComplete(b1, resultSuccess(1));
		reporter.onSpecComplete(b2, resultSuccess(1));

		reporter.onSpecComplete(b1, resultFailed(2));
		reporter.onSpecComplete(b2, resultFailed(2));

		reporter.onSpecComplete(b1, resultSkipped(3));
		reporter.onSpecComplete(b2, resultSkipped(3));

		reporter.onSpecComplete(b1, resultSuccess(4));
		reporter.onSpecComplete(b2, resultFailed(4));

		reporter.onSpecComplete(b1, resultSuccess(5));
		reporter.onSpecComplete(b2, resultSkipped(5));

		reporter.onSpecComplete(b1, resultFailed(6));
		reporter.onSpecComplete(b2, resultSkipped(6));

		reporter.onRunComplete([b1, b2])

		reporter.onRunStart([b1, b2, b3]);
		reporter.onSpecComplete(b1, resultSuccess(7));
		reporter.onSpecComplete(b2, resultFailed(7));
		reporter.onSpecComplete(b3, resultFailed(7));
		reporter.onRunComplete([b1, b2, b3])
	}

	describe("config option `show`", function() {
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

	describe("config option `browserList`", function() {
		describe("browserList=always", function() {
			beforeEach(function() {
				setupReporter({
					summaryReporter: {
						show: 'failed',
						browserList: 'always'
					}
				});
			});

			it("shows browser list", function() {
				reporter.onRunStart([b1]);
				reporter.onSpecComplete(b1, resultSuccess(1));
				reporter.onRunComplete([b1])

				chai.assert.isTrue(writeOutput.includes("browser1"),
						"shows browser1 label");
			});
		});

		describe("browserList=ifneeded", function() {
			describe("with show=all", function() {
				beforeEach(function() {
					setupReporter({
						summaryReporter: {
							show: 'all',
							browserList: 'ifneeded'
						}
					});
				});

				it("doesn't show browser list when there is only one browser", function() {
					reporter.onRunStart([b1]);
					reporter.onSpecComplete(b1, resultSuccess(1));
					reporter.onSpecComplete(b2, resultSkipped(1));
					reporter.onSpecComplete(b2, resultFailed(1));
					reporter.onRunComplete([b1])

					chai.assert.isFalse(writeOutput.includes("browser1"),
							"doesn't show browser1 label");
				});

				it("shows browser list when there are multiple browsers", function() {
					reporter.onRunStart([b1, b2]);
					reporter.onSpecComplete(b1, resultSuccess(1));
					reporter.onSpecComplete(b2, resultSuccess(1));
					reporter.onRunComplete([b1, b2])

					chai.assert.isTrue(writeOutput.includes("browser1"),
							"shows browser1 label");
					chai.assert.isTrue(writeOutput.includes("browser2"),
							"shows browser2 label");
				});
			});

			describe("with show=failed", function() {
				beforeEach(function() {
					setupReporter({
						summaryReporter: {
							show: 'failed',
							browserList: 'ifneeded'
						}
					});
				});

				it("doesn't show browser list when there is only one browser", function() {
					reporter.onRunStart([b1]);
					reporter.onSpecComplete(b1, resultSuccess(1));
					reporter.onSpecComplete(b1, resultSkipped(2));
					reporter.onSpecComplete(b1, resultFailed(3));
					reporter.onRunComplete([b1])

					chai.assert.isFalse(writeOutput.includes("browser1"),
							"doesn't show browser1 label");
				});

				it("doesn't show browser list when there are no failures", function() {
					reporter.onRunStart([b1, b2]);
					reporter.onSpecComplete(b1, resultSuccess(1));
					reporter.onSpecComplete(b2, resultSkipped(1));
					reporter.onRunComplete([b1, b2])

					chai.assert.isFalse(writeOutput.includes("browser1"),
							"doesn't show browser1 label");
					chai.assert.isFalse(writeOutput.includes("browser2"),
							"doesn't show browser2 label");
				});

				it("shows browser list when there are multiple browsers and failures", function() {
					reporter.onRunStart([b1, b2]);
					reporter.onSpecComplete(b1, resultSuccess(1));
					reporter.onSpecComplete(b2, resultFailed(1));
					reporter.onRunComplete([b1, b2])

					chai.assert.isTrue(writeOutput.includes("browser1"),
							"shows browser1 label");
					chai.assert.isTrue(writeOutput.includes("browser2"),
							"shows browser2 label");
				});
			});

			describe("with show=skipped", function() {
				beforeEach(function() {
					setupReporter({
						summaryReporter: {
							show: 'skipped',
							browserList: 'ifneeded'
						}
					});
				});

				it("doesn't show browser list when there is only one browser", function() {
					reporter.onRunStart([b1]);
					reporter.onSpecComplete(b1, resultSuccess(1));
					reporter.onSpecComplete(b1, resultSkipped(2));
					reporter.onSpecComplete(b1, resultFailed(3));
					reporter.onRunComplete([b1])

					chai.assert.isFalse(writeOutput.includes("browser1"),
							"doesn't show browser1 label");
				});

				it("doesn't show browser list when there are no failures or skips", function() {
					reporter.onRunStart([b1, b2]);
					reporter.onSpecComplete(b1, resultSuccess(1));
					reporter.onSpecComplete(b2, resultSuccess(1));
					reporter.onRunComplete([b1, b2])

					chai.assert.isFalse(writeOutput.includes("browser1"),
							"doesn't show browser1 label");
					chai.assert.isFalse(writeOutput.includes("browser2"),
							"doesn't show browser2 label");
				});

				it("shows browser list when there are multiple browsers and skips", function() {
					reporter.onRunStart([b1, b2]);
					reporter.onSpecComplete(b1, resultSuccess(1));
					reporter.onSpecComplete(b2, resultSkipped(1));
					reporter.onRunComplete([b1, b2])

					chai.assert.isTrue(writeOutput.includes("browser1"),
							"shows browser1 label");
					chai.assert.isTrue(writeOutput.includes("browser2"),
							"shows browser2 label");
				});

				it("shows browser list when there are multiple browsers and failures", function() {
					reporter.onRunStart([b1, b2]);
					reporter.onSpecComplete(b1, resultSuccess(1));
					reporter.onSpecComplete(b2, resultFailed(1));
					reporter.onRunComplete([b1, b2])

					chai.assert.isTrue(writeOutput.includes("browser1"),
							"shows browser1 label");
					chai.assert.isTrue(writeOutput.includes("browser2"),
							"shows browser2 label");
				});
			});
		});

		describe("browserList=never", function() {
			beforeEach(function() {
				setupReporter({
					summaryReporter: {
						show: 'all',
						browserList: 'never'
					}
				});
			});

			it("doesn't show browser list", function() {
				reporter.onRunStart([b1, b2]);
				reporter.onSpecComplete(b1, resultSuccess(1));
				reporter.onSpecComplete(b2, resultFailed(1));
				reporter.onSpecComplete(b1, resultFailed(2));
				reporter.onSpecComplete(b2, resultSkipped(2));
				reporter.onRunComplete([b1, b2])

				chai.assert.isFalse(writeOutput.includes("browser1"),
						"doesn't show browser1 label");
				chai.assert.isFalse(writeOutput.includes("browser2"),
						"doesn't show browser2 label");
			});
		});
	});

	describe("unexpected input", function() {
		beforeEach(function() {
			setupReporter({});
		});

		it('should safely handle missing suite browser entries when specSuccess fires', function () {
			reporter.onRunStart([b1])
			chai.assert.doesNotThrow(function() { reporter.onSpecComplete(b1, {success: true}); });
		});
	});

	describe("many browsers", function() {
		beforeEach(function() {
			setupReporter({});
		});

		it('should format >10 browsers correctly', function() {
			reporter.printTableHeader(new Array(20).fill(undefined));
			chai.assert.isTrue(
				writeOutput.includes(
				' 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19'),
				'formats the header correctly');
		});
	});

	describe("duplicate test names", function() {
		beforeEach(function() {
			setupReporter({
				summaryReporter: {
					show: "all"
				}
			});
		});

		it('should show all tests with different result.id', function() {
			const result = resultSuccess(1);
			reporter.onRunStart([b1])
			reporter.onSpecComplete(b1, {id: "specid1", ...result});
			reporter.onSpecComplete(b1, {id: "specid2", ...result});
			reporter.onRunComplete([b1])
			chai.assert.equal(writeOutput.match(/test1/g).length, 2,
					"shows test1 label two times");
		});

		it('should show all tests if result.id is missing', function() {
			const result = resultSuccess(1);
			reporter.onRunStart([b1])
			reporter.onSpecComplete(b1, result);
			reporter.onSpecComplete(b1, result);
			reporter.onRunComplete([b1])
			chai.assert.equal(writeOutput.match(/test1/g).length, 2,
					"shows test1 label two times");
		});
	});
});
