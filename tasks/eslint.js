'use strict';
const chalk = require('chalk');
const eslint = require('eslint');

module.exports = grunt => {
	grunt.registerMultiTask('eslint', 'Validate files with ESLint', function () {
		const options = this.options({
			outputFile: false,
			quiet: false,
			maxWarnings: -1,
			failOnError: true,
		});

		if (this.filesSrc.length === 0) {
			grunt.log.writeln(chalk.magenta('Could not find any files to validate'));
			return true;
		}

		const formatter = eslint.CLIEngine.getFormatter(options.format);

		if (!formatter) {
			grunt.warn(`Could not find formatter ${options.format}`);
			return false;
		}

		const engine = new eslint.CLIEngine(options);

		let report;
		try {
			report = engine.executeOnFiles(this.filesSrc);
		} catch (error) {
			grunt.warn(error);
			return false;
		}

		if (options.fix) {
			eslint.CLIEngine.outputFixes(report);
		}

		let results = report.results;

		if (options.quiet) {
			results = eslint.CLIEngine.getErrorResults(results);
		}

		const output = formatter(results);

		if (options.outputFile) {
			grunt.file.write(options.outputFile, output);
		} else if (output) {
			console.log(output);
		}

		const tooManyWarnings = options.maxWarnings >= 0 && report.warningCount > options.maxWarnings;

		if (report.errorCount === 0 && tooManyWarnings) {
			grunt.warn(`ESLint found too many warnings (maximum: ${options.maxWarnings})`);
		}

		return options.failOnError ? report.errorCount === 0 : 0;
	});
};
