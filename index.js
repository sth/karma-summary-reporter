
var chalk_global = require('chalk');

var default_symbols = process.platform === 'win32'
	? {success: '√', failure: '×'}
	: {success: '✔', failure: '✖'};

function strmul(s, n) {
	var r = '';
	for (var i = 0; i < n; ++i) {
		r += s;
	}
	return r;
}

var SummaryReporter = function(baseReporterDecorator, config) {
	baseReporterDecorator(this);

	// Configuration
	config.summaryReporter = config.summaryReporter || {};
	var show = config.summaryReporter.show || 'failed';
	var specLength = config.summaryReporter.specLength || 50;
	var overviewColumn = config.summaryReporter.overviewColumn === false ? false : true;
	var browserList = config.summaryReporter.browserList || 'always';

	// We use our own instance, respecting config.colors
	// If config.colors is true, we use the default chalk level
	var chalk = new chalk_global.Instance({level: (config.colors ? undefined : 0)});

	var symbols = Object.assign({}, default_symbols, config.summaryReporter.symbols);

	var runStarted = false;
	var specorder, specresults;

	this.onSpecComplete = function(browser, result) {
		if (!runStarted) {
			return;
		}

		if (!result.suite) {
			return;
		}

		var specid;
		if (result.id) {
			// For example jasmine sets `result.id`
			specid = result.id;
		}
		else {
			// mocha/chai doesn't set `result.id`, so we need to improvise to
			// distinguish test cases.
			var specid_base = result.suite.join('/') + '/' + result.description;
			specid = specid_base;
			// Check if we already saw the spec id (which would mean there is
			// more than one test with the same description)
			// We cannot guarantee that we see specs in the same order for multiple
			// browsers, so results might get mixed up for "duplicate" testcases,
			// but it's the best we can do if there isn't a `result.id`.
			var num = 0;
			while (specid in specresults && browser.id in specresults[specid].results) {
				num++;
				specid = specid_base + "~" + num;
			}
		}
		if (!(specid in specresults)) {
			specorder.push(specid);
			specresults[specid] = {
				spec: result.suite.slice().concat(result.description),
				results: Object.create(null)
			};
		}
		specresults[specid].results[browser.id] = result;
	}

	// Previously printed spec path
	var currentPath;
	this.printSpecLabel = function(path) {
		var indent = "  ";
		path.forEach(function(s, i) {
			// We keep the current comon prefix and start to print
			// the new information on the first difference.
			if (i < currentPath.length && s != currentPath[i]) {
				currentPath.length = i;
			}
			if (i >= currentPath.length || i == path.length - 1) {
				var label = indent + s;
				if (label.length > specLength) {
					label = label.slice(0, specLength-3) + '...';
				}
				this.writeCommonMsg(label);

				if (i < path.length-1) {
					this.writeCommonMsg("\n");
				}
				else {
					this.writeCommonMsg(strmul(' ', specLength - label.length));
				}
				currentPath.push(s);
			}
			indent += "  ";
		}, this);
	};

	this.printResultLabel = function(result) {
		if (result === undefined)
			this.writeCommonMsg(chalk.yellow(' ? '));
		else if (result.skipped)
			this.writeCommonMsg(chalk.yellow(' - '));
		else if (result.success) {
			if (!result.partial)
				this.writeCommonMsg(chalk.green(' ' +  symbols.success + ' '));
			else
				this.writeCommonMsg(chalk.yellow('(' +  symbols.success + ')'));
		}
		else {
			this.writeCommonMsg(chalk.red(' ' + symbols.failure + ' '));
		}
	};

	this.printTableHeader = function(browsers) {
		this.writeCommonMsg(strmul(' ', specLength));
		if (overviewColumn) {
			this.writeCommonMsg(' all  ');
		}
		browsers.forEach(function(browser, i) {
			this.writeCommonMsg((i < 10 ? ' ' : '') +  i + ' ');
		}, this);
		this.writeCommonMsg('\n');
	};

	this.printBrowserList = function(browsers) {
		browsers.forEach(function(browser, i) {
			this.writeCommonMsg(' ' + i + ': ' + this.renderBrowser(browser) + '\n');
		}, this);
	};

	this.onRunStart = function() {
		runStarted = true;
		this._browsers = [];
		currentPath = [];
		specorder = [];
		specresults = Object.create(null);
	};

	this.onRunComplete = function(browsers, results) {
		if (!runStarted) {
			// For example when there are compilation errors, onRunComplete might get called
			// even before a proper run was started.
			// We don't report a summary for such events.
			return;
		}
		runStarted = false;

		var browserListShown = false;
		var tableHeaderShown = false;

		this.writeCommonMsg(chalk.bold(chalk.underline('SUMMARY')) + '\n');

		// Browser overview
		if (browserList === 'always') {
			this.printBrowserList(browsers);
			browserListShown = true;
		}

		if (!specorder.length) {
			this.writeCommonMsg(chalk.red('No tests did run in any browsers.'));
			return;
		}

		// Test details
		var counts = { shown: 0, hidden: 0 };
		specorder.forEach(function(specid) {
			var sr = specresults[specid];
			// Collect information from all browsers
			var summary = { skipped_some: false, ran_some: false, success: true };
			browsers.forEach(function(b) {
				if (sr.results[b.id]) {
					if (sr.results[b.id].skipped) {
						summary.skipped_some = true;
					}
					else {
						summary.ran_some = true;
						summary.success = summary.success && sr.results[b.id].success;
					}
				}
				else {
					summary.skipped_some = true;
				}
			});

			if (summary.success) {
				// Maybe we don't even want to show it
				if (show == 'failed') {
					if (summary.ran_some)
						counts.hidden++;
					return;
				}
				if (show == 'skipped' && !summary.skipped_some) {
					if (summary.ran_some)
						counts.hidden++;
					return;
				}
			}

			// We want to actually display it
			if (browserList === 'ifneeded' && browsers.length > 1 && !browserListShown) {
				this.printBrowserList(browsers);
				browserListShown = true;
			}

			if (!tableHeaderShown) {
				this.printTableHeader(browsers);
				tableHeaderShown = true;
			}

			this.printSpecLabel(sr.spec);
			if (overviewColumn) {
				this.writeCommonMsg(' ');
				this.printResultLabel(summary);
				this.writeCommonMsg('  ');
			}
			browsers.forEach(function(browser, i) {
				this.printResultLabel(sr.results[browser.id], i);
			}, this);
			this.writeCommonMsg("\n");
			counts.shown++;
		}, this);

		if (counts.hidden) {
			this.writeCommonMsg("  " + chalk.green(''+counts.hidden) +
				(counts.shown ? " more" : "") +
				" test cases successful in all browsers\n")
		}
	};

	this.onBrowserLog = function(browser, log, type) {
		// We don't show any log messages.
	}
	this.onBrowserError = function(browser, error) {
		// We don't show any log messages.
	}
}

SummaryReporter.$inject = [
	'baseReporterDecorator',
	'config'
];

module.exports = {
	'reporter:summary': ['type', SummaryReporter]
};

