# grunt-eslint [![Build Status](https://secure.travis-ci.org/sindresorhus/grunt-eslint.png?branch=master)](http://travis-ci.org/sindresorhus/grunt-eslint)

Validate files with [ESLint](https://github.com/nzakas/eslint).

> ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.


## Getting Started

If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```sh
npm install --save-dev grunt-eslint
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-eslint');
```

[grunt]: http://gruntjs.com
[Getting Started]: https://github.com/gruntjs/grunt/wiki/Getting-started


### Example config

```js
grunt.initConfig({
	eslint: {					// Task
		target: ['file.js']		// Array of files
	}
});

grunt.loadNpmTasks('grunt-eslint');
grunt.registerTask('default', ['eslint']);
```


## License

MIT License • © [Sindre Sorhus](http://sindresorhus.com)
