# grunt-eslint

> Validate files with [ESLint](https://eslint.org)

![](screenshot.png)

## Install

```sh
npm install --save-dev grunt-eslint
```

## Usage

```js
require('load-grunt-tasks')(grunt);

grunt.initConfig({
	eslint: {
		target: ['file.js']
	}
});

grunt.registerTask('default', ['eslint']);
```

## Examples

### Custom config and rules

```js
const noAlertRule = require('./conf/rules/no-alert');

grunt.initConfig({
	eslint: {
		options: {
			overrideConfigFile: 'conf/eslint.js',
			plugins: {
				noAlertRule
			}
		},
		target: ['file.js']
	}
});
```

### Using shared configs

```js
const js = require('@eslint/js');

grunt.initConfig({
	eslint: {
		options: {
			extends: [js.configs.recommended]
		},
		target: ['file.js']
	}
});
```

### Custom formatter

```js
grunt.initConfig({
	eslint: {
		options: {
			format: './node_modules/eslint-tap/index.js'
		},
		target: ['file.js']
	}
});
```

### Output to both console and file

```js
grunt.initConfig({
	eslint: {
		options: {
			outputFile: 'eslint-results.xml',
			format: 'checkstyle'
		},
		target: ['file.js']
	}
});
```

This will output in checkstyle format to both the console and `eslint-results.xml`. To suppress console output and only write to the file, add `silent: true`.

### Using feature flags

```js
grunt.initConfig({
	eslint: {
		options: {
			flags: ['v10_config_lookup_from_file']
		},
		target: ['../project1/scripts/**/*.js']
	}
});
```

## Options

See the [ESLint options](https://eslint.org/docs/developer-guide/nodejs-api#-new-eslintoptions).

In addition the following options are supported:

### extends

Type: `array` | `object`

*Requires ESLint 9.22+*

Shareable configs to extend.

### flags

Type: `array`

[Feauture flags](https://eslint.org/docs/latest/flags/) to pass to ESLint.

### format

Type: `string`\
Default: `'stylish'`

The name of a [built-in formatter](https://github.com/eslint/eslint/tree/master/lib/cli-engine/formatters) or path to a custom one.

Some formatters you might find useful: [eslint-json](https://github.com/sindresorhus/eslint-json), [eslint-tap](https://github.com/sindresorhus/eslint-tap).

### outputFile

Type: `string`\
Default: `''`

Output the report to a file. When specified, the report is written to both the console and the file unless `silent` is true.

### quiet

Type: `boolean`\
Default: `false`

Report errors only.

### silent

Type: `boolean`\
Default: `false`

Suppress console output. When used with `outputFile`, only writes to the file.

### maxWarnings

Type: `number`\
Default: `-1` *(Means no limit)*

The number of warnings to trigger non-zero exit code.

### failOnError

Type: `boolean`\
Default: `true`

Fail the build if ESLint found any errors.
