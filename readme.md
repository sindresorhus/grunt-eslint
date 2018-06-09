# grunt-eslint [![Build Status](https://travis-ci.org/sindresorhus/grunt-eslint.svg?branch=master)](https://travis-ci.org/sindresorhus/grunt-eslint)

> Validate files with [ESLint](https://eslint.org)

![](screenshot.png)


## Install

```
$ npm install --save-dev grunt-eslint
```

<a href="https://www.patreon.com/sindresorhus">
	<img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>


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
grunt.initConfig({
	eslint: {
		options: {
			configFile: 'conf/eslint.json',
			rulePaths: ['conf/rules']
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
			format: require('eslint-tap')
		},
		target: ['file.js']
	}
});
```


## Options

See the [ESLint options](https://eslint.org/docs/developer-guide/nodejs-api#cliengine).

In addition the following options are supported:

### format

Type: `string`<br>
Default: `'stylish'`

Name of a [built-in formatter](https://github.com/nzakas/eslint/tree/master/lib/formatters) or path to a custom one.

Some formatters you might find useful: [eslint-json](https://github.com/sindresorhus/eslint-json), [eslint-tap](https://github.com/sindresorhus/eslint-tap).

### outputFile

Type: `string`<br>
Default: `''`

Output the report to a file.

### quiet

Type: `boolean`<br>
Default: `false`

Report errors only.

### maxWarnings

Type: `number`<br>
Default: `-1` *(means no limit)*

Number of warnings to trigger non-zero exit code.

### failOnError

Type: `boolean`<br>
Default: `true`

Fail the build if ESLint found any errors.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
