# karma-summary-reporter

Show a table detailing the test results for all connected browsers at the end
of a test run. This gives a better overview which browsers are broken than the
output of other reporters.

The plugin is intended to be used in addition to some other reporter that
shows you the error details. This plugin only shows a overview of passed and
failed testcases, no more detailed information:


```
$ karma test-stringfunctions.conf.js
[... error output and detail for example from karma-dot-reporter]
```

A table like this is also useful if you want to (ab-)use karma to run 
feature tests, like checking of standard string functions shown above.

## Config

Not yet.

