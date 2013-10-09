'use strict';
var chalk = require('chalk');
var table = require('text-table');

function getMessageType(message, rules) {
	if (message.fatal) {
		return 'error';
	}

	var severity = rules[message.ruleId][0] || rules[message.ruleId];

	if (severity === 2) {
		return chalk.red('error');
	}

	return chalk.yellow('warning');
}

module.exports = function (results, config) {
	var output = '\n';
	var total = 0;
	var rules = config.rules || {};

	results.forEach(function (result) {
		var messages = result.messages;

		total += messages.length;
		output += chalk.underline(result.filePath) + '\n';

		output += table(
			messages.map(function (message) {
				return [
					'',
					chalk.gray('line ' + (message.line || 0)),
					chalk.gray('col ' + (message.col || 0)),
					getMessageType(message, rules),
					chalk.blue(message.message)
				]
			})
		) + '\n\n';
	});

	output += chalk.red.bold('✖ ' + total + ' problem' + (total === 1 ? '' : 's') + '\n');

	return output;
};
