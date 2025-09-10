'use strict';

const noAlertRule = require('./conf/rules/no-alert');

module.exports = grunt => {
	grunt.initConfig({
		eslint: {
			options: {
				overrideConfigFile: 'conf/eslint.js',
				plugins: {
					noAlertRule
				},
				quiet: true
			},
			validate: ['test/fixture/{1,2}.js']
		},
		shell: {
			eslint: {
				command: 'grunt eslint',
				options: {
					callback: (error, stdout, stderr, callback) => {
						if (/test\/fixture\/2\.js/.test(stdout)) {
							if (/camelcase/.test(stdout) && !/\swarning\s/.test(stdout)) {
								callback();
							} else {
								callback(false);
							}
						} else {
							callback(false);
						}
					}
				}
			},
			'test-extends': {
				command: 'grunt test-extends',
				options: {
					callback: (error, stdout, stderr, callback) => {
						// Should detect no-undef and no-unused-vars from @eslint/js recommended
						if (/no-undef/.test(stdout) || /no-unused-vars/.test(stdout)) {
							callback();
						} else {
							callback(false);
						}
					}
				}
			}
		}
	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-shell');
	
	grunt.registerTask('test-extends', function() {
		const js = require('@eslint/js');
		
		grunt.config.set('eslint.testExtends', {
			options: {
				overrideConfigFile: true,
				extends: [js.configs.recommended],
				quiet: true
			},
			src: ['test/fixture/{1,2}.js']
		});
		
		grunt.task.run('eslint:testExtends');
	});
	
	grunt.registerTask('default', ['shell:eslint', 'shell:test-extends']);
};
