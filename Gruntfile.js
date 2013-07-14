'use strict';
module.exports = function (grunt) {
	grunt.initConfig({
		eslint: {
			validate: ['test/fixture/{1,2}.js']
		},
		shell: {
			eslint: {
				options: {
					callback: function (err, stdout, stderr, cb) {
						process.stdout.write(stdout);
						process.stderr.write(stderr);

						if (/test\/fixture\/1\.js: line 1, col 0, Warning/.test(stdout)) {
							cb();
						} else {
							cb(false);
						}
					}
				},
				command: 'grunt eslint'
			}
		}
	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('default', ['shell:eslint']);
};
