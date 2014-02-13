'use strict';
var path = require('path');
var chalk = require('chalk');

module.exports = function (grunt) {
	grunt.registerMultiTask('eslint', 'Validate files with ESLint', function () {
		var eslint = require('eslint').cli;
		var options = this.options();
		var args = ['', ''];

		if (this.filesSrc.length === 0) {
			return grunt.log.writeln(chalk.magenta('Couldn\'t find any files to validate.'));
		}

		if (options.config) {
			args.push('--config', path.resolve(options.config));
		}

		if (options.rulesdir) {
			args.push('--rulesdir', options.rulesdir);
		}

		if (options.format) {
			args.push('--format', options.format);
		}

		return eslint.execute(args.concat(this.filesSrc)) === 0;
	});
};
