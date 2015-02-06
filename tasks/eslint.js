'use strict';
var chalk = require('chalk');
var eslint = require('eslint');

// https://github.com/eslint/eslint/blob/5322a4ab9757eb745030ddcafa076ab5b4317e50/lib/cli.js#L107
function isErrorMessage(message) {
	return message.severity === 2;
}

// https://github.com/eslint/eslint/blob/5322a4ab9757eb745030ddcafa076ab5b4317e50/lib/cli.js#L118
function calculateExitCode(results) {
	return results.some(function (result) {
			return result.messages.some(isErrorMessage);
	}) ? 1 : 0;
}

// https://github.com/eslint/eslint/blob/5322a4ab9757eb745030ddcafa076ab5b4317e50/lib/cli.js#L129
function getErrorResults(results) {
	var filtered = [];

	results.forEach(function (result) {
			var filteredMessages = result.messages.filter(isErrorMessage);

			if (filteredMessages.length > 0) {
				filtered.push({
						filePath: result.filePath,
						messages: filteredMessages
				});
			}
	});

	return filtered;
}

module.exports = function (grunt) {
	grunt.registerMultiTask('eslint', 'Validate files with ESLint', function () {
		var opts = this.options({
			outputFile: false,
			format: 'stylish',
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
			return;
		}

		var engine = new eslint.CLIEngine(opts);
		var results = engine.executeOnFiles(this.filesSrc).results;

		if (opts.quiet) {
			results = getErrorResults(results);
		}

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
