'use strict';
module.exports = function (grunt) {
	grunt.registerMultiTask('eslint', 'Validate files with ESLint', function () {
		var eslint = require('eslint/lib/cli');
		var _log = console.log;
		var fail = false;

		if (this.filesSrc.length === 0) {
			return grunt.log.writeln('Couldn\'t find any files to validate.');
		}

		console.log = function (str) {
			if (str !== 0) {
				_log.apply(_log, arguments);
			}

			if (arguments.length > 0) {
				fail = true;
			}
		};

		eslint.execute(this.filesSrc);

		console.log = _log;

		if (fail) {
			grunt.warn('Some files didn\'t pass validation.');
		}
	});
};
