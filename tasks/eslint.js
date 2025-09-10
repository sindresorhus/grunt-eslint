'use strict';
const chalk = require('chalk');
const {ESLint} = require('eslint');
const {defineConfig} = require('eslint/config');

module.exports = grunt => {
	grunt.registerMultiTask('eslint', 'Validate files with ESLint', function () {
		const done = this.async();

		(async () => {
			try {
				const {
					format,
					quiet,
					silent,
					maxWarnings,
					failOnError,
					outputFile,
					extends: extendsOption,
					...options
				} = this.options({
					outputFile: false,
					quiet: false,
					silent: false,
					maxWarnings: -1,
					failOnError: true,
					format: 'stylish'
				});

				if (this.filesSrc.length === 0) {
					grunt.log.writeln(chalk.magenta('Could not find any files to validate'));
					done(true);
					return;
				}

				// Handle extends option
				if (extendsOption) {
					const config = options.overrideConfig || {};
					options.overrideConfig = defineConfig({
						...config,
						extends: extendsOption
					});
				}

				const engine = new ESLint(options);

				const formatter = await engine.loadFormatter(format);

				if (!formatter) {
					grunt.warn(`Could not find formatter ${format}`);
					done(false);
					return;
				}

				let results = await engine.lintFiles(this.filesSrc);

				if (options.fix) {
					await ESLint.outputFixes(results);
				}

				if (quiet) {
					results = ESLint.getErrorResults(results);
				}

				const output = await formatter.format(results);

				if (outputFile) {
					grunt.file.write(outputFile, output);
				}

				if (output && !silent) {
					console.log(output);
				}

				const {warningCount, errorCount} = results.reduce((count, {warningCount, errorCount}) => {
					count.warningCount += warningCount;
					count.errorCount += errorCount;
					return count;
				}, {warningCount: 0, errorCount: 0});

				const tooManyWarnings = maxWarnings >= 0 && warningCount > maxWarnings;

				if (errorCount === 0 && tooManyWarnings) {
					grunt.warn(`ESLint found too many warnings (maximum: ${maxWarnings})`);
				}

				done(failOnError ? errorCount === 0 : 0);
			} catch (error) {
				done(error);
			}
		})();
	});
};
