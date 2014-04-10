'use strict';
var path = require('path');
var chalk = require('chalk');

module.exports = function (grunt) {
	grunt.registerMultiTask('eslint', 'Validate files with ESLint', function () {
		var eslint = require('eslint').cli;
		var options = this.options();

		if (this.filesSrc.length === 0) {
			return grunt.log.writeln(chalk.magenta('Couldn\'t find any files to validate.'));
		}

		options._ = this.filesSrc; // set positional arguments
		options.config = options.config ? path.resolve(options.config) : '';

		return eslint.execute(options) === 0;
	});
};
