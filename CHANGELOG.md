# Changelog

<a name="v3.1.1"></a>
## [v3.1.1](https://github.com/sth/karma-summary-reporter/tree/v3.1.1), 0001-01-01 ([compare to v3.1.0](https://github.com/sth/karma-summary-reporter/compare/v3.1.0...v3.1.1))

* **Documentation**: Update changelog

<a name="v3.1.0"></a>
## [v3.1.0](https://github.com/sth/karma-summary-reporter/tree/v3.1.0), 2022-02-17 ([compare to v3.0.0](https://github.com/sth/karma-summary-reporter/compare/v3.0.0...v3.1.0))

* **Feature**: Add a [`symbols` config option](./README.md#symbols) ([a987389](https://github.com/sth/karma-summary-reporter/commit/a98738933d24fa975993870f6d6054defd416fb3))
* **Improvement**: Upgrade dependencies
* **Improvement (dev)**: Use local karma-summary-reporter package in examples ([bdce156](https://github.com/sth/karma-summary-reporter/commit/bdce156f9f75da929332b3b9dfd4c36144984dea))

<a name="v3.0.0"></a>
## [v3.0.0](https://github.com/sth/karma-summary-reporter/tree/v3.0.0), 2021-09-14 ([compare to v2.0.3](https://github.com/sth/karma-summary-reporter/compare/v2.0.3...v3.0.0))

* **Improvement (Breaking change)**: Upgrade dependencies (**Now requires node >= v12**)

<a name="v2.0.3"></a>
## [v2.0.3](https://github.com/sth/karma-summary-reporter/tree/v2.0.3), 2021-09-14 ([compare to v2.0.2](https://github.com/sth/karma-summary-reporter/compare/v2.0.2...v2.0.3))

* **Improvement**: Upgrade dependencies
* **Improvement**: Add testing for node v16 ([854af3e](https://github.com/sth/karma-summary-reporter/commit/854af3e45fa8ca979fde6d3f7f0a36982ce8986a))

<a name="v2.0.2"></a>
## [v2.0.2](https://github.com/sth/karma-summary-reporter/tree/v2.0.2), 2021-03-17 ([compare to v2.0.1](https://github.com/sth/karma-summary-reporter/compare/v2.0.1...v2.0.2))

* **Improvement**: Remove unused files from packaged code

<a name="v2.0.1"></a>
## [v2.0.1](https://github.com/sth/karma-summary-reporter/tree/v2.0.1), 2021-03-17 ([compare to v2.0.0](https://github.com/sth/karma-summary-reporter/compare/v2.0.0...v2.0.1))

* **Improvement**: Update dev dependencies
* **Compatibility**: Add node v15 to CI testing
* **Documentation**: Improve changelog

<a name="v2.0.0"></a>
## [v2.0.0](https://github.com/sth/karma-summary-reporter/tree/v2.0.0), 2021-01-14 ([compare to v1.10.1](https://github.com/sth/karma-summary-reporter/compare/v1.10.1...v2.0.0))

* **Compatibility (Breaking change)**: Update chalk to ^4.0.0 (**Now requires node >= v10**)
* **Compatibility**: Remove peerDependencies for karma <= v4
* **Improvement**: Update dev dependencies (**Now requires node >= v10.12.0**)

<a name="v1.10.1"></a>
## [v1.10.1](https://github.com/sth/karma-summary-reporter/tree/v1.10.1), 2021-01-13 ([compare to v1.10.0](https://github.com/sth/karma-summary-reporter/compare/v1.10.0...v1.10.1))

* **Documentation**: Update changelog ([ddff0cd](https://github.com/sth/karma-summary-reporter/commit/ddff0cd86043c36bde959515a9873e844cbb5609))

<a name="v1.10.0"></a>
## [v1.10.0](https://github.com/sth/karma-summary-reporter/tree/v1.10.0), 2021-01-13 ([compare to v1.9.0](https://github.com/sth/karma-summary-reporter/compare/v1.9.0...v1.10.0))

* **Feature**: Add a `browserList` config option ([6cd3506](https://github.com/sth/karma-summary-reporter/commit/6cd3506ce745c1ef9cf86a28ff740b663d83b418))
* **Compatibility**: Add support for karma v6 ([4255b9a](https://github.com/sth/karma-summary-reporter/commit/4255b9a6309a741c40269f283555c089821e86ee))

<a name="v1.9.0"></a>
## [v1.9.0](https://github.com/sth/karma-summary-reporter/tree/v1.9.0), 2020-10-09 ([compare to v1.8.0](https://github.com/sth/karma-summary-reporter/compare/v1.8.0...v1.9.0))

- **Improvement**: Remove browser messages that lead to duplicate output when combined with other reporters (#15)
- **Improvement (dev)**: Dev dependency upgrades (**including security fixes**)
- **Compatibility**: Remove CI testing for node v6
- **Compatibility**: Add CI testing for node v14
- **Compatibility**: Add CI testing on windows, macos

<a name="v1.8.0"></a>
## [v1.8.0](https://github.com/sth/karma-summary-reporter/tree/v1.8.0), 2020-04-16 ([compare to v1.7.2](https://github.com/sth/karma-summary-reporter/compare/v1.7.2...v1.8.0))

- **Feature**: Compatibility with karma v5
- **Improvement**: Improved changelog format
- **Improvement (dev)**: Dev dependency upgrades (**including security fixes**)

<a name="v1.7.2"></a>
## [v1.7.2](https://github.com/sth/karma-summary-reporter/tree/v1.7.2), 2020-02-14 ([compare to v1.7.1](https://github.com/sth/karma-summary-reporter/compare/v1.7.1...v1.7.2))

- **Bugfix:** Error messages not related to a specific test run were not handled correctly, losing these error messages and triggering further problems inside Karma (#11)

## [v1.7.1](https://github.com/sth/karma-summary-reporter/tree/v1.7.1), 2019-09-11 ([compare to v1.7.0](https://github.com/sth/karma-summary-reporter/compare/v1.7.0...v1.7.1))

- **Improvement:** Include updated changelog

## [v1.7.0](https://github.com/sth/karma-summary-reporter/tree/v1.7.0), 2019-09-11 ([compare to v1.6.0](https://github.com/sth/karma-summary-reporter/compare/v1.6.0...v1.7.0))

- **Feature:** Support mocha 6.x
- **Improvement:** Add changelog
- **Improvement:** Upgrade dependencies

<a name="v1.6.0"></a>
## [v1.6.0](https://github.com/sth/karma-summary-reporter/tree/v1.6.0), 2019-02-12 ([compare to v1.5.2](https://github.com/sth/karma-summary-reporter/compare/v1.5.2...v1.6.0))

<a name="v1.5.2"></a>
## [v1.5.2](https://github.com/sth/karma-summary-reporter/tree/v1.5.2), 2018-12-05 ([changes to v1.5.1](https://github.com/sth/karma-summary-reporter/compare/v1.5.1...v1.5.2))

<a name="v1.5.1"></a>
## [v1.5.1](https://github.com/sth/karma-summary-reporter/tree/v1.5.1), 2018-08-28 ([compare to v1.5.0](https://github.com/sth/karma-summary-reporter/compare/v1.5.0...v1.5.1))

<a name="v1.5.0"></a>
## [v1.5.0](https://github.com/sth/karma-summary-reporter/tree/v1.5.0), 2018-01-19 ([compare to v1.4.0](https://github.com/sth/karma-summary-reporter/compare/v1.4.0...v1.5.0))

<a name="v1.4.0"></a>
## [v1.4.0](https://github.com/sth/karma-summary-reporter/tree/v1.4.0), 2017-10-23
