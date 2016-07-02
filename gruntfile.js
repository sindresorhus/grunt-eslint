'use strict';
module.exports = grunt => {
	grunt.initConfig({
		eslint: {
			options: {
				configFile: 'conf/eslint.json',
				rulePaths: ['conf/rules'],
				quiet: true
			},
			validate: ['test/fixture/{1,2}.js']
		},
		shell: {
			eslint: {
				command: 'grunt eslint',
				options: {
					callback: (err, stdout, stderr, cb) => {
						if (/test\/fixture\/2\.js/.test(stdout)) {
							if (/camelcase/.test(stdout) && !/\swarning\s/.test(stdout)) {
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
