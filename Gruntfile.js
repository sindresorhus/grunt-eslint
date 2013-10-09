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
					callback: function (err, stdout, stderr, cb) {
						process.stdout.write(stdout);
						process.stderr.write(stderr);

						if (/testing custom rules/.test(stdout)) {
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
