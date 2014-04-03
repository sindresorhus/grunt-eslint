# grunt-eslint [![Build Status](https://travis-ci.org/sindresorhus/grunt-eslint.svg?branch=master)](https://travis-ci.org/sindresorhus/grunt-eslint)

> Validate files with [ESLint](https://github.com/nzakas/eslint)

![screenshot](screenshot.png)


## Getting Started

If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```bash
$ npm install --save-dev grunt-eslint
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-eslint');
```

*Tip: the [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks) module makes it easier to load multiple grunt tasks.*

[grunt]: http://gruntjs.com
[Getting Started]: https://github.com/gruntjs/grunt/wiki/Getting-started


## Documentation

See the grunt [docs](https://github.com/gruntjs/grunt/wiki) on how to [configure tasks](https://github.com/gruntjs/grunt/wiki/Configuring-tasks) and more advanced usage.

### Example

```js
grunt.initConfig({
	eslint: {					// task
		target: ['file.js']		// array of files
	}
});

grunt.loadNpmTasks('grunt-eslint');
grunt.registerTask('default', ['eslint']);
```

### Example with custom config and rules

```js
grunt.initConfig({
	eslint: {								// task
		options: {
			config: 'conf/eslint.json',		// custom config
			rulesdir: 'conf/rules'			// custom rules
		},
		target: ['file.js']					// array of files
	}
});

grunt.loadNpmTasks('grunt-eslint');
grunt.registerTask('default', ['eslint']);
```

### Example with custom formatter

```js
grunt.initConfig({
	eslint: {								// task
		options: {
			format: require('eslint-tap')
		},
		target: ['file.js']					// array of files
	}
});

grunt.loadNpmTasks('grunt-eslint');
grunt.registerTask('default', ['eslint']);
```


### Options

#### config

Type: `String`  
Default: [built-in eslint.json](https://github.com/iancmyers/eslint-grunt/blob/master/tasks/conf/eslint.json)

Path to your [ESLint config file](https://github.com/nzakas/eslint/blob/master/docs/rules/README.md) (`eslint.json`).

#### rulesdir

Type: `String`  
Default: [built-in rules directory](https://github.com/nzakas/eslint/tree/master/lib/rules)

Path to a directory with custom rules. Your custom rules will be used in addition to the built-in ones.

Recommended read: [Working with Rules](https://github.com/nzakas/eslint/blob/master/docs/developer-guide/working-with-rules.md)

#### format

Type: `String`  
Default: `'stylish'`

Name of a [built-in formatter](https://github.com/nzakas/eslint/tree/master/lib/formatters) or path to a custom one.

Some formatters you might find useful: [eslint-json](https://github.com/sindresorhus/eslint-json), [eslint-tap](https://github.com/sindresorhus/eslint-tap).


## License

[MIT](http://opensource.org/licenses/MIT) © [Sindre Sorhus](http://sindresorhus.com)
