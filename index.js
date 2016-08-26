
function strmul(s, n) {
	var r = '';
	for (var i = 0; i < n; ++i) {
		r += s;
	}
	return r;
}

var SummaryReporter = function(baseReporterDecorator) {
	baseReporterDecorator(this);

	var specorder = [];
	var specresults = Object.create(null);

	this.specSuccess = this.specFailure = this.specSkipped = function(browser, result) {
		var specid = result.suite.join('/') + '/' + result.description;
		if (!(specid in specresults)) {
			specorder.push(specid);
			specresults[specid] = {
				spec: result.suite.slice().concat(result.description),
				results: Object.create(null)
			};
		}
		specresults[specid].results[browser.id] = result;
	}


	var speclength = 50;
	var currentPath = [];
	this.printSpecLabel = function(path) {
		var indent = "  ";
		var i;
		path.forEach(function(s, i) {
			if (i < currentPath.length && s != currentPath[i]) {
				currentPath.length = i;
			}
			if (i >= currentPath.length) {
				var label = indent + s;
				if (label.length > speclength) {
					label = label.slice(0, speclength-3) + '...';
				}
				this.writeCommonMsg(label);

				if (i < path.length-1) {
					this.writeCommonMsg("\n");
				}
				else {
					this.writeCommonMsg(strmul(' ', speclength - label.length));
				}
				currentPath.push(s);
			}
			indent += "  ";
		}, this);
	};

	this.printResultLabel = function(result) {
		if (result === undefined)
			this.writeCommonMsg(' ? '.yellow);
		else if (result.skipped)
			this.writeCommonMsg(' - '.yellow);
		else if (result.success) {
			if (!result.partial)
				this.writeCommonMsg(' ✓ '.green);
			else
				this.writeCommonMsg(' ✓ '.yellow);
		}
		else {
			this.writeCommonMsg(' ✗ '.red);
		}
	};

	this.onRunComplete = function(browsers, results) {
		this.writeCommonMsg('RESULTS TABLE\n');
		browsers.forEach(function(browser, i) {
			this.writeCommonMsg(' ' + i + ': ' + this.renderBrowser(browser) + '\n');
		}, this);
		this.writeCommonMsg(strmul(' ', speclength));
		this.writeCommonMsg(' all  ');
		browsers.forEach(function(browser, i) {
			this.writeCommonMsg(' '+  i + ' ');
		}, this);
		this.writeCommonMsg('\n');

		specorder.forEach(function(specid) {
			var sr = specresults[specid];
			var summary = { partial: false, success: true, missing: false };
			browsers.forEach(function(b) {
				if (sr.results[b.id]) {
					summary.partial = summary.partial || sr.results[b.id].skipped;
					summary.skipped = summary.skipped && sr.results[b.id].skipped;
					summary.success = summary.success && sr.results[b.id].success;
				}
				else {
					summary.partial = true;
				}
			});

			this.printSpecLabel(sr.spec);
			this.writeCommonMsg(' ');
			this.printResultLabel(summary);
			this.writeCommonMsg('  ');
			browsers.forEach(function(browser, i) {
				this.printResultLabel(sr.results[browser.id], i);
			}, this);
			this.writeCommonMsg("\n");
		}, this);
	};
}

SummaryReporter.$inject = ['baseReporterDecorator'];

module.exports = {
	'reporter:summary': ['type', SummaryReporter]
};

