'use strict';
var path = require('path');
var chalk = require('chalk');
var CLIEngine = require('eslint').CLIEngine;

module.exports = function (grunt) {
	function pad(n) {
		var stringN = '' + n;
		while (stringN.length < 4) {
			stringN = ' ' + stringN;
		}
		return stringN;
	}

	function writeMessage(message) {
		var position = [
			'line ' + pad(message.line),
			message.column ? 'col ' + pad(message.column) : 'col ' + pad('-')
		].join(' ');
		var severity;
		if (message.severity > 1) {
			severity = chalk.red.bold('error');
		} else {
			severity = chalk.yellow.bold('warning');
		}
		grunt.log.writeln([
			' ',
			chalk.gray(position),
			severity,
			chalk.yellow(message.message),
			chalk.dim(message.ruleId)
		].join(' '));
	}

	function processMessages(messages) {
		var message;
		var errors = 0;
		for (var i = 0; i < messages.length; i++) {
			message = messages[i];
			writeMessage(message);
			if (message.severity > 1) {
				errors++;
			}
		}
		return errors;
	}

	function processResults(results) {
		var file;
		var errors = 0;
		for (var i = 0; i < results.length; i++) {
			file = results[i];
			if (file.messages.length > 0) {
				grunt.log.writeln(chalk.underline.white(file.filePath));
				errors += processMessages(file.messages);
			}
		}
		return errors;
	}

	grunt.registerMultiTask('eslint', 'Validate files with ESLint', function () {
		var options = this.options();
		var eslintConfig = {
			configFile: options.config ? path.resolve(options.config) : null,
			envs: options.env,
			extensions: options.extensions,
			globals: options.globals,
			ignore: options.ignore,
			ignorePath: options.ignorePath,
			reset: options.reset,
			rulePaths: options.rulesdir,
			rules: options.rules,
			useEslintrc: options.useEslintrc
		};

		if (this.filesSrc.length === 0) {
			grunt.log.writeln(chalk.magenta('Couldn\'t find any files to validate.'));
			return;
		}

		try {
			var eslint = new CLIEngine(eslintConfig);
			var results = eslint.executeOnFiles(this.filesSrc).results;
			var errors = processResults(results);
			if (errors > 0) {
				grunt.log.error(errors + ' errors found')
				return false;
			} else {
				return true;
			}
		} catch (err) {
			grunt.warn(err);
		}
	});
};
