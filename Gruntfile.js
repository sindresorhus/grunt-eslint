'use strict';
module.exports = function (grunt) {
	grunt.initConfig({
		eslint: {
			options: {
				configFile: 'conf/eslint.json',
				rulePaths: ['conf/rules']
			},
			forced: {
				options: {
					force: true
				},
				src: ['test/fixture/{1,2}.js']
			},
			validate: ['test/fixture/{1,2}.js']
		},
		shell: {
			eslint: {
				command: 'grunt eslint',
				options: {
					callback: function (err, stdout, stderr, cb) {
						if (/test\/fixture\/1\.js/.test(stdout)) {
							if (!/camelcase/.test(stdout)) {
								cb();
							} else {
								cb(false);
							}
						} else {
							cb(false);
						}
					}
				}
			}
		}
	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-shell');
	grunt.registerTask('default', ['shell:eslint']);
};
