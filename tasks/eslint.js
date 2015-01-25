'use strict';
var chalk = require('chalk');
var eslint = require('eslint');

// https://github.com/eslint/eslint/blob/18246e5e114ebac170620638949b2ab8ebc6df47/lib/cli.js#L115
function calculateExitCode(results) {
	return results.some(function (result) {
		return result.messages.some(function (message) {
			return message.severity === 2;
		});
	}) ? 1 : 0;
}

module.exports = function (grunt) {
	grunt.registerMultiTask('eslint', 'Validate files with ESLint', function () {
		var opts = this.options({
			outputFile: false,
			format: 'stylish'
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
			return;
		}

		var engine = new eslint.CLIEngine(opts);
		var results = engine.executeOnFiles(this.filesSrc).results;
		var formatter = engine.getFormatter(opts.format);

		if (!formatter) {
			grunt.warn('Could not find formatter ' + opts.format + '\'.');
			return;
		}

		var output = formatter(results);

		if (opts.outputFile) {
			grunt.file.write(opts.outputFile, output);
		} else {
			console.log(output);
		}

		return calculateExitCode(results) === 0;
	});
};
