'use strict';
var chalk = require('chalk');
var eslint = require('eslint');

module.exports = function (grunt) {
	grunt.registerMultiTask('eslint', 'Validate files with ESLint', function () {
		var opts = this.options({
			outputFile: false,
			quiet: false
		});

		// legacy
		// TODO: remove in the future
		if (opts.config) {
			opts.configFile = opts.config;
		}
		if (opts.rulesdir) {
			opts.rulePaths = opts.rulesdir;
		}

		if (this.filesSrc.length === 0) {
			grunt.log.writeln(chalk.magenta('Could not find any files to validate.'));
			return false;
		}

		var formatter = eslint.CLIEngine.getFormatter(opts.format);

		if (!formatter) {
			grunt.warn('Could not find formatter ' + opts.format + '\'.');
			return false;
		}

		var engine = new eslint.CLIEngine(opts);

		var report;
		try {
			report = engine.executeOnFiles(this.filesSrc);
		} catch (err) {
			grunt.warn(err);
			return false;
		}

		var results = report.results;

		if (opts.quiet) {
			results = eslint.CLIEngine.getErrorResults(results);
		}

		var output = formatter(results);

		if (opts.outputFile) {
			grunt.file.write(opts.outputFile, output);
		} else {
			console.log(output);
		}

		return report.errorCount === 0;
	});
};
