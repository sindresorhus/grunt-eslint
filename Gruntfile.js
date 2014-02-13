'use strict';
module.exports = function (grunt) {
	grunt.initConfig({
		eslint: {
			options: {
				config: 'conf/eslint.json',
				rulesdir: 'conf/rules'
			},
			validate: ['test/fixture/{1,2}.js']
		},
		shell: {
			eslint: {
				options: {
					stdout: true,
					stderr: true,
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
				},
				command: 'grunt eslint'
			}
		}
	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-shell');
	grunt.registerTask('default', ['shell:eslint']);
};
